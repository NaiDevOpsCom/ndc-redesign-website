import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "Who can join the community?",
    answer: "Anyone interested in DevOps, whether you're a beginner or an experienced professional. Our community welcomes developers, operations engineers, system administrators, and anyone passionate about DevOps practices and culture."
  },
  {
    question: "Are events free?",
    answer: "Yes! Most of our events are completely free to attend. We believe in making DevOps knowledge accessible to everyone. Some special workshops or premium events may have a small fee, but we always announce this clearly in advance."
  },
  {
    question: "Are there membership fees?",
    answer: "No, joining the Nairobi DevOps Community is completely free. We're committed to building an inclusive community where everyone can participate regardless of their financial situation."
  },
  {
    question: "How often do you hold events?",
    answer: "We typically hold events monthly, including meetups, workshops, and networking sessions. We also organize special events like hackathons and conferences throughout the year."
  },
  {
    question: "Do I need to be experienced in DevOps to join?",
    answer: "Not at all! We welcome people at all skill levels. Whether you're just starting your DevOps journey or you're a seasoned professional, there's a place for you in our community."
  },
  {
    question: "What types of events do you organize?",
    answer: "We organize a variety of events including technical meetups, workshops, hackathons, conferences, networking sessions, and community building activities. Our events cover topics like CI/CD, containerization, cloud platforms, automation, and DevOps culture."
  },
  {
    question: "How can I contribute to the community?",
    answer: "There are many ways to contribute! You can speak at our events, organize workshops, help with event planning, contribute to our blog, mentor newcomers, or simply participate actively in discussions and networking."
  },
  {
    question: "Do you have online events?",
    answer: "Yes! We host both in-person and virtual events. Our online events include webinars, virtual meetups, and online workshops to ensure accessibility for everyone, regardless of location."
  }
];

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [, setLocation] = useLocation();

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [index]
    );
  };

  const handleBackToHome = () => {
    setLocation("/");
  };

  return (
    <div 
      className="min-h-screen py-20"
      style={{
        backgroundColor: 'var(--faq-bg)',
        color: 'var(--faq-text)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="mb-6 flex items-center gap-2"
            style={{
              color: 'var(--faq-text)',
              backgroundColor: 'transparent'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--faq-text)' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed" style={{ color: 'var(--faq-text)' }}>
            Find answers to all your questions about the Nairobi DevOps Community. Can't find what you're looking for? 
            Feel free to reach out to us directly.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-lg shadow-sm border overflow-hidden"
              style={{
                backgroundColor: 'var(--faq-bg)',
                borderColor: 'var(--faq-text)',
                opacity: 0.9
              }}
            >
              {/* Question Card */}
              <div 
                className="flex items-center justify-between px-6 py-4 cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--faq-bg)',
                  color: 'var(--faq-text)'
                }}
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium flex-1" style={{ color: 'var(--faq-text)' }}>
                  {faq.question}
                </span>
                <button 
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors ml-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(index);
                  }}
                >
                  <Plus 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedItems.includes(index) ? 'rotate-45' : ''
                    }`} 
                  />
                </button>
              </div>
              
              {/* Answer Content */}
              {expandedItems.includes(index) && (
                <div className="px-6 pb-4 border-t" style={{ borderColor: 'var(--faq-text)', opacity: 0.8 }}>
                  <p className="leading-relaxed pt-4" style={{ color: 'var(--faq-text)' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center p-8 rounded-lg border" style={{ borderColor: 'var(--faq-text)', opacity: 0.8 }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--faq-text)' }}>
            Still have questions?
          </h3>
          <p className="text-lg mb-6" style={{ color: 'var(--faq-text)' }}>
            Can't find the answer you're looking for? We'd love to hear from you.
          </p>
          <Button 
            className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              backgroundColor: 'var(--faq-text)',
              color: 'var(--faq-bg)'
            }}
            onClick={() => window.open("mailto:contact@nairobidevops.org", "_self")}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
