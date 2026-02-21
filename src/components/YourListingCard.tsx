import { MapPin, TrendingUp, Home, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface YourListingCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  expectedReturn: number;
  rentalYield: number;
  askingPrice: number;
  totalValue: number;
  soldPercentage: number;
  totalRentEarned: number;
  onCancel: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function YourListingCard({
  id,
  image,
  title,
  location,
  expectedReturn,
  rentalYield,
  askingPrice,
  totalValue,
  soldPercentage,
  totalRentEarned,
  onCancel,
  onViewDetails,
}: YourListingCardProps) {
  return (
    <div
      className="card-stake cursor-pointer group"
      onClick={() => onViewDetails(id)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-[#00D9A3] text-white border-none shadow-lg">
          Your Listing
        </Badge>
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

        {/* Asking Price */}
        <div className="bg-[#F9FAFB] rounded-lg p-3 mb-4 border border-[#E5E7EB]">
          <div className="text-xs text-[#6B7280] mb-1">Asking Price</div>
          <div className="text-xl font-bold text-[#0A0F1E]">₹{(askingPrice / 1000).toFixed(0)}K</div>
        </div>

        {/* Returns & Rent */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            <div>
              <div className="text-xs text-[#6B7280]">Total Return</div>
              <div className="text-base font-bold text-[#10B981]">{expectedReturn}%</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-[#00D9A3]" />
            <div>
              <div className="text-xs text-[#6B7280]">Rent Earned</div>
              <div className="text-base font-bold text-[#0A0F1E]">₹{(totalRentEarned / 1000).toFixed(1)}K</div>
            </div>
          </div>
        </div>

        {/* Sold Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#0A0F1E]">
              {soldPercentage}% Sold
            </span>
            <span className="text-xs text-[#6B7280]">
              ₹{((totalValue * soldPercentage) / 100 / 1000).toFixed(0)}K of ₹{(totalValue / 1000).toFixed(0)}K
            </span>
          </div>
          <Progress value={soldPercentage} className="h-2" />
        </div>

        {/* CTA */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onCancel(id);
          }}
          variant="outline"
          className="w-full border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-full font-semibold"
        >
          Cancel Listing
        </Button>
      </div>
    </div>
  );
}
