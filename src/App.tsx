import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SacredAuthProvider } from "@/hooks/useSacredAuth";
import { CivicaProvider } from "@/contexts/CivicaContext";
import { BillingProvider } from "@/hooks/useBilling";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Billing from "./pages/Billing";
import RitualTech from "./pages/RitualTech";
import NotFound from "./pages/NotFound";
import SacredAuthGuard from "./components/SacredAuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SacredAuthProvider>
      <CivicaProvider>
        <BillingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/dashboard"
                  element={
                    <SacredAuthGuard>
                      <Index />
                    </SacredAuthGuard>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <SacredAuthGuard>
                      <Billing />
                    </SacredAuthGuard>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BillingProvider>
      </CivicaProvider>
    </SacredAuthProvider>
  </QueryClientProvider>
);

export default App;
