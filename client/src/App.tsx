// src/App.tsx
import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { LazyLoader } from "@/components/LazyLoader";

// -----------------------------
// Lazy-loaded pages
// -----------------------------
const Home = lazy(() => import("@/pages/Home"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage.tsx"));
const CodeOfConduct = lazy(() => import("@/docs/code_of_conduct"));
const TermsAndConditions = lazy(() => import("@/docs/terms_and_conditions"));
const PrivacyPolicy = lazy(() => import("@/docs/privacy_policy"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
    const [location] = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location]);

    return (
        <Switch>
            <Route path="/" component={() => <LazyLoader><Home /></LazyLoader>} />
            <Route path="/about" component={() => <LazyLoader><AboutUs /></LazyLoader>} />
            <Route path="/events" component={() => <LazyLoader><EventsPage /></LazyLoader>} />
            <Route path="/faqpage" component={() => <LazyLoader><FAQPage /></LazyLoader>} />
            <Route path="/code-of-conduct" component={() => <LazyLoader><CodeOfConduct /></LazyLoader>} />
            <Route path="/terms" component={() => <LazyLoader><TermsAndConditions /></LazyLoader>} />
            <Route path="/privacy" component={() => <LazyLoader><PrivacyPolicy /></LazyLoader>} />
            <Route path="/community" component={() => <LazyLoader><CommunityPage /></LazyLoader>} />
            <Route path="/blogs" component={() => <LazyLoader><BlogPage /></LazyLoader>} />
            <Route path="/blogs/:slug" component={() => <LazyLoader><BlogDetail /></LazyLoader>} />
            <Route component={() => <LazyLoader><NotFound /></LazyLoader>} />
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