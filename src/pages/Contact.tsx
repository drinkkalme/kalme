import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] text-primary uppercase mb-8 opacity-0 animate-fade-in">
            Get in Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-serif mb-8 opacity-0 animate-fade-in-up delay-100">
            We'd love to
            <br />
            <span className="text-muted-foreground">hear from you.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl opacity-0 animate-fade-in-up delay-200">
            Whether you're a partner, creator, or early supporter — reach out anytime. 
            We reply fast.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif mb-8">Direct Contact</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm tracking-wider text-muted-foreground uppercase mb-2">
                      Email
                    </p>
                    <a
                      href="mailto:drinkkalme@gmail.com"
                      className="text-xl hover:text-primary transition-colors"
                    >
                      drinkkalme@gmail.com
                    </a>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/30">
                  <p className="text-muted-foreground leading-relaxed">
                    We're a small team building something meaningful. 
                    Every message matters to us. We typically respond within 24 hours.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="pt-8 border-t border-border/30">
                  <p className="text-sm tracking-wider text-muted-foreground uppercase mb-4">
                    Quick Links
                  </p>
                  <div className="space-y-3">
                    <p className="text-foreground/80">
                      <span className="text-muted-foreground">Partnerships:</span>{" "}
                      <a href="mailto:drinkkalme@gmail.com" className="hover:text-primary transition-colors">
                        drinkkalme@gmail.com
                      </a>
                    </p>
                    <p className="text-foreground/80">
                      <span className="text-muted-foreground">Press:</span>{" "}
                      <a href="mailto:drinkkalme@gmail.com" className="hover:text-primary transition-colors">
                        drinkkalme@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm tracking-wider text-muted-foreground uppercase mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-card/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm tracking-wider text-muted-foreground uppercase mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-card/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors rounded-lg"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm tracking-wider text-muted-foreground uppercase mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-card/50 border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none rounded-lg"
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;