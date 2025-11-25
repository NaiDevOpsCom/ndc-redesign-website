import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { galleryImages } from "@/data/galleryData";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { allData } from "@/data/whatWeDoData";
import { partnersData } from "@/data/partnersData";

export default function CommunityPage() {
  // Mock data for events and projects
  const events = [
    {
      id: 1,
      title: "DevOps Fundamentals Training",
      date: "15 Jan 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Online",
      image: "/images/events/devops-fundamentals.jpg"
    },
    {
      id: 2,
      title: "CI/CD Workshop",
      date: "22 Jan 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Nairobi Tech Hub",
      image: "/images/events/cicd-workshop.jpg"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Automated Deployment Pipeline",
      description: "A CI/CD pipeline for automated testing and deployment",
      image: "/images/projects/pipeline.jpg"
    },
    {
      id: 2,
      title: "Infrastructure as Code",
      description: "Terraform templates for cloud infrastructure",
      image: "/images/projects/iac.jpg"
    },
    {
      id: 3,
      title: "Monitoring Dashboard",
      description: "Real-time monitoring for DevOps metrics",
      image: "/images/projects/monitoring.jpg"
    }
  ];

  // whatWeDoData is imported and used for this section (first 4 items)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section: responsive background image from gallery (randomized & preloaded) */}
      <HeroGallery />

      {/* What Defines Us Section */}
      <section className="py-16 bg-sky-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Defines Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allData.whatDefinesUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center p-6 hover:shadow-lg rounded-lg transition-shadow">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-md bg-white shadow text-primary mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Empowering Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="/images/community/empowering.jpg"
                alt="Empowering the Nairobi DevOps Community"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Empowering the Nairobi DevOps Community</h2>
              <p className="text-gray-600 mb-8">
                We are dedicated to fostering a strong DevOps culture in Nairobi by providing resources,
                networking opportunities, and hands-on learning experiences for professionals at all levels.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5+</div>
                  <div className="text-gray-600">Projects</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Building a vibrant community of DevOps practitioners",
                  "Live interactive sessions with industry experts",
                  "A hub of knowledge sharing and collaboration",
                  "Hands-on workshops and hackathons"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-600">✓</div>
                    <p className="ml-3 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <Button className="mt-8">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nairobi DevOps Community Section */}
      <section className="py-16 bg-[#023047] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nairobi DevOps Community Campus Tour</h2>
            <h3 className="text-l md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
              Bringing Real-World DevOps to Kenya’s Universities.
            </h3>
            <p className="text-xl max-w-4xl mx-auto">
              The Campus Tour is our nationwide outreach initiative designed to equip students with practical DevOps and cloud computing skills—right on their campuses. We partner with leading tech groups to deliver hands-on sessions, expert talks, and career guidance that bridge the gap between classroom theory and industry demands.
            </p>
          </div>

          {/* Row 1: Mission (left) + Target Audience (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
            <Card className="bg-sky-100 text-slate-900 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base">
                  Driving the future of DevOps in Kenya by delivering immersive, campus-based learning experiences that spark careers, build confidence, and connect students to industry.
                </p>
              </CardContent>
            </Card>

            <div>
              <h4 className="text-xl font-semibold mb-4">Target Audience</h4>
              <ul className="space-y-3 text-gray-100 list-none pl-0">
                <li>Students in tech fields</li>
                <li>Tech club members</li>
                <li>Final-year students</li>
                <li>Faculty and academic staff</li>
                <li>Beginner to intermediate learners</li>
              </ul>
            </div>
          </div>

          {/* Row 2: Why Invite Us (left) + How It Works (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <div>
              <h4 className="text-xl font-semibold mb-4">Why Invite Us</h4>
              <ul className="list-disc pl-5 space-y-3 text-gray-100">
                <li>Access to real-world DevOps and cloud experts</li>
                <li>Learn in-demand skills for internships and jobs</li>
                <li>Hands-on demos and guided activities</li>
                <li>Discover career paths in DevOps, SRE, and Cloud Engineering</li>
                <li>All sessions are free and tailored to your university's needs</li>
              </ul>
            </div>

            <Card className="bg-sky-100 text-slate-900 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-3">
                  We visit universities across Kenya, delivering interactive sessions on different areas. Each stop includes expert speakers, live demos, and networking opportunities with industry professionals.
                </p>
                <p className="text-sm text-slate-700">Sessions are tailored to the host university and can include workshops, talks, and hands-on labs.</p>
              </CardContent>
            </Card>
          </div>

          {/* Campus tour logos  */}

          <section className="relative mx-auto grid max-w-3xl py-10">
            {/* <h2 className="mb-6 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-2xl">
              Companies we{" "}
              <span className="font-semibold text-primary">collaborate</span> with.
            </h2> */}

            <LogoCloud />
          </section>

          {/* <div className="flex justify-center mt-8">
          <Button
            className="bg-primary text-white flex items-center justify-center hover:bg-[#023047] transition-colors duration-200"
            onClick={() => window.open('/partners-sponsorship', '_self')}
          >
            <Handshake className="h-5 w-5 text-white" />
              Partner with us
          </Button>
        </div> */}



          <div className="flex justify-center mt-8">
            <Button className="bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-200">
              Propose Your Campus
            </Button>
          </div>
        </div>
      </section>

      {/* DevOps Culture Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">DevOps Culture for High-Impact Teams</h2>

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Our community embraces the DevOps culture that breaks down silos between development and operations,
                fostering collaboration and continuous improvement.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What's in it for you:</h3>
                  <ul className="space-y-2 pl-5 list-disc">
                    <li>Hands-on experience with industry-standard tools</li>
                    <li>Networking with like-minded professionals</li>
                    <li>Mentorship from experienced practitioners</li>
                    <li>Access to exclusive workshops and events</li>
                    <li>Career growth opportunities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Delivery Process:</h3>
                  <ol className="space-y-3 pl-5 list-decimal">
                    <li>Join our community events and workshops</li>
                    <li>Participate in hands-on projects</li>
                    <li>Collaborate with team members</li>
                    <li>Deploy and monitor your solutions</li>
                    <li>Share your learnings with the community</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DevOps Journey Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">DevOps Journey</h2>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              {["Step 1: Join", "Step 2: Learn", "Step 3: Build", "Step 4: Share", "Step 5: Grow"].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-white font-bold mb-2",
                    i < 2 ? "bg-blue-600" : "bg-gray-300"
                  )}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-center">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Available Sessions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available Sessions</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
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
      </section>

      {/* Events & Meetups Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Events & Meetups</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our regular events, workshops, and meetups to learn, network, and grow with the community.
            </p>
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
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-200 mb-4">{event.description}</p>
                  <Link href={event.link}>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      View All
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore open-source projects created and maintained by our community members.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View Project</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Collaboration That Drives Innovation</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of passionate DevOps professionals and be part of the digital transformation journey.
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-100">
            Join Our Community
          </Button>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/community/cta-bg.jpg"
            alt="Join our community"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a growing network of DevOps professionals. Learn, share, and grow together.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Register Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- HeroGallery component ---
function HeroGallery() {
  // Build a selection pool where priority images are slightly more likely
  const pool = galleryImages.flatMap((img) => (img.priority ? [img, img] : [img]));

  const pickRandomIndex = () => Math.floor(Math.random() * pool.length);

  const [idx, setIdx] = useState<number>(() => pickRandomIndex());
  const [bgUrl, setBgUrl] = useState<string>(() => pool[idx]?.thumbnailUrl || pool[idx]?.url || "");
  const intervalRef = useRef<number | null>(null);

  // preload the full image for the current index then swap
  useEffect(() => {
    if (!pool[idx]) return;
    const full = pool[idx].url;
    const img = new Image();
    img.src = full;
    img.onload = () => setBgUrl(full);
    return () => {
      img.onload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // autoplay/random rotate every 30s
  useEffect(() => {
    const rotate = () => setIdx((i) => {
      let next = pickRandomIndex();
      // avoid same image twice in a row when possible
      if (pool.length > 1) {
        while (next === i) {
          next = pickRandomIndex();
        }
      }
      return next;
    });

    intervalRef.current = window.setInterval(rotate, 30000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pause on hover/focus
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setIdx((i) => {
          let next = pickRandomIndex();
          if (pool.length > 1) {
            while (next === i) next = pickRandomIndex();
          }
          return next;
        });
      }, 30000);
    }
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

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
          {/* <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building DevOps Future, Together
          </h1> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building DevOps Future, <span className="text-primary">Together</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join a vibrant community of developers, designers, engineers, and innovators shaping the future of technology through collaboration, learning, and impact.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Join Our Community
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              Learn More
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}