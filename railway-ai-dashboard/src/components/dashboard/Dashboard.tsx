import { useState } from "react";
import { Train, Clock, AlertTriangle, CheckCircle, TrendingUp, Navigation } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const mockTrains = [
  { id: "12345", name: "Rajdhani Express", status: "On Time", delay: 0, route: "NDLS → CSTM", priority: "High" },
  { id: "22456", name: "Shatabdi Express", status: "Delayed", delay: 15, route: "NDLS → BPL", priority: "High" },
  { id: "13287", name: "Passenger", status: "Running", delay: 5, route: "AGC → JHS", priority: "Normal" },
  { id: "16032", name: "Andaman Express", status: "Halted", delay: 45, route: "MMC → CSTM", priority: "Normal" },
];

const mockStats = [
  { title: "Active Trains", value: "156", icon: Train, trend: "+12%" },
  { title: "On Time", value: "89%", icon: CheckCircle, trend: "+2%" },
  { title: "Avg Delay", value: "8 min", icon: Clock, trend: "-3min" },
  { title: "Alerts", value: "3", icon: AlertTriangle, trend: "-2" },
];

export const Dashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "on time": return "bg-success text-success-foreground";
      case "running": return "bg-info text-info-foreground";
      case "delayed": return "bg-warning text-warning-foreground";
      case "halted": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleTrainAction = (trainId: string, action: string) => {
    toast.success(`${action} applied to train ${trainId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <Card key={stat.title} className="railway-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">{stat.trend}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Train Status */}
      <Card className="railway-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="w-5 h-5" />
            Active Train Status
          </CardTitle>
          <CardDescription>
            Real-time monitoring of train operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTrains.map((train) => (
              <div 
                key={train.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  selectedTrain === train.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-border/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{train.name}</h3>
                      <p className="text-sm text-muted-foreground">Train #{train.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{train.route}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(train.status)}>
                      {train.status}
                    </Badge>
                    {train.delay > 0 && (
                      <Badge variant="outline" className="border-warning text-warning">
                        +{train.delay}min
                      </Badge>
                    )}
                    <Badge variant={train.priority === "High" ? "default" : "secondary"}>
                      {train.priority}
                    </Badge>
                  </div>
                </div>
                
                {selectedTrain === train.id && (
                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleTrainAction(train.id, "Priority boost")}
                      className="border-success text-success hover:bg-success hover:text-success-foreground"
                    >
                      Priority
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleTrainAction(train.id, "Reroute")}
                      className="border-info text-info hover:bg-info hover:text-info-foreground"
                    >
                      Reroute
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleTrainAction(train.id, "Emergency halt")}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Halt
                    </Button>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => setSelectedTrain(selectedTrain === train.id ? null : train.id)}
                >
                  {selectedTrain === train.id ? "Hide Controls" : "Show Controls"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};