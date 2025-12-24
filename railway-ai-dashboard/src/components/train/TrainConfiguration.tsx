import { useState } from "react";
import { ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface TrainConfigurationProps {
  direction: "up" | "down";
  onBack: () => void;
  onComplete: (config: TrainConfig) => void;
}

interface TrainConfig {
  trainNumber: string;
  trainType: string;
  priority: string;
  stationCode: string;
  initialDestination: string;
  finalDestination: string;
}

export const TrainConfiguration = ({ direction, onBack, onComplete }: TrainConfigurationProps) => {
  const [config, setConfig] = useState<TrainConfig>({
    trainNumber: "",
    trainType: "",
    priority: "Normal",
    stationCode: "",
    initialDestination: "",
    finalDestination: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!config.trainNumber || !config.trainType || !config.stationCode || !config.initialDestination || !config.finalDestination) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Train configuration completed successfully!");
    onComplete(config);
  };

  const handleSwitchDirection = () => {
    const newDirection = direction === "up" ? "down" : "up";
    toast(`Switched to ${newDirection.toUpperCase()} direction`, { icon: "ℹ️" });
    onBack();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="railway-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Train Configuration</CardTitle>
                <CardDescription>
                  Configure train details for the selected direction
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Current Direction:</span>
                  <div className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-full font-medium">
                    {direction === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {direction.toUpperCase()}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSwitchDirection}
                  className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                >
                  Switch to {direction === "up" ? "DOWN" : "UP"}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Train Number *
                  </label>
                  <Input
                    placeholder="e.g., 12345"
                    value={config.trainNumber}
                    onChange={(e) => setConfig({ ...config, trainNumber: e.target.value })}
                    className="bg-muted border-border"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Train Type *
                  </label>
                  <Select onValueChange={(value) => setConfig({ ...config, trainType: value })}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Select Train Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="passenger">Passenger</SelectItem>
                      <SelectItem value="freight">Freight</SelectItem>
                      <SelectItem value="superfast">Superfast</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Priority Level
                  </label>
                  <Select onValueChange={(value) => setConfig({ ...config, priority: value })} defaultValue="Normal">
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Station Code *
                  </label>
                  <Input
                    placeholder="e.g., NDLS, CST"
                    value={config.stationCode}
                    onChange={(e) => setConfig({ ...config, stationCode: e.target.value })}
                    className="bg-muted border-border"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Initial Destination *
                  </label>
                  <Input
                    placeholder="e.g., New Delhi"
                    value={config.initialDestination}
                    onChange={(e) => setConfig({ ...config, initialDestination: e.target.value })}
                    className="bg-muted border-border"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Final Destination *
                  </label>
                  <Input
                    placeholder="e.g., Mumbai Central"
                    value={config.finalDestination}
                    onChange={(e) => setConfig({ ...config, finalDestination: e.target.value })}
                    className="bg-muted border-border"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Direction
                </Button>
                
                <Button 
                  type="submit" 
                  className="control-button flex-1 h-12 text-base font-medium"
                >
                  Complete Setup
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};