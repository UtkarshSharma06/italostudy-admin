import{r as l,j as e}from"./chunk-react-CHYD3jVH.js";import{a as U,L as c}from"./chunk-router-Bi2q72bo.js";import{a as G,s as C,Y as B,c as x}from"./main-DpQKsHOR.js";import{bL as V}from"./chunk-vendor-By63Marc.js";import{C as X}from"./CartOverlay-Cby-WkT0.js";import{af as J,bq as S,Y as w,cy as y,D as $,br as I,ai as K,R as Q,bD as H,I as F,cD as E,bF as W,bb as Z,L,bX as ee,ar as te}from"./chunk-utils-DGcNHC-c.js";import{m as O,A as se}from"./chunk-motion-BVYN7E__.js";import"./chunk-ai-UIHv_u-O.js";import"./chunk-capacitor-DNsR1HAV.js";import"./chunk-radix-1-ZMmsX9.js";import"./chunk-supabase-DEWm8jo_.js";import"./chunk-i18n-B4uN7xiM.js";import"./chunk-three-DtD8smo0.js";import"./chunk-katex-BXYkUF8E.js";const D={pending:{label:"Pending",icon:F,color:"text-amber-600",bg:"bg-amber-50 border-amber-200"},paid:{label:"Paid",icon:L,color:"text-indigo-600",bg:"bg-indigo-50 border-indigo-200"},shipped:{label:"Shipped",icon:E,color:"text-blue-600",bg:"bg-blue-50 border-blue-200"},delivered:{label:"Delivered",icon:L,color:"text-emerald-600",bg:"bg-emerald-50 border-emerald-200"},cancelled:{label:"Cancelled",icon:ee,color:"text-rose-600",bg:"bg-rose-50 border-rose-200"},refunded:{label:"Refunded",icon:te,color:"text-slate-600",bg:"bg-slate-50 border-slate-200"}};function be({isMobileView:ae=!1}){const m=U(),{user:i}=G(),[h,M]=l.useState([]),[f,j]=l.useState(!0),[P,N]=l.useState(!1),[u,v]=l.useState(0),[T,z]=l.useState(null),[d,k]=l.useState(null),[_,g]=l.useState(null),p=l.useCallback(()=>{try{const t=JSON.parse(localStorage.getItem("italostudy_cart")||"[]");v(t.reduce((a,r)=>a+r.quantity,0))}catch{v(0)}},[]);l.useEffect(()=>(p(),window.addEventListener("cart-updated",p),()=>window.removeEventListener("cart-updated",p)),[p]),l.useEffect(()=>{i&&A()},[i]);const A=async()=>{j(!0);const{data:t,error:a}=await C.from("store_orders").select(`
                *,
                order_items:store_order_items (
                    id, quantity, unit_price,
                    product:store_products ( id, title, slug, type, images, download_url )
                )
            `).eq("user_id",i.id).eq("status","paid").order("created_at",{ascending:!1});a||M(t||[]),j(!1)},Y=async t=>{k(t),g(null);try{const{data:a,error:r}=await C.functions.invoke("store-download",{body:{product_id:t}});if(r||!a?.url){const n=r?.message||a?.error||"Failed to generate link";n.toLowerCase().includes("expired")||n.toLowerCase().includes("piracy")?g("Link got expired due to piracy leak, mail us at contact@italostudy.com"):V.error(n);return}window.open(a.url,"_blank")}catch(a){a instanceof Error?a.message:String(a),g("Link got expired due to piracy leak, mail us at contact@italostudy.com")}finally{k(null)}},q=t=>{const a=t.order_items.map(s=>`<tr>
                <td style="padding:16px 0;border-bottom:1px solid #f1f5f9">
                    <div style="font-weight:700;color:#0f172a;font-size:14px">${s.product?.title||"Product"}</div>
                    <div style="font-size:11px;color:#94a3b8;margin-top:2px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">
                        ${s.product?.type==="digital"?"Digital Access":"Physical Shipment"}
                    </div>
                </td>
                <td style="padding:16px 8px;border-bottom:1px solid #f1f5f9;text-align:center;font-weight:600;color:#64748b">${s.quantity}</td>
                <td style="padding:16px 8px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;color:#64748b">&euro;${(s.unit_price||0).toFixed(2)}</td>
                <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:800;color:#0f172a">&euro;${((s.unit_price||0)*s.quantity).toFixed(2)}</td>
            </tr>`).join(""),r=`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice - Italostudy Store #${t.id.split("-")[0].toUpperCase()}</title>
    <!-- Fonts & Latex -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"><\/script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@400;500;700&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; color: #0f172a; line-height: 1.5; background: #fff; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 60px; }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand-logo { height: 40px; }
        .brand-divider { width: 2px; height: 24px; background: #e2e8f0; }
        .brand-text { font-family: 'Outfit', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: 0.25em; font-size: 14px; color: #0f172a; }
        .invoice-meta { text-align: right; }
        .invoice-title { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 32px; margin: 0; line-height: 1; color: #0f172a; }
        .invoice-id { font-family: 'monospace'; color: #94a3b8; font-size: 14px; margin: 8px 0; font-weight: 600; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
        .meta-box h4 { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #94a3b8; margin: 0 0 12px 0; }
        .meta-box p { margin: 0; font-size: 13px; font-weight: 600; color: #475569; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        th { text-align: left; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #94a3b8; padding-bottom: 12px; border-bottom: 2px solid #0f172a; }
        .total-section { margin-left: auto; width: 280px; }
        .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; font-weight: 600; color: #64748b; }
        .total-row.grand { padding-top: 16px; border-top: 2px solid #f1f5f9; margin-top: 12px; }
        .total-row.grand span:last-child { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 26px; color: #0f172a; }
        .total-row.discount { color: #10b981; }
        .footer { margin-top: 80px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 40px; }
        .footer p { font-size: 11px; color: #94a3b8; font-weight: 500; margin: 4px 0; }
        @media print { body { padding: 0; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="brand">
            <img src="${window.location.origin}/logo.webp" class="brand-logo" style="height:40px">
            <div class="brand-divider"></div>
            <span class="brand-text">Store</span>
        </div>
        <div class="invoice-meta">
            <h1 class="invoice-title">TAX INVOICE</h1>
            <p class="invoice-id">#${t.id.split("-")[0].toUpperCase()}</p>
            <p style="font-size:13px; font-weight:700; color:#64748b">${$(new Date(t.created_at),"MMMM dd, yyyy")}</p>
        </div>
    </div>

    <div class="meta-grid">
        <div class="meta-box">
            <h4>Customer Details</h4>
            <p>${i?.display_name||"Valued Customer"}</p>
            <p>${i?.email}</p>
        </div>
        ${t.shipping_address&&Object.keys(t.shipping_address).length>0?`
        <div class="meta-box">
            <h4>Shipping To</h4>
            <p>${t.shipping_address.name||""}</p>
            <p>${t.shipping_address.address||""}</p>
            <p>${t.shipping_address.city||""}, ${t.shipping_address.country||""}</p>
        </div>
        `:`
        <div class="meta-box">
            <h4>Fulfillment</h4>
            <p>Digital Marketplace Order</p>
            <p>Access: Instant Dashboard Download</p>
        </div>
        `}
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th style="text-align:center">Qty</th>
                <th style="text-align:right">Unit Price</th>
                <th style="text-align:right">Amount</th>
            </tr>
        </thead>
        <tbody>
            ${a}
        </tbody>
    </table>

    <div class="total-section">
        <div class="total-row">
            <span>Subtotal (Net)</span>
            <span>&euro;${Number(t.subtotal||t.total_amount).toFixed(2)}</span>
        </div>
        <div class="total-row">
            <span>GST / Tax (18%)</span>
            <span>&euro;${Number(t.tax_amount||0).toFixed(2)}</span>
        </div>
        ${t.discount_amount>0?`
        <div class="total-row discount">
            <span>Coupon Discount</span>
            <span>- &euro;${Number(t.discount_amount).toFixed(2)}</span>
        </div>
        `:""}
        <div class="total-row grand">
            <div style="display:flex; flex-direction:column">
                <span style="font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:0.1em; font-size:11px">Grand Total</span>
                <span style="font-size:9px; font-weight:700; color:#94a3b8; margin-top:2px; text-transform:uppercase; letter-spacing:0.05em">Paid via ${t.payment_method||"Secure Gateway"}</span>
            </div>
            <span>&euro;${Number(t.total_amount).toFixed(2)}</span>
        </div>
    </div>

    <div class="footer">
        <p>Thank you for choosing Italostudy. Keep this invoice for your records.</p>
        <p>© ${new Date().getFullYear()} Italostudy Store · contact@italostudy.com</p>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\\\(", right: "\\\\)", display: false},
                    {left: "\\\\[", right: "\\\\]", display: true}
                ],
                throwOnError : false
            });
        });
    <\/script>
</body>
</html>`,n=new Blob([r],{type:"text/html;charset=utf-8"}),b=URL.createObjectURL(n),o=window.open(b,"_blank");o&&(o.onload=()=>{setTimeout(()=>{o.print()},500)})};return e.jsxs("div",{className:"min-h-screen bg-[#f7f8fa] flex flex-col font-sans",children:[e.jsxs("header",{className:"bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm shrink-0",children:[e.jsxs("div",{className:"max-w-5xl mx-auto px-4 h-16 flex items-center gap-4",children:[e.jsxs(c,{to:"/store",className:"flex items-center gap-2.5 shrink-0",children:[e.jsx("img",{src:"/logo.webp",alt:"Italostudy",className:"h-8 md:h-9 w-auto object-contain"}),e.jsxs("div",{className:"hidden sm:flex items-center gap-1.5",children:[e.jsx("div",{className:"w-px h-5 bg-slate-200"}),e.jsx("span",{className:"text-[10px] font-black uppercase tracking-[0.2em] text-[#0f172a]",children:"Store"})]})]}),e.jsx("div",{className:"flex-1"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{onClick:()=>N(!0),className:"flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#0f172a] relative",children:[e.jsxs("div",{className:"relative",children:[e.jsx(J,{className:"w-5 h-5"}),u>0&&e.jsx("span",{className:"absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center",children:u>9?"9+":u})]}),e.jsx("span",{className:"hidden md:block text-[9px] font-black uppercase tracking-widest",children:"My Bag"})]}),i?e.jsx("button",{onClick:()=>m("/dashboard"),className:"hidden md:flex h-9 px-4 rounded-full bg-[#0f172a] text-white text-xs font-black uppercase tracking-widest",children:"Dashboard"}):e.jsxs("button",{onClick:()=>m("/auth"),className:"flex items-center gap-2 h-9 px-4 rounded-full bg-[#0f172a] text-white text-xs font-black uppercase tracking-widest",children:[e.jsx(S,{className:"w-4 h-4"}),e.jsx("span",{children:"Login"})]})]})]}),e.jsx("div",{className:"border-t border-slate-100",children:e.jsxs("div",{className:"max-w-5xl mx-auto px-4 flex items-center gap-2 h-9 text-[11px] font-semibold text-slate-400",children:[e.jsx(c,{to:"/store",className:"hover:text-[#0f172a] transition-colors",children:"Store"}),e.jsx(w,{className:"w-3 h-3"}),e.jsx("span",{className:"text-[#0f172a] font-black",children:"My Orders"})]})})]}),e.jsxs("div",{className:"flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-2xl font-black text-[#0f172a]",children:"My Orders"}),e.jsxs(c,{to:"/store/products",className:"text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0f172a] transition-colors flex items-center gap-1",children:["Browse Store ",e.jsx(w,{className:"w-3 h-3"})]})]}),!i&&e.jsxs("div",{className:"py-24 text-center space-y-4",children:[e.jsx(S,{className:"w-16 h-16 mx-auto text-slate-200"}),e.jsx("h2",{className:"text-xl font-black text-slate-900",children:"Login to view your orders"}),e.jsx("p",{className:"text-slate-400 font-medium text-sm",children:"Your orders and downloads appear here after purchase."}),e.jsx("button",{onClick:()=>m("/auth"),className:"h-11 px-6 rounded-xl bg-[#0f172a] text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors",children:"Login Now →"})]}),i&&f&&e.jsx(B,{}),i&&!f&&h.length===0&&e.jsxs("div",{className:"py-24 text-center space-y-4",children:[e.jsx(y,{className:"w-16 h-16 mx-auto text-slate-200"}),e.jsx("h2",{className:"text-xl font-black text-slate-900",children:"No orders yet"}),e.jsx("p",{className:"text-slate-400 font-medium text-sm",children:"Your purchases will appear here."}),e.jsx(c,{to:"/store/products",className:"inline-flex h-11 px-6 rounded-xl bg-[#0f172a] text-white text-xs font-black uppercase tracking-widest items-center hover:bg-slate-800 transition-colors",children:"Start Shopping →"})]}),i&&!f&&h.length>0&&e.jsx("div",{className:"space-y-4",children:h.map(t=>{const a=D[t.status]||D.pending,r=a.icon,n=T===t.id,b=t.order_items?.some(s=>s.product?.type==="digital"),o=t.order_items?.some(s=>s.product?.type==="physical");return e.jsxs(O.div,{layout:!0,className:"bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm",children:[e.jsxs("div",{onClick:()=>z(n?null:t.id),className:"w-full text-left px-6 py-5 flex flex-wrap items-center gap-4 cursor-pointer",children:[e.jsxs("div",{className:"shrink-0",children:[e.jsx("p",{className:"text-[9px] font-black uppercase tracking-widest text-slate-400",children:"Order"}),e.jsxs("p",{className:"font-black text-[#0f172a] text-sm font-mono",children:["#",t.id.split("-")[0].toUpperCase()]})]}),e.jsxs("div",{className:"shrink-0",children:[e.jsx("p",{className:"text-[9px] font-black uppercase tracking-widest text-slate-400",children:"Date"}),e.jsx("p",{className:"text-sm font-bold text-slate-700",children:$(new Date(t.created_at),"dd MMM yyyy")})]}),e.jsxs("div",{className:"shrink-0",children:[e.jsx("p",{className:"text-[9px] font-black uppercase tracking-widest text-slate-400",children:"Total"}),e.jsxs("p",{className:"text-sm font-black text-[#0f172a]",children:["€",Number(t.total_amount).toFixed(2)]})]}),e.jsxs("span",{className:x("flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",a.bg,a.color),children:[e.jsx(r,{className:"w-3 h-3"}),a.label]}),e.jsxs("div",{className:"flex gap-1.5 flex-wrap",children:[b&&e.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded bg-[#0f172a] text-white text-[9px] font-black uppercase",children:[e.jsx(I,{className:"w-2.5 h-2.5"})," Digital"]}),o&&e.jsxs("span",{className:"flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-black uppercase",children:[e.jsx(y,{className:"w-2.5 h-2.5"})," Physical"]})]}),e.jsxs("button",{onClick:s=>{s.stopPropagation(),q(t)},className:"ml-auto flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0f172a] transition-colors",children:[e.jsx(K,{className:"w-3.5 h-3.5"})," Invoice"]}),e.jsx(w,{className:x("w-4 h-4 text-slate-300 transition-transform",n&&"rotate-90")})]}),e.jsx(se,{children:n&&e.jsx(O.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},className:"overflow-hidden",children:e.jsxs("div",{className:"px-6 pb-6 space-y-5 border-t border-slate-50 pt-5",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400",children:"Items in this order"}),t.order_items?.map(s=>e.jsxs("div",{className:"flex items-center gap-4 bg-slate-50 rounded-xl p-3",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl bg-white border border-slate-100 overflow-hidden shrink-0",children:e.jsx("img",{src:s.product?.images?.[0]||"https://placehold.co/80x80/f1f5f9/0f172a?text=P",alt:s.product?.title,className:"w-full h-full object-cover"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-bold text-slate-800 line-clamp-1",children:s.product?.title}),e.jsxs("p",{className:"text-[10px] text-slate-400 font-medium",children:[s.quantity," × €",s.unit_price?.toFixed(2)]})]}),e.jsxs("span",{className:x("shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase",s.product?.type==="digital"?"bg-[#0f172a] text-white":"bg-slate-100 text-slate-600"),children:[s.product?.type==="digital"?e.jsx(I,{className:"w-2.5 h-2.5"}):e.jsx(y,{className:"w-2.5 h-2.5"}),s.product?.type]}),s.product?.type==="digital"&&(t.status==="paid"||t.status==="delivered")&&e.jsxs("div",{className:"flex flex-col items-end gap-2 shrink-0",children:[e.jsx("button",{disabled:d===s.product.id,onClick:R=>{R.stopPropagation(),Y(s.product.id)},className:x("flex items-center gap-1.5 h-8 px-3 rounded-lg text-white text-[10px] font-black uppercase tracking-widest transition-all",d===s.product.id?"bg-slate-300":"bg-emerald-500 hover:bg-emerald-600"),children:d===s.product.id?e.jsxs(e.Fragment,{children:[e.jsx(Q,{className:"w-3 h-3 animate-spin"})," Verifying"]}):e.jsxs(e.Fragment,{children:[e.jsx(H,{className:"w-3 h-3"})," Get Secure Link"]})}),_&&d===null&&e.jsx("p",{className:"text-[9px] font-bold text-rose-500 max-w-[150px] text-right leading-tight",children:_})]})]},s.id))]}),o&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400",children:"Shipping & Tracking"}),t.status==="pending"||t.status==="paid"?e.jsxs("div",{className:"flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4",children:[e.jsx(F,{className:"w-4 h-4 text-amber-500 shrink-0 mt-0.5"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-black text-amber-700",children:"Processing your order"}),e.jsx("p",{className:"text-[10px] text-amber-600 mt-0.5",children:"Your order is confirmed. Tracking info will appear here once shipped."})]})]}):t.tracking_url||t.tracking_number?e.jsxs("div",{className:"flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4",children:[e.jsx(E,{className:"w-4 h-4 text-blue-500 shrink-0 mt-0.5"}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-xs font-black text-blue-700",children:"Your order is on the way!"}),t.tracking_number&&e.jsxs("p",{className:"text-[10px] text-blue-600 mt-0.5 font-mono",children:["Tracking: ",t.tracking_number]}),t.tracking_url&&e.jsxs("a",{href:t.tracking_url,target:"_blank",rel:"noopener noreferrer",className:"mt-2 inline-flex items-center gap-1.5 text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest",children:["Track Package ",e.jsx(W,{className:"w-3 h-3"})]})]})]}):null,t.shipping_address&&Object.keys(t.shipping_address).length>0&&e.jsxs("div",{className:"bg-slate-50 rounded-xl p-4 text-xs text-slate-500 font-medium space-y-0.5",children:[e.jsx("p",{className:"font-black text-slate-700",children:t.shipping_address.name}),e.jsx("p",{children:t.shipping_address.address}),e.jsxs("p",{children:[t.shipping_address.city,", ",t.shipping_address.country]}),t.shipping_address.phone&&e.jsx("p",{children:t.shipping_address.phone})]})]}),(t.status==="cancelled"||t.status==="refunded")&&e.jsxs("div",{className:"flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-xl p-4",children:[e.jsx(Z,{className:"w-4 h-4 text-rose-500 shrink-0 mt-0.5"}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-xs font-black text-rose-700",children:["Order ",t.status==="refunded"?"Refunded":"Cancelled"]}),t.admin_notes&&e.jsx("p",{className:"text-[10px] text-rose-600 mt-0.5",children:t.admin_notes}),e.jsx("p",{className:"text-[10px] text-rose-500 mt-1",children:"Contact contact@italostudy.com for assistance."})]})]}),t.admin_notes&&t.status!=="cancelled"&&t.status!=="refunded"&&e.jsxs("div",{className:"bg-slate-50 border border-slate-100 rounded-xl p-4",children:[e.jsx("p",{className:"text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1",children:"Note from Italostudy"}),e.jsx("p",{className:"text-xs text-slate-600 font-medium",children:t.admin_notes})]})]})})})]},t.id)})})]}),e.jsx("footer",{className:"bg-[#0f172a] border-t border-slate-800 mt-10",children:e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("img",{src:"/logo.webp",alt:"Italostudy",className:"h-7 brightness-0 invert opacity-80"}),e.jsx("div",{className:"w-px h-4 bg-slate-700"}),e.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-slate-500",children:"Store"})]}),e.jsxs("p",{className:"text-[10px] font-bold text-slate-600 uppercase tracking-widest",children:["© ",new Date().getFullYear()," Italostudy · All rights reserved"]}),e.jsx(c,{to:"/",className:"text-[10px] font-black text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors",children:"← Back to Italostudy"})]})}),e.jsx(X,{isOpen:P,onClose:()=>N(!1)})]})}export{be as default};
