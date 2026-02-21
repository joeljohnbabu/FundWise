import { MapPin, TrendingUp, Users, Calendar, Home, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface StakePropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  type: string;
  expectedReturn: number;
  rentalYield: number;
  minInvestment: number;
  totalValue: number;
  fundedPercentage: number;
  investors: number;
  timeLeft: string;
  featured?: boolean;
  onClick?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function StakePropertyCard({
  id,
  image,
  title,
  location,
  type,
  expectedReturn,
  rentalYield,
  minInvestment,
  totalValue,
  fundedPercentage,
  investors,
  timeLeft,
  featured = false,
  onClick,
  onViewDetails,
}: StakePropertyCardProps) {
  return (
    <div
      className="card-stake cursor-pointer group"
      onClick={() => onClick?.(id)}
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
        {featured && (
          <Badge className="absolute top-4 left-4 bg-[#00D9A3] text-white border-none shadow-lg">
            Featured
          </Badge>
        )}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-xs font-semibold text-[#0A0F1E]">{type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Location */}
        <h3 className="text-xl font-semibold text-[#0A0F1E] mb-2 group-hover:text-[#00D9A3] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-[#6B7280] mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Returns */}
        <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-[#E5E7EB]">
          <div>
            <div className="text-xs text-[#6B7280] mb-1">Total Return</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-base font-bold text-[#10B981]">{expectedReturn}%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-[#6B7280] mb-1">Rental Yield</div>
            <div className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#00D9A3]" />
              <span className="text-base font-bold text-[#0A0F1E]">{rentalYield}%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-[#6B7280] mb-1">Appreciation</div>
            <div className="text-base font-bold text-[#00D9A3]">{(expectedReturn - rentalYield).toFixed(1)}%</div>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#0A0F1E]">
              {fundedPercentage}% Funded
            </span>
            <span className="text-xs text-[#6B7280]">
              ₹{(totalValue * fundedPercentage / 100 / 10000000).toFixed(1)}Cr of ₹{(totalValue / 10000000).toFixed(1)}Cr
            </span>
          </div>
          <Progress value={fundedPercentage} className="h-2" />
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-5 text-sm text-[#6B7280]">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{investors} investors</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{timeLeft} left</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
          <div>
            <div className="text-xs text-[#6B7280] mb-1">Total Price</div>
            <div className="text-lg font-bold text-[#0A0F1E]">
              ₹{(totalValue / 10000000).toFixed(1)}Cr
            </div>
          </div>
          <Button className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-6 font-semibold">
            Invest Now
          </Button>
        </div>
      </div>
    </div>
  );
}
