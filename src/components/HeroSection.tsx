import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F9FAFB] pt-20 pb-32">
      <div className="container-stake">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-[#00D9A3]/10 text-[#00D9A3] border-[#00D9A3]/20 hover:bg-[#00D9A3]/20 px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Avg. returns of 12.5% annually
          </Badge>

          {/* Heading */}
          <h1 className="mb-6 bg-gradient-to-r from-[#0A0F1E] to-[#1A1F2E] bg-clip-text text-transparent">
            Invest in premium real estate, starting from ₹10,000
          </h1>

          {/* Subheading */}
          <p className="text-body-lg text-[#6B7280] mb-10 max-w-2xl mx-auto">
            Fractional ownership in high-yield commercial properties. Earn rental income and capital appreciation with complete transparency.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-[#00D9A3]/20">
              Explore Properties
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold border-2">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-[#0A0F1E] mb-2">₹500Cr+</div>
              <div className="text-sm text-[#6B7280]">Assets under management</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0A0F1E] mb-2">25K+</div>
              <div className="text-sm text-[#6B7280]">Active investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0A0F1E] mb-2">12.5%</div>
              <div className="text-sm text-[#6B7280]">Average annual return</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9A3]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D9A3]/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
