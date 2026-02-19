import React, { useState } from 'react';

const AppBar = () => {
    // ถ้าเปิดด้วยมือถือ
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="bg-white/30 backdrop-blur-sm shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <a href="/" aria-label="Home" className="text-xl font-bold text-gray-900 tracking-tight">
              MyApplication
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              Sign In
            </button>
          </div>
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              type="button" 
              className="text-gray-600 hover:text-gray-900 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 p-2 rounded-md"
              aria-expanded={isMobileOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
               Sign out
             </a>
          </div>
        </div>
      )}
    </header>
  );
};


export default React.memo(AppBar);