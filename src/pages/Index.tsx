import { HeroSection } from '@/components/HeroSection';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="py-8">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
