import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import FAQPage from "@/pages/FAQPage";
import CodeOfConduct from "@/docs/code_of_conduct";
import TermsAndConditions from "@/docs/terms_and_conditions";
import PrivacyPolicy from "@/docs/privacy_policy";

import NotFound from "@/pages/not-found";

import { Analytics } from '@vercel/analytics/react';

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/about" component={AboutUs} />

      <Route path="/faqpage" component={FAQPage} />

      <Route path="/code-of-conduct" component={CodeOfConduct} />

      <Route path="/terms" component={TermsAndConditions} />

      <Route path="/privacy" component={PrivacyPolicy} />
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
