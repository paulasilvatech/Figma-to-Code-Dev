import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Users, Zap, Check, ExternalLink, Star, Book, Code, Menu, X, ShoppingBag, BarChart3, Palette, Plane, Package, Timer, FileText, Globe, Smartphone, Database, Shield, Layers } from 'lucide-react';

// Custom Figma to Code Logo
const FigmaToCodeLogo = ({ className = "w-12 h-12" }) => {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma Icon (Simplified) */}
      <g transform="translate(15, 25)">
        {/* F Shape */}
        <rect x="0" y="0" width="30" height="70" rx="4" fill="url(#yellowGradient)" opacity="0.9"/>
        <rect x="8" y="8" width="14" height="3" rx="1.5" fill="#fbbf24"/>
        <rect x="8" y="18" width="14" height="3" rx="1.5" fill="#fbbf24"/>
        <rect x="8" y="28" width="8" height="3" rx="1.5" fill="#fbbf24"/>
        
        {/* Figma Circles */}
        <circle cx="15" cy="45" r="5" fill="#f59e0b"/>
        <circle cx="15" cy="58" r="5" fill="#f97316"/>
      </g>
      
      {/* Arrow */}
      <path d="M50 60 L65 60" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
      <path d="M61 54 L67 60 L61 66" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Code Brackets */}
      <g transform="translate(75, 30)">
        <path d="M0 15 L-5 20 L0 25" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 15 L35 20 L30 25" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="5" y="18" width="20" height="4" rx="2" fill="#fbbf24"/>
        <rect x="8" y="28" width="14" height="3" rx="1.5" fill="#f59e0b" opacity="0.7"/>
        <rect x="8" y="35" width="10" height="3" rx="1.5" fill="#f97316" opacity="0.7"/>
      </g>
      
      {/* AI Sparkle */}
      <g transform="translate(85, 20)">
        <path d="M0 5 L2 0 L4 5 L9 7 L4 9 L2 14 L0 9 L-5 7 Z" fill="#fbbf24" opacity="0.8"/>
      </g>
      
      <defs>
        <linearGradient id="yellowGradient" x1="0" y1="0" x2="30" y2="70">
          <stop offset="0%" stopColor="#fef3c7"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scenarios = [
    { 
      id: 1, 
      title: "E-commerce Product Page", 
      icon: ShoppingBag,
      time: "35+ hours → 2 hours",
      features: ["Interactive gallery", "Cart animations", "Reviews system", "Inventory tracking"],
      description: "Build a complete e-commerce product page with advanced functionality including dynamic image galleries, real-time inventory updates, and sophisticated cart management.",
      technologies: ["React", "Redux Toolkit", "Stripe API", "React Query"],
      learningObjectives: [
        "Implement complex state management for shopping cart",
        "Build responsive image galleries with zoom functionality",
        "Integrate payment processing with Stripe",
        "Create real-time inventory tracking system",
        "Develop advanced product filtering and search"
      ],
      deliverables: [
        "Fully functional product page",
        "Shopping cart with persistence",
        "Payment integration",
        "Admin inventory dashboard"
      ],
      difficulty: "Intermediate",
      duration: "2 hours"
    },
    { 
      id: 2, 
      title: "SaaS Dashboard", 
      icon: BarChart3,
      time: "49+ hours → 3 hours",
      features: ["Real-time charts", "WebSocket updates", "Drag-drop widgets", "Theme switching"],
      description: "Create a comprehensive SaaS dashboard with real-time data visualization, customizable widgets, and advanced user management features.",
      technologies: ["React", "D3.js", "Socket.io", "React Beautiful DnD"],
      learningObjectives: [
        "Build real-time data visualization with WebSockets",
        "Implement drag-and-drop dashboard customization",
        "Create responsive charts and graphs",
        "Develop theme switching functionality",
        "Build user role management system"
      ],
      deliverables: [
        "Interactive dashboard with live data",
        "Customizable widget system",
        "User management panel",
        "Analytics reporting tools"
      ],
      difficulty: "Advanced",
      duration: "3 hours"
    },
    { 
      id: 3, 
      title: "Agency Portfolio", 
      icon: Palette,
      time: "37+ hours → 2.5 hours",
      features: ["Parallax effects", "Custom cursor", "Smooth animations", "Contact forms"],
      description: "Design and develop a stunning agency portfolio website with advanced animations, custom interactions, and sophisticated visual effects.",
      technologies: ["React", "Framer Motion", "GSAP", "EmailJS"],
      learningObjectives: [
        "Create complex CSS animations and transitions",
        "Implement parallax scrolling effects",
        "Build custom cursor interactions",
        "Develop smooth page transitions",
        "Create engaging contact forms with validation"
      ],
      deliverables: [
        "Fully animated portfolio website",
        "Project showcase with case studies",
        "Interactive contact system",
        "Mobile-optimized experience"
      ],
      difficulty: "Intermediate",
      duration: "2.5 hours"
    },
    { 
      id: 4, 
      title: "Travel Platform", 
      icon: Plane,
      time: "54+ hours → 3.5 hours",
      features: ["Smart search", "Map integration", "Date pickers", "Multi-language"],
      description: "Develop a comprehensive travel booking platform with intelligent search capabilities, interactive maps, and multi-language support.",
      technologies: ["React", "Mapbox GL", "React Datepicker", "i18next"],
      learningObjectives: [
        "Integrate interactive mapping solutions",
        "Build advanced search and filtering systems",
        "Implement date range selection",
        "Create multi-language support",
        "Develop booking flow with validation"
      ],
      deliverables: [
        "Complete travel booking platform",
        "Interactive map with location search",
        "Multi-language interface",
        "Booking management system"
      ],
      difficulty: "Advanced",
      duration: "3.5 hours"
    }
  ];

  const metrics = [
    { value: "94%", label: "Time Saved", icon: Timer },
    { value: "100%", label: "TypeScript Coverage", icon: Code },
    { value: "97-100", label: "Accessibility Score", icon: Zap },
    { value: "95-98", label: "Lighthouse Score", icon: BarChart3 }
  ];

  const techStack = [
    { category: "Core", items: ["React 18 + TypeScript", "Next.js / Gatsby", "Styled Components"] },
    { category: "AI Tools", items: ["GitHub Copilot Agent", "MCP Figma Integration", "Auto Testing"] },
    { category: "Libraries", items: ["Framer Motion", "Recharts", "Mapbox GL", "Socket.io"] },
    { category: "Features", items: ["i18n Support", "Dark Mode", "Performance Optimized"] }
  ];

  const prerequisites = [
    "Node.js 18+ and npm/yarn",
    "VS Code with GitHub Copilot",
    "GitHub Copilot subscription",
    "Basic React/TypeScript knowledge",
    "Figma account (free tier ok)",
    "2GB free disk space"
  ];

  const relatedRepos = [
    {
      title: "Design-to-Code",
      description: "Transform Figma designs into production-ready code with AI assistance",
      link: "https://github.com/paulasilvatech/Design-to-Code-Dev"
    },
    {
      title: "AI Code Development",
      description: "Leverage AI tools to optimize and improve code quality",
      link: "https://github.com/paulasilvatech/Code-AI-Dev"
    },
    {
      title: "Secure Code AI",
      description: "Build secure applications with AI-powered security analysis and best practices",
      link: "https://github.com/paulasilvatech/Secure-Code-AI-Dev"
    },
    {
      title: "Agentic Operations",
      description: "Implement comprehensive observability solutions",
      link: "https://github.com/paulasilvatech/Agentic-Ops-Dev"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-900 to-yellow-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FigmaToCodeLogo className="w-10 h-10" />
              <span className="text-xl font-bold">Figma to Code AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#scenarios" className="hover:text-yellow-400 transition-colors">Scenarios</a>
              <a href="#metrics" className="hover:text-yellow-400 transition-colors">Results</a>
              <a href="#tech" className="hover:text-yellow-400 transition-colors">Tech Stack</a>
              <a href="#start" className="hover:text-yellow-400 transition-colors">Get Started</a>
              <a href="https://github.com/paulasilvatech/Figma-to-Code-Dev" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors">
                <Star className="w-4 h-4" />
                <span>Star on GitHub</span>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a href="#scenarios" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Scenarios</a>
              <a href="#metrics" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Results</a>
              <a href="#tech" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Tech Stack</a>
              <a href="#start" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <FigmaToCodeLogo className="w-24 h-24 animate-pulse" />
          </div>
          
          <div className="flex justify-center mb-6">
            <span className="bg-yellow-600/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              🚀 Transform weeks of development into hours with AI
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-400">
            Figma to Code Workshop
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Convert sophisticated Figma designs into production-ready applications using GitHub Copilot Agent Mode. Experience 94%+ time reduction in development cycles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/paulasilvatech/Figma-to-Code-Dev" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
              <span>Visit GitHub Repository</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#start" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all">
              <span>Quick Start</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Under 4 hours total</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>All skill levels</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>4 Complete Apps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Results Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-yellow-600/20 to-amber-600/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Build 4 Complete Applications in Under 4 Hours
            </h3>
            <p className="text-xl text-yellow-300">
              What traditionally takes 175+ hours now takes less than 11 hours with AI
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Scenarios Section */}
      <section id="scenarios" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Workshop Scenarios</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four real-world projects demonstrating the power of AI-assisted development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-800/70 transition-all cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedScenario(scenario)}
              >
                <div className="flex items-start justify-between mb-4">
                  <scenario.icon className="w-12 h-12 text-yellow-400" />
                  <span className="text-sm font-medium text-amber-300 bg-amber-900/30 px-3 py-1 rounded-full">
                    {scenario.time}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{scenario.title}</h3>
                <ul className="space-y-2 mb-4">
                  {scenario.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-300">
                      <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Click for details</span>
                  <ChevronRight className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario Detail Modal */}
      {selectedScenario && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <selectedScenario.icon className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold">{selectedScenario.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedScenario(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Overview */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                    {selectedScenario.difficulty}
                  </span>
                  <span className="bg-amber-600/20 text-amber-300 px-3 py-1 rounded-full text-sm">
                    {selectedScenario.duration}
                  </span>
                  <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">
                    {selectedScenario.time}
                  </span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedScenario.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-yellow-400" />
                    Technologies Used
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedScenario.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Learning Objectives
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedScenario.learningObjectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-300">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-yellow-400" />
                    Deliverables
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedScenario.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-300">
                          <FileText className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-yellow-400" />
                    Key Features
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedScenario.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-300">
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://github.com/paulasilvatech/Figma-to-Code-Dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <span>Start This Module</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setSelectedScenario(null)}
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <span>Close Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Metrics Section */}
      <section id="metrics" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Performance Metrics</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable results that showcase the power of AI-assisted development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <metric.icon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 mb-2">
                  {metric.value}
                </div>
                <p className="text-gray-300">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-yellow-600/10 to-amber-600/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6 text-center">Business Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400">40%</div>
                <p className="text-gray-300">Increase in conversion rates</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">250%</div>
                <p className="text-gray-300">Increase in client inquiries</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">78%</div>
                <p className="text-gray-300">Booking completion rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern tools and frameworks for production-ready applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section id="prerequisites" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Prerequisites</h2>
              <p className="text-xl text-gray-300 mb-8">
                Simple requirements to get you started on your AI-powered development journey.
              </p>
              <ul className="space-y-4">
                {prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-lg">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                <FigmaToCodeLogo className="w-20 h-20" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">AI-Powered Workflow</h3>
              <p className="text-gray-300 mb-6 text-center">
                Experience the future of development where AI understands design intent and generates complete, working code.
              </p>
              <div className="text-center">
                <span className="text-4xl font-bold text-yellow-400">94%</span>
                <p className="text-gray-300">Average time saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="start" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Quick Start</h2>
          <p className="text-xl text-gray-300 mb-12">
            Get up and running in minutes with our streamlined setup process
          </p>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-12 text-left">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">🚀 Setup Commands</h3>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm">
                <span className="text-gray-500"># Clone the workshop repository</span><br />
                <span className="text-yellow-400">git clone</span> https://github.com/design-to-code-workshop.git<br />
                <span className="text-yellow-400">cd</span> design-to-code-workshop<br /><br />
                
                <span className="text-gray-500"># Install global dependencies</span><br />
                <span className="text-yellow-400">npm install</span> -g create-react-app @modelcontextprotocol/cli<br /><br />
                
                <span className="text-gray-500"># Set up VS Code extensions</span><br />
                <span className="text-yellow-400">code</span> --install-extension GitHub.copilot<br />
                <span className="text-yellow-400">code</span> --install-extension GitHub.copilot-chat<br /><br />
                
                <span className="text-gray-500"># Choose your scenario and start</span><br />
                <span className="text-yellow-400">cd</span> scenario-1-ecommerce<br />
                <span className="text-yellow-400">npm install</span><br />
                <span className="text-yellow-400">npm start</span>
              </code>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Choose Your Scenario</h3>
                  <p className="text-gray-300">Pick from E-commerce, SaaS Dashboard, Agency Portfolio, or Travel Platform</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Open Figma Design</h3>
                  <p className="text-gray-300">Access the provided Figma file and explore the design components</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Use AI Prompts</h3>
                  <p className="text-gray-300">Follow our curated prompts to generate production-ready components</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Deploy & Celebrate</h3>
                  <p className="text-gray-300">Build and deploy your application in record time!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a href="https://github.com/paulasilvatech/Figma-to-Code-Dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              <span>View Full Documentation</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Repositories */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Related Resources</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our ecosystem of AI-powered development workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedRepos.map((repo, index) => (
              <a key={index} href={repo.link} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <Book className="w-8 h-8 text-yellow-400" />
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                  {repo.title}
                </h3>
                <p className="text-gray-300">
                  {repo.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Developed by{' '}
            <a href="https://github.com/paulasilvatech" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
              Paula Silva
            </a>
            , Developer Productivity Global Black Belt
          </p>
          <p className="text-gray-500">
            Empowering developers to transform designs into production-ready code with AI-powered automation
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;