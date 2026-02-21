import { useState } from "react";
import {
  Wallet as WalletIcon,
  Plus,
  ArrowDownToLine,
  TrendingUp,
  DollarSign,
  Search,
  Building2,
  Home,
  FileText,
  CreditCard,
  History
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AddMoneyModal } from "./AddMoneyModal";
import { WithdrawModal } from "./WithdrawModal";
import { TransactionDetailsDrawer } from "./TransactionDetailsDrawer";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  category: "add_money" | "withdrawal" | "investment" | "rental_income" | "emi" | "fees" | "marketplace_buy" | "marketplace_sell";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  description: string;
  propertyName?: string;
  reference?: string;
}

interface WalletProps {
  balance: number;
  totalInvested: number;
  pendingReturns: number;
  transactions: Transaction[];
}

export function Wallet({ balance, totalInvested, pendingReturns, transactions }: WalletProps) {
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };

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

  const getCategoryColor = (category: string) => {
    if (category === "rental_income") return "text-[#00D9A3]";
    if (category === "marketplace_sell" || category === "add_money") return "text-[#10B981]";
    if (category === "investment" || category === "marketplace_buy") return "text-blue-600";
    if (category === "withdrawal" || category === "emi" || category === "fees") return "text-[#EF4444]";
    return "text-[#6B7280]";
  };

  const getCategoryIcon = (category: string) => {
    if (category === "rental_income") return <FileText className="w-5 h-5" />;
    if (category === "marketplace_sell") return <TrendingUp className="w-5 h-5" />;
    if (category === "add_money") return <CreditCard className="w-5 h-5" />;
    if (category === "investment" || category === "marketplace_buy") return <Building2 className="w-5 h-5" />;
    if (category === "withdrawal") return <ArrowDownToLine className="w-5 h-5" />;
    if (category === "emi") return <Home className="w-5 h-5" />;
    return <DollarSign className="w-5 h-5" />;
  };

  const getCategoryBg = (category: string) => {
    if (category === "rental_income") return "bg-blue-50";
    if (category === "marketplace_sell" || category === "add_money") return "bg-green-50";
    if (category === "investment" || category === "marketplace_buy") return "bg-green-50";
    if (category === "withdrawal") return "bg-red-50";
    if (category === "emi") return "bg-purple-50";
    if (category === "fees") return "bg-indigo-50";
    return "bg-gray-50";
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.propertyName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" ||
      (typeFilter === "credit" && t.type === "credit") ||
      (typeFilter === "debit" && t.type === "debit") ||
      (typeFilter === "investment" && (t.category === "investment" || t.category === "marketplace_buy")) ||
      (typeFilter === "rental_income" && t.category === "rental_income");

    return matchesSearch && matchesType;
  });

  return (
    <section className="py-12 bg-[#FAFBFC] min-h-screen">
      <div className="container-stake">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-[#0A0F1E] tracking-tight">Wallet</h2>
          <p className="text-body text-[#6B7280]">
            Manage your funds, track transactions, and handle payments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN - Transactions */}
          <div className="lg:col-span-2 space-y-6">

            {/* Transactions Header & Filters */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-[#eff1f5] p-2 rounded-lg">
                    <History className="w-5 h-5 text-[#374151]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A0F1E]">History</h3>
                </div>
                <div className="relative w-full sm:w-64">
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9 bg-[#FAFBFC] border-[#E5E7EB]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                {['all', 'investment', 'rental_income', 'credit', 'debit'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTypeFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${typeFilter === filter
                      ? "bg-[#00D9A3]/10 text-[#00D9A3]"
                      : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                      }`}
                  >
                    {filter === 'all' ? 'All' :
                      filter === 'rental_income' ? 'Rent' :
                        filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Transaction List */}
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      onClick={() => handleTransactionClick(transaction)}
                      className="group flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-[#E5E7EB] hover:bg-[#FAFBFC] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryBg(transaction.category)} group-hover:scale-105 transition-transform`}>
                          <div className={getCategoryColor(transaction.category)}>
                            {getCategoryIcon(transaction.category)}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-[#0A0F1E] text-base mb-0.5">
                            {transaction.propertyName || transaction.description}
                          </p>
                          <p className={`text-sm ${transaction.status === "pending" ? "text-amber-600 font-medium" : "text-[#6B7280]"
                            }`}>
                            {transaction.status === "pending" ? "Processing..." : getCategoryLabel(transaction.category)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-base mb-0.5 ${transaction.type === "credit" ? "text-[#00D9A3]" : "text-[#0A0F1E]"
                          }`}>
                          {transaction.type === "credit" ? "+" : "-"} ₹{transaction.amount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-[#9CA3AF]">
                          {new Date(transaction.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                      <WalletIcon className="w-8 h-8 text-[#9CA3AF]" />
                    </div>
                    <h4 className="font-medium text-[#0A0F1E] mb-1">No transactions found</h4>
                    <p className="text-sm text-[#6B7280]">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Balance & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Balance Card */}
              <div className="bg-gradient-to-br from-white to-[#F9FAFB] rounded-3xl p-8 border border-[#E5E7EB] shadow-sm relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9A3]/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-[#00D9A3]/10 rounded-lg">
                      <WalletIcon className="w-5 h-5 text-[#00D9A3]" />
                    </div>
                    <span className="font-medium text-[#6B7280]">Available Balance</span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-2xl font-bold text-[#0A0F1E]">₹</span>
                    <span className="text-5xl font-bold text-[#0A0F1E] tracking-tight">
                      {balance.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setAddMoneyOpen(true)}
                      className="h-12 bg-[#0A0F1E] hover:bg-[#0A0F1E]/90 text-white rounded-xl font-medium shadow-none transition-all hover:-translate-y-0.5"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                    <Button
                      onClick={() => setWithdrawOpen(true)}
                      variant="outline"
                      className="h-12 border-[#E5E7EB] hover:bg-[#FAFBFC] text-[#0A0F1E] rounded-xl font-medium transition-all hover:-translate-y-0.5"
                    >
                      <ArrowDownToLine className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
                <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-[#374151] font-medium">Total Invested</span>
                    </div>
                    <span className="font-semibold text-[#0A0F1E]">₹{totalInvested.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-[#374151] font-medium">Pending Returns</span>
                    </div>
                    <span className="font-semibold text-[#00D9A3]">+₹{pendingReturns.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      <AddMoneyModal
        open={addMoneyOpen}
        onClose={() => setAddMoneyOpen(false)}
        onConfirm={(amount, method) => {
          // toast.success logic or stub
          console.log(`Added ${amount} via ${method}`);
        }}
      />

      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        availableBalance={balance}
      />

      <TransactionDetailsDrawer
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        transaction={selectedTransaction}
      />
    </section>
  );
}
