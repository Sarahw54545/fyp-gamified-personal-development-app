import { Card, CardContent } from "@/components/ui/card";
import { AchievementGrid } from "../achievements/AchievementGrid";

export function AchievementPreview({ achievements }) {
  return (
    <Card className="bg-slate-900 border-slate-800 h-full">
      <CardContent className="p-6 flex flex-col">
        <div className="mb-4 h-8 flex items-center justify-center">
          <h3 className="font-semibold">Today’s Achievements</h3>
        </div>

        <AchievementGrid achievements={achievements.slice(0, 3)} />
      </CardContent>
    </Card>
  );
}