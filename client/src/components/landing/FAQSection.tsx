import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "wouter";
import faqImage from "@/assets/faq.png";

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
  }
];

export default function FAQSection() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [, setLocation] = useLocation();

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) // Close the clicked item if it's already open
        : [index] // Open only the clicked item, closing all others
    );
  };

  const handleBrowseFAQs = () => {
    setLocation("/faqpage");
  };

  return (
    <section 
      id="faq" 
      className="py-20"
      style={{
        backgroundColor: 'var(--faq-bg)',
        color: 'var(--faq-text)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--faq-text)' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--faq-text)' }}>
            Answers to the questions you're most likely to have—whether you're new to DevOps or already deep in the game. 
            We're here to make things clear, simple, and welcoming.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - FAQ Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              <img 
                src={faqImage} 
                alt="FAQ Illustration" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Side - FAQ Cards */}
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
                    className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-[#023047] transition-colors ml-4"
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
        </div>

        {/* Browse Full FAQs Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-white"
            style={{
              backgroundColor: '#3B82F6',
              color: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
            onClick={handleBrowseFAQs}
          >
            Browse Full FAQs
          </Button>
        </div>
      </div>
    </section>
  );
}

