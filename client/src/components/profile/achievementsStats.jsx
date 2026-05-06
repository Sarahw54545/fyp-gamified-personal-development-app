import { Card, CardContent } from "@/components/ui/card";

export function AchievementsStats({ achievements }) {
  const progressivePercent = Math.round(
    achievements.progressiveCompletionRate * 100
  );

  return (
    <Card className="bg-slate-900 border-slate-800 h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Achievements
        </h3>

        <p className="text-4xl font-bold text-center">
          {achievements.totalCompleted}
        </p>

        <p className="text-muted-foreground mb-4 text-center pt-2">
          Total Achievements Completed
        </p>

        <div className="space-y-1 text-sm text-muted-foreground text-center">
          <p>• {achievements.dailyCompleted} Daily Achievements Completed</p>
          <p>• {progressivePercent}% Progressive Achievements Completed</p>
        </div>
      </CardContent>
    </Card>
  );
}