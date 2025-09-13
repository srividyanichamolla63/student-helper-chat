import { GraduationCap, MessageCircle, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Campus AI Assistant
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Get instant answers about schedules, facilities, dining, library services, 
            and administrative procedures - all powered by AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/80">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span>Campus Expert</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};