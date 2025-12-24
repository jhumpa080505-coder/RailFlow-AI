import { useState } from "react";
import { Settings as SettingsIcon, Save, RefreshCw, Database, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export const Settings = () => {
  const [settings, setSettings] = useState({
    refreshInterval: "30",
    alertThreshold: "10",
    autoReroute: true,
    soundAlerts: false,
    priorityMode: "automatic",
    maxDelayAlert: "15",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      refreshInterval: "30",
      alertThreshold: "10",
      autoReroute: true,
      soundAlerts: false,
      priorityMode: "automatic",
      maxDelayAlert: "15",
    });
    toast("Settings reset to default values", { icon: "↩️" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure Railway-Boost AI parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="railway-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic system configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Data Refresh Interval (seconds)
              </label>
              <Select 
                value={settings.refreshInterval}
                onValueChange={(value) => setSettings({ ...settings, refreshInterval: value })}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Priority Mode
              </label>
              <Select 
                value={settings.priorityMode}
                onValueChange={(value) => setSettings({ ...settings, priorityMode: value })}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-Rerouting</p>
                <p className="text-xs text-muted-foreground">Enable automatic route optimization</p>
              </div>
              <Switch
                checked={settings.autoReroute}
                onCheckedChange={(checked) => setSettings({ ...settings, autoReroute: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card className="railway-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alert Settings
            </CardTitle>
            <CardDescription>
              Notification and warning configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Delay Alert Threshold (minutes)
              </label>
              <Input
                type="number"
                value={settings.alertThreshold}
                onChange={(e) => setSettings({ ...settings, alertThreshold: e.target.value })}
                className="bg-muted border-border"
                min="1"
                max="60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Maximum Delay Alert (minutes)
              </label>
              <Input
                type="number"
                value={settings.maxDelayAlert}
                onChange={(e) => setSettings({ ...settings, maxDelayAlert: e.target.value })}
                className="bg-muted border-border"
                min="5"
                max="120"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Sound Alerts</p>
                <p className="text-xs text-muted-foreground">Enable audio notifications</p>
              </div>
              <Switch
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, soundAlerts: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="railway-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>
              Access control and security features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Session Management
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Access Logs
            </Button>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="railway-border">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and version
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Version</p>
                <p className="font-medium">v2.1.4</p>
              </div>
              <div>
                <p className="text-muted-foreground">Uptime</p>
                <p className="font-medium">7d 12h 34m</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Update</p>
                <p className="font-medium">2 hours ago</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-medium text-success">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-6">
        <Button onClick={handleSave} className="control-button">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};