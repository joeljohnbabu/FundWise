import { Home, Wallet, ShoppingBag, PieChart, User } from "lucide-react";

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: 'home' | 'marketplace' | 'portfolio' | 'wallet' | 'profile') => void;
  isSignedIn?: boolean;
}

export function BottomNav({ activeSection, onNavigate, isSignedIn = false }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 p-4">
      <div className="bg-white border border-[#E5E7EB]/50 rounded-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.08),0_-2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm">
        <nav className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`flex items-center justify-center p-3 rounded-xl transition-all ${
                  isActive ? 'bg-[#00D9A3]/10' : 'hover:bg-[#F9FAFB]'
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#00D9A3]' : 'text-[#6B7280]'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
