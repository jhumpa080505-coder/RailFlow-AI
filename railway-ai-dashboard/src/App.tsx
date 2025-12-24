import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";

// Import pages and components
import { LoginForm } from "./components/auth/LoginForm";
import { TrackDirection } from "./components/train/TrackDirection";
import { TrainConfiguration } from "./components/train/TrainConfiguration";
import { Dashboard } from "./components/dashboard/Dashboard";
import { TrainControl } from "./components/train/TrainControl";
import { SimpleAnalytics } from "./components/analytics/SimpleAnalytics";
import { Settings } from "./components/settings/Settings";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { ThemeToggle } from "./components/ui/theme-toggle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface TrainConfig {
  trainNumber: string;
  trainType: string;
  priority: string;
  stationCode: string;
  initialDestination: string;
  finalDestination: string;
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [controller, setController] = useState("");
  const [selectedDirection, setSelectedDirection] = useState<"up" | "down" | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  const handleLogin = (controllerId: string) => {
    setController(controllerId);
    setIsAuthenticated(true);
  };

  const handleDirectionSelect = (direction: "up" | "down") => {
    setSelectedDirection(direction);
  };

  const handleConfigurationComplete = (config: TrainConfig) => {
    setIsConfigured(true);
  };

  const handleBackToDirection = () => {
    setSelectedDirection(null);
  };

  const handleReset = () => {
    setSelectedDirection(null);
    setIsConfigured(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setController("");
    setSelectedDirection(null);
    setIsConfigured(false);
  };

  // If not authenticated, show login
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HotToaster position="top-right" />
          <LoginForm onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // If authenticated but no direction selected, show direction selection
  if (!selectedDirection) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HotToaster position="top-right" />
          <div className="min-h-screen bg-background">
            <Navbar controller={controller} onReset={handleReset} onLogout={handleLogout} />
            <TrackDirection onDirectionSelect={handleDirectionSelect} />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // If direction selected but not configured, show configuration
  if (!isConfigured) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HotToaster position="top-right" />
          <div className="min-h-screen bg-background">
            <Navbar controller={controller} onReset={handleReset} onLogout={handleLogout} />
            <TrainConfiguration
              direction={selectedDirection}
              onBack={handleBackToDirection}
              onComplete={handleConfigurationComplete}
            />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Main application with full navigation
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToaster position="top-right" />
        <BrowserRouter>
          <div className="min-h-screen bg-background flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar controller={controller} onReset={handleReset} onLogout={handleLogout} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/train-control" element={<TrainControl />} />
                  <Route path="/analytics" element={<SimpleAnalytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <ThemeToggle />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
