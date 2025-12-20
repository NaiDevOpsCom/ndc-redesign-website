import { Globe, Linkedin, X, Instagram, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Image as UnpicImage } from "@unpic/react";
import {
  teamData,
  statisticsData
} from "@/data/ndcData";
import StatisticCounter from "@/components/ui/StatisticCounter";
import { communityGallery } from "@/data/galleryData";


// Objectives data
const objectivesData = [
  {
    number: "01",
    title: "Knowledge Sharing",
    description: "Facilitate the exchange of DevOps knowledge and best practices through workshops, meetups, and online platforms."
  },
  {
    number: "02",
    title: "Skill Development",
    description: "Provide hands-on training and mentorship to help community members advance their DevOps careers."
  },
  {
    number: "03",
    title: "Industry Collaboration",
    description: "Build partnerships with tech companies and organizations to create opportunities for our community members."
  },
  {
    number: "04",
    title: "Innovation Hub",
    description: "Create a space for innovation and experimentation with cutting-edge DevOps tools and methodologies."
  },
  {
    number: "05",
    title: "Community Outreach and Engagement",
    description: "Expand outreach by connecting with underrepresented groups via workshops and partnerships with local schools and organizations.",
  }
];



export default function AboutUs() {
  const randomImage = useMemo(() => communityGallery[Math.floor(Math.random() * communityGallery.length)], []);
  const [featuredId, setFeaturedId] = useState<string | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!teamData || teamData.length === 0) return;
    const idx = Math.floor(Math.random() * teamData.length);
    setFeaturedId(teamData[idx].id);
  }, []);

  const featured = useMemo(() => {
    if (!featuredId) return null;
    const m = teamData.find((t) => t.id === featuredId);
    if (!m) return null;
    return {
      id: m.id,
      name: m.name,
      role: m.title,
      bio: m.bio || "",
      image: m.image,
      socials: m.socials || {},
    };
  }, [featuredId]);

  const teamMembers = teamData;

  const showNextFeatured = () => {
    if (!teamMembers || teamMembers.length === 0) return;
    const idx = teamMembers.findIndex((m) => m.id === featuredId);
    const nextIdx = idx === -1 ? 0 : (idx + 1) % teamMembers.length;
    setFeaturedId(teamMembers[nextIdx].id);
  };

  const showPrevFeatured = () => {
    if (!teamMembers || teamMembers.length === 0) return;
    const idx = teamMembers.findIndex((m) => m.id === featuredId);
    const prevIdx = idx === -1 ? 0 : (idx - 1 + teamMembers.length) % teamMembers.length;
    setFeaturedId(teamMembers[prevIdx].id);
  };

  const handleMemberKeyDown = (e: React.KeyboardEvent, id: string) => {
    // Per WCAG, buttons should respond to Enter and Space
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar" || e.code === "Space") {
      e.preventDefault();
      setFeaturedId(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center py-20"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/nairobidevops/ndcAssets/DSC_6977%20copy.jpg?updatedAt=1764488001247')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Nairobi DevOps Community is more than a space to learn, grow, and belong.
          </p>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-20 bg-[#E6E6E6] dark:bg-[#898E99]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Purpose
            </h2>
            <h3 className="figma-heading">
              Mission, Vision & Real Stories in Action
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To create a supportive and inclusive community that empowers individuals and organizations to embrace DevOps practices, fostering innovation and excellence in software delivery across Nairobi and beyond.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To be the leading DevOps community in East Africa, recognized for our commitment to knowledge sharing, skill development, and industry collaboration that drives digital transformation across the region.
                </p>
              </div>
              <Button className="bg-primary hover:bg-[#023047] text-white " onClick={() => navigate('/join')}>
                See Us In Action
              </Button>
            </div>


            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Inside Nairobi DevOps</h3>
              <p>
                Discover what fuels our community—from shared learning to lasting impact.
              </p>


              <div className="relative">
                <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/TLbR9oIszas"
                    title="About Nairobi DevOps"
                    className="w-full h-full rounded-2xl"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white">
            Our Story
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
            {/* Images on the left */}
            <div className="relative flex justify-center items-center h-64 w-full lg:h-80 lg:w-full">
              {/* Background image */}
              <UnpicImage
                src="https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_9864.jpg?updatedAt=1764488001283"
                alt="Africa DevOps Summit"
                className="rounded-lg shadow-lg absolute top-0 left-0 w-4/5 h-4/5 lg:w-[85%] lg:h-[85%] object-cover transition-transform duration-300 hover:scale-105 hover:rotate-1"
                width={300}
                height={300}
                loading="lazy"
                layout="constrained"
              />
              {/* Floating image */}
              <UnpicImage
                src="https://ik.imagekit.io/nairobidevops/ndcAssets/DSC_6977%20copy.jpg?updatedAt=1764488001247"
                alt="Nairobi DevOps Community"
                className="rounded-lg shadow-2xl absolute right-0 bottom-0 w-3/5 h-3/5 lg:w-[65%] lg:h-[65%] object-cover border-4 border-white dark:border-gray-900 transition-transform duration-300 hover:scale-110 hover:-rotate-2 hover:shadow-primary"
                width={300}
                height={300}
                loading="lazy"
                layout="constrained"
              />
            </div>
            {/* Paragraph on the right */}
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded in 2023, the Nairobi DevOps Community emerged from a simple observation: the need for a dedicated space where DevOps professionals, enthusiasts, and learners could connect, share knowledge, and grow together. What started as a small group of passionate individuals has evolved into a thriving community of over 4,000 members.
                <br />
                <br />
                Our journey has been marked by countless meetups, workshops, and collaborative projects that have not only advanced individual careers but also contributed to the broader tech ecosystem in Nairobi and East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-ndc-darkblue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {statisticsData.map((stat) => (
              <div key={stat.id} className="space-y-2 text-white">
                <StatisticCounter className="text-white text-4xl md:text-5xl font-bold" endValue={stat.number} />
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background dark:bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A diverse community of DevOps professionals, enthusiasts, and learners committed to
              advancing the practice of DevOps in Nairobi and beyond.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[300px] lg:min-h-[400px] flex-1">
              {/* Left column - two stacked images */}
              <div className="grid grid-rows-2 gap-4 h-full">
                {/* Top image */}
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex-1">
                  <UnpicImage
                    src="https://ik.imagekit.io/nairobidevops/ndcAssets/DSC_6977%20copy.jpg?updatedAt=1764488001247"
                    alt="Nairobi DevOps Community"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                    loading="lazy"
                    layout="constrained"
                  />
                </div>
                {/* Bottom image */}
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex-1">
                  <UnpicImage
                    src="https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_9872.jpg?updatedAt=1764488001358"
                    alt="Africa DevOps Summit"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                    loading="lazy"
                    layout="constrained"
                  />
                </div>
              </div>
              {/* Right column - one larger image */}
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                <UnpicImage
                  src="https://ik.imagekit.io/nairobidevops/ndcAssets/GxreT67XgAECapE.jpeg"
                  alt="Nairobi DevOps Community"
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                  loading="lazy"
                  layout="constrained"
                />
              </div>

              {/* Bottom spanning image */}
              <div className="col-span-1 lg:col-span-2">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-48 lg:h-64">
                  <UnpicImage
                    src="https://ik.imagekit.io/nairobidevops/ndcAssets/PXL_20240601_141647444.jpg?updatedAt=1764488001435"
                    alt="Nairobi DevOps Community Event"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                    loading="lazy"
                    layout="constrained"
                  />
                </div>
              </div>
            </div>


            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Drives Us</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our community is driven by a shared passion for DevOps practices and a commitment to continuous learning. We believe in the power of collaboration, knowledge sharing, and hands-on experience to transform how organizations deliver software.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Objectives</h3>
                <div className="space-y-4">
                  {objectivesData.map((objective) => (
                    <div key={objective.number} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {objective.number}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {objective.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {objective.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>


      {/* Our Team Section */}

      <section className="py-16 md:py-24 bg-primary-light-blue text-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Team Powering <br></br> DevOps in Nairobi
              </h2>
              
            <div className="leading-relaxed lg:text-right lg:max-w-xl">
              <p className="text-pretty">
                 Behind every meetup, workshop, and idea is a group of passionate individuals who believe in the transformative power of collaboration. Our team blends technical brilliance with community heart - building a future where DevOps works for everyone.
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Side - Featured Member */}
            <div className="flex flex-col">
              {featured && (
                  <div className="flex-1 bg-ndc-darkblue backdrop-blur-sm rounded-3xl p-8 border-2 border-ndc-darkblue/30 shadow-2xl flex flex-col justify-between">
                    <div>
                      <div className="relative mb-6 mx-auto w-64 h-64">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-600 rounded-3xl blur-xl opacity-50" />
                        <img
                          src={featured.image }
                          alt={featured.name}
                          className="relative w-full h-full object-cover rounded-3xl border-4"
                        />
                      </div>
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl  text-white font-bold">{featured.name}</h3>
                        <p className="text-blue-200 font-medium">{featured.role}</p>
                        <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
                        <p className="text-blue-200 leading-relaxed text-pretty">{featured.bio}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-6 mt-4">
                      {featured.socials &&
                        Object.entries(featured.socials as Record<string, string>).map(([key, value]) => {
                          if (!value || typeof value !== "string") return null;
                          const href = key === "phone" ? `tel:${value}` : key === "email" ? `mailto:${value}` : value;
                          const Icon =
                            key === "phone"
                              ? Phone
                              : key === "linkedin"
                              ? Linkedin
                              : key === "twitter"
                              ? X
                              : key === "instagram"
                              ? Instagram
                              : Globe;
                          const baseClass =
                            key === "phone"
                              ? "w-12 h-12 rounded-full bg-primary hover:bg-white transition-colors flex items-center justify-center"
                              : "w-12 h-12 rounded-full bg-blue-700/50 hover:bg-white transition-colors flex items-center justify-center";

                          return (
                            <a
                              key={key}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={baseClass}
                              aria-label={key}
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          );
                        })}
                    </div>
                  </div>
                )}
            </div>
            {/* Right Side - Team Grid */}
            <div className="flex flex-col">
              <div className="flex justify-end gap-3 mb-6">
                <button
                  type="button"
                  onClick={showPrevFeatured}
                  className="w-12 h-12 flex items-center justify-center bg-ndc-darkblue hover:bg-primary border-2 border-purple-400/50 transition-colors"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  aria-label="Previous featured member"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={showNextFeatured}
                  className="w-12 h-12 flex items-center justify-center bg-ndc-darkblue hover:bg-primary border-2 border-purple-400/50 transition-colors"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  aria-label="Next featured member"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4 md:gap-6 content-start">
                {teamMembers.map((member) => (
                  <div key={member.id} className="text-center space-y-2">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setFeaturedId(member.id)}
                      onKeyDown={(e) => handleMemberKeyDown(e, member.id)}
                      className={`relative group ${member.id === featured?.id ? "ring-4 ring-white/20 rounded-2xl" : ""}`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`}
                      />
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className={`relative w-full aspect-square object-cover rounded-2xl border-3 border-blue-400/50 bg-gradient-to-br from-blue-400 to-cyan-400 ${member.id === featured?.id ? "scale-105" : ""}`}
                      />
                    </div>
                    <p className="text-sm font-medium">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>      

      {/* Partner With Us Section */}
      <section
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url('${randomImage.url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Partner With Us
          </h2>
          <h3 className="text-2xl font-semibold text-white/90 mb-8 max-w-2xl mx-auto">
            Fuel inclusive innovation through collaboration
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in shaping tech spaces that reflect diverse voices, shared values, and bold ideas. Your partnership helps communities grow and thrive.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-[#023047] text-white px-8 py-4 text-lg"
            onClick={() => navigate('/partners-sponsorship')}
          >
            Partner with Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}