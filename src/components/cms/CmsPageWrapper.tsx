import React from 'react';
import { LiveEditProvider } from '@/contexts/LiveEditContext';
import LiveEditToolbar from '@/components/cms/LiveEditToolbar';

/**
 * Wrap any cluster page with this to enable live inline editing.
 * Usage:
 *   return <CmsPageWrapper slug="cent-s-exam-ultimate-guide"><Layout>...</Layout></CmsPageWrapper>
 */
export default function CmsPageWrapper({
    slug,
    children,
}: {
    slug: string;
    children: React.ReactNode;
}) {
    return (
        <LiveEditProvider slug={slug}>
            {children}
            <LiveEditToolbar />
        </LiveEditProvider>
    );
}
