import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Target,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Brain,
  CodeXml,
  MessageCircle,
  Send,
  Bot,
  BookOpen,
} from "lucide-react";

/* --- Components --- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    {
      name: "Dashboard",
      href: "#dashboard",
      sub: [
        { name: "Training", href: "#training" },
        { name: "Placement", href: "#placement" },
      ],
    },
    {
      name: "Services",
      href: "#services",
    },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center flex">
            <img
              className="pr-1"
              src="https://i.postimg.cc/c1gyP7Cb/onestopcareer_removebg_preview.png"
              alt=""
              width={40}
            />
            <a
              href="#"
              className={`text-2xl font-bold tracking-tighter ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              OneStop<span className="text-orange-500">Career</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-orange-500 ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {link.name}
                  {link.sub && <ChevronDown size={14} className="ml-1" />}
                </a>

                {/* Dropdown for Desktop */}
                {link.sub && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    {link.sub.map((subLink) => (
                      <a
                        key={subLink.name}
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      >
                        {subLink.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=919563793988&text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-orange-500/30">
                Get Started
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled ? "text-gray-800" : "text-white"
              } hover:bg-opacity-20 hover:bg-white focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    {link.name}
                  </a>
                  {link.sub && (
                    <div className="pl-6 space-y-1 border-l-2 border-gray-100 ml-3">
                      {link.sub.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-3 py-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg text-base font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi! Ask me for Phone, WhatsApp, Email, or Location.",
      sender: "bot",
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Auto-reply logic
    const lowerInput = input.toLowerCase();
    let botResponse = {
      text: "I'm sorry, I can only provide contact details. Try asking for 'phone', 'email', 'whatsapp', or 'location'.",
      sender: "bot",
    };

    if (lowerInput.match(/\b(hi|hello|hey|greetings|namaste)\b/)) {
      botResponse.text =
        "Hello! Welcome to One Stop Career. How can I assist you today?";
    } else if (lowerInput.match(/\b(phone|call|mobile|number|contact)\b/)) {
      botResponse.text = "You can call us at: +91 95637 93988";
    } else if (lowerInput.match(/\b(whatsapp)\b/)) {
      botResponse.text = "Chat with us on WhatsApp: +91 95637 93988";
    } else if (lowerInput.match(/\b(mail|email|gmail)\b/)) {
      botResponse.text = "Email us at: info@onestopcareer.com";
    } else if (lowerInput.match(/\b(location|map|address|where)\b/)) {
      botResponse = {
        text: "We are located at 123 Career Tower, Education Hub. Click below for the map:",
        link: "https://www.google.com/maps/search/?api=1&query=123+Career+Tower,+Education+Hub",
        sender: "bot",
      };
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 600);

    setInput("");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Glow Background */}
        <div className="absolute inset-0 -m-4 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"></div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <motion.div
              animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              <Bot size={28} />
            </motion.div>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[500px]"
          >
            <div className="bg-blue-900 p-4 text-white">
              <h3 className="font-bold text-lg">One Stop Assistant</h3>
              <p className="text-blue-200 text-xs">Ask for contact details</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-80 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-white rounded-tr-none"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.link && (
                      <a
                        href={msg.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline mt-2 block font-bold flex items-center gap-1"
                      >
                        <MapPin size={14} /> Open Map
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-gray-100 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'phone', 'email', 'map'..."
                className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white p-2 rounded-full transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Shape Your Future with Confidence",
      subtitle:
        "Comprehensive career guidance, skill development, and employment support for students and job-seekers.",
      color: "from-blue-900 to-slate-900",
      image:
        "bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')]",
    },
    {
      id: 2,
      title: "Master Digital Marketing & Finance",
      subtitle:
        "Industry-oriented training programs in Digital Marketing, Mutual Funds, and the Share Market.",
      color: "from-indigo-900 to-purple-900",
      image:
        "bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')]",
    },
    {
      id: 3,
      title: "Placement Linkage Support",
      subtitle:
        "We connect unemployed youth with suitable opportunities and help them become employable through mentoring.",
      color: "from-slate-900 to-gray-900",
      image:
        "bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80')]",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="home"
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 w-full h-full bg-cover bg-center ${slides[currentSlide].image}`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} opacity-80 mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide + "-title"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              key={currentSlide + "-desc"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              key={currentSlide + "-btn"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#services"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-full font-semibold transition-all"
              >
                Contact Us
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-orange-500 w-8"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-orange-500 font-semibold tracking-wider uppercase text-sm"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-2 text-3xl md:text-4xl font-bold text-gray-900"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="h-1 bg-orange-500 mx-auto mt-4 rounded-full"
    />
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-orange-500">
              <p className="text-gray-800 font-bold text-lg mb-1">
                Our Mission
              </p>
              <p className="text-gray-600 text-sm">
                Empowering individuals with guidance, skills, and opportunities.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-orange-500 font-bold uppercase tracking-wide mb-2">
              About One Stop Career
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Guiding You Toward a Sustainable Future
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are a comprehensive career development company aiming to be a
              single platform for career guidance, skill development, and
              employment support. We help students and job-seekers identify
              their strengths and align them with industry demands.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From practical counseling for school and college students to
              industry-oriented training in Digital Marketing and Finance, we
              build real-world skills. We also bridge the gap for unemployed
              youth through dedicated placement linkage.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Personalized Counseling",
                "Industry Training",
                "Financial Awareness",
                "Placement Linkage",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <ChevronRight size={16} className="text-orange-600" />
                  </div>
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Digital Marketing",
      desc: "Master SEO, Social Media, and Content Marketing to thrive in the digital age. Practical, hands-on training tailored for career growth.",
      details:
        "Our Digital Marketing program provides a deep dive into the online marketing world. You will learn to craft strategies that drive traffic and engagement. The curriculum covers SEO (Search Engine Optimization) to rank websites higher, SMM (Social Media Marketing) to build brand presence on platforms like Facebook and Instagram, and PPC (Pay-Per-Click) for paid advertising. We also focus on Email Marketing, Content Strategy, and Analytics, ensuring you are job-ready for agencies or freelance work.",
      syllabus: [
        "Introduction to Digital Marketing",
        "Website Planning & Creation (WordPress)",
        "Search Engine Optimization (SEO)",
        "Social Media Marketing (SMM)",
        "Content Marketing Strategy",
        "Email Marketing & Automation",
        "Google Analytics & Metrics",
        "Affiliate Marketing Basics",
        "Freelancing & Career Guidance",
      ],
      icon: <Target className="w-8 h-8 text-white" />,
      bg: "bg-blue-600",
    },
    {
      title: "Artificial Intelligence",
      desc: `Master AI prompt engineering to unlock the potential of large language models and build innovative AI-powered solutions.`,
      details:
        "Step into the future with our AI Prompt Engineering course. This program is designed to help you communicate effectively with Large Language Models (LLMs) like ChatGPT, Gemini, and Claude. You'll learn the art of crafting precise prompts to generate code, write creative content, and solve complex problems. We also cover AI ethics, tool integration, and how to leverage AI to automate workflows and boost productivity in any industry.",
      syllabus: [
        "Introduction to Generative AI & LLMs",
        "Fundamentals of Prompt Engineering",
        "Text Generation (ChatGPT, Claude, Gemini)",
        "Image Generation (Midjourney, DALL-E)",
        "Advanced Prompting Techniques (Chain-of-Thought)",
        "AI for Coding & Debugging",
        "Integrating AI into Workflows",
        "AI Ethics & Limitations",
        "Building an AI Portfolio",
      ],
      icon: <Brain className="w-8 h-8 text-white" />,
      bg: "bg-slate-600",
    },
    {
      title: "Web Development",
      desc: `
      Learn the MERN Stack (MongoDB, Express.js, React, Node.js) to build full-stack web applications. Master RESTful APIs, database management, and dynamic UIs.`,
      details:
        "Become a Full-Stack Developer with our comprehensive MERN Stack training. We start with the basics of HTML, CSS, and JavaScript, then move to React.js for building dynamic user interfaces. On the backend, you'll master Node.js and Express.js, along with MongoDB for database management. The course includes building real-world projects like e-commerce sites and dashboards, ensuring you have a strong portfolio.",
      syllabus: [
        "HTML5, CSS3, & Responsive Design",
        "JavaScript (ES6+) Fundamentals",
        "Git & GitHub Version Control",
        "React.js: Components, Hooks, State Management",
        "Node.js & Express.js Backend Setup",
        "MongoDB Database Design & Mongoose",
        "REST API Development",
        "Authentication (JWT)",
        "Deployment (Vercel/Netlify/Heroku)",
      ],
      icon: <CodeXml className="w-8 h-8 text-white" />,
      bg: "bg-green-600",
    },
    {
      title: "Banking & Financial Training",
      desc: "Specialized training in Mutual Funds and Share Market to build financial awareness and real-world trading skills.",
      details:
        "Gain financial independence and career skills with our Banking & Finance modules. We cover the fundamentals of the Share Market, including technical and fundamental analysis, trading strategies, and risk management. The Mutual Funds section teaches you about portfolio diversification and wealth creation. This course is ideal for students looking for careers in BFSI (Banking, Financial Services, and Insurance) or individuals wanting to manage their own investments.",
      syllabus: [
        "Basics of Indian Financial System",
        "Introduction to Stock Market",
        "Fundamental Analysis (Balance Sheets, P&L)",
        "Technical Analysis (Charts, Indicators)",
        "Mutual Funds: Types & Selection",
        "Risk Management & Portfolio Building",
        "Trading Psychology",
        "Demat Account Operations",
        "Regulatory Framework (SEBI)",
      ],
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      bg: "bg-green-600",
    },
    {
      title: "Career Counseling",
      desc: "Scientific assessment of strengths and interests for school & college students to find the perfect career path in a competitive world.",
      details:
        "Unsure about your next step? Our Career Counseling service uses scientific psychometric tests and one-on-one sessions to identify your true potential. We analyze your aptitude, personality, and interests to recommend the most suitable career paths. Whether you are a school student choosing a stream, a college graduate looking for a job, or a professional seeking a career switch, our expert counselors provide a personalized roadmap for your success.",
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      bg: "bg-orange-500",
    },
    {
      title: "Placement Support",
      desc: "Connecting unemployed youth with suitable job opportunities through skill enhancement, resume building, and interview prep.",
      details:
        "Our Placement Support is more than just a job portal. We work on your employability. We help you craft a professional ATS-friendly resume and optimize your LinkedIn profile. Our mock interview sessions with industry experts simulate real job interviews to boost your confidence. We have a network of partner companies and actively connect our trained students with vacancies in Digital Marketing, Sales, Back Office, and Technical roles.",
      icon: <Briefcase className="w-8 h-8 text-white" />,
      bg: "bg-purple-600",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Key Services" subtitle="What We Offer" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col"
            >
              <div
                className={`${service.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm flex-grow">
                {service.desc}
              </p>
              <button
                onClick={() => setSelectedService(service)}
                className="inline-flex items-center text-sm font-semibold text-blue-900 group-hover:text-orange-500 transition-colors cursor-pointer mt-auto"
              >
                Learn more <ChevronRight size={16} className="ml-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="text-gray-500" size={24} />
              </button>

              <div
                className={`${selectedService.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
              >
                {selectedService.icon}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {selectedService.title}
              </h3>

              <div className="prose prose-blue text-gray-600 leading-relaxed mb-8">
                <p>{selectedService.details}</p>

                {/* Syllabus Section - Added */}
                {selectedService.syllabus && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                      <BookOpen className="w-5 h-5 text-orange-500 mr-2" />
                      Course Syllabus
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.syllabus.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm group"
                        >
                          <span className="mr-3 text-orange-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                          <span className="text-gray-700 font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-3 sticky bottom-0 bg-white pt-4 border-t border-gray-100">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-orange-500 text-white text-center py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 transform active:scale-95"
                >
                  Book Consultation
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TrainingHighlight = () => {
  return (
    <section
      id="training"
      className="py-20 bg-blue-900 text-white overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <Target size={300} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-orange-400 font-bold uppercase tracking-wider mb-2 block">
              Skill Development
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Industry-Oriented Training Programs
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Theoretical knowledge isn't enough. Our training modules are
              designed to provide hands-on experience in high-demand sectors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start bg-blue-800/50 p-4 rounded-xl border border-blue-700 hover:border-orange-500 transition-colors group">
                <div className="bg-orange-500 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform shrink-0">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg mb-1">Share Market</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Technical analysis, trading strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-blue-800/50 p-4 rounded-xl border border-blue-700 hover:border-orange-500 transition-colors group">
                <div className="bg-blue-500 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform shrink-0">
                  <Target className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg mb-1">Digital Marketing</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    SEO, SEM, Social Media strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-blue-800/50 p-4 rounded-xl border border-blue-700 hover:border-orange-500 transition-colors group">
                <div className="bg-purple-600 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform shrink-0">
                  <Brain className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg mb-1">AI Prompt</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Master LLMs & prompt engineering.
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-blue-800/50 p-4 rounded-xl border border-blue-700 hover:border-orange-500 transition-colors group">
                <div className="bg-green-600 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform shrink-0">
                  <CodeXml className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg mb-1">Web Development</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    MERN Stack & full-stack apps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Training Session"
              className="rounded-2xl shadow-2xl relative z-10 w-full h-full object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PlacementSection = () => {
  return (
    <section id="placement" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeader
          title="Placement Support"
          subtitle="Launch Your Career"
        />

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-inner">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Resume Building</h3>
              <p className="text-gray-600 text-sm">
                Crafting professional resumes that highlight your skills and
                achievements effectively.
              </p>
            </div>
            <div className="p-6 relative">
              <div className="hidden md:block absolute top-1/4 -right-4 w-8 h-0.5 bg-gray-300"></div>
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Mock Interviews</h3>
              <p className="text-gray-600 text-sm">
                Simulated interview sessions to build confidence and refine your
                communication.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Job Connection</h3>
              <p className="text-gray-600 text-sm">
                Direct linkage with hiring companies looking for fresh talent in
                your domain.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <button className="bg-blue-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg">
              Register for Placement Drive
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-400 mb-8">
              Have questions about our courses or counseling sessions? Reach out
              to us today.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Visit Us</h4>
                  <p className="text-gray-400 text-sm">
                    123 Career Tower, Education Hub, City Center, India
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <p className="text-gray-400 text-sm">+91 95637 93988</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-gray-400 text-sm">
                    info@onestopcareer.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 text-gray-900">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            {/* Formspree Integration Starts Here */}
            <form
              action="https://formspree.io/f/xbdddwkq"
              method="POST"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
              <select
                name="service"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-gray-500"
              >
                <option value="">Select Service Interest</option>
                <option value="Career Counseling">Career Counseling</option>
                <option value="Digital Marketing Training">
                  Digital Marketing Training
                </option>
                <option value="Banking & Financial Training">
                  Banking & Financial Training
                </option>
                <option value="Job Placement">Job Placement</option>
              </select>
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black text-white py-8 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} One Stop Career. All rights reserved. |
        Empowering Futures.
      </p>
    </div>
  </footer>
);

/* --- Main App Component --- */

const App = () => {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />
      <HeroSlider />
      <ServicesSection />
      <AboutSection />
      <TrainingHighlight />
      <PlacementSection />
      <ContactSection />
      <Footer />
      <ChatWidget />

      {/* Scroll to top indicator or chat widget could go here */}
    </div>
  );
};

export default App;
