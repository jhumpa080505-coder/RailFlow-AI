import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft, Clock, AlertTriangle, Route, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

interface Train {
  id: string;
  name: string;
  status: "Running" | "Delayed" | "Halted" | "Maintenance";
  delay: number;
  route: string;
  priority: "High" | "Medium" | "Low";
  currentLocation: string;
  nextStation: string;
  estimatedArrival: string;
  coordinates: { lat: number; lng: number };
  routeStations: string[];
}

const mockTrains: Train[] = [
  {
    id: "T001",
    name: "Express Mumbai-Delhi",
    status: "Running",
    delay: 0,
    route: "Mumbai Central → New Delhi",
    priority: "High",
    currentLocation: "Kota Junction",
    nextStation: "Sawai Madhopur",
    estimatedArrival: "14:30",
    coordinates: { lat: 25.2138, lng: 75.8648 },
    routeStations: ["Mumbai Central", "Vadodara", "Ratlam", "Kota Junction", "Sawai Madhopur", "Jaipur", "Alwar", "New Delhi"]
  },
  {
    id: "T002", 
    name: "Rajdhani Express",
    status: "Delayed",
    delay: 15,
    route: "New Delhi → Mumbai Central",
    priority: "High",
    currentLocation: "Bharatpur",
    nextStation: "Mathura",
    estimatedArrival: "16:45",
    coordinates: { lat: 27.2152, lng: 77.4909 },
    routeStations: ["New Delhi", "Gurgaon", "Alwar", "Jaipur", "Ajmer", "Abu Road", "Vadodara", "Mumbai Central"]
  },
  {
    id: "T003",
    name: "Chennai Express",
    status: "Running",
    delay: 5,
    route: "Chennai → Bangalore",
    priority: "Medium",
    currentLocation: "Katpadi",
    nextStation: "Jolarpettai",
    estimatedArrival: "18:20",
    coordinates: { lat: 12.9698, lng: 79.1325 },
    routeStations: ["Chennai Central", "Arakkonam", "Katpadi", "Jolarpettai", "Salem", "Erode", "Tirupur", "Bangalore"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Running": return "bg-railway-signal-green";
    case "Delayed": return "bg-railway-signal-yellow";
    case "Halted": return "bg-railway-signal-red";
    case "Maintenance": return "bg-muted";
    default: return "bg-muted";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-destructive";
    case "Medium": return "bg-warning";
    case "Low": return "bg-success";
    default: return "bg-muted";
  }
};

interface TrainControlProps {
  selectedTrainId?: string;
  onBackToList?: () => void;
}

export const TrainControl = ({ selectedTrainId, onBackToList }: TrainControlProps) => {
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(
    selectedTrainId ? mockTrains.find(t => t.id === selectedTrainId) || null : null
  );

  const handleTrainSelect = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleBackToList = () => {
    setSelectedTrain(null);
    if (onBackToList) onBackToList();
  };

  const handleTrainAction = (action: string) => {
    if (selectedTrain) {
      toast.success(`${action} applied to ${selectedTrain.name}`);
    }
  };

  // If a specific train is selected, show detailed view
  if (selectedTrain) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleBackToList}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Train List
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{selectedTrain.name}</h1>
            <p className="text-muted-foreground">Train ID: {selectedTrain.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Train Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={`${getStatusColor(selectedTrain.status)} text-white`}>
                  {selectedTrain.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Priority:</span>
                <Badge className={`${getPriorityColor(selectedTrain.priority)} text-white`}>
                  {selectedTrain.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Delay:</span>
                <span className={selectedTrain.delay > 0 ? "text-railway-signal-yellow" : "text-railway-signal-green"}>
                  {selectedTrain.delay > 0 ? `+${selectedTrain.delay} min` : "On Time"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Location:</span>
                <span className="text-foreground font-medium">{selectedTrain.currentLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Next Station:</span>
                <span className="text-foreground font-medium">{selectedTrain.nextStation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Est. Arrival:</span>
                <span className="text-foreground font-medium">{selectedTrain.estimatedArrival}</span>
              </div>
            </CardContent>
          </Card>

          {/* Route Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Route Map
              </CardTitle>
              <CardDescription>Live tracking and route visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Interactive Route Map</p>
                  <p className="text-sm text-muted-foreground">
                    Lat: {selectedTrain.coordinates.lat}, Lng: {selectedTrain.coordinates.lng}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Stations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5 text-primary" />
                Route Stations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedTrain.routeStations.map((station, index) => (
                  <div 
                    key={station} 
                    className={`flex items-center gap-3 p-2 rounded ${
                      station === selectedTrain.currentLocation 
                        ? 'bg-primary/20 border border-primary/40' 
                        : station === selectedTrain.nextStation
                        ? 'bg-warning/20 border border-warning/40'
                        : 'bg-muted/20'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      station === selectedTrain.currentLocation 
                        ? 'bg-primary' 
                        : station === selectedTrain.nextStation
                        ? 'bg-warning'
                        : 'bg-muted-foreground'
                    }`} />
                    <span className="text-sm font-medium">{station}</span>
                    {station === selectedTrain.currentLocation && (
                      <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>
                    )}
                    {station === selectedTrain.nextStation && (
                      <Badge variant="outline" className="ml-auto text-xs">Next</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Control Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Train Controls
              </CardTitle>
              <CardDescription>Emergency and operational controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-railway-signal-red hover:bg-railway-signal-red/80 text-white"
                onClick={() => handleTrainAction("Emergency Stop")}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Stop
              </Button>
              <Button 
                className="w-full bg-warning hover:bg-warning/80 text-warning-foreground"
                onClick={() => handleTrainAction("Priority Boost")}
              >
                <Zap className="w-4 h-4 mr-2" />
                Priority Boost
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleTrainAction("Route Optimization")}
              >
                <Route className="w-4 h-4 mr-2" />
                Optimize Route
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleTrainAction("Schedule Adjustment")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Adjust Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show train list view
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Train Control Center</h1>
          <p className="text-muted-foreground">Monitor and control active trains</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTrains.map((train) => (
          <Card 
            key={train.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleTrainSelect(train)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{train.name}</CardTitle>
                <Badge className={`${getStatusColor(train.status)} text-white`}>
                  {train.status}
                </Badge>
              </div>
              <CardDescription>ID: {train.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Route:</span>
                <span className="text-right text-foreground">{train.route}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delay:</span>
                <span className={train.delay > 0 ? "text-railway-signal-yellow" : "text-railway-signal-green"}>
                  {train.delay > 0 ? `+${train.delay} min` : "On Time"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Priority:</span>
                <Badge className={`${getPriorityColor(train.priority)} text-white text-xs`}>
                  {train.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{train.currentLocation}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Details & Controls
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};