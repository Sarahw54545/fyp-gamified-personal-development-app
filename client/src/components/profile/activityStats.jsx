import { Card, CardContent } from "@/components/ui/card";

export function ActivityStats({ activity }) {
  return (
    <Card className="bg-slate-900 border-slate-800 h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Activity
        </h3>

        <p className="text-4xl font-bold text-center">
          🔥 {activity.longestStreak}
        </p>

        <p className="text-muted-foreground mb-4 text-center pt-2">
          Longest Streak (Days)
        </p>

        <div className="space-y-1 text-sm text-muted-foreground text-center">
          <p>• {activity.activeDays} active days total</p>
        </div>
      </CardContent>
    </Card>
  );
}