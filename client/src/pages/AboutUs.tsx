import { useState } from "react";
import { Play, Users, Calendar, Award, Target, Globe, Linkedin, X, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReactPlayer from "react-player";
import { Image as UnpicImage } from "@unpic/react";
import {
  teamData,
  statisticsData
} from "@/data/ndcData";


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
  // const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center py-20"
        style={{
          backgroundImage: "url('https://pbs.twimg.com/media/GxBRy4AWYAA8fC5?format=jpg&name=4096x4096')",
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
      <section className="py-20 bg-muted dark:bg-[#898E99]">
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
              <Button className="bg-primary hover:bg-[#023047] text-white " onClick={() => window.location.href = "/join"}>
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


              {/* <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden aspect-video">
                {isVideoPlaying ? (
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=TLbR9oIszas"
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={isVideoPlaying}
                    onEnded={() => setIsVideoPlaying(false)}
                    config={{
                      youtube: {
                        playerVars: {
                          autoplay: 1,
                          modestbranding: 1,
                          rel: 0,
                        },
                      },
                    }}
                  />
                ) 
                : (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 p-0"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                )
                }
              </div> */}
              
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
              src= "https://pbs.twimg.com/media/Gw1gwJhWsAAZcBo?format=jpg&name=large"
              alt="Africa DevOps Summit"
              className="rounded-lg shadow-lg absolute top-0 left-0 w-4/5 h-4/5 lg:w-[85%] lg:h-[85%] object-cover transition-transform duration-300 hover:scale-105 hover:rotate-1"
              width={300}
              height={300}
              loading="lazy"
              layout="constrained"
            />
            {/* Floating image */}
            <UnpicImage
              src= "https://pbs.twimg.com/media/GxBRy4AWYAA8fC5?format=jpg&name=4096x4096"
              alt= "Nairobi DevOps Community"
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
              Founded in 2023, the Nairobi DevOps Community emerged from a simple observation: the need for a dedicated space where DevOps professionals, enthusiasts, and learners could connect, share knowledge, and grow together. What started as a small group of passionate individuals has evolved into a thriving community of over 3,000 members.
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
            {statisticsData.map((stat, index) => (
              <div key={stat.id} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
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
                   src= "https://pbs.twimg.com/media/GxBRy4AWYAA8fC5?format=jpg&name=4096x4096"
                   alt= "Nairobi DevOps Communiy"
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
                   src="https://pbs.twimg.com/media/Gw1gwJhWsAAZcBo?format=jpg&name=large"
                   alt= "Africa DevOps Summit"
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
                 src="https://pbs.twimg.com/media/GxreT67XgAECapE?format=jpg&name=large"
                 alt= "Nairobi DevOps Community"
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
                 src="https://pbs.twimg.com/media/GxreT6CWcAEuziP?format=jpg&name=large"
                 alt= "Nairobi DevOps Community Event"
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
                  {objectivesData.map((objective, index) => (
                    <div key={index} className="flex gap-4">
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

      {/* Meet the Team Section */}
      <section className="py-20 bg-ndc-darkblue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet the Team Powering
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              DevOps in Nairobi
            </h2>
          </div>
          
        
          <div>
            <p className="text-lg text-white leading-relaxed">
              Behind every meetup, workshop, and idea is a group of passionate individuals who believe in the transformative power of collaboration. Our team blends technical brilliance with community heart - building a future where DevOps works for everyone.
            </p>
          </div>
        </div>
          
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-16">
           {teamData.map((member) => (
             <div key={member.id} className="relative group">
               {/* Team member image */}
               <div className="relative overflow-hidden rounded-lg shadow-lg">
                 <UnpicImage 
                   src={member.image} 
                   alt={member.name}
                   className="w-full h-72 md:h-80 object-cover transition-transform duration-300 peer hover:scale-105"
                   width={300}
                   height={300}
                   loading="lazy"
                   layout="constrained"
                 />
                 
                 {/* Floating detail card overlay */}
                 <div className="absolute bottom-0 left-0 right-0 bg-[#D1E2F2] dark:bg-gray-100 rounded-t-lg shadow-lg transform translate-y-4 peer-hover:translate-y-0 transition-transform duration-300 opacity-0 peer-hover:opacity-100 pointer-events-none">
                   <div className="p-3 md:p-4">
                     <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">
                       {member.name}
                     </h3>
                     <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                       {member.title}
                     </p>
                     <div className="flex space-x-2 md:space-x-3">
                       {member.twitter && (
                         <a href={member.twitter} className="text-gray-800 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                           <X className="h-3 w-3 md:h-4 md:w-4" />
                         </a>
                       )}
                       {member.linkedin && (
                         <a href={member.linkedin} className="text-gray-800 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                           <Linkedin className="h-3 w-3 md:h-4 md:w-4" />
                         </a>
                       )}
                       {member.instagram && (
                         <a href={member.instagram} className="text-gray-800 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                           <Instagram className="h-3 w-3 md:h-4 md:w-4" />
                         </a>
                       )}
                       {member.website && (
                         <a href={member.website} className="text-gray-800 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                           <Globe className="h-3 w-3 md:h-4 md:w-4" />
                         </a>
                       )}
                     </div>
                   </div>
                 </div>
                 
               </div>
             </div>
           ))}
         </div>
        </div>
        
      </section>

      {/* Partner With Us Section */}
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
            onClick={() => window.open('/partners-sponsorship')}
          >
            Partner with Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
} 