import { MapPin, TrendingUp, Home, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PortfolioPropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  status: "funding" | "funded" | "sold";
  invested: number;
  currentValue: number;
  totalRentEarned: number;
  roi: number;
  onSell: (id: string) => void;
  onBuyMore: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function PortfolioPropertyCard({
  id,
  image,
  title,
  location,
  status,
  invested,
  currentValue,
  totalRentEarned,
  roi,
  onSell,
  onBuyMore,
  onViewDetails,
}: PortfolioPropertyCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "funding":
        return <Badge className="bg-blue-100 text-blue-600 border-none">Funding</Badge>;
      case "funded":
        return <Badge className="bg-[#00D9A3]/10 text-[#00D9A3] border-none">Funded</Badge>;
      case "sold":
        return <Badge className="bg-green-100 text-green-600 border-none">Sold</Badge>;
    }
  };

  const returnsPercentage = ((currentValue - invested) / invested) * 100;

  return (
    <div
      className="card-stake cursor-pointer group"
      onClick={() => onViewDetails?.(id)}
    >
      {/* Image */}
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
        <div className="absolute top-4 left-4">
          {getStatusBadge()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <h3 className="font-semibold text-[#0A0F1E] mb-1 group-hover:text-[#00D9A3] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-[#6B7280] mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Investment Summary */}
        <div className="flex items-center justify-between mb-4 pb-[16px] border-b border-[#E5E7EB] pt-[0px] pr-[30px] pl-[20px]">
          <div>
            <div className="text-xs text-[#6B7280] mb-1">Invested</div>
            <div className="font-bold text-[#0A0F1E]">₹{(invested / 1000).toFixed(0)}K</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#6B7280] mb-1">Current Value</div>
            <div className="font-bold text-[#00D9A3]">₹{(currentValue / 1000).toFixed(0)}K</div>
          </div>
        </div>

        {/* Metrics - 3 in one line */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-[#E5E7EB]">
          <div className="flex-1 text-center">
            <div className="text-xs text-[#6B7280] mb-1">Appreciation</div>
            <div className={`font-bold ${returnsPercentage >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {returnsPercentage >= 0 ? '+' : ''}{returnsPercentage.toFixed(1)}%
            </div>
          </div>
          <div className="w-px h-10 bg-[#E5E7EB]"></div>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#6B7280] mb-1">Rental Yield</div>
            <div className="font-bold text-[#0A0F1E]">
              {((totalRentEarned / invested) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="w-px h-10 bg-[#E5E7EB]"></div>
          <div className="flex-1 text-center">
            <div className="text-xs text-[#6B7280] mb-1">Rent Earned</div>
            <div className="font-bold text-[#0A0F1E]">₹{(totalRentEarned / 1000).toFixed(1)}K</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSell(id);
            }}
            variant="outline"
            className="border-2 border-[#E5E7EB] hover:border-[#00D9A3] hover:text-[#00D9A3] rounded-full font-semibold"
          >
            Sell
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onBuyMore(id);
            }}
            className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full font-semibold"
          >
            Buy More
          </Button>
        </div>
      </div>
    </div>
  );
}
