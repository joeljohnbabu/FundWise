import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface FundwiseHeaderProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onSearch?: (query: string) => void;
  isSignedIn?: boolean;
  onSignIn?: () => void;
}

export function FundwiseHeader({ activeSection = 'home', onSectionChange, onSearch, isSignedIn = false, onSignIn }: FundwiseHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleNavClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    setMobileMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      // Focus the input when opening
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setSearchOpen(false);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="container-stake">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <button onClick={() => handleNavClick('home')} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00D9A3] rounded-lg"></div>
              <span className="font-semibold text-xl text-[#0A0F1E]">fundwise</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <button
                onClick={() => handleNavClick('marketplace')}
                className={`transition-colors font-medium ${activeSection === 'marketplace' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => handleNavClick('portfolio')}
                className={`transition-colors font-medium ${activeSection === 'portfolio' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => handleNavClick('wallet')}
                className={`transition-colors font-medium ${activeSection === 'wallet' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Wallet
              </button>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Expandable */}
            <div className="relative flex items-center gap-3">
              {searchOpen && (
                <form onSubmit={handleSearchSubmit} className="absolute right-12 top-1/2 -translate-y-1/2 z-10">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="w-64 h-10 pl-4 pr-4 border-2 border-[#00D9A3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#00D9A3]/20 transition-all bg-white shadow-lg"
                    onBlur={() => {
                      // Delay closing to allow form submission
                      setTimeout(() => {
                        if (!searchQuery) setSearchOpen(false);
                      }, 200);
                    }}
                  />
                </form>
              )}

              <button
                onClick={handleSearchToggle}
                className="w-10 h-10 bg-[#00D9A3]/10 hover:bg-[#00D9A3]/20 rounded-full flex items-center justify-center transition-all relative z-20"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[#00D9A3]" />
              </button>
            </div>

            {!isSignedIn ? (
              <>
                <Button
                  onClick={() => onSignIn?.()}
                  variant="ghost"
                  className="hidden lg:inline-flex font-medium"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onSignIn?.()}
                  className="hidden lg:inline-flex bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6 font-semibold"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <Button
                onClick={() => handleNavClick('profile')}
                className="hidden lg:inline-flex bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6 font-medium"
              >
                Profile
              </Button>
            )}

            {/* Mobile Profile Button */}
            {isSignedIn && (
              <button
                onClick={() => handleNavClick('profile')}
                className="lg:hidden relative"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#E5E7EB]">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            )}

            {/* Desktop Profile Button */}
            {isSignedIn && (
              <button
                onClick={() => handleNavClick('profile')}
                className="hidden lg:block relative"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E5E7EB] hover:border-[#00D9A3] transition-colors">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[#E5E7EB]">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left transition-colors font-medium py-2 ${activeSection === 'home' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Properties
              </button>
              <button
                onClick={() => handleNavClick('search')}
                className={`text-left transition-colors font-medium py-2 ${activeSection === 'search' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Search
              </button>
              <button
                onClick={() => handleNavClick('marketplace')}
                className={`text-left transition-colors font-medium py-2 ${activeSection === 'marketplace' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => handleNavClick('portfolio')}
                className={`text-left transition-colors font-medium py-2 ${activeSection === 'portfolio' ? 'text-[#00D9A3]' : 'text-[#6B7280] hover:text-[#00D9A3]'
                  }`}
              >
                Portfolio
              </button>
              <a href="#how-it-works" className="text-[#6B7280] hover:text-[#00D9A3] transition-colors font-medium py-2">
                How it works
              </a>
              <a href="#portfolio" className="text-[#6B7280] hover:text-[#00D9A3] transition-colors font-medium py-2">
                Portfolio
              </a>
              <a href="#about" className="text-[#6B7280] hover:text-[#00D9A3] transition-colors font-medium py-2">
                About
              </a>
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={() => onSignIn?.()}
                  variant="outline"
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onSignIn?.()}
                  className="w-full bg-[#00D9A3] hover:bg-[#00C293] text-white"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
