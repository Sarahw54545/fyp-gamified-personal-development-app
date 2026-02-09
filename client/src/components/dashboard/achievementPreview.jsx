import { Card, CardContent } from "@/components/ui/card";

export function AchievementPreview() {
  return (
    <Card className="mt-6">
      <CardContent className="p-6">

        <h3 className="mb-3 font-semibold">
          Achievements
        </h3>

        <div className="flex gap-4">
          *ACHIEVEMENT 1*
          *ACHIEVEMENT 2*
          *ACHIEVEMENT 3*
        </div>

      </CardContent>
    </Card>
  );
}