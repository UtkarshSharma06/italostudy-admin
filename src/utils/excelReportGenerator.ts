import * as XLSX from 'xlsx';
import { format, subDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

export type ReportTimeframe = '7d' | '30d' | '3m' | '6m' | '1y' | 'all';

function getDateRange(timeframe: ReportTimeframe): { from: Date | null; to: Date } {
    const to = endOfDay(new Date());
    let from: Date | null = null;
    if (timeframe === '7d') from = startOfDay(subDays(new Date(), 7));
    else if (timeframe === '30d') from = startOfDay(subDays(new Date(), 30));
    else if (timeframe === '3m') from = startOfDay(subMonths(new Date(), 3));
    else if (timeframe === '6m') from = startOfDay(subMonths(new Date(), 6));
    else if (timeframe === '1y') from = startOfDay(subYears(new Date(), 1));
    return { from, to };
}

function autoWidth(ws: XLSX.WorkSheet, data: any[][]) {
    const colWidths = data.reduce((acc, row) => {
        row.forEach((cell, i) => {
            const len = cell ? String(cell).length + 4 : 10;
            acc[i] = Math.max(acc[i] || 10, len);
        });
        return acc;
    }, [] as number[]);
    ws['!cols'] = colWidths.map(w => ({ wch: Math.min(w, 50) }));
}

function styleHeader(ws: XLSX.WorkSheet, range: string) {
    // xlsx doesn't support full styling in community edition — this sets bold via cell format
    const ref = XLSX.utils.decode_range(range);
    for (let C = ref.s.c; C <= ref.e.c; C++) {
        const addr = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!ws[addr]) continue;
        ws[addr].s = { font: { bold: true }, fill: { fgColor: { rgb: 'E8EEFF' } } };
    }
}

export async function generateExcelReport(timeframe: ReportTimeframe, onProgress?: (msg: string) => void) {
    const { from, to } = getDateRange(timeframe);
    const wb = XLSX.utils.book_new();
    const label = timeframe === 'all' ? 'All Time' : timeframe.toUpperCase();

    const applyFilter = (query: any) => {
        if (from) query = query.gte('created_at', from.toISOString());
        return query.lte('created_at', to.toISOString());
    };

    // ── 1. TRANSACTIONS SHEET ────────────────────────────────────────────
    onProgress?.('Fetching transactions...');
    const { data: txData } = await applyFilter(
        supabase
            .from('transactions')
            .select('id, amount, currency, status, payment_method, plan_id, created_at, profiles(display_name, email)')
            .neq('plan_id', 'explorer')
            .neq('plan_id', 'STORE_ORDER')
            .order('created_at', { ascending: false })
    );

    const txRows: any[][] = [
        ['Transaction ID', 'Customer Name', 'Email', 'Amount (EUR)', 'Original Amount', 'Currency', 'Status', 'Plan', 'Payment Method', 'Date', 'Time']
    ];
    const rates: Record<string, number> = { USD: 1.08, INR: 106.6, GBP: 0.86, NGN: 1750 };
    let totalRevenue = 0;
    let completedCount = 0;
    let failedCount = 0;

    (txData || []).forEach((tx: any) => {
        const eurAmount = tx.currency === 'EUR'
            ? Number(tx.amount)
            : Number(tx.amount) / (rates[tx.currency] || 1);
        if (tx.status === 'completed') { totalRevenue += eurAmount; completedCount++; }
        if (tx.status === 'failed') failedCount++;
        txRows.push([
            tx.id,
            tx.profiles?.display_name || 'Unknown',
            tx.profiles?.email || 'N/A',
            Math.round(eurAmount * 100) / 100,
            tx.amount,
            tx.currency,
            tx.status,
            tx.plan_id || 'N/A',
            tx.payment_method,
            format(new Date(tx.created_at), 'dd MMM yyyy'),
            format(new Date(tx.created_at), 'HH:mm')
        ]);
    });

    const txWs = XLSX.utils.aoa_to_sheet(txRows);
    autoWidth(txWs, txRows);
    XLSX.utils.book_append_sheet(wb, txWs, 'Transactions');

    // ── 2. FINANCIAL SUMMARY SHEET ───────────────────────────────────────
    onProgress?.('Computing financial summary...');
    const summaryRows: any[][] = [
        ['Financial Summary', `Period: ${label}`],
        [],
        ['Metric', 'Value'],
        ['Total Revenue (EUR)', `€${Math.round(totalRevenue).toLocaleString()}`],
        ['Completed Transactions', completedCount],
        ['Failed Transactions', failedCount],
        ['Success Rate', completedCount + failedCount > 0 ? `${Math.round((completedCount / (completedCount + failedCount)) * 100)}%` : 'N/A'],
        ['Average Transaction (EUR)', completedCount > 0 ? `€${Math.round(totalRevenue / completedCount)}` : 'N/A'],
        [],
        ['Report Generated', format(new Date(), 'dd MMM yyyy HH:mm')],
        ['Exported By', 'Italostudy Admin Panel'],
    ];

    const summaryWs = XLSX.utils.aoa_to_sheet(summaryRows);
    summaryWs['!cols'] = [{ wch: 32 }, { wch: 24 }];
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Financial Summary');

    // ── 3. USERS SHEET ───────────────────────────────────────────────────
    onProgress?.('Fetching user data...');
    const { data: userData } = await applyFilter(
        supabase
            .from('profiles')
            .select('id, display_name, email, subscription_tier, selected_plan, created_at, country')
            .order('created_at', { ascending: false })
    );

    const userRows: any[][] = [
        ['User ID', 'Name', 'Email', 'Plan', 'Country', 'Joined Date']
    ];
    const planCounts: Record<string, number> = {};

    (userData || []).forEach((u: any) => {
        const actualPlan = u.subscription_tier || u.selected_plan || 'free';
        planCounts[actualPlan] = (planCounts[actualPlan] || 0) + 1;
        userRows.push([
            u.id,
            u.display_name || 'N/A',
            u.email || 'N/A',
            actualPlan,
            u.country || 'Unknown',
            format(new Date(u.created_at), 'dd MMM yyyy')
        ]);
    });

    const userWs = XLSX.utils.aoa_to_sheet(userRows);
    autoWidth(userWs, userRows);
    XLSX.utils.book_append_sheet(wb, userWs, 'Students');

    // ── 4. USER GROWTH SHEET ─────────────────────────────────────────────
    onProgress?.('Computing growth metrics...');
    const growthMap: Record<string, number> = {};
    (userData || []).forEach((u: any) => {
        const month = format(new Date(u.created_at), 'MMM yyyy');
        growthMap[month] = (growthMap[month] || 0) + 1;
    });
    const growthRows: any[][] = [
        ['Month', 'New Signups'],
        ...Object.entries(growthMap).map(([m, c]) => [m, c])
    ];
    const growthWs = XLSX.utils.aoa_to_sheet(growthRows);
    growthWs['!cols'] = [{ wch: 16 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, growthWs, 'User Growth');

    // ── 5. MOCK SESSIONS SHEET ───────────────────────────────────────────
    onProgress?.('Fetching mock session data...');
    const [{ data: sessionData }, { data: ieltsData }] = await Promise.all([
        applyFilter(
            supabase
                .from('tests')
                .select('id, exam_type, difficulty, created_at')
                .eq('is_mock', true)
                .order('created_at', { ascending: false })
        ),
        applyFilter(
            supabase
                .from('mock_exam_submissions')
                .select('id, created_at')
                .order('created_at', { ascending: false })
        )
    ]);

    const sessionRows: any[][] = [
        ['Session ID', 'Exam Type', 'Difficulty', 'Date Taken']
    ];
    (sessionData || []).forEach((s: any) => {
        sessionRows.push([
            s.id,
            s.exam_type || 'N/A',
            s.difficulty || 'N/A',
            format(new Date(s.created_at), 'dd MMM yyyy')
        ]);
    });
    (ieltsData || []).forEach((s: any) => {
        sessionRows.push([
            s.id,
            'IELTS',
            'N/A',
            format(new Date(s.created_at), 'dd MMM yyyy')
        ]);
    });

    const sessionWs = XLSX.utils.aoa_to_sheet(sessionRows);
    autoWidth(sessionWs, sessionRows);
    XLSX.utils.book_append_sheet(wb, sessionWs, 'Mock Sessions');

    // ── 6. PLAN BREAKDOWN SHEET ──────────────────────────────────────────
    const planRows: any[][] = [
        ['Plan', 'User Count', '% of Total'],
        ...Object.entries(planCounts).map(([plan, count]) => [
            plan,
            count,
            userData?.length ? `${Math.round((count / userData.length) * 100)}%` : '0%'
        ])
    ];
    const planWs = XLSX.utils.aoa_to_sheet(planRows);
    planWs['!cols'] = [{ wch: 16 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, planWs, 'Plan Breakdown');

    // ── DOWNLOAD ─────────────────────────────────────────────────────────
    onProgress?.('Generating file...');
    const fileName = `italostudy-report-${label.toLowerCase().replace(' ', '-')}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
    XLSX.writeFile(wb, fileName);
    return fileName;
}
