import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { StakePropertyCard } from "./StakePropertyCard";
import { MarketplacePropertyCard } from "./MarketplacePropertyCard";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent } from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SearchResultsProps {
  searchQuery: string;
  primaryProperties: any[];
  secondaryProperties: any[];
  onPropertyClick: (id: string) => void;
  onBuy: (id: string) => void;
  onViewDetails: (id: string) => void;
  onSearch?: (query: string) => void;
}

export function SearchResults({
  searchQuery,
  primaryProperties,
  secondaryProperties,
  onPropertyClick,
  onBuy,
  onViewDetails,
  onSearch,
}: SearchResultsProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim() && onSearch) {
      onSearch(localSearchQuery);
    }
  };

  const investCount = primaryProperties.length;
  const marketplaceCount = secondaryProperties.length;

  return (
    <section className="py-12 bg-[#FAFBFC] min-h-screen">
      <div className="container-stake">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search properties by location, type, or name..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-32 rounded-full border-2 border-[#E5E7EB] bg-white transition-all focus:outline-none focus:border-[#00D9A3] text-base"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6 font-semibold"
            >
              Search
            </Button>
          </form>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#0A0F1E] mb-1">
                  {investCount + marketplaceCount} Listings
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Search term: {searchQuery || 'All properties'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setMobileFilterOpen(true)}
                className="rounded-full border-2 lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="w-full bg-white p-2.5 rounded-full border-2 border-[#00D9A3]/20 grid grid-cols-2 gap-2">
                <TabsTrigger 
                  value="available" 
                  className="data-[state=active]:bg-[#00D9A3] data-[state=active]:text-white rounded-full py-3 font-semibold transition-all relative"
                >
                  Invest
                  <Badge className="ml-2 bg-[#10B981] text-white px-2 py-0.5 text-xs h-5 min-w-[24px] rounded-full">
                    {investCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="marketplace"
                  className="data-[state=active]:bg-[#00D9A3] data-[state=active]:text-white rounded-full py-3 font-semibold transition-all relative"
                >
                  Marketplace
                  <Badge className="ml-2 bg-[#10B981] text-white px-2 py-0.5 text-xs h-5 min-w-[24px] rounded-full">
                    {marketplaceCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {primaryProperties.map((property) => (
                    <StakePropertyCard
                      key={property.id}
                      {...property}
                      onClick={onPropertyClick}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="marketplace" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {secondaryProperties.map((property) => (
                    <MarketplacePropertyCard
                      key={property.id}
                      {...property}
                      onBuy={onBuy}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          <FilterSidebar onClose={() => setMobileFilterOpen(false)} isMobile />
        </SheetContent>
      </Sheet>
    </section>
  );
}
