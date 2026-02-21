import { MapPin, TrendingUp, Home, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface MarketplacePropertyCardProps {
  id: string;
  title: string;
  location: string;
  roi: number;
  price: number;
  image: string;
  isLive?: boolean;
  sellerAmount: number;
  sellerPrice: number;
  annualRent: number;
  appreciation: number;
  onBuy: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function MarketplacePropertyCard({ 
  id, 
  title, 
  location, 
  roi, 
  price, 
  image, 
  isLive = false,
  sellerAmount,
  sellerPrice,
  annualRent,
  appreciation,
  onBuy,
  onViewDetails 
}: MarketplacePropertyCardProps) {
  // Calculate percentage difference based on asking price
  const priceDifference = ((sellerAmount - (sellerAmount / (1 + (sellerPrice - price) / price))) / (sellerAmount / (1 + (sellerPrice - price) / price))) * 100;
  // Calculate market price from asking price and difference
  const marketPriceTotal = sellerAmount / (1 + priceDifference / 100);

  return (
    <div 
      className="card-stake cursor-pointer group"
      onClick={() => onViewDetails?.(id)}
    >
      {/* Image Area */}
      <div 
        className="relative aspect-video overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails?.(id);
        }}
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-[#00D9A3] text-white border-none shadow-lg">
            LIVE
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-semibold text-[#0A0F1E]">Secondary Market</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <h3 className="text-lg font-semibold text-[#0A0F1E] mb-2 group-hover:text-[#00D9A3] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-[#6B7280] mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Price Info */}
        <div className="bg-[#F9FAFB] rounded-lg p-4 mb-4 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-[#6B7280] mb-1">Asking Price</div>
              <div className="text-2xl font-bold text-[#0A0F1E]">₹{(sellerAmount / 1000).toFixed(0)}K</div>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
              priceDifference > 0 
                ? 'bg-orange-100 text-orange-600' 
                : priceDifference < 0 
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600'
            }`}>
              {priceDifference > 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : priceDifference < 0 ? (
                <ArrowDownRight className="w-3.5 h-3.5" />
              ) : null}
              <span className="text-xs font-bold">
                {priceDifference > 0 ? '+' : ''}{priceDifference.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="text-xs text-[#6B7280]">
            Market Price: <span className="font-semibold text-[#0A0F1E]">₹{(marketPriceTotal / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <div>
              <div className="text-xs text-[#6B7280]">Total Return</div>
              <div className="text-base font-bold text-[#10B981]">{roi}%</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Home className="w-4 h-4 text-[#00D9A3]" />
            <div>
              <div className="text-xs text-[#6B7280]">Annual Rent</div>
              <div className="text-base font-bold text-[#0A0F1E]">₹{(annualRent / 1000).toFixed(1)}K</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-[#6B7280]">Appreciation</div>
            <div className="text-base font-bold text-[#00D9A3]">{appreciation}%</div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onBuy(id);
          }}
          className="w-full bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full font-semibold"
        >
          Buy Shares
        </Button>
      </div>
    </div>
  );
}
