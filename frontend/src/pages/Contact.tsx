
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { buildApiUrl } from "@/lib/utils";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For intersection observer to trigger animations
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Add elements to the reveal refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  
  // Contact info data
  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Email",
      value: "123adnansiddiqui@gmail.com",
      link: "mailto:123adnansiddiqui@gmail.com",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      ),
      title: "Phone",
      value: "+91 7398494248",
      link: "tel:+917398494248",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      title: "Location",
      value: "Jamia Millia Islamia, New Delhi, India",
    },
  ];
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(buildApiUrl('/api/messages'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          type: "contact",
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}: Failed to send message`);
      }
      
      const result = await res.json();
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again later.";
      toast.error(errorMessage);
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 via-slate-800 to-slate-900 pt-20 pb-20 overflow-x-hidden">
      {/* Contact Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30 animate-fade-in">
              💬 Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Let's Work Together
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 mt-6 rounded-full mx-auto shadow-lg shadow-blue-500/50 animate-fade-in" style={{ animationDelay: "0.3s" }} />
            <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-200 leading-relaxed font-normal animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Interested in collaborating or have a project in mind? Feel free to reach out.
              I'm always open to discussing new opportunities and challenges.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="reveal-animation" ref={addToRefs}>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-3xl p-8 shadow-2xl border border-gray-600/40 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-8 text-white">Send me a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all duration-300"
                      placeholder="Project inquiry, collaboration, etc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/60 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or how we can work together..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="reveal-animation space-y-8" ref={addToRefs}>
              <div>
                <h2 className="text-3xl font-bold mb-8 text-white">Get in touch</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl flex items-center justify-center border border-blue-400/40">
                      <div className="text-blue-400">
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-blue-400 hover:text-cyan-300 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl border border-gray-600/40 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Let's collaborate!</h3>
                <p className="text-gray-300 mb-4">
                  I'm passionate about creating innovative solutions and would love to 
                  discuss how we can work together on your next project.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/adnan7398" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
