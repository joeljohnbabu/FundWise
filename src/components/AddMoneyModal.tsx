import { useState } from "react";
import { X, CreditCard, Check } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface AddMoneyModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (amount: number, method: string) => void;
}

export function AddMoneyModal({ open, onClose, onConfirm }: AddMoneyModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [1000, 5000, 10000, 25000];

  const handleConfirm = async () => {
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount < 100) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm(numAmount, paymentMethod);
    setIsProcessing(false);
    handleClose();
  };

  const handleClose = () => {
    setAmount("");
    setPaymentMethod("upi");
    setIsProcessing(false);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="max-h-[85vh] p-0 rounded-t-3xl">
        <SheetTitle className="sr-only">Add Money to Wallet</SheetTitle>
        <SheetDescription className="sr-only">
          Add funds to your wallet using UPI, cards, or net banking
        </SheetDescription>

        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 border-b border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#0A0F1E]">Add Money</h2>
              <button onClick={handleClose} className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors">
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0F1E] mb-3">
                  Enter Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#6B7280]">
                    ₹
                  </span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="h-14 pl-10 text-xl font-semibold border-2 rounded-lg"
                  />
                </div>
                {amount && parseInt(amount) < 100 && (
                  <p className="text-xs text-[#EF4444] mt-2">Minimum amount is ₹100</p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-3">
                  Quick Select
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      onClick={() => setAmount(quickAmount.toString())}
                      className={`h-12 rounded-lg border-2 ${
                        amount === quickAmount.toString()
                          ? "border-[#00D9A3] bg-[#00D9A3]/5 text-[#00D9A3] font-semibold"
                          : "border-[#E5E7EB] hover:border-[#00D9A3]"
                      }`}
                    >
                      ₹{(quickAmount / 1000).toFixed(0)}K
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-[#0A0F1E] mb-3">
                  Payment Method
                </label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-[#00D9A3] bg-[#00D9A3]/5"
                        : "border-[#E5E7EB] hover:border-[#00D9A3]/50"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#00D9A3]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#0A0F1E]">UPI</div>
                        <div className="text-xs text-[#6B7280]">Pay using any UPI app</div>
                      </div>
                    </div>
                    <RadioGroupItem value="upi" id="upi" className="border-2" />
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-[#00D9A3] bg-[#00D9A3]/5"
                        : "border-[#E5E7EB] hover:border-[#00D9A3]/50"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#00D9A3]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#0A0F1E]">Debit/Credit Card</div>
                        <div className="text-xs text-[#6B7280]">Visa, Mastercard, Rupay</div>
                      </div>
                    </div>
                    <RadioGroupItem value="card" id="card" className="border-2" />
                  </div>

                  <div
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "netbanking"
                        ? "border-[#00D9A3] bg-[#00D9A3]/5"
                        : "border-[#E5E7EB] hover:border-[#00D9A3]/50"
                    }`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#00D9A3]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#0A0F1E]">Net Banking</div>
                        <div className="text-xs text-[#6B7280]">All major banks</div>
                      </div>
                    </div>
                    <RadioGroupItem value="netbanking" id="netbanking" className="border-2" />
                  </div>
                </RadioGroup>
              </div>

              {/* Info Box */}
              <div className="bg-[#00D9A3]/5 border border-[#00D9A3]/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#00D9A3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0A0F1E] mb-1">Instant Credit</h4>
                    <p className="text-xs text-[#6B7280]">
                      Funds will be credited instantly to your wallet after successful payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom CTA */}
          <div className="flex-shrink-0 border-t border-[#E5E7EB] p-6 bg-white">
            <Button
              onClick={handleConfirm}
              disabled={!amount || parseInt(amount) < 100 || isProcessing}
              className="w-full h-12 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full font-semibold disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
            >
              {isProcessing ? 'Processing...' : `Add ₹${amount || '0'}`}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
