import { Card, CardContent } from "@/components/ui/card";

export function StreakCard() {
  return (
    <Card>
      <CardContent className="p-6 text-center">

        <p className="text-lg">🔥 Streak</p>
        <p className="text-3xl font-bold">
          *No. Of DAYS* Days
        </p>

      </CardContent>
    </Card>
  );
}