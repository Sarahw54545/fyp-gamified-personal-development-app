import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getLevelProgress } from "@/lib/xp";

export function XPWidget({ gamification }) {
  const { totalXp } = gamification;

  const { level, progress, nextLevelXp } =
    getLevelProgress(totalXp);

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Level {level}</h3>
          <span className="text-sm text-muted-foreground">
            {Math.floor(progress)}%
          </span>
        </div>

        <Progress value={progress} />

        <p className="text-sm text-muted-foreground">
          {totalXp} / {nextLevelXp} XP
        </p>
      </CardContent>
    </Card>
  );
}