import React from 'react';
import { Globe, Smartphone } from 'lucide-react';

const AnimatedSection = ({ isLogin }) => {
  return (
    <div className="z-10 text-white text-center relative">
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated line on the left */}
        <div 
          className="absolute left-0 w-16 h-0.5 bg-white origin-left animate-line-expand"
          style={{
            transformOrigin: 'left center',
            animation: 'line-expand 1s ease-out'
          }}
        ></div>
        
        <p className="px-4">Connecting Possibilities</p>
        
        {/* Animated line on the right */}
        <div 
          className="absolute right-0 w-16 h-0.5 bg-white origin-right animate-line-expand"
          style={{
            transformOrigin: 'right center',
            animation: 'line-expand 1s ease-out'
          }}
        ></div>
      </div>

      <div className="animate-float">
        <h1 className="text-4xl font-bold mb-6 tracking-tight">
          {isLogin ? 'Welcome Back' : 'Get Started'}
        </h1>
        
        <p className="text-xl mb-10 max-w-md mx-auto opacity-90">
          {isLogin
            ? "Seamlessly connect to your workspace and continue your productivity journey."
            : "Create your account and unlock a world of collaborative possibilities."}
        </p>
        
        <div className="flex justify-center space-x-6 mt-12">
          <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all">
            <Globe className="h-12 w-12 text-white" />
          </div>
          <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all">
            <Smartphone className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Custom CSS for line animation */}
      <style jsx>{`
        @keyframes line-expand {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .animate-line-expand {
          animation: line-expand 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSection;