import { Card, CardContent } from "@/components/ui/card";

export function StreakCard({ streak }) {
  const label = streak === 1 ? "Day" : "Days";

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-4">
        <h3 className="mb-3 font-semibold text-center">Log-In Streak</h3>

        <div className="p-4 text-center">
          <p className="text-lg">🔥 Streak</p>
          <p className="text-3xl font-bold mt-1">
            {streak} {label}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}