import { X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface FilterState {
  propertyTypes: string[];
  roiRange: [number, number];
  investmentRange: [number, number];
  location: string;
  sortBy: string;
}

interface FilterSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  onClose,
  isMobile = false,
  filters,
  onFilterChange,
  onClearFilters
}: FilterSidebarProps) {

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.propertyTypes, type]
      : filters.propertyTypes.filter(t => t !== type);
    onFilterChange({ ...filters, propertyTypes: newTypes });
  };

  return (
    <aside className={`${isMobile ? 'w-full' : 'w-[280px]'} ${isMobile ? 'p-6' : 'p-0'} flex flex-col gap-4`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-[#0A0F1E]">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Property Type */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
        <h4 className="text-sm font-semibold text-[#0A0F1E] mb-4">Property Type</h4>
        <div className="space-y-3">
          {['Residential', 'Commercial', 'Industrial', 'Land', 'Retail'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                id={type}
                className="border-[#E5E7EB]"
                checked={filters.propertyTypes.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <span className="text-sm text-[#6B7280] group-hover:text-[#0A0F1E] transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ROI Range */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-[#0A0F1E]">ROI Range</h4>
          <span className="text-xs font-semibold text-[#00D9A3]">
            {filters.roiRange[0]}% - {filters.roiRange[1]}%
          </span>
        </div>
        <Slider
          value={filters.roiRange}
          onValueChange={(val) => onFilterChange({ ...filters, roiRange: val as [number, number] })}
          max={30}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-[#9CA3AF]">
          <span>0%</span>
          <span>30%</span>
        </div>
      </div>

      {/* Investment Amount */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-[#0A0F1E]">Price Range</h4>
          <span className="text-xs font-semibold text-[#00D9A3]">
            ₹{(filters.investmentRange[0] / 1000).toFixed(0)}k - ₹{(filters.investmentRange[1] / 1000).toFixed(0)}k
          </span>
        </div>
        <Slider
          value={filters.investmentRange}
          onValueChange={(val) => onFilterChange({ ...filters, investmentRange: val as [number, number] })}
          min={10000}
          max={1000000}
          step={5000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-[#9CA3AF]">
          <span>₹10k</span>
          <span>₹10L</span>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
        <h4 className="text-sm font-semibold text-[#0A0F1E] mb-3">Location</h4>
        <Select
          value={filters.location}
          onValueChange={(val) => onFilterChange({ ...filters, location: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
        <h4 className="text-sm font-semibold text-[#0A0F1E] mb-3">Sort By</h4>
        <Select
          value={filters.sortBy}
          onValueChange={(val) => onFilterChange({ ...filters, sortBy: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="roi-high">ROI: High to Low</SelectItem>
            <SelectItem value="roi-low">ROI: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button
        variant="ghost"
        onClick={onClearFilters}
        className="mt-2 text-[#6B7280] hover:text-[#00D9A3] hover:bg-[#F9FAFB]"
      >
        Clear All Filters
      </Button>
    </aside>
  );
}
