import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder images from Unsplash
const HERO_IMAGE = "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop";
const IMPACT_IMG_1 = "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop";
const IMPACT_IMG_2 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop";
const IMPACT_IMG_3 = "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop";
const BG_IMAGE = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop";

const supportOptions = [
    {
        title: "Make a one-time donation",
        description: "Contribute any amount to help fund workshops, mentorship, and community events.",
    },
    {
        title: "Become a monthly supporter",
        description: "Set up recurring contributions to sustain long-term growth and stability.",
    },
    {
        title: "Corporate partnership",
        description: "Collaborate with us to strengthen Kenya's tech ecosystem while showcasing your brand's commitment to innovation.",
    },
    {
        title: "Provide resources",
        description: "Offer venues, equipment, or learning materials to support our events and trainings.",
    },
    {
        title: "Sponsor a program",
        description: "Partner with us to fund specific initiatives like scholarships, hackathons, or open-source projects.",
    },
    {
        title: "Volunteer your expertise",
        description: "Mentor, speak, or lead sessions to inspire and guide the next generation of DevOps engineers.",
    },
];

const impactStats = [
    { number: "500+", label: "Developers trained" },
    { number: "120", label: "Mentorship pairing" },
    { number: "30+", label: "Community Events Hosted" },
    { number: "15", label: "Scholarships awarded" },
    { number: "10", label: "Open-source projects launched" },
    { number: "10", label: "Corporate partnerships" },
];

export default function DonationPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${HERO_IMAGE})` }}
                >
                    <div className="absolute inset-0 bg-nairobi-dark/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-poppins">
                        Support a Mission of <br className="hidden md:block" /> Growth and Opportunity
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
                        Your donation fuels workshops, mentorship, and open-source projects that uplift Kenya&apos;s
                        DevOps community. Together, we&apos;re building inclusive spaces where developers grow,
                        innovate, and inspire the next generation.
                    </p>
                </div>
            </section>

            {/* How to support Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground font-poppins">
                        How to support Nairobi Devops
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                        {supportOptions.map((option, index) => (
                            <div key={index} className="flex flex-col items-start gap-3 group cursor-pointer">
                                <div className="flex items-center gap-2 text-primary font-semibold text-lg group-hover:underline">
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    {option.title}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {option.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-20 bg-primary-light/30 dark:bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        {/* Impact - Images Grid */}
                        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="col-span-2 h-64 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={IMPACT_IMG_1}
                                    alt="Tech conference presentation"
                                    className="w-full h-full object-cover hover-scale"
                                />
                            </div>
                            <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={IMPACT_IMG_2}
                                    alt="Community collaboration"
                                    className="w-full h-full object-cover hover-scale"
                                />
                            </div>
                            <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={IMPACT_IMG_3}
                                    alt="Workshop session"
                                    className="w-full h-full object-cover hover-scale"
                                />
                            </div>
                        </div>

                        {/* Impact - Content */}
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-foreground">
                                    Our Impact in Numbers
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    Every contribution fuels measurable change. Here&apos;s how your support has shaped our community
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
                                {impactStats.map((stat, index) => (
                                    <div key={index} className="space-y-1">
                                        <p className="text-3xl font-bold text-primary font-poppins">{stat.number}</p>
                                        <p className="text-sm text-foreground/80 font-medium leading-tight">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Donation Form CTA Section */}
            <section className="py-24 bg-background relative overflow-hidden">
                {/* Background Image Effect for this section if needed, or just white/dark bg */}
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* Left Text */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground leading-tight">
                                Give What You Can. Change <br /> What You Can.
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Every contribution, big or small, fuels workshops, mentorship, and scholarships. Together, we transform Nairobi&apos;s DevOps community, empowering developers to grow, innovate, and inspire lasting change.
                            </p>
                        </div>

                        {/* Right Donation Card */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-[#023047] rounded-xl p-8 md:p-12 text-center text-white shadow-2xl max-w-md mx-auto lg:ml-auto">
                                <h3 className="text-xl md:text-2xl font-bold mb-8 text-[#219EBC] font-poppins">
                                    Your Donation Has The Power To Transform Lives.
                                </h3>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
                                        />
                                    </div>

                                    <button className="w-full bg-[#219EBC] hover:bg-[#219EBC]/90 text-white font-bold py-3 rounded-md transition-colors duration-200">
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom Hero / Inspiring Image Section */}
            <section className="w-full h-[400px] relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${BG_IMAGE})` }}
                >
                    <div className="absolute inset-0 bg-nairobi-dark/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-poppins text-blue-400">
                                What Your Gift Makes Possible
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                                Your donation funds workshops, mentorship, and events, empowering developers, breaking barriers, and sustaining Nairobi&apos;s DevOps community to innovate, grow, and inspire future tech leaders.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
