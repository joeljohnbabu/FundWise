import { 
  Settings, 
  Shield, 
  FileCheck, 
  Info, 
  HelpCircle, 
  FileText, 
  Gift, 
  MessageSquare, 
  Calculator,
  LogOut,
  ChevronRight,
  User,
  Edit2
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProfileProps {
  onBack: () => void;
  isSignedIn: boolean;
  onSignOut: () => void;
  onSignIn: () => void;
}

export function Profile({ onBack, isSignedIn, onSignOut, onSignIn }: ProfileProps) {
  const userInitials = "JD";
  const userName = "JOHN DOE";
  const userEmail = "john.doe@email.com";

  const menuSections = [
    {
      items: [
        { icon: Settings, label: "Settings", onClick: () => console.log("Settings"), color: "#00D9A3" },
        { icon: Shield, label: "Security & privacy", onClick: () => console.log("Security"), color: "#00D9A3" },
        { icon: FileCheck, label: "KYC", onClick: () => console.log("KYC"), color: "#00D9A3" },
      ]
    },
    {
      items: [
        { icon: Info, label: "About FundWise", onClick: () => console.log("About"), color: "#00D9A3" },
        { icon: HelpCircle, label: "Help center", onClick: () => console.log("Help"), color: "#00D9A3" },
        { icon: FileText, label: "Documents", onClick: () => console.log("Documents"), badge: "NEW", color: "#00D9A3" },
      ]
    },
    {
      items: [
        { icon: Gift, label: "Refer a friend", onClick: () => console.log("Refer"), color: "#00D9A3" },
        { icon: MessageSquare, label: "Feedback", onClick: () => console.log("Feedback"), color: "#00D9A3" },
      ]
    }
  ];

  // Guest menu sections (when not signed in)
  const guestMenuSections = [
    {
      items: [
        { icon: Info, label: "About FundWise", onClick: () => console.log("About"), color: "#00D9A3" },
        { icon: HelpCircle, label: "Help center", onClick: () => console.log("Help"), color: "#00D9A3" },
        { icon: FileText, label: "Documentation", onClick: () => console.log("Documents"), color: "#00D9A3" },
      ]
    }
  ];

  const handleSignOut = () => {
    onSignOut();
    onBack();
  };

  if (!isSignedIn) {
    // Guest Profile View
    return (
      <div className="min-h-screen bg-[#F9FAFB] pb-32">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#0A0F1E] rotate-180" />
            </button>
            <h1 className="font-semibold text-[#0A0F1E] absolute left-1/2 -translate-x-1/2">Profile</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {/* Guest Welcome Card */}
          <div className="bg-gradient-to-br from-[#00D9A3] to-[#00C293] rounded-2xl p-8 text-white">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-semibold mb-2">Welcome to FundWise</h2>
              <p className="text-white/90 text-sm mb-6 max-w-md">
                Sign in to start investing in premium real estate properties and track your portfolio
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button
                  onClick={onSignIn}
                  className="flex-1 bg-white text-[#00D9A3] hover:bg-white/90 rounded-full h-12 font-medium"
                >
                  Sign In
                </Button>
                <Button
                  onClick={onSignIn}
                  variant="outline"
                  className="flex-1 border-2 border-white text-white hover:bg-white/10 hover:text-white rounded-full h-12 font-medium"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Guest Menu Sections */}
          {guestMenuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="font-medium text-[#0A0F1E]">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
                  </button>
                  {itemIndex < section.items.length - 1 && (
                    <div className="h-px bg-[#E5E7EB] mx-6" />
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            <button
              onClick={() => console.log("Calculator")}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-[#00D9A3]" />
                <span className="font-medium text-[#0A0F1E]">Calculate my potential</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>

          {/* App Version */}
          <div className="text-center pt-4">
            <p className="text-sm text-[#9CA3AF]">Version 1.0.0</p>
          </div>
        </div>
      </div>
    );
  }

  // Signed In Profile View
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32">
      {/* Header - Username, Avatar & Edit */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00D9A3] to-[#00C293] rounded-full flex items-center justify-center">
              <span className="font-semibold text-white">{userInitials}</span>
            </div>
            <div>
              <h2 className="text-[#0A0F1E] text-[24px]">{userName}</h2>
              <p className="text-sm text-[#6B7280]">{userEmail}</p>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors">
            <Edit2 className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <button
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    <span className="font-medium text-[#0A0F1E]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge className="bg-[#00D9A3]/10 text-[#00D9A3] border-0 hover:bg-[#00D9A3]/10">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
                  </div>
                </button>
                {itemIndex < section.items.length - 1 && (
                  <div className="h-px bg-[#E5E7EB] mx-6" />
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <button
            onClick={() => console.log("Calculator")}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calculator className="w-5 h-5 text-[#00D9A3]" />
              <span className="font-medium text-[#0A0F1E]">Calculate my potential</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl border-2 border-[#E5E7EB] hover:border-red-500 hover:bg-white text-[#0A0F1E] hover:text-red-500 font-medium transition-colors"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Auth Test Button - For Testing Only */}
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl border-2 border-[#E5E7EB] hover:border-[#00D9A3] hover:bg-white text-[#6B7280] font-medium transition-colors"
            onClick={() => {
              onSignOut();
              setTimeout(() => onSignIn(), 100);
            }}
          >
            Test Authentication
          </Button>
        </div>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-sm text-[#9CA3AF]">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
