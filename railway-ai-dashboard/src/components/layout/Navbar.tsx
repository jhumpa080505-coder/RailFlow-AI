import { LogOut, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface NavbarProps {
  controller?: string;
  onReset?: () => void;
  onLogout?: () => void;
}

export const Navbar = ({ controller = "abhi", onReset, onLogout }: NavbarProps) => {
  const handleReset = () => {
    if (onReset) {
      onReset();
      toast.success("System reset completed - all data cleared");
    } else {
      toast.success("System reset initiated");
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      toast.success("Logged out successfully");
    } else {
      toast("Logging out...", { icon: "ℹ️" });
    }
  };

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RailFlow AI Control Center</h1>
            <p className="text-sm text-muted-foreground">Controller: {controller}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Setup
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};