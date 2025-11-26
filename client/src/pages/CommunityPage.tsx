import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "wouter"; // Keeping Link for potential future use or if it's used within extracted components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { galleryImages } from "@/data/galleryData";
// Import without extension to avoid potential resolver issues in some environments
import { LogoCloud } from "@/components/ui/ndcCampusLogos";
import { ClipboardList, FlaskConical, Users, Wrench, Check, Handshake } from "lucide-react";
import { allData } from "@/data/whatWeDoData";
import { events, projects, CommunityEvent, CommunityProject } from "@/data/communityPageData"; // Import centralized data

// --- Component for "What We Offer" items ---
interface OfferItemProps {
  title: string;
  iconBg?: string;
  variant?: "labs" | "coaching" | "tools";
}

const OfferItem: React.FC<OfferItemProps> = ({ title, iconBg = "bg-white", variant }) => {
  const baseIconClass = "h-6 w-6 text-primary";
  let IconEl: React.ReactNode = <ClipboardList className={baseIconClass} aria-hidden />;
  if (variant === "labs") IconEl = <FlaskConical className={baseIconClass} aria-hidden />;
  if (variant === "coaching") IconEl = <Users className={baseIconClass} aria-hidden />;
  if (variant === "tools") IconEl = <Wrench className={baseIconClass} aria-hidden />;

  return (
    <li className="flex items-center gap-4">
      <span className={`inline-flex items-center justify-center h-12 w-12 rounded-lg shadow ${iconBg}`}>
        {IconEl}
      </span>
      <span className="text-lg font-medium text-slate-800">{title}</span>
    </li>
  );
};

// --- Component for "Delivery Formats" items ---
interface DeliveryItemProps {
  index: number;
  text: string;
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ index, text }) => (
  <li className="flex items-center gap-4">
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
      {String(index).padStart(2, "0")}
    </span>
    <span className="text-base md:text-lg text-slate-800">{text}</span>
  </li>
);

// --- Hero Gallery Component ---
function HeroGallery() {
  // Build a selection pool where priority images are slightly more likely
  const pool = galleryImages.flatMap((img) => (img.priority ? [img, img] : [img]));

  const pickRandomIndex = () => Math.floor(Math.random() * pool.length);

  const [idx, setIdx] = useState<number>(() => pickRandomIndex());
  const [bgUrl, setBgUrl] = useState<string>(() => pool[idx]?.thumbnailUrl || pool[idx]?.url || "");
  const intervalRef = useRef<number | null>(null);

  // Preload the full image for the current index then swap
  useEffect(() => {
    if (!pool[idx]) return;
    const full = pool[idx].url;
    type ImageCtor = new () => HTMLImageElement;
    const ImgCtor = (globalThis as unknown as { Image?: ImageCtor }).Image;
    if (!ImgCtor) return;
    const img = new ImgCtor();
    img.src = full;
    img.onload = () => setBgUrl(full);
    return () => {
      img.onload = null;
    };
  }, [idx, pool]); // Added pool to dependency array

  // Autoplay/random rotate every 30s
  useEffect(() => {
    const rotate = () => setIdx((currentIdx) => {
      let next = pickRandomIndex();
      // Avoid same image twice in a row when possible
      if (pool.length > 1) {
        while (next === currentIdx) {
          next = pickRandomIndex();
        }
      }
      return next;
    });

    intervalRef.current = globalThis.setInterval(rotate, 30000) as unknown as number;
    return () => {
      if (intervalRef.current) {
        globalThis.clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
      }
    };
  }, []); // Added pool to dependency array

  // Pause on hover/focus
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) {
        globalThis.clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
      }
    } else if (!intervalRef.current) {
      intervalRef.current = globalThis.setInterval(() => {
        setIdx((currentIdx) => {
          let next = pickRandomIndex();
          if (pool.length > 1) {
            while (next === currentIdx) next = pickRandomIndex();
          }
          return next;
        });
      }, 30000) as unknown as number;
    }
    return () => { };
  }, [paused, pool]); // Added pool to dependency array

  const currentAlt = pool[idx]?.alt || "Community image";

  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.45), rgba(2,6,23,0.45)), url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={currentAlt}
    >
      <div className="min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building DevOps Future, <span className="text-primary">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join a vibrant community of developers, designers, engineers, and innovators shaping the future of technology through collaboration, learning, and impact.
          </p>
        </div>
      </div>
    </section>
  );
}

// --- What Defines Us Section Component ---
const WhatDefinesUsSection: React.FC = () => (
  <section className="py-16 md:py-20 lg:py-24 bg-sky-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Defines Us</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {allData.whatDefinesUs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className="group bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-lg bg-white shadow-md group-hover:shadow-lg group-hover:bg-primary/5 transition-all duration-300 mb-6">
                <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// --- Empowering Community Section Component ---
const EmpoweringCommunitySection: React.FC = () => (
  <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white dark:bg-slate-950" aria-labelledby="empowering-heading">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left: Image + Title, Copy, Stats + CTA */}
        <div className="space-y-6 sm:space-y-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group">
            <img
              src="https://res.cloudinary.com/nairobidevops/image/upload/v1754543466/Maamun_Profile_Photo000_-_Maamun_Bwanakombo_npfvyl.png"
              alt="Smiling community leader standing in front of tiled wall"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="space-y-4">
            <h2 
              id="empowering-heading" 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
              Empowering the Nairobi DevOps Community
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Maamun Bwanakombo&apos;s vision and leadership continue to shape a thriving, inclusive tech ecosystem
              across Kenya and beyond.
            </p>
          </div>
          
          {/* Stats */}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6" aria-label="Community impact statistics">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <dt className="sr-only">Members reached</dt>
              <dd className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 dark:text-sky-400">3000+</dd>
              <dd className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">members reached</dd>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <dt className="sr-only">Workshops hosted</dt>
              <dd className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 dark:text-sky-400">50+</dd>
              <dd className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">workshops hosted</dd>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <dt className="sr-only">Campuses engaged</dt>
              <dd className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 dark:text-sky-400">10+</dd>
              <dd className="text-xs sm:text-sm mt-1 text-slate-600 dark:text-slate-400">campuses engaged</dd>
            </div>
          </dl>
          
          <div className="pt-2">

            <Button size="lg" className="flex items-center text-lg px-8 py-4 hover:bg-[#023047] transition-colors duration-200">
              <Users className="mr-2 h-5 w-5" />
              Join Our Community
            </Button>
          </div>
        </div>

        {/* Right: Content blocks + Quote */}
        <div className="space-y-6 sm:space-y-8 lg:pt-4">
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                title: "Championing DevOps Excellence",
                content: "Maamun has led workshops, curated technical content, and introduced best practices in automation, CI/CD, and infrastructure as code. His expertise in Terraform, Jenkins, and Docker has empowered hundreds of engineers."
              },
              {
                title: "Building Inclusive Spaces",
                content: "Through mentorship and outreach, Maamun has grown the community to over 3,000 members, ensuring representation from students, startups, and professionals."
              },
              {
                title: "Leading Conversations",
                content: "As a lead organizer of DevOpsDays Nairobi, Maamun has created platforms for dialogue and innovation through meetups, Twitter Spaces, and panels."
              },
              {
                title: "A Legacy of Impact",
                content: "Maamun's work fosters a culture of empathy, shared success, and continuous improvement—where DevOps is more than a methodology, it's a mindset."
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-4">
                  
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quote card */}
          <figure className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-slate-100 p-6 sm:p-8 shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <blockquote className="text-lg sm:text-xl leading-relaxed">
              &ldquo;DevOps is about people first. Tools come second.&ldquo;
            </blockquote>
            <figcaption className="mt-4 text-slate-300 font-medium">— Maamun Bwanakombo</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
);

// --- Campus Tour Section Component ---
const CampusTourSection: React.FC = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-ndc-darkblue text-white relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]" />
    </div>
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="inline-block mb-3 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90">
          Campus Initiative
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Nairobi DevOps Community Campus Tour
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-6 leading-tight">
          Bringing Real-World DevOps to Kenya&apos;s Universities.
        </h3>
        <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto">
          Our nationwide outreach initiative equips students with practical DevOps and cloud computing skills—right on their campuses. We partner with leading tech groups to deliver hands-on sessions, expert talks, and career guidance that bridge the gap between classroom theory and industry demands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* Mission Card */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="h-1.5 w-12 bg-sky-400 rounded-full mb-4"></div>
            <CardTitle className="text-2xl md:text-3xl text-white">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-white/90 leading-relaxed">
              Driving the future of DevOps in Kenya by delivering immersive, campus-based learning experiences that spark careers, build confidence, and connect students to industry.
            </p>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10">
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            <span>Target Audience</span>
          </h4>
          <ul className="space-y-3 sm:space-y-4">
            {['Students in tech fields', 'Tech club members', 'Final-year students', 'Faculty and academic staff', 'Beginner to intermediate learners'].map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-sky-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Invite Us */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-sky-500/10 to-blue-600/10 p-6 sm:p-8 rounded-2xl border border-white/10">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">Why Invite Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                "Access to real-world DevOps and cloud experts",
                "Learn in-demand skills for internships and jobs",
                "Hands-on demos and guided activities",
                "Discover career paths in DevOps, SRE, and Cloud Engineering"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-sky-500/20 p-1.5 rounded-full mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-sky-400" />
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10">
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🔄</span>
            <span>How It Works</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-white/90 leading-relaxed mb-4">
                We visit universities across Kenya, delivering interactive sessions on different areas. Each stop includes expert speakers, live demos, and networking opportunities with industry professionals.
              </p>
              <p className="text-white/80">
                Sessions are tailored to the host university and can include workshops, talks, and hands-on labs.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h5 className="font-semibold text-white mb-3">What to Expect:</h5>
              <ul className="space-y-2">
                {[
                  "Interactive workshops",
                  "Expert-led sessions",
                  "Networking opportunities",
                  "Hands-on labs",
                  "Career guidance"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-2"></div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Campus tour logos */}
      <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
        {/* <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10"> */}
          <div className="py-4">
            <LogoCloud />
          </div>
        {/* </div> */}
      </div>

      <div className="mt-12 text-center">
        <Button 
          size="lg"
          className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-6 px-8 text-base md:text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          Propose Your Campus
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </div>
  </section>
);

// --- DevOps Culture Section Component ---
const DevOpsCultureSection: React.FC = () => (
  <section className="py-20 bg-sky-100">
    <div className="container mx-auto px-4">
      {/* Heading + Subheading */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          DevOps Culture for High-Impact Teams
        </h2>
        <p className="mt-4 text-xl md:text-2xl font-semibold text-slate-800">
          Empowering Teams to Build, Ship, and Scale with Confidence
        </p>
        <p className="mt-8 text-base md:text-lg text-slate-700">
          At Nairobi DevOps Community, we believe that DevOps is more than just tools—it&apos;s a culture of
          collaboration, automation, and continuous improvement. Our corporate training programs are designed to
          help organizations transform their development and operations workflows, foster innovation, and
          accelerate delivery.
        </p>
      </div>

      {/* Content */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
        {/* Left: What We Offer */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900">What We Offer</h3>
          <ul className="mt-8 space-y-8">
            <OfferItem iconBg="bg-white" title="Customized Workshops" />
            <OfferItem iconBg="bg-white" title="Hands-On Labs" variant="labs" />
            <OfferItem iconBg="bg-white" title="DevOps Culture Coaching" variant="coaching" />
            <OfferItem iconBg="bg-white" title="Toolchain Mastery" variant="tools" />
          </ul>
        </div>

        {/* Right: Delivery Formats card */}
        <div className="bg-white/80 backdrop-blur rounded-xl shadow-md p-8 border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">Delivery Formats</h3>
          <ul className="mt-8 space-y-6">
            <DeliveryItem index={1} text="On-site or virtual sessions" />
            <DeliveryItem index={2} text="Half-day, full-day, or multi-week format" />
            <DeliveryItem index={3} text="Certification prep and post-training support" />
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// --- DevOps Courses Section Component ---
const DevOpsCoursesSection: React.FC = () => (
  <section className="py-16 bg-white dark:bg-neutral-900">
    <div className="container mx-auto px-4">
      {/* Section intro */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Devops Courses
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          Whether you’re just starting out or scaling your DevOps expertise, our curated courses—delivered in partnership
          with leading trainers—equip you with the skills to thrive in today’s tech landscape.
        </p>
      </div>

      {/* Upskill subheading */}
      <div className="mt-12 max-w-2xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white">
          Ready to Upskill?
        </h3>
        <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-300">
          Our registration process is quick and simple. Follow the steps below to enroll in your preferred course.
        </p>
        <p className="mt-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
          You’ll be done in just a few minutes — no guesswork, no confusion.
        </p>
      </div>

      {/* Stepper */}
      <div className="relative mt-10 md:mt-12 max-w-4xl mx-auto">
        {/* Track */}
        <div className="absolute top-1/2 left-4 right-4 h-[6px] -translate-y-1/2 rounded-full bg-neutral-200 dark:bg-neutral-700" aria-hidden />
        {/* Progress (4 of 5) */}
        <div className="absolute top-1/2 left-4 right-[20%] h-[6px] -translate-y-1/2 rounded-full bg-blue-600" aria-hidden />

        <ol className="relative z-10 grid grid-cols-5 gap-2">
          {[
            { label: "Explore\nCourses" },
            { label: "Select\nCourses" },
            { label: "Fill in your\ndetails" },
            { label: "Confirm\nRegistration" },
            { label: "Done" }
          ].map((s, i) => {
            const completed = i < 4;
            const isLast = i === 4;
            return (
              <li key={i} className="flex flex-col items-center text-center px-2">
                <div
                  className={cn(
                    "mb-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
                    completed
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-600 dark:bg-neutral-900"
                  )}
                  aria-current={completed && !isLast ? "step" : undefined}
                >
                  {isLast ? <Check className="h-5 w-5" aria-hidden /> : i + 1}
                </div>
                <span className="whitespace-pre-line text-xs md:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Available Courses */}
      <div className="container mx-auto px-4 mt-6">
        <h2 className="text-3xl font-bold text-center mb-12">Available Sessions</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event: CommunityEvent) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <div className="space-y-2 mt-2">
                  <p className="text-sm text-gray-600">📅 {event.date} • 🕒 {event.time}</p>
                  <p className="text-sm text-gray-600">📍 {event.location}</p>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- Events & Meetups Section Component ---
const EventsMeetupsSection: React.FC = () => (
  <section className="py-16 bg-ndc-darkblue">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-primary font-bold mb-4">Events & Meetups</h2>
        <p className="mt-4 text-xl md:text-2xl font-semibold text-white mb-6 leading-tight">
          Workshops, Talks & Real-World Collaboration
        </p>
        <p className="text-white max-w-2xl mx-auto">
          Join us for hands-on sessions, tech talks, and community meetups designed to sharpen your skills and grow your DevOps journey.
        </p>
          <h3 className="text-3xl text-primary font-bold mb-4 mt-6">
              Featured Events
          </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          {
            title: "Professional Events",
            description: "Conferences, workshops, and training sessions with industry experts",
            image: "/images/events/professional.jpg",
            link: "/events?type=professional"
          },
          {
            title: "Community Meetups",
            description: "Casual gatherings for networking and knowledge sharing",
            image: "/images/events/meetup.jpg",
            link: "/events?type=meetup"
          }
        ].map((event, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden group">
            <div className="h-64 bg-gray-200">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
              <p className="text-gray-200 mb-4">{event.description}</p>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href={event.link} aria-label={`View all ${event.title.toLowerCase()}`}>View All</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Community Projects Section Component ---
const CommunityProjectsSection: React.FC = () => (
  <section 
    className="py-12 sm:py-16 lg:py-20 bg-gray-50" 
    aria-labelledby="community-projects-heading"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-4">
        <h2 
          id="community-projects-heading" 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
        >
          Community Projects
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight mb-3">
          Building Together, One Project at a Time
        </p>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600">
          We collaborate on tools, platforms, and experiments that solve real-world problems. 
          Whether you&apos;re a designer, developer, or strategist—there&apos;s a place for you here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project: CommunityProject) => (
          <article 
            key={project.id}
            className="group h-full flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
            tabIndex={0}
          >
            <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} project screenshot`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width={400}
                height={225}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <CardHeader className="flex-1 p-5 sm:p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                  {project.title}
                </CardTitle>
                {(() => {
                  // Safely compute an ISO date string if the provided date is parseable.
                  // This prevents runtime errors from invalid Date parsing (e.g., "Oct 2024").
                  const d = new Date(project.date);
                  const iso = isNaN(d.getTime()) ? undefined : d.toISOString().split("T")[0];
                  return (
                    <time
                      dateTime={iso}
                      className="text-sm font-medium text-slate-500 whitespace-nowrap flex-shrink-0 sm:mt-0.5"
                    >
                      {project.date}
                    </time>
                  );
                })()}
              </div>
              
              <CardDescription className="text-sm sm:text-base text-slate-600 line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardFooter className="p-5 sm:p-6 pt-0">
              <Button 
                variant="outline" 
                className="w-full group/button transition-all duration-200 hover:bg-blue-50 hover:border-blue-200"
                aria-label={`View details for ${project.title} project`}
              >
                <span className="relative">
                  View Project
                  <span 
                    className="absolute -right-5 opacity-0 group-hover/button:opacity-100 group-hover/button:translate-x-1.5 transition-all duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Button>
            </CardFooter>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// --- Collaboration CTA Section Component ---
const CollaborationCTASection: React.FC = () => {
  // Random CTA background image from galleryData
  const ctaBgUrl = useMemo(() => {
    if (!galleryImages?.length) return "";
    const pool = galleryImages.flatMap((img) => (img.priority ? [img, img] : [img]));
    const idx = Math.floor(Math.random() * pool.length);
    // Prefer full-size for CTA; fallback to thumbnail
    return pool[idx]?.url || pool[idx]?.thumbnailUrl || "";
  }, []);

  return (
    <section
      className="relative py-20 text-white"
      style={{
        backgroundImage: ctaBgUrl
          ? `url("${ctaBgUrl}")`
          : undefined,
        backgroundSize: ctaBgUrl ? "cover" : undefined,
        backgroundPosition: ctaBgUrl ? "center" : undefined,
        backgroundRepeat: ctaBgUrl ? "no-repeat" : undefined,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Collaboration That Drives Innovation
        </h2>
        <p className="text-xl mb-8 max-w-6xl mx-auto">
          The Nairobi DevOps Community thrives through strategic partnerships with forward-thinking organizations. Together, we co-create impactful experiences, tools, and learning opportunities that empower developers, designers, engineers, and students across Kenya. Whether you&apos;re a tech startup, open-source collective, or corporate leader, we welcome collaborations that foster growth, inclusivity, and innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          <Button size="lg" className="flex items-center text-lg px-8 py-4 hover:bg-[#023047] transition-colors duration-200">
            <Handshake className="mr-2 h-5 w-5" aria-hidden />
            Partner with Us
          </Button>
          <Button variant="outline" size="lg" className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black" >
            <Users className="mr-2 h-5 w-5" aria-hidden />
            Join the community
          </Button>
        </div>

      </div>
    </section>
  );
};

// --- Main Community Page Component ---
export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroGallery />
      <WhatDefinesUsSection />
      <EmpoweringCommunitySection />
      <CampusTourSection />
      <DevOpsCultureSection />
      <DevOpsCoursesSection />
      <EventsMeetupsSection />
      <CommunityProjectsSection />
      <CollaborationCTASection />
      <Footer />
    </div>
  );
}
