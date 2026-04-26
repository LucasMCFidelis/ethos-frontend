import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServerError from "./pages/ServerError.tsx";
import Offline from "./pages/Offline.tsx";

import { SimulationProvider } from "./contexts/SimulationContext.tsx";
import { MobileMenuProvider } from "./contexts/MobileMenuContext.tsx";
import Maintenance from "./pages/Maintenance.tsx";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/offline" element={<Offline />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SimulationProvider>
          <MobileMenuProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </TooltipProvider>
          </MobileMenuProvider>
        </SimulationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
