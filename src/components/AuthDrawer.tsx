import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Button } from "./ui/button";

interface AuthDrawerProps {
  open: boolean;
  onClose: () => void;
  onSignIn: (role: 'user' | 'admin') => void;
}

export function AuthDrawer({ open, onClose, onSignIn }: AuthDrawerProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleLogin = (role: 'user' | 'admin') => {
    onSignIn(role);
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl font-bold mb-2">Welcome to FundWise</DrawerTitle>
            <p className="text-center text-gray-500 mb-6">Choose your login type</p>
          </DrawerHeader>
          <div className="p-4 pb-8 space-y-4">
            <Button
              className="w-full h-14 text-lg bg-[#00D9A3] hover:bg-[#00C293] text-white"
              onClick={() => handleLogin('user')}
            >
              Sign in as User
            </Button>
            <Button
              className="w-full h-14 text-lg border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300"
              variant="outline"
              onClick={() => handleLogin('admin')}
            >
              Sign in as Admin
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
