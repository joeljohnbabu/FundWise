import { ArrowRight, TrendingUp, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface HeroSectionWithSearchProps {
  onSearch: (query: string) => void;
}

export function HeroSectionWithSearch({ onSearch }: HeroSectionWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F9FAFB] pt-[50px] pr-[0px] pb-[30px] pl-[0px]">
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

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search properties by location, type, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-32 rounded-full border-2 border-[#E5E7EB] bg-white transition-all focus:outline-none focus:border-[#00D9A3] text-base"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6 font-semibold"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9A3]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D9A3]/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
