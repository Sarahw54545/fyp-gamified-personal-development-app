import { Card, CardContent } from "@/components/ui/card";

export function GoalsStats({ goals }) {
  const completionPercent = Math.round(goals.completionRate * 100);

  return (
    <Card className="bg-slate-900 border-slate-800 h-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Goals
        </h3>

        <p className="text-4xl font-bold text-center">
          {completionPercent}%
        </p>

        <p className="text-muted-foreground mb-4 text-center pt-2">
          Completion Rate
        </p>

        <div className="space-y-1 text-sm text-muted-foreground text-center">
          <p>• {goals.totalCreated} Goals Created</p>
          <p>• {goals.totalCompleted} Goals Completed</p>
        </div>
      </CardContent>
    </Card>
  );
}