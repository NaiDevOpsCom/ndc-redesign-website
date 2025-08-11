import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import FAQPage from "@/pages/FAQPage";

import NotFound from "@/pages/not-found";

import { Analytics } from '@vercel/analytics/react';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/about" component={AboutUs} />

      <Route path="/faqpage" component={FAQPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
           <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
