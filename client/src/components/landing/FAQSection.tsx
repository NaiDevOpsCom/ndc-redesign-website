import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import faqImage from "@/assets/faq.png";
import { faqDataByCategory } from "@/data/faqData";

export default function FAQSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(() =>
    Math.floor(Math.random() * faqDataByCategory.length),
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null,
  );
  const [, navigate] = useLocation();

  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      fadeTimeout = setTimeout(() => {
        setActiveCategoryIndex((prev) => (prev + 1) % faqDataByCategory.length);
        setExpandedQuestionId(null);
        setIsTransitioning(false);
      }, 300);
    }, 45000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);
  const toggleQuestion = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const handleBrowseFAQs = () => {
    navigate("/faqpage");
  };

  const activeCategory = faqDataByCategory[activeCategoryIndex];

  return (
    <section id="faq" className="py-20 bg-primary-light-blue text-faq-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-faq-text">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-faq-text">
            Answers to the questions you're most likely to have—whether you're
            new to DevOps or already deep in the game. We're here to make things
            clear, simple, and welcoming.
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
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-faq-text">
                {activeCategory?.title} FAQs
              </h3>
            </div>

            <div
              className={`space-y-4 transition-all duration-500 ease-in-out ${
                isTransitioning
                  ? "opacity-0 translate-y-3"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {activeCategory?.items.map((faq, index) => {
                const id = `${activeCategory.title}-${index}`;
                const isExpanded = expandedQuestionId === id;

                return (
                  <div
                    key={id}
                    className="rounded-lg shadow-sm border overflow-hidden bg-faq border-faq-text"
                    style={{ opacity: 0.9 }}
                  >
                    <div
                      className="flex items-center justify-between px-6 py-4 cursor-pointer transition-colors bg-faq text-faq-text"
                      onClick={() => toggleQuestion(id)}
                    >
                      <span className="font-medium flex-1 text-faq-text">
                        {faq.question}
                      </span>
                      <button
                        className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-[#023047] transition-colors ml-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleQuestion(id);
                        }}
                      >
                        <Plus
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-45" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div
                        className="px-6 pb-4 border-t border-faq-text"
                        style={{ opacity: 0.8 }}
                      >
                        <p className="leading-relaxed pt-4 text-faq-text/90">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
