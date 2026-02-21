import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  availableBalance: number;
}

export function WithdrawModal({ open, onClose, availableBalance }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const minWithdrawal = 5000;

  const handleWithdraw = async () => {
    const amountNum = parseInt(amount);
    
    if (!amountNum || amountNum < minWithdrawal) {
      toast.error("Invalid amount", {
        description: `Minimum withdrawal amount is ₹${minWithdrawal.toLocaleString('en-IN')}`,
      });
      return;
    }

    if (amountNum > availableBalance) {
      toast.error("Insufficient balance", {
        description: "You don't have enough funds to withdraw this amount",
      });
      return;
    }

    setIsProcessing(true);
    // Simulate withdrawal processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Withdrawal requested!", {
      description: `₹${amountNum.toLocaleString('en-IN')} will be credited to your bank account in 1-3 business days`,
    });
    
    setIsProcessing(false);
    setAmount("");
    onClose();
  };

  const amountNum = parseInt(amount) || 0;
  const remainingBalance = availableBalance - amountNum;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="max-h-[85vh] p-0 rounded-t-3xl">
        <SheetTitle className="sr-only">Withdraw Funds</SheetTitle>
        <SheetDescription className="sr-only">
          Withdraw funds from your wallet to your bank account
        </SheetDescription>

        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-[#E5E7EB] p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-[#0A0F1E] mb-2">Withdraw Funds</h2>
                <p className="text-[#6B7280]">Available: ₹{(availableBalance / 1000).toFixed(0)}K</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors">
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Amount Input */}
              <div>
                <Label htmlFor="withdraw-amount" className="text-sm font-semibold text-[#0A0F1E] mb-3 block">
                  Withdrawal Amount
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">₹</span>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    max={availableBalance}
                    className="pl-10 h-14 text-xl font-semibold border-2 rounded-lg"
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-2">
                  Minimum withdrawal: ₹{minWithdrawal.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Quick Withdraw Options */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-3">
                  Quick Select
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setAmount((availableBalance * 0.25).toFixed(0))}
                    className="h-12 rounded-lg border-2 hover:border-[#00D9A3] hover:bg-[#00D9A3]/5"
                  >
                    25%
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setAmount((availableBalance * 0.5).toFixed(0))}
                    className="h-12 rounded-lg border-2 hover:border-[#00D9A3] hover:bg-[#00D9A3]/5"
                  >
                    50%
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setAmount(availableBalance.toString())}
                    className="h-12 rounded-lg border-2 hover:border-[#00D9A3] hover:bg-[#00D9A3]/5"
                  >
                    Max
                  </Button>
                </div>
              </div>

              {/* Bank Account */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#6B7280] mb-1">Bank Account</div>
                    <div className="font-medium text-[#0A0F1E]">HDFC Bank •••• 4567</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#00D9A3] hover:bg-[#00D9A3]/5">
                    Change
                  </Button>
                </div>
              </div>

              {/* Summary */}
              {amountNum > 0 && (
                <div className="space-y-3 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Withdrawal Amount</span>
                    <span className="font-semibold text-[#0A0F1E]">₹{amountNum.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Processing Fee</span>
                    <span className="font-semibold text-[#10B981]">₹0</span>
                  </div>
                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">Remaining Balance</span>
                    <span className="font-semibold text-[#0A0F1E]">₹{remainingBalance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* Warning for low balance */}
              {remainingBalance < 10000 && amountNum > 0 && (
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">Low Balance Warning</h4>
                    <p className="text-xs text-yellow-700">
                      Your remaining balance will be low. Make sure you have enough funds for ongoing investments.
                    </p>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-[#00D9A3]/5 border border-[#00D9A3]/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#00D9A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0A0F1E] mb-1">Processing Time</h4>
                    <p className="text-xs text-[#6B7280]">
                      Withdrawals are processed within 1-3 business days. You'll receive a notification when funds are transferred.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom CTA */}
          <div className="flex-shrink-0 border-t border-[#E5E7EB] p-6 bg-white">
            <Button
              onClick={handleWithdraw}
              disabled={isProcessing || !amount || amountNum < minWithdrawal || amountNum > availableBalance}
              className="w-full h-12 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full font-semibold disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
            >
              {isProcessing ? "Processing..." : "Request Withdrawal"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
