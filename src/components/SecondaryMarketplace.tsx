import { useState, useMemo } from "react";
import { Filter, X, Search } from "lucide-react";
import { FilterSidebar, FilterState } from "./FilterSidebar";
import { MarketplacePropertyCard } from "./MarketplacePropertyCard";
import { YourListingCard } from "./YourListingCard";
import { FloatingActionButton } from "./FloatingActionButton";
import { PropertyDetailDrawer } from "./PropertyDetailDrawer";
import { BuyModal } from "./BuyModal";
import { SellModal } from "./SellModal";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface SecondaryMarketplaceProps {
  availableProperties: any[];
  yourListings: any[];
  onViewDetails: (id: string) => void;
}

const INITIAL_FILTERS: FilterState = {
  propertyTypes: [],
  roiRange: [0, 30],
  investmentRange: [10000, 1000000],
  location: "all",
  sortBy: "roi-high",
};

export function SecondaryMarketplace({ availableProperties, yourListings, onViewDetails }: SecondaryMarketplaceProps) {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [buyModalProperty, setBuyModalProperty] = useState<any>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const handleBuy = (propertyId: string) => {
    const property = availableProperties.find(p => p.id === propertyId);
    if (property) {
      setBuyModalProperty(property);
      setBuyModalOpen(true);
    }
  };

  const handleViewDetails = (propertyId: string) => {
    const property = availableProperties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setDetailDrawerOpen(true);
    }
  };

  const handleCancelListing = (listingId: string) => {
    toast.success('Listing cancelled successfully');
  };

  const handleBuyConfirm = (propertyId: string, amount: number) => {
    toast.success('Purchase successful!', {
      description: `You've invested ₹${amount.toLocaleString('en-IN')}`,
    });
    setBuyModalOpen(false);
  };

  const handleSellConfirm = (propertyId: string, amount: number) => {
    toast.success('Listing created!', {
      description: `Your shares worth ₹${amount.toLocaleString('en-IN')} are now listed for sale`,
    });
    setSellModalOpen(false);
  };

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return availableProperties.filter((property) => {
      // Search Query
      const matchesSearch =
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Property Type
      if (filters.propertyTypes.length > 0) {
        // Assume 'type' exists on property, or map title/features if needed. 
        // For now, let's assume property.type exists or we infer it.
        // If property doesn't have type, we might need to update App.tsx data or be loose.
        const type = property.type || "Residential"; // Default fallback
        if (!filters.propertyTypes.includes(type)) return false;
      }

      // ROI Range
      if (property.roi < filters.roiRange[0] || property.roi > filters.roiRange[1]) return false;

      // Investment/Price Range
      if (property.price < filters.investmentRange[0] || property.price > filters.investmentRange[1]) return false;

      // Location
      if (filters.location !== "all") {
        if (!property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case "roi-high": return b.roi - a.roi;
        case "roi-low": return a.roi - b.roi;
        case "price-high": return b.price - a.price;
        case "price-low": return a.price - b.price;
        case "newest": return 0; // Assuming no date field for now
        default: return 0;
      }
    });
  }, [availableProperties, filters, searchQuery]);

  const activeFilterCount =
    filters.propertyTypes.length +
    (filters.location !== "all" ? 1 : 0) +
    (filters.roiRange[0] > 0 || filters.roiRange[1] < 30 ? 1 : 0) +
    (filters.investmentRange[0] > 10000 || filters.investmentRange[1] < 1000000 ? 1 : 0);

  return (
    <section className="py-12 bg-[#FAFBFC] min-h-screen">
      <div className="container-stake">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h2>Marketplace</h2>
            <Badge className="bg-[#00D9A3]/10 text-[#00D9A3] border-[#00D9A3]/20">
              Live Trading
            </Badge>
          </div>
          <p className="text-body text-[#6B7280] max-w-3xl">
            Trade shares directly with other investors. All transactions are secure and transparent.
          </p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-24 w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={() => setFilters(INITIAL_FILTERS)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 mx-[10px] pl-4">
            {/* Tabs and Filter Button Row */}
            <div className="mb-6 flex flex-col gap-4">
              {/* Search Bar - Added as part of functionality */}
              <div className="relative">
                <Input
                  placeholder="Search properties by name or location..."
                  className="pl-10 h-12 bg-white border-[#E5E7EB] text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              </div>

              <div className="flex-1 min-w-0 lg:w-full">
                <Tabs defaultValue="available" className="w-full">
                  <TabsList className="w-full bg-white p-2.5 rounded-full border-2 border-[#00D9A3]/20 grid grid-cols-2 gap-2 h-20">
                    <TabsTrigger
                      value="available"
                      className="data-[state=active]:bg-[#00D9A3] data-[state=active]:text-white rounded-full py-3 font-semibold transition-all h-full"
                    >
                      Available
                    </TabsTrigger>
                    <TabsTrigger
                      value="your-listings"
                      className="data-[state=active]:bg-[#00D9A3] data-[state=active]:text-white rounded-full py-3 font-semibold transition-all h-full"
                    >
                      Your Listings
                      {yourListings.length > 0 && (
                        <Badge className="ml-2 bg-[#EF4444] text-white px-1.5 py-0.5 text-xs h-5 min-w-[20px] rounded-full">
                          {yourListings.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="available" className="mt-6">
                    {/* Active Filters Summary */}
                    {activeFilterCount > 0 && (
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {filters.location !== "all" && (
                            <Badge variant="outline" className="bg-white px-3 py-1 flex items-center gap-2">
                              Loc: {filters.location}
                              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, location: 'all' }))} />
                            </Badge>
                          )}
                          {filters.propertyTypes.map(type => (
                            <Badge key={type} variant="outline" className="bg-white px-3 py-1 flex items-center gap-2">
                              {type}
                              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, propertyTypes: f.propertyTypes.filter(t => t !== type) }))} />
                            </Badge>
                          ))}
                          {(filters.roiRange[0] > 0 || filters.roiRange[1] < 30) && (
                            <Badge variant="outline" className="bg-white px-3 py-1 flex items-center gap-2">
                              ROI: {filters.roiRange[0]}-{filters.roiRange[1]}%
                              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(f => ({ ...f, roiRange: [0, 30] }))} />
                            </Badge>
                          )}
                          <button
                            onClick={() => setFilters(INITIAL_FILTERS)}
                            className="text-sm text-[#00D9A3] hover:underline font-medium"
                          >
                            Clear all
                          </button>
                        </div>

                        <button
                          onClick={() => setMobileFilterOpen(true)}
                          className="lg:hidden w-10 h-10 rounded-full border-2 border-[#E5E7EB] hover:border-[#00D9A3] flex items-center justify-center transition-colors flex-shrink-0"
                        >
                          <Filter className="w-5 h-5 text-[#6B7280]" />
                        </button>
                      </div>
                    )}

                    {/* Listings Grid */}
                    {filteredProperties.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                          <MarketplacePropertyCard
                            key={property.id}
                            {...property}
                            onBuy={handleBuy}
                            onViewDetails={onViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <Button
                          variant="link"
                          className="mt-2 text-[#00D9A3]"
                          onClick={() => {
                            setFilters(INITIAL_FILTERS);
                            setSearchQuery("");
                          }}
                        >
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="your-listings" className="mt-6">
                    {yourListings.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {yourListings.map((property) => (
                          <YourListingCard
                            key={property.id}
                            {...property}
                            onCancel={handleCancelListing}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-10 h-10 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[#0A0F1E] mb-2">No Active Listings</h3>
                        <p className="text-[#6B7280] mb-6">You don't have any active listings in the marketplace</p>
                        <Button
                          onClick={() => setSellModalOpen(true)}
                          className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6"
                        >
                          Sell Shares
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setSellModalOpen(true)} />

      {/* Mobile Filter Drawer */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={() => setFilters(INITIAL_FILTERS)}
            onClose={() => setMobileFilterOpen(false)}
            isMobile
          />
        </SheetContent>
      </Sheet>

      {/* Property Detail Drawer */}
      <PropertyDetailDrawer
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        property={selectedProperty}
        onBuy={handleBuy}
      />

      {/* Buy Modal */}
      <BuyModal
        open={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        property={buyModalProperty}
        onConfirm={handleBuyConfirm}
        onViewDetails={handleViewDetails}
      />

      {/* Sell Modal */}
      <SellModal
        open={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onConfirm={handleSellConfirm}
      />
    </section>
  );
}
