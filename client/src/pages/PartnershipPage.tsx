import React, { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { partnersData } from "@/data/partnersData";
import {
    Handshake,
    Target,
    Rocket,
    Award,
    Users,
    TrendingUp,
    GraduationCap,
    CheckCircle2,
    Building2,
    Lightbulb,
    Globe,
    Mail,
    User,
    MessageSquare
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Hero Section Component
function HeroSection() {
    return (
        <section
            className="relative min-h-[60vh] flex items-center justify-center text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(2, 48, 71, 0.85), rgba(2, 48, 71, 0.85)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center py-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Together, We Build <span className="text-primary">Better</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    Partner with us to empower the next generation of DevOps professionals and shape Kenya&apos;s tech future
                </p>
            </div>
        </section>
    );
}

// Partners Grid Section
function PartnersGridSection() {
    const allPartners = [...partnersData.communityPartners];

    return (
        <section className="py-16 md:py-20 bg-ndc-darkblue dark:bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-foreground mb-4">
                        Our Partners
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                    {allPartners.map((partner) => (
                        <a
                            key={partner.id}
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white dark:bg-card rounded-xl p-6 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <img
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                className="h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Partnership Models Section
function PartnershipModelsSection() {
    const models = [
        {
            icon: Handshake,
            title: "Community Partnership",
            description: "Join our mission to grow Kenya's DevOps ecosystem",
            benefits: [
                "Co-host meetups and workshops",
                "Share knowledge and resources",
                "Access to our growing network",
                "Community recognition"
            ],
            color: "bg-blue-500"
        },
        {
            icon: Target,
            title: "Strategic Partner",
            description: "Deep collaboration on long-term initiatives",
            benefits: [
                "Joint program development",
                "Exclusive branding opportunities",
                "Strategic advisory input",
                "Priority event sponsorship"
            ],
            color: "bg-purple-500"
        },
        {
            icon: Rocket,
            title: "Technology Partner",
            description: "Provide tools and platforms for learning",
            benefits: [
                "Product showcases and demos",
                "Early adopter community",
                "Direct feedback channel",
                "Co-marketing opportunities"
            ],
            color: "bg-green-500"
        },
        {
            icon: Award,
            title: "Event Sponsor",
            description: "Support our events and reach engaged audiences",
            benefits: [
                "Brand visibility at events",
                "Speaking opportunities",
                "Recruitment access",
                "Digital presence"
            ],
            color: "bg-orange-500"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-background dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Partnership Models
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose Your Path to Impact
                    </p>
                    <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {models.map((model, index) => {
                        const Icon = model.icon;
                        return (
                            <Card
                                key={index}
                                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
                            >
                                <CardHeader>
                                    <div className="flex items-start gap-4">
                                        <div className={`${model.color} p-3 rounded-lg text-white`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-xl mb-2">{model.title}</CardTitle>
                                            <CardDescription className="text-base">
                                                {model.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {model.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Statistics/Impact Section
function ImpactStatsSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const stats = [
        { icon: Building2, value: 15, suffix: "+", label: "Active Partners" },
        { icon: Users, value: 3000, suffix: "+", label: "Community Members" },
        { icon: TrendingUp, value: 50, suffix: "+", label: "Events Supported" },
        { icon: GraduationCap, value: 1500, suffix: "+", label: "Students Reached" }
    ];

    return (
        <section ref={ref} className="py-16 md:py-20 bg-ndc-darkblue dark:bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-foreground mb-4">
                        Domain & Engagement
                    </h2>
                    <p className="text-lg text-gray-200 dark:text-muted-foreground max-w-2xl mx-auto">
                        Our partnerships create meaningful impact across Kenya&apos;s tech ecosystem
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="text-center bg-white/10 dark:bg-card/50 backdrop-blur border-white/20 dark:border-border">
                                <CardContent className="pt-8 pb-6">
                                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <div className="text-4xl md:text-5xl font-bold text-white dark:text-foreground mb-2">
                                        {inView && (
                                            <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                                        )}
                                    </div>
                                    <p className="text-gray-200 dark:text-muted-foreground font-medium">
                                        {stat.label}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Success Stories Section
function SuccessStoriesSection() {
    const stories = [
        {
            partner: "DEIMOS",
            logo: "https://res.cloudinary.com/nairobidevops/image/upload/v1753531298/12_rxpcu2.svg",
            quote: "Through our partnership, we've successfully onboarded top DevOps talent and contributed to shaping Kenya's cloud infrastructure landscape.",
            impact: "20+ students placed in DevOps roles"
        },
        {
            partner: "Moringa School",
            logo: "https://res.cloudinary.com/nairobidevops/image/upload/v1754735307/moringa_jnpf1j.svg",
            quote: "Collaborating with Nairobi DevOps Community has enhanced our curriculum with real-world DevOps practices.",
            impact: "500+ students trained in DevOps fundamentals"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-background dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Success Stories That Inspire Collaboration
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {stories.map((story, index) => (
                        <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={story.logo}
                                        alt={`${story.partner} logo`}
                                        className="h-12 w-auto object-contain"
                                    />
                                </div>
                                <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                                    &ldquo;{story.quote}&rdquo;
                                </blockquote>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-primary font-semibold">
                                    <Lightbulb className="h-5 w-5" />
                                    <span>{story.impact}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            quote: "The Nairobi DevOps Community has been instrumental in helping us connect with passionate tech talent. Their events are always well-organized and impactful.",
            author: "Tech Lead",
            organization: "Leading Cloud Provider",
            role: "Strategic Partner"
        },
        {
            quote: "Supporting this community has given us direct access to emerging DevOps professionals. It's a win-win partnership that drives real innovation.",
            author: "HR Director",
            organization: "Enterprise Software Company",
            role: "Recruitment Partner"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-ndc-darkblue dark:bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-foreground mb-4">
                        What Our Partners Say
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-white/95 dark:bg-card">
                            <CardContent className="pt-6">
                                <div className="mb-6">
                                    <svg className="h-10 w-10 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                    </svg>
                                </div>
                                <p className="text-lg text-foreground mb-6 leading-relaxed italic">
                                    {testimonial.quote}
                                </p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.organization}</p>
                                    <p className="text-sm text-primary mt-1">{testimonial.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// CTA Section with Contact Form
function CTASection() {
    const [formData, setFormData] = useState({
        organization: "",
        name: "",
        email: "",
        interest: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Create mailto link with form data
        const subject = `Partnership Inquiry - ${formData.organization}`;
        const body = `
Organization: ${formData.organization}
Contact Person: ${formData.name}
Email: ${formData.email}
Partnership Interest: ${formData.interest}

Message:
${formData.message}
    `.trim();

        window.location.href = `mailto:hello@nairobidevops.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-16 md:py-20 bg-background dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Become a Partner
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Let&apos;s collaborate to empower the next generation of DevOps professionals
                    </p>
                    <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <Card className="border-2">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="organization" className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-primary" />
                                        Organization Name *
                                    </Label>
                                    <Input
                                        id="organization"
                                        name="organization"
                                        required
                                        value={formData.organization}
                                        onChange={handleChange}
                                        placeholder="Your organization"
                                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-primary" />
                                        Contact Person *
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-primary" />
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="interest" className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-primary" />
                                        Partnership Interest *
                                    </Label>
                                    <Input
                                        id="interest"
                                        name="interest"
                                        required
                                        value={formData.interest}
                                        onChange={handleChange}
                                        placeholder="e.g., Event Sponsorship"
                                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                    Message *
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your partnership goals..."
                                    rows={5}
                                    className="resize-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    Submit Partnership Inquiry
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    asChild
                                    className="px-8 py-6 text-lg"
                                >
                                    <Link href="/community">
                                        <Users className="mr-2 h-5 w-5" />
                                        Join the Community
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

// Main Partnership Page Component
export default function PartnershipPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <HeroSection />
            <PartnersGridSection />
            <PartnershipModelsSection />
            <ImpactStatsSection />
            <SuccessStoriesSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
        </div>
    );
}
