import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function XPWidget({ gamification }) {
  const { totalXp, level } = gamification;

  // Quadratic XP logic (must match backend baseXp = 50)
  const baseXp = 50;
  const currentLevelXp = baseXp * Math.pow(level - 1, 2);
  const nextLevelXp = baseXp * Math.pow(level, 2);

  const progress =
    ((totalXp - currentLevelXp) /
      (nextLevelXp - currentLevelXp)) *
    100;

  return (
    <Card>
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