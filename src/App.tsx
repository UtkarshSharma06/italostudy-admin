import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { LiveEditProvider } from "@/contexts/LiveEditContext";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
import AdminRoute from "@/components/auth/AdminRoute";

const queryClient = new QueryClient();

const ToasterProvider = () => (
  <>
    <Toaster />
    <Sonner position="top-center" richColors />
  </>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <GlobalErrorBoundary>
          <AuthProvider>
            <LiveEditProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <ToasterProvider />
                  <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
                    <Routes>
                      {/* Catch unauthorized access and send them to login */}
                      <Route path="/404" element={<Navigate to="/auth" replace />} />
                      
                      <Route path="/" element={
                        <AdminRoute>
                          <Admin />
                        </AdminRoute>
                      } />

                      <Route path="/auth" element={<Auth />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </LiveEditProvider>
          </AuthProvider>
        </GlobalErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
