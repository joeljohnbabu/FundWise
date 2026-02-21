import { useState } from "react";
import { X, Wallet, Plus, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface BuyModalProps {
  open: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    sellerAmount?: number;
    image: string;
  } | null;
  onConfirm: (propertyId: string, amount: number) => void;
  onViewDetails?: (propertyId: string) => void;
}

export function BuyModal({ open, onClose, property, onConfirm, onViewDetails }: BuyModalProps) {
  const [amount, setAmount] = useState(property?.sellerAmount || 25000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const walletBalance = 125000;

  if (!property) return null;

  const totalPrice = amount;
  const remainingBalance = walletBalance - totalPrice;
  const canAfford = remainingBalance >= 0;

  const handleConfirm = async () => {
    if (!canAfford) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onConfirm(property.id, amount);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setAmount(property?.sellerAmount || 10000);
    setIsProcessing(false);
    setIsSuccess(false);
    onClose();
  };

  const askingPrice = property.sellerAmount || totalPrice;
  const marketPriceTotal = askingPrice / (1 + ((property.sellerPrice || property.price) - property.price) / property.price);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="max-h-[90vh] p-0 rounded-t-3xl">
        <SheetTitle className="sr-only">Purchase Shares</SheetTitle>
        <SheetDescription className="sr-only">
          Purchase shares in {property.title}. Select your investment amount and confirm your purchase.
        </SheetDescription>

        {!isSuccess ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 border-b border-[#E5E7EB] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="font-semibold text-[#0A0F1E] mb-2">Purchase Shares</h2>
                  <p className="text-[#6B7280] mb-1">{property.title}</p>
                  <p className="text-sm text-[#9CA3AF]">{property.location}</p>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors">
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                  <div className="text-xs text-[#6B7280] mb-1">Asking Price</div>
                  <div className="font-bold text-[#0A0F1E]" style={{ fontSize: '24px' }}>₹{(askingPrice / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                  <div className="text-xs text-[#6B7280] mb-1">Market Price</div>
                  <div className="font-bold text-[#0A0F1E]" style={{ fontSize: '24px' }}>₹{(marketPriceTotal / 1000).toFixed(0)}K</div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6 max-w-2xl mx-auto">
                {/* Amount Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-[#0A0F1E]">Investment Amount</label>
                    <span className="font-bold text-[#00D9A3]" style={{ fontSize: '20px' }}>
                      ₹{amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Slider 
                    value={[amount]} 
                    onValueChange={(value) => setAmount(value[0])}
                    max={askingPrice} 
                    min={10000}
                    step={1000} 
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-[#6B7280]">
                    <span>₹10K</span>
                    <span>₹{(askingPrice / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#0A0F1E]">Total Investment</span>
                    <span className="font-bold text-[#00D9A3]" style={{ fontSize: '24px' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Wallet Balance */}
                <div className="bg-white border-2 border-[#E5E7EB] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-[#00D9A3]" />
                      <span className="font-semibold text-[#0A0F1E]">Wallet Balance</span>
                    </div>
                    <span className="font-bold text-[#0A0F1E]">₹{walletBalance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: canAfford ? '#10B981' : '#EF4444' }}>
                      {canAfford ? '✓ Sufficient balance' : '✗ Insufficient balance'}
                    </span>
                    {!canAfford && (
                      <Button size="sm" variant="outline" className="text-[#00D9A3] border-[#00D9A3] hover:bg-[#00D9A3] hover:text-white rounded-full">
                        <Plus className="w-3 h-3 mr-1" />
                        Add Money
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="flex-shrink-0 border-t border-[#E5E7EB] p-6 bg-white">
              <Button
                onClick={handleConfirm}
                disabled={!canAfford || isProcessing}
                className="w-full h-12 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full font-semibold disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
              >
                {isProcessing ? 'Processing...' : 'Confirm Purchase'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#00D9A3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-[#00D9A3]" />
              </div>
              <h3 className="font-bold text-[#0A0F1E] mb-2" style={{ fontSize: '24px' }}>Purchase Successful!</h3>
              <p className="text-[#6B7280] mb-6">
                You've successfully invested ₹{amount.toLocaleString('en-IN')} in {property.title}
              </p>
              <Button
                onClick={handleClose}
                className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-8 font-semibold"
              >
                View in Portfolio
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
