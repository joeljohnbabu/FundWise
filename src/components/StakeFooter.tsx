import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export function FundwiseFooter() {
  return (
    <footer className="bg-[#0A0F1E] text-white pt-16 pb-8">
      <div className="container-stake">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#00D9A3] rounded-lg"></div>
              <span className="font-semibold text-xl">fundwise</span>
            </div>
            <p className="text-[#9CA3AF] mb-6 max-w-sm">
              India's leading fractional real estate investment platform. Invest in premium properties starting from ₹10,000.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00D9A3] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00D9A3] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00D9A3] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00D9A3] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">About Us</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Press</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">How it Works</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">FAQs</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Risk Disclosure</a></li>
              <li><a href="#" className="text-[#9CA3AF] hover:text-[#00D9A3] transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9CA3AF]">
            © 2025 fundwise. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Mail className="w-4 h-4" />
            <a href="mailto:support@stake.co.in" className="hover:text-[#00D9A3] transition-colors">
              support@stake.co.in
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-xs text-[#6B7280] leading-relaxed">
            <strong>Disclaimer:</strong> Investments in real estate are subject to market risks. Past performance is not indicative of future returns. Please read all scheme-related documents carefully before investing. fundwise is a registered platform operating under applicable regulatory frameworks. This is not an offer to sell or a solicitation to buy securities.
          </p>
        </div>
      </div>
    </footer>
  );
}
