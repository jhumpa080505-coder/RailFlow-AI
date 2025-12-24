import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface TrackDirectionProps {
  onDirectionSelect: (direction: "up" | "down") => void;
}

export const TrackDirection = ({ onDirectionSelect }: TrackDirectionProps) => {
  const handleDirectionSelect = (direction: "up" | "down") => {
    toast.success(`${direction.toUpperCase()} direction selected`);
    onDirectionSelect(direction);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="railway-border">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Select Track Direction</CardTitle>
            <CardDescription>
              Choose the direction for train movement control
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UP Direction */}
              <Button
                variant="outline"
                className="h-48 w-full track-direction-up group border-2 border-dashed border-border hover:border-primary transition-all duration-300"
                onClick={() => handleDirectionSelect("up")}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">UP Direction</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground">
                      Control trains moving towards main terminus
                    </p>
                  </div>
                </div>
              </Button>
              
              {/* DOWN Direction */}
              <Button
                variant="outline"
                className="h-48 w-full track-direction-down group border-2 border-dashed border-border hover:border-primary transition-all duration-300"
                onClick={() => handleDirectionSelect("down")}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto railway-glow">
                    <ArrowDown className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">DOWN Direction</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground">
                      Control trains moving away from main terminus
                    </p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};