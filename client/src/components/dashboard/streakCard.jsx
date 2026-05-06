import { Card, CardContent } from "@/components/ui/card";

export function StreakCard({ streak }) {
  const label = streak === 1 ? "Day" : "Days";

  return (
    <Card className="bg-slate-900 border-slate-800 h-full">
      <CardContent className="p-6 flex flex-col">
        <div className="mb-4 h-8 flex items-center justify-center">
          <h3 className="mb-3 font-semibold text-center">Log-In Streak</h3>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-7">
          <p className="text-lg">🔥 Streak</p>
          <p className="text-3xl font-bold p-4">
            {streak} {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}