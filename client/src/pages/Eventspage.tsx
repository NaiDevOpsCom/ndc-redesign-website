import React, { useCallback, useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Cloud, Wrench, Award, Rocket, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { Image as UnpicImage } from "@unpic/react";
import { getFAQsByCategory } from "@/data/faqData";
import { featuredEvents, FeaturedEvent } from "@/data/eventsData";
import { Link } from "wouter";
import { useLumaEvents } from "@/hooks/useLumaEvents";
import { format } from 'date-fns';

// --- Types ---
type PastEvent = { id: number; date: string; title: string; image: string; recapUrl: string };

// --- Helper components ---
function FeaturedEventCard({ e }: { e: FeaturedEvent }) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <UnpicImage src={e.image} alt={e.title} className="w-full h-56 object-cover" width={1200} height={560} loading="lazy" layout="constrained" />
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <Badge className={e.badgeColor}>{e.type}</Badge>
                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                        <Calendar className="h-4 w-4" />
                        <span>{e.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{e.time}</span>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{e.description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{e.location}</span>
                    </div>
                    <Button onClick={() => window.alert("Register flow coming soon")}>{e.cta}</Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Removed unused ScheduleList and SpeakersList components to keep code lean

function UpcomingLumaEvents() {
    const { events, loading, error } = useLumaEvents();

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading upcoming events...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error loading events from Luma calendar.</p>
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="mt-4"
                >
                    Retry
                </Button>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <Card key={event.uid} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-primary/10 text-primary">Upcoming</Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>

                        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
                                </span>
                            </div>
                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                        </div>

                        {event.description && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {event.description}
                            </p>
                        )}

                        {event.url && (
                            <Button
                                className="w-full"
                                onClick={() => window.open(event.url, '_blank', 'noopener,noreferrer')}
                            >
                                View Details & Register
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function PastEventsGrid({ items }: { items: PastEvent[] }) {
    const [start, setStart] = useState(0);
    const perPage = 2;

    const prev = useCallback(() => setStart((s) => (s - perPage + items.length) % items.length), [items.length]);
    const next = useCallback(() => setStart((s) => (s + perPage) % items.length), [items.length]);

    // Touch swipe support (mobile): swipe left -> next, swipe right -> prev
    const touchStartX = useRef<number | null>(null);
    const SWIPE_THRESHOLD = 40; // px

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current == null) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const deltaX = endX - touchStartX.current;
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX < 0) {
                next();
            } else {
                prev();
            }
        }
        touchStartX.current = null;
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    let visible = items.slice(start, start + perPage);
    if (visible.length < perPage) visible = visible.concat(items.slice(0, perPage - visible.length));

    return (
        <div className="relative" tabIndex={0} onKeyDown={handleKey} aria-roledescription="carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {visible.map((item) => (
                    <div key={item.id} className="text-center">
                        <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-[560px]">
                            <UnpicImage src={item.image} alt={item.title} className="w-full h-56 object-cover" width={1200} height={560} loading="lazy" layout="constrained" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">{item.date} Meetup</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">{item.title}</p>
                        <div className="mt-3">
                            <a href={item.recapUrl} className="text-primary underline">View Recap</a>
                        </div>
                    </div>
                ))}
            </div>

            <button aria-label="Previous events" onClick={prev} className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800 rounded-full p-2 shadow-md z-10">
                <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            <button aria-label="Next events" onClick={next} className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800 rounded-full p-2 shadow-md z-10">
                <ChevronRight className="h-6 w-6 text-primary" />
            </button>
        </div>
    );
}

// --- Main Page Component ---
export default function Eventspage() {
    // --- Data ---

    const reasons = [
        { icon: Cloud, title: "Explore cloud and DevOps" },
        { icon: Wrench, title: "Spark practical learning and growth" },
        { icon: Award, title: "Recognize and certify practical skills" },
        { icon: Rocket, title: "Empower Kenya's future tech leaders" },
        { icon: Handshake, title: "Host workshops and campus tours" },
    ];

    const pastEvents: PastEvent[] = [
        { id: 1, date: "1st June 2025", title: "Cloud Confessions", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", recapUrl: "#" },
        { id: 2, date: "1st June 2025", title: "Cloud Confessions", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", recapUrl: "#" },
        { id: 3, date: "15th May 2025", title: "Automation Night", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", recapUrl: "#" },
    ];

    // --- Render ---
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <header className="relative min-h-[50vh] flex items-center justify-center text-center" style={{ backgroundImage: "url('https://ik.imagekit.io/nairobidevops/ndc-assets/PXL_20240601_141554232.jpg?updatedAt=1755152981738')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Events & Workshops</h1>
                    <p className="text-md md:text-lg text-white/80 max-w-3xl mx-auto mb-8">Discover what’s happening, when, and why it matters. From casual meetups to hands-on workshops, our events are where DevOps ideas come to life—your voice included.</p>
                    <div className="flex items-center justify-center gap-4">
                        <Button size="lg" className="bg-primary hover:bg-[#023047] text-white" onClick={() => (window.location.hash = "#featured")}>View Featured Events</Button>
                        {/* <Button size="lg" variant="outline" className="text-white border-white" onClick={() => (window.location.hash = "#register")}>Register</Button> */}
                    </div>
                </div>
            </header>

            {/* Why Our Events Matter */}
            <section className="py-16 lg:py-24 bg-blue-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Our Events Matter</h2>
                            <ul className="space-y-6 max-w-xl">
                                {reasons.map(({ icon: Icon, title }, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 mt-1">
                                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white shadow text-primary">
                                                <Icon className="h-5 w-5" aria-hidden />
                                            </span>
                                        </span>
                                        <span className="text-base md:text-lg text-gray-800 dark:text-gray-200">{title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <UnpicImage src="https://ik.imagekit.io/nairobidevops/ndc-assets/PXL_20240601_141554232.jpg?updatedAt=1755152981738" alt="Event group photo" className="w-full h-80 md:h-96 object-cover" width={1200} height={800} loading="lazy" layout="constrained" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section id="featured" className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Events & Meetups</h2>
                        <h3 className="text-3xl md:text-4xl font-bold">Workshops, Talks & Real-World Collaboration</h3>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
                            Join us for hands-on sessions, tech talks, and community meetups designed to sharpen your skills and grow your DevOps journey.
                        </p>
                    </div>

                    {/* Upcoming Events from Luma */}
                    <div className="mb-16">
                        <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Upcoming Events</h3>
                        <UpcomingLumaEvents />
                    </div>

                    {/* Featured Events */}
                    <div className="text-center mb-6">
                        <h3 className="text-l md:text-2xl font-bold">Featured Upcoming Events</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredEvents.map((e) => (
                            <FeaturedEventCard key={e.id} e={e} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events Highlights */}
            <section className="py-16 lg:py-24 bg-[#d1e2f2] dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Past Events Highlights</h2>
                    </div>
                    <PastEventsGrid items={pastEvents} />
                </div>
            </section>

            {/* Events CTA */}
            <section
                className="min-h-screen flex items-center justify-center relative"
                style={{
                    backgroundImage: "url('https://pbs.twimg.com/media/GxreQk7XUAAMCLP?format=jpg&name=large')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Want Us to Visit Your Campus?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        We partner with student clubs, faculty, and tech communities to deliver tailored DevOps experiences. If you'd like to host a session or collaborate, reach out below.
                    </p>
                    <Link href="/partners-sponsorship">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-[#023047] text-white px-8 py-4 text-lg"
                        >
                            Partner with Us
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FAQ (Events & Programs) - Carousel showing 3 cards per slide */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground mt-2">Filtered to the "Events & Programs" category.</p>
                    </div>

                    {/* Carousel container */}
                    <FAQCarousel />
                </div>
            </section>

            <Footer />
        </div>
    );
}

// --- FAQ Carousel (Events & Programs) ---
function FAQCarousel() {
    const faqsForEvents = getFAQsByCategory("Events & Programs");
    const perSlide = 3;
    const slides: typeof faqsForEvents[] = [];
    for (let i = 0; i < faqsForEvents.length; i += perSlide) {
        slides.push(faqsForEvents.slice(i, i + perSlide));
    }

    const [slideIdx, setSlideIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const prev = useCallback(() => setSlideIdx((s) => (s - 1 + slides.length) % slides.length), [slides.length]);
    const next = useCallback(() => setSlideIdx((s) => (s + 1) % slides.length), [slides.length]);

    // Autoplay: advance every 5s when not paused
    useEffect(() => {
        // clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (!isPaused && slides.length > 1) {
            intervalRef.current = window.setInterval(() => {
                setSlideIdx((s) => (s + 1) % slides.length);
            }, 5000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPaused, slides.length]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    if (slides.length === 0) {
        return <p className="text-center text-muted-foreground">No FAQs available for this category.</p>;
    }

    return (
        <div
            className="relative"
            tabIndex={0}
            onKeyDown={handleKey}
            aria-roledescription="carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            {/* Slides */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {slides[slideIdx].map((f, idx) => (
                    <div key={`${slideIdx}-${idx}-${f.question}`} className="bg-[#d1e2f2] rounded-lg p-6">
                        <h3 className="font-semibold mb-3">{f.question}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{f.answer}</p>
                    </div>
                ))}
            </div>

            {/* Nav buttons (visible on md+) */}
            {/* <button aria-label="Previous FAQs" onClick={() => { prev(); setIsPaused(true); }} className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800 rounded-full p-2 shadow-md z-10 hidden md:block">
                <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            <button aria-label="Next FAQs" onClick={() => { next(); setIsPaused(true); }} className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800 rounded-full p-2 shadow-md z-10 hidden md:block">
                <ChevronRight className="h-6 w-6 text-primary" />
            </button> */}

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
                {slides.map((_, i) => (
                    <button
                        key={`dot-${i}`}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === slideIdx}
                        onClick={() => { setSlideIdx(i); setIsPaused(true); }}
                        className={`h-3 w-3 rounded-full ${i === slideIdx ? "bg-primary" : "bg-[#d1e2f2] dark:bg-slate-600"}`}
                    />
                ))}
            </div>
        </div>
    );
}