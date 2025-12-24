import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Train, AlertTriangle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const mockMetrics = [
  { label: "On Time Performance", value: 89, color: "bg-success" },
  { label: "Average Delay", value: 8, unit: "min", color: "bg-warning" },
  { label: "Route Efficiency", value: 94, color: "bg-info" },
  { label: "System Load", value: 67, color: "bg-primary" },
];

const weeklyData = [
  { day: "Mon", onTime: 92, delayed: 8 },
  { day: "Tue", delayed: 5, onTime: 95 },
  { day: "Wed", delayed: 12, onTime: 88 },
  { day: "Thu", delayed: 4, onTime: 96 },
  { day: "Fri", delayed: 15, onTime: 85 },
  { day: "Sat", delayed: 18, onTime: 82 },
  { day: "Sun", delayed: 10, onTime: 90 },
];

const routeZones = [
  { name: "Northern Zone", percentage: 35, trains: 156 },
  { name: "Southern Zone", percentage: 28, trains: 124 },
  { name: "Western Zone", percentage: 22, trains: 98 },
  { name: "Eastern Zone", percentage: 15, trains: 67 },
];

export const SimpleAnalytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Performance metrics and insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <Card key={metric.label} className="railway-border">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <div className={`w-3 h-3 rounded-full ${metric.color}`} />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  {metric.unit && <span className="text-sm text-muted-foreground mb-1">{metric.unit}</span>}
                </div>
                {!metric.unit && (
                  <Progress value={metric.value} className="h-2" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Performance */}
      <Card className="railway-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Weekly Performance Overview
          </CardTitle>
          <CardDescription>
            Train punctuality trends over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-muted-foreground">
                  {day.day}
                </div>
                <div className="flex-1 flex gap-2">
                  <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="bg-success h-full rounded-full transition-all duration-500"
                      style={{ width: `${day.onTime}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
                      {day.onTime}% On Time
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm text-warning font-medium">+{day.delayed}min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Distribution */}
        <Card className="railway-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="w-5 h-5" />
              Route Zone Distribution
            </CardTitle>
            <CardDescription>
              Traffic distribution across railway zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routeZones.map((zone, index) => (
                <div key={zone.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{zone.name}</span>
                    <span className="text-muted-foreground">{zone.trains} trains ({zone.percentage}%)</span>
                  </div>
                  <Progress 
                    value={zone.percentage} 
                    className="h-3"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="railway-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Current alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Signal delay at Junction 45</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                <Train className="w-5 h-5 text-info" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Express 12345 priority updated</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Route optimization completed</p>
                  <p className="text-xs text-muted-foreground">8 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};