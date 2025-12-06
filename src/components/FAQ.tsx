import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is kalmē?",
    answer: "A premium evening beverage and digital calm studio designed to help you unwind without switching off."
  },
  {
    question: "When can I order?",
    answer: "Pre-orders open soon. Join the waitlist for early access and exclusive pricing."
  },
  {
    question: "Is it safe for daily use?",
    answer: "Yes. All ingredients are carefully selected for safety and suitable for daily evening use."
  },
  {
    question: "What does it taste like?",
    answer: "Light and refreshing with subtle natural sweetness from monk fruit — never medicinal."
  },
  {
    question: "How does it work?",
    answer: "L-Theanine promotes calm focus while Magnesium helps ease physical tension, working synergistically."
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 relative">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-grey-aurora/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif">FAQ</h2>
        </div>

        <div className="divide-y divide-border/30">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-trigger"
              >
                <span className="font-serif text-base">{faq.question}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="faq-content animate-fade-in text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
