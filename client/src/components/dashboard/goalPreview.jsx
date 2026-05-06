import { Card, CardContent } from "@/components/ui/card";
import GoalCard from "../goals/goalCard";

export function GoalPreview({ goals, onComplete, onDelete }) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-4">
        <h3 className="mb-3 font-semibold text-center">Today’s Goals</h3>

        {goals.length === 0 && (
          <p className="text-muted-foreground">
            No goals scheduled for today
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              variant="dashboard"
              onComplete={onComplete}
              onDelete={onDelete}
              compact
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}