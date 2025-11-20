import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [index]
    );
  };

  const handleBrowseFAQs = () => {
    window.location.href = "/faqpage";
  };

  return (
    <section 
      id="faq" 
      className="py-20 bg-faq text-faq-text"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-faq-text">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-faq-text">
            Answers to the questions you're most likely to have—whether you're new to DevOps or already deep in the game. 
            We're here to make things clear, simple, and welcoming.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              <img 
                src={faqImage} 
                alt="FAQ Illustration" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-lg shadow-sm border overflow-hidden bg-faq border-faq-text"
                style={{ opacity: 0.9 }}
              >
                <div 
                  className="flex items-center justify-between px-6 py-4 cursor-pointer transition-colors bg-faq text-faq-text"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium flex-1 text-faq-text">
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
                
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-4 border-t border-faq-text" style={{ opacity: 0.8 }}>
                    <p className="leading-relaxed pt-4 text-faq-text">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleBrowseFAQs}
          >
            Browse Full FAQs
          </Button>
        </div>
      </div>
    </section>
  );
}
