import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface LoginFormProps {
  onLogin: (controllerId: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [controllerId, setControllerId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!controllerId || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      toast.success(`Welcome back, ${controllerId}!`);
      onLogin(controllerId);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen railway-bg flex items-center justify-center p-4">
      <div className="railway-overlay absolute inset-0" />
      
      <Card className="w-full max-w-md relative z-10 railway-border">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto railway-glow">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">RailFlow AI</CardTitle>
            <CardDescription>Indian Railways Control System</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Controller ID
              </label>
              <Input
                type="text"
                placeholder="Enter your Controller ID"
                value={controllerId}
                onChange={(e) => setControllerId(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full control-button h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login to Control Center"}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground text-center mt-6">
            Authorized Personnel Only • Indian Railways
          </p>
        </CardContent>
      </Card>
    </div>
  );
};