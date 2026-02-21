import { X, Download, RefreshCw } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  category: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  description: string;
  propertyName?: string;
  reference?: string;
}

interface TransactionDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailsDrawer({ open, onClose, transaction }: TransactionDetailsDrawerProps) {
  if (!transaction) return null;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      add_money: "Funds Added",
      withdrawal: "Withdrawal",
      investment: "Investment",
      rental_income: "Rental Income",
      emi: "EMI Payment",
      fees: "Platform Fees",
      marketplace_buy: "Marketplace Purchase",
      marketplace_sell: "Marketplace Sale",
    };
    return labels[category] || category;
  };

  const getPaymentMethod = (category: string) => {
    if (category === "add_money") return "UPI";
    if (category === "withdrawal") return "Bank Transfer";
    return "Wallet";
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <SheetTitle className="sr-only">Transaction Details</SheetTitle>
        <SheetDescription className="sr-only">
          View detailed information about this transaction
        </SheetDescription>

        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="mb-1 text-[#0A0F1E]">Transaction Details</h2>
              <p className="text-sm text-[#6B7280]">ID: {transaction.id}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors">
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Status Badge */}
          <Badge 
            className={`${
              transaction.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
              transaction.status === "pending" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
              "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount Card */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 text-center">
            <div className="text-sm text-[#6B7280] mb-2">
              {transaction.type === "credit" ? "Amount Received" : "Amount Paid"}
            </div>
            <div className={`font-bold ${
              transaction.type === "credit" ? "text-[#10B981]" : "text-[#EF4444]"
            }`} style={{ fontSize: '36px', lineHeight: '1' }}>
              {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div>
              <div className="text-sm text-[#6B7280] mb-1">Description</div>
              <div className="font-medium text-[#0A0F1E]">{transaction.description}</div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Transaction Type</div>
                <div className="font-medium text-[#0A0F1E]">{getCategoryLabel(transaction.category)}</div>
              </div>
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Date & Time</div>
                <div className="font-medium text-[#0A0F1E]">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className="text-xs text-[#6B7280]">
                  {new Date(transaction.date).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <Separator />

            {transaction.propertyName && (
              <>
                <div>
                  <div className="text-sm text-[#6B7280] mb-1">Property</div>
                  <div className="font-medium text-[#0A0F1E]">{transaction.propertyName}</div>
                </div>
                <Separator />
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Payment Method</div>
                <div className="font-medium text-[#0A0F1E]">{getPaymentMethod(transaction.category)}</div>
              </div>
              {transaction.reference && (
                <div>
                  <div className="text-sm text-[#6B7280] mb-1">Reference</div>
                  <div className="font-medium text-[#0A0F1E] truncate">{transaction.reference}</div>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          {transaction.category === "rental_income" && (
            <div className="bg-[#00D9A3]/5 border border-[#00D9A3]/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#00D9A3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#00D9A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0A0F1E] mb-1">Monthly Rental Income</h4>
                  <p className="text-xs text-[#6B7280]">
                    This is your monthly rental payout from your property investment. Funds are available for immediate use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {transaction.status === "pending" && (
              <Button 
                variant="outline" 
                className="w-full rounded-full border-2 border-[#E5E7EB] hover:border-[#00D9A3]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Transaction
              </Button>
            )}
            
            {transaction.status === "completed" && (
              <Button 
                variant="outline" 
                className="w-full rounded-full border-2 border-[#E5E7EB] hover:border-[#00D9A3]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#F9FAFB] border-t border-[#E5E7EB] p-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full rounded-full border-2"
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
