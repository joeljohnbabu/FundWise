import { MapPin, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  roi: number;
  price: number;
  image: string;
  isLive?: boolean;
  onBuy: (id: string) => void;
  onViewDetails: (id: string) => void;
}

// Generate mock sparkline data
const generateSparklineData = () => {
  const data = [];
  let value = 50 + Math.random() * 20;
  for (let i = 0; i < 20; i++) {
    value += (Math.random() - 0.5) * 10;
    data.push({ value: Math.max(30, Math.min(80, value)) });
  }
  return data;
};

export function PropertyCard({ 
  id, 
  title, 
  location, 
  roi, 
  price, 
  image, 
  isLive = false,
  onBuy,
  onViewDetails 
}: PropertyCardProps) {
  const sparklineData = generateSparklineData();

  return (
    <div className="card-base group relative overflow-hidden cursor-pointer" onClick={() => onViewDetails(id)}>
      {/* Image Area */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-[#C5A572] text-white border-none px-3 py-1 rounded-full shadow-lg">
            <span className="text-caption">LIVE</span>
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Location */}
        <h3 className="text-card-title mb-1" style={{ color: '#1E3D34' }}>{title}</h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-3.5 h-3.5" style={{ color: '#BDBDBD' }} />
          <span className="text-caption" style={{ color: '#6B7280' }}>{location}</span>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4" style={{ color: '#16A34A' }} />
              <span className="text-medium" style={{ color: '#16A34A', fontWeight: '600' }}>{roi}% ROI</span>
            </div>
            <span className="text-body" style={{ color: '#6B7280' }}>Last Trade</span>
          </div>
          <div className="text-right">
            <div className="text-medium" style={{ color: '#1E3D34', fontWeight: '600' }}>₹{price.toLocaleString('en-IN')}</div>
            <span className="text-caption" style={{ color: '#BDBDBD' }}>per fraction</span>
          </div>
        </div>

        {/* Sparkline & Button */}
        <div className="flex items-end justify-between gap-4 pt-4 border-t border-[#EEEEEE]">
          <div className="flex-1" style={{ height: '30px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#C5A572" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onBuy(id);
            }}
            className="bg-[#C5A572] hover:bg-[#B59562] text-white rounded-full px-6 shadow-md transition-all hover:shadow-lg"
            style={{ fontSize: '14pt', fontWeight: '500' }}
          >
            Buy
          </Button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E3D34]/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex items-end">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(id);
          }}
          className="w-full py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-colors"
          style={{ fontSize: '14pt', fontWeight: '500' }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
