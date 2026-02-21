import { Search, ChevronDown, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddMoney: () => void;
}

export function Header({ activeTab, onTabChange, onAddMoney }: HeaderProps) {
  return (
    <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-[#F3F4F6] transition-all duration-300" style={{ height: '80px' }}>
      <div className="container-main h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-[#1E3D34] px-4 py-2 rounded-full flex items-center gap-2">
            <div className="w-6 h-6 bg-[#C5A572] rounded-sm"></div>
          </div>
          <span className="hidden md:block" style={{ fontSize: '18pt', fontWeight: '700', color: '#1E3D34' }}>Estate</span>
        </div>

        {/* Search & Tabs - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-2xl flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BDBDBD]" />
            <input
              type="text"
              placeholder="Search property or location…"
              className="w-full h-12 pl-12 pr-4 rounded-full border border-[#EEEEEE] bg-[#FAFAFA] transition-all focus:outline-none focus:border-[#C5A572] focus:bg-white"
              style={{ fontSize: '14pt' }}
            />
          </div>
          <div className="flex gap-6 px-2">
            {['All Properties', 'My Listings', 'History'].map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className="relative pb-1 transition-colors"
                style={{
                  fontSize: '14pt',
                  fontWeight: activeTab === tab ? '500' : '400',
                  color: activeTab === tab ? '#1E3D34' : '#6B7280'
                }}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A572] rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Search Icon */}
        <button className="lg:hidden p-2">
          <Search className="w-5 h-5 text-[#1E3D34]" />
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Wallet */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAFAFA] border border-[#EEEEEE]">
            <span style={{ fontSize: '14pt', fontWeight: '500', color: '#1E3D34' }}>₹ 1,25,000</span>
            <button
              onClick={onAddMoney}
              className="px-3 py-1 rounded-full bg-[#C5A572] text-white transition-all hover:bg-[#B59562]"
              style={{ fontSize: '12pt', fontWeight: '500' }}
            >
              <Plus className="w-3 h-3 inline mr-1" />
              Add
            </button>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar className="w-10 h-10 border-2 border-[#1E3D34]">
                  <AvatarFallback className="bg-[#1E3D34] text-white" style={{ fontSize: '14pt', fontWeight: '500' }}>AK</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-[#6B7280] hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem style={{ fontSize: '14pt' }}>Profile</DropdownMenuItem>
              <DropdownMenuItem style={{ fontSize: '14pt' }}>Settings</DropdownMenuItem>
              <DropdownMenuItem style={{ fontSize: '14pt', color: '#DC2626' }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden flex gap-4 px-6 pb-3 border-t border-[#EEEEEE] mt-3 pt-3">
        {['All', 'My Listings', 'History'].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab === 'All' ? 'All Properties' : tab)}
            className="relative pb-1 text-caption transition-colors"
            style={{
              fontWeight: activeTab === (tab === 'All' ? 'All Properties' : tab) ? '500' : '400',
              color: activeTab === (tab === 'All' ? 'All Properties' : tab) ? '#1E3D34' : '#6B7280'
            }}
          >
            {tab}
            {activeTab === (tab === 'All' ? 'All Properties' : tab) && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A572] rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
