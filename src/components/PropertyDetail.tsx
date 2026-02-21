import { useState } from "react";
import { ArrowLeft, MapPin, TrendingUp, Users, Building2, Maximize2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

interface PropertyDetailProps {
  property: {
    id: string;
    title: string;
    location: string;
    roi: number;
    price: number;
    image: string;
    appreciation: number;
    rentalYield: number;
    totalValue: number;
    fundedPercentage: number;
    availableAmount: number;
    beds?: number;
    baths?: number;
    sqft?: number;
    yearBuilt?: number;
    propertyType?: string;
  } | null;
  onBack: () => void;
  onBuy: (id: string) => void;
}

const mockImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14711?w=800&q=80"
];

export function PropertyDetail({ property, onBack, onBuy }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(50000);

  if (!property) return null;

  const projectedValue5Year = investmentAmount * (1 + property.roi / 100);
  const projectedGain = projectedValue5Year - investmentAmount;
  const projectedPercentGain = (projectedGain / investmentAmount) * 100;
  const annualRentalIncome = (investmentAmount * (property.rentalYield || 8)) / 100;
  const totalReturn5Year = projectedGain + (annualRentalIncome * 5);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockImages.length) % mockImages.length);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] transition-colors flex-shrink-0 text-[36px]"
            >
              <ArrowLeft className="w-5 h-5 text-[#0A0F1E]" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-[#0A0F1E] truncate text-[24px]">{property.title}</h1>
              <div className="flex items-center gap-1.5 text-[#6B7280] mt-1">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-sm truncate">{property.location}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => onBuy(property.id)}
            className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6 font-semibold ml-4 hidden lg:flex"
          >
            Invest Now
          </Button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative aspect-[16/9] bg-gray-100">
        <img
          src={mockImages[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#0A0F1E]" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-[#0A0F1E]" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {mockImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Property Details */}
        {(property.beds || property.baths || property.sqft) && (
          <div className="flex items-center gap-6 text-[#6B7280] pb-4 border-b border-[#E5E7EB]">
            {property.beds && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{property.beds} Bed</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{property.baths} Bath</span>
              </div>
            )}
            {property.sqft && (
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4" />
                <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
              </div>
            )}
            {property.yearBuilt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Built {property.yearBuilt}</span>
              </div>
            )}
          </div>
        )}

        {/* Price & Funding Progress */}
        <div className="bg-[#F9FAFB] rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#6B7280] mb-1">Property Value</div>
              <div className="font-bold text-[#0A0F1E]" style={{ fontSize: '32px', lineHeight: '1' }}>
                ₹{(property.totalValue / 100000).toFixed(1)}L
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#6B7280] mb-1">Price per sqft</div>
              <div className="font-bold text-[#0A0F1E]">
                ₹{property.sqft ? Math.round(property.totalValue / property.sqft).toLocaleString() : '2,224'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <Progress value={property.fundedPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#10B981]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{property.fundedPercentage}% funded</span>
            </div>
            <span className="text-sm text-[#6B7280]">
              ₹{(property.availableAmount / 1000).toFixed(0)}K available
            </span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-[#D1F4E8] rounded-xl p-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#00D9A3] border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-[#00C293] border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-[#00B283] border-2 border-white" />
          </div>
          <p className="text-sm text-[#10B981] font-medium">
            1,010 investors have invested in this property
          </p>
        </div>

        {/* Investment Returns */}
        <div className="bg-[#F9FAFB] rounded-xl p-5 border border-[#E5E7EB]">
          <h3 className="font-semibold text-[#0A0F1E] mb-4">Investment Returns</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">5 year total return</span>
              <div className="text-right">
                <div className="font-bold text-[#0A0F1E]">{property.roi.toFixed(2)}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Yearly investment return</span>
              <div className="text-right">
                <div className="font-bold text-[#0A0F1E]">{(property.roi / 5).toFixed(2)}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Projected rental yield</span>
              <div className="text-right">
                <div className="font-bold text-[#0A0F1E]">{(property.rentalYield || 8).toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Calculator */}
        <div className="border-2 border-[#E5E7EB] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#00D9A3]" />
            </div>
            <h3 className="font-semibold text-[#0A0F1E]">Investment Calculator</h3>
          </div>

          {/* Investment Amount Slider */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[#6B7280]">Initial Investment</label>
              <span className="font-bold text-[#00D9A3]" style={{ fontSize: '20px' }}>
                ₹{investmentAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <Slider
              value={[investmentAmount]}
              onValueChange={(value) => setInvestmentAmount(value[0])}
              max={property.availableAmount}
              min={10000}
              step={5000}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-[#6B7280]">
              <span>₹10K</span>
              <span>₹{(property.availableAmount / 1000).toFixed(0)}K</span>
            </div>
          </div>

          {/* Projected Returns */}
          <div className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
            <div className="text-sm text-[#6B7280] mb-2 text-center">
              Projected investment value in 5 years
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bold text-[#0A0F1E]" style={{ fontSize: '28px' }}>
                ₹{projectedValue5Year.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <div className="bg-[#D1F4E8] px-2 py-1 rounded-full">
                <span className="text-xs font-medium text-[#10B981]">
                  +{projectedPercentGain.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
              <div className="text-xs text-[#6B7280] mb-1">Annual Income</div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-[#10B981]">
                  ₹{annualRentalIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
                <TrendingUp className="w-3 h-3 text-[#10B981]" />
              </div>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
              <div className="text-xs text-[#6B7280] mb-1">Appreciation</div>
              <div className="font-bold text-[#0A0F1E]">
                {(property.appreciation || 1.6).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Property Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full bg-[#F9FAFB] p-1 rounded-lg mb-4">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="financials" className="flex-1">Financials</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <h4 className="font-semibold text-[#0A0F1E] mb-2">About Property</h4>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Prime {property.propertyType || 'residential'} property located in {property.location}. 
                This asset offers excellent rental yields and strong appreciation potential. 
                The property features modern amenities, high-quality construction, and is in a 
                prime location with excellent connectivity.
              </p>
            </div>

            <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <h4 className="font-semibold text-[#0A0F1E] mb-3">Key Features</h4>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9A3] mt-1">✓</span>
                  <span>Prime location with excellent connectivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9A3] mt-1">✓</span>
                  <span>High rental demand area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9A3] mt-1">✓</span>
                  <span>Strong appreciation potential</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D9A3] mt-1">✓</span>
                  <span>Modern amenities and infrastructure</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
              <h4 className="font-semibold text-[#0A0F1E] mb-3">Investment Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B7280]">Total Property Value</span>
                  <span className="font-semibold text-[#0A0F1E]">
                    ₹{(property.totalValue / 100000).toFixed(2)}L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B7280]">Available for Investment</span>
                  <span className="font-semibold text-[#0A0F1E]">
                    ₹{(property.availableAmount / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B7280]">Expected ROI (5 years)</span>
                  <span className="font-semibold text-[#10B981]">{property.roi.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B7280]">Annual Rental Yield</span>
                  <span className="font-semibold text-[#10B981]">{property.rentalYield.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-3">
            {['Property Deed', 'Valuation Report', 'Inspection Certificate', 'Legal Documents'].map((doc, index) => (
              <div
                key={index}
                className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center justify-between hover:border-[#00D9A3] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#00D9A3]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#0A0F1E]">{doc}</div>
                    <div className="text-xs text-[#6B7280]">PDF · {(Math.random() * 3 + 1).toFixed(1)} MB</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#00D9A3]">
                  View
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-[#6B7280]">Starting from</div>
            <div className="font-bold text-[#0A0F1E]" style={{ fontSize: '20px' }}>
              ₹10,000
            </div>
          </div>
          <Button
            onClick={() => onBuy(property.id)}
            className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-8 h-12 font-semibold"
          >
            Invest Now
          </Button>
        </div>
      </div>
    </div>
  );
}
