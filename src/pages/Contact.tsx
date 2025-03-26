
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

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
    
    // Simulate form submission (in a real app, you'd send this to a server)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 pb-20 overflow-x-hidden">
      {/* Contact Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brand-blue font-medium animate-fade-in">Get In Touch</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Let's Work Together
            </h1>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }} />
            <p className="mt-6 text-gray-600 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities and ideas.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information Section */}
      <section className="py-16">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-brand-blue/20"
              >
                <div className="w-14 h-14 mx-auto bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                  {info.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link} 
                    className="mt-2 inline-block text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="mt-2 text-gray-600">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-blue font-medium">Say Hello</span>
              <h2 className="text-3xl font-bold mt-2 text-gray-900">
                Send Me a Message
              </h2>
              <div className="w-20 h-1 bg-brand-blue mt-4 rounded mx-auto" />
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Fill out the form below, and I'll get back to you as soon as possible.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-10">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="floating-label-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder=" "
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="focus:border-brand-blue"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                    
                    <div className="floating-label-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=" "
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="focus:border-brand-blue"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="floating-label-group">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder=" "
                        value={formData.subject}
                        onChange={handleChange}
                        className="focus:border-brand-blue"
                      />
                      <label htmlFor="subject">Subject (Optional)</label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="floating-label-group">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder=" "
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="h-32 py-4 focus:border-brand-blue resize-none"
                      ></textarea>
                      <label htmlFor="message">Your Message</label>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue text-white font-medium py-3 rounded-full hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Media Section */}
      <section className="py-16">
        <div 
          className="container mx-auto px-6 reveal-animation"
          ref={addToRefs}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brand-blue font-medium">Connect</span>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              Follow Me on Social Media
            </h2>
            <div className="w-20 h-1 bg-brand-blue mt-4 rounded mx-auto" />
            <p className="mt-4 text-gray-600">
              Stay updated with my latest projects and professional journey.
            </p>
            
            <div className="mt-8 flex justify-center space-x-8">
              <a 
                href="https://github.com/adnan7398" 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 group-hover:text-brand-blue group-hover:shadow-lg transition-all">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="mt-2 text-gray-600 group-hover:text-brand-blue transition-colors">GitHub</p>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 group-hover:text-brand-blue group-hover:shadow-lg transition-all">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <p className="mt-2 text-gray-600 group-hover:text-brand-blue transition-colors">LinkedIn</p>
              </a>
              
              <a 
                href="mailto:123adnansiddiqui@gmail.com"
                className="group"
                aria-label="Email"
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 group-hover:text-brand-blue group-hover:shadow-lg transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="mt-2 text-gray-600 group-hover:text-brand-blue transition-colors">Email</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
