import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Send, Calendar, MapPin, Utensils, BookOpen, FileText, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  query: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Class Schedules",
    query: "Show me my class schedule for today",
    color: "text-campus-blue"
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Campus Map",
    query: "Where is the library located?",
    color: "text-campus-green"
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    label: "Dining Hours",
    query: "What are the dining hall hours today?",
    color: "text-campus-gold"
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Library Services",
    query: "What library services are available?",
    color: "text-campus-blue"
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Admin Procedures",
    query: "How do I register for courses?",
    color: "text-campus-green"
  }
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your campus AI assistant. I can help you with schedules, facilities, dining, library services, and administrative procedures. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('schedule') || lowerQuery.includes('class')) {
      return "Here are your classes for today:\n\n📚 Introduction to Computer Science - 9:00 AM, Room 201\n📊 Statistics - 11:30 AM, Room 145\n🔬 Chemistry Lab - 2:00 PM, Science Building\n\nWould you like me to show you the full week schedule or help you find a specific classroom?";
    }
    
    if (lowerQuery.includes('dining') || lowerQuery.includes('food') || lowerQuery.includes('meal')) {
      return "🍽️ Campus Dining Information:\n\n• Main Cafeteria: 7:00 AM - 9:00 PM\n• Student Union Food Court: 11:00 AM - 8:00 PM\n• Coffee Shop: 6:30 AM - 10:00 PM\n• Late Night Snacks: 9:00 PM - 12:00 AM\n\nToday's special: Taco Tuesday at the food court! Would you like to see the full menu?";
    }
    
    if (lowerQuery.includes('library') || lowerQuery.includes('book')) {
      return "📖 Library Services & Hours:\n\n• Main Library: 24/7 (with student ID)\n• Reference Desk: 8:00 AM - 10:00 PM\n• Computer Lab: 6:00 AM - 12:00 AM\n• Study Rooms: Available for booking online\n• Research Support: Monday-Friday 9:00 AM - 5:00 PM\n\nNeed help finding a specific resource or booking a study room?";
    }
    
    if (lowerQuery.includes('map') || lowerQuery.includes('location') || lowerQuery.includes('where')) {
      return "🗺️ Campus Navigation:\n\nThe library is located in the center of campus, next to the student union. Here are some key landmarks:\n\n• Library: Building A, Center Campus\n• Student Union: Building B, next to Library\n• Science Building: Building C, North Campus\n• Administration: Building D, South Campus\n\nWould you like directions to a specific building or facility?";
    }
    
    if (lowerQuery.includes('register') || lowerQuery.includes('course') || lowerQuery.includes('admin')) {
      return "📋 Course Registration:\n\n1. Log into the Student Portal\n2. Navigate to 'Academic Services'\n3. Select 'Course Registration'\n4. Choose your semester\n5. Search and add courses\n6. Review and submit\n\nRegistration opens: March 15th for Fall semester\nNeed help with prerequisites or course planning?";
    }
    
    return "I'd be happy to help you with campus information! I can assist with:\n\n🎓 Class schedules and academic calendar\n🏢 Campus facilities and locations\n🍕 Dining options and hours\n📚 Library services and resources\n📝 Administrative procedures\n\nPlease let me know what specific information you're looking for!";
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="chat-container flex-1 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 hero-gradient rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Campus AI Assistant</h2>
              <p className="text-sm text-muted-foreground">Your guide to campus life</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.query)}
                className="quick-action-btn text-left"
              >
                <div className={`${action.color} mb-2`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-start gap-3 max-w-[80%]">
                  {message.sender === 'bot' && (
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="p-2 bg-primary/10 rounded-full mt-1">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="chat-bubble-bot">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about schedules, facilities, dining, library, or admin procedures..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};