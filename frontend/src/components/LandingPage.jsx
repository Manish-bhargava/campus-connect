import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- ICONS (Using simple SVGs) ---
// You can replace these with your own icon library like lucide-react

const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CodeIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ZapIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GithubIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-4.3 1.4 -4.3-2.5 -6-3m12 5v-3.5c0-1 .1-1.4 -.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3 -3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.5 -.6 1.2 -.5 2V21" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);


/**
 * LoginPage Component (The new SaaS Landing Page)
 * This is the public-facing page. It should not render your app's
 * main <NavBar /> or <Footer /> components.
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login")
    alert("This is where your GitHub OAuth flow would be triggered.");
  };

  const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-pink-200">
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-3 text-gray-800">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );

  const AppPreview = () => (
    <div className="w-full max-w-3xl mx-auto mt-16">
      <div className="rounded-xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* Browser header */}
        <div className="h-10 bg-gray-100 flex items-center px-4 space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        {/* App content mock */}
        <div className="p-6 h-96 flex space-x-4">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 rounded-lg p-4">
            <div className="w-full h-5 bg-gray-200 rounded mb-4"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded mb-3"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded mb-3"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded mb-3"></div>
          </div>
          {/* Main content */}
          <div className="w-3/4 flex flex-col space-y-4">
            {/* Profile card mock */}
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg p-4 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/30 flex-shrink-0"></div>
              <div className="flex-grow">
                <div className="w-1/2 h-6 bg-white/50 rounded mb-2"></div>
                <div className="w-full h-4 bg-white/40 rounded"></div>
                <div className="w-3/4 h-4 bg-white/40 rounded mt-1"></div>
              </div>
            </div>
            {/* Buttons mock */}
            <div className="flex space-x-4">
              <div className="h-12 w-full bg-red-400 rounded-lg shadow"></div>
              <div className="h-12 w-full bg-green-400 rounded-lg shadow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 text-gray-800 font-inter selection:bg-pink-400 selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
              TechBuddy
            </span>
          </h1>
          <button
            onClick={handleLogin}
            className="group relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <GithubIcon className="w-5 h-5 mr-2" />
            Login with GitHub
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative text-center pt-24 pb-32 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-pink-200/50 rounded-full blur-[100px] opacity-40 -z-10"></div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight">
          Stop Coding Alone.
          <br />
          Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">Dev Match.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          TechBuddy is an invite-only network for developers to find co-founders, collaborators, and mentors based on skills, projects, and goals.
        </p>
        <div className="flex justify-center items-center gap-4 mb-10">
          <button
            onClick={handleLogin}
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
            <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
         <p className="text-sm text-pink-600 font-medium">
          Join 120+ active developers building together
        </p>
        
        {/* App Preview Mockup */}
        <AppPreview />
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/50 border-t border-gray-200">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Find Your Perfect Match
          </h3>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Our platform isn't just about finding *a* developer, it's about finding the *right* one.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CodeIcon className="w-6 h-6" />}
              title="Skill-Based Matching"
            >
              Our AI matches you based on your complete tech stack, from React to Rust, ensuring you speak the same language.
            </FeatureCard>
            <FeatureCard
              icon={<UsersIcon className="w-6 h-6" />}
              title="Find Collaborators"
            >
              Looking for a co-founder for your next SaaS? Or a partner for a weekend hackathon? Find them here.
            </FeatureCard>
            <FeatureCard
              icon={<ZapIcon className="w-6 h-6" />}
              title="Project Matchmaking"
            >
              Post your project idea and let other developers "swipe" to join. It's like Tinder, but for building.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto max-w-4xl">
           <h3 className="text-2xl font-semibold text-center text-pink-500 mb-6">
            Don't just take our word for it
          </h3>
          <div className="bg-white p-10 rounded-xl shadow-lg relative border border-gray-100">
             <span className="absolute -top-5 -left-5 text-9xl text-pink-200 opacity-50 z-0">"</span>
            <p className="text-2xl md:text-3xl font-medium text-center text-gray-800 mb-8 z-10 relative">
              "I found my co-founder on TechBuddy in less than a week. We just crossed $1,000 MRR on our SaaS project!"
            </p>
            <div className="flex justify-center items-center">
              <img 
                src="https://placehold.co/40x40/ec4899/ffffff?text=A" 
                alt="Alex K." 
                className="w-10 h-10 rounded-full mr-4 border-2 border-pink-400"
                onError={(e) => { e.target.src = 'https://placehold.co/40x40/ec4899/ffffff?text=A'; e.target.onerror = null; }}
              />
              <p className="text-lg font-semibold text-center text-gray-700">
                Alex K. <span className="text-gray-500 ml-2 font-normal">Full-Stack Developer</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-t from-pink-500/10 to-transparent border-t border-gray-200">
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Ready to Find Your Tech Buddy?
        </h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Join a growing community of builders, innovators, and mentors.
          Your next big project starts here.
        </p>
        <button
          onClick={handleLogin}
          className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          Sign Up and Start Connecting
          <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Landing Page Footer */}
      <footer className="border-t border-gray-200 text-center py-8 bg-white">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} TechBuddy. The network for builders.</p>
      </footer>
    </div>
  );
};

export default LandingPage;