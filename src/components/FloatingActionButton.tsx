import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-[#00D9A3] hover:bg-[#00C293] text-white pl-5 pr-6 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 z-40 group"
    >
      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      <span className="font-semibold hidden sm:inline">Sell Shares</span>
    </button>
  );
}
