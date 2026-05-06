import { Card, CardContent } from "@/components/ui/card";

export function AchievementPreview({ achievements }) {
  return (
    <Card className="mt-6 bg-slate-900 border-slate-800">
      <CardContent className="p-4">
        <h3 className="mb-3 font-semibold text-center">
          Today’s Achievements
        </h3>

        <div className="space-y-2">
          {achievements.map((a) => (
            <div
              key={a.key}
              className="flex justify-between"
            >
              <span>{a.title}</span>
              <span
                className={
                  a.completedToday
                    ? "text-green-500"
                    : "text-muted-foreground"
                }
              >
                {a.completedToday ? "✓ Completed" : "—"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}