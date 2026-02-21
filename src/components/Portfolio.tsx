import {
  TrendingUp,
  Wallet,
  DollarSign,
  PieChart,
  Building2,
  Briefcase,
} from "lucide-react";
import { PortfolioPropertyCard } from "./PortfolioPropertyCard";
import { Button } from "./ui/button";

interface PortfolioProps {
  summary: {
    networth: number;
    invested: number;
    returns: number;
    returnsPercentage?: number;
    currentValue?: number;
    rentEarned: number;
    walletBalance: number;
  };
  properties: any[];
  onSell: (id: string) => void;
  onBuyMore: (id: string) => void;
  onViewDetails: (id: string) => void;
  onNavigateToWallet: () => void;
}

export function Portfolio({
  summary,
  properties,
  onSell,
  onBuyMore,
  onViewDetails,
  onNavigateToWallet,
}: PortfolioProps) {
  const currentValue = summary.currentValue || summary.networth;
  const returnsPercentage =
    summary.returnsPercentage ||
    ((summary.networth - summary.invested) / summary.invested) *
      100;

  return (
    <section className="py-12 bg-[#FAFBFC] min-h-screen">
      <div className="container-stake">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="mb-2">Portfolio</h2>
          <p className="text-body text-[#6B7280]">
            Track your real estate investments and performance
          </p>
        </div>

        {/* Summary Card - Golden Ratio Design */}
        <div className="bg-gradient-to-br from-white to-[#F9FAFB] rounded-3xl p-8 border border-[#E5E7EB] mb-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[#6B7280] mb-2">
                Portfolio Value
              </p>
              <h2 className="mb-1">
                ₹{currentValue.toLocaleString()}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-[#00D9A3]/10 rounded-full">
                  <TrendingUp className="w-4 h-4 text-[#00D9A3]" />
                  <span className="text-sm font-medium text-[#00D9A3]">
                    +{summary.returns.toLocaleString()} (
                    {returnsPercentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-[#00D9A3]" />
                  </div>
                  <span className="text-sm text-[#6B7280]">
                    Invested
                  </span>
                </div>
                <p className="font-semibold text-[#0A0F1E] text-left">
                  ₹{summary.invested.toLocaleString()}
                </p>
              </div>

              <div className="mx-[3px] my-[0px] m-[0px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-[#00D9A3]" />
                  </div>
                  <span className="text-sm text-[#6B7280] p-[0px] mx-[3px] my-[0px]">
                    Rent
                  </span>
                </div>
                <p className="font-semibold text-[#0A0F1E] text-left">
                  ₹{summary.rentEarned.toLocaleString()}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#00D9A3]" />
                  </div>
                  <span className="text-sm text-[#6B7280]">
                    Returns
                  </span>
                </div>
                <p className="font-semibold text-[#0A0F1E] text-left">
                  ₹{summary.returns.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00D9A3]/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#00D9A3]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280] mb-1">
                  Wallet Balance
                </p>
                <p className="text-xl font-semibold text-[#0A0F1E]">
                  ₹{summary.walletBalance.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToWallet}
              className="h-12 px-6 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-2xl font-medium transition-colors flex items-center gap-2"
            >
              Manage Wallet
            </button>
          </div>
        </div>

        {/* Wallet Card - Removed duplicate, now in summary card */}
        <div
          className="bg-white border-2 border-[#E5E7EB] rounded-lg p-5 mb-8"
          style={{ display: "none" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#00D9A3]" />
              <span className="font-semibold text-[#0A0F1E]">
                Wallet Balance
              </span>
            </div>
            <span
              className="font-bold text-[#0A0F1E]"
              style={{ fontSize: "24px" }}
            >
              ₹{summary.walletBalance.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#10B981]">
              ✓ Available for investment
            </span>
            <Button
              variant="outline"
              size="sm"
              className="text-[#00D9A3] border-[#00D9A3] hover:bg-[#00D9A3] hover:text-white rounded-full"
              onClick={onNavigateToWallet}
            >
              Manage Wallet
            </Button>
          </div>
        </div>

        {/* Properties Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#0A0F1E]">
            Your Properties
          </h3>
          <p className="text-sm text-[#6B7280] mt-1">
            {properties.length} properties owned
          </p>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PortfolioPropertyCard
                key={property.id}
                {...property}
                onSell={onSell}
                onBuyMore={onBuyMore}
                onViewDetails={(id) => onViewDetails?.(id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
            <div className="w-20 h-20 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-10 h-10 text-[#9CA3AF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#0A0F1E] mb-2">
              No Properties Yet
            </h3>
            <p className="text-[#6B7280] mb-6">
              Start investing in premium real estate properties
            </p>
          </div>
        )}
      </div>
    </section>
  );
}