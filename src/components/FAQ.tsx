import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is kalmē?",
    answer: "kalmē is a premium evening wellness brand offering calming beverages and digital tools designed to help you unwind without switching off. Our science-backed formula supports relaxation while keeping you present."
  },
  {
    question: "When can I order?",
    answer: "Pre-orders are opening soon. Join our waitlist to be the first to know when kalmē becomes available, and get exclusive early access pricing."
  },
  {
    question: "Is it safe for daily use?",
    answer: "Yes. All kalmē ingredients are carefully selected for their proven safety profiles and are suitable for daily evening use. We use only clean, natural ingredients with no artificial additives."
  },
  {
    question: "What does it taste like?",
    answer: "kalmē has a light, refreshing taste with subtle natural sweetness from monk fruit. It's designed to be enjoyable neat or mixed with water — never medicinal or overpowering."
  },
  {
    question: "How does it work?",
    answer: "Our formula combines adaptogens and amino acids that work synergistically to support your body's natural relaxation response. L-Theanine promotes calm focus, while Magnesium helps ease physical tension."
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Common Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-serif">FAQ</h2>
        </div>

        <div className="divide-y divide-border/30">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-trigger"
              >
                <span className="font-serif">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="faq-content animate-fade-in">
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
