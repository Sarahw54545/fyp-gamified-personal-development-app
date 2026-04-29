import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteGoalDialog from "./deleteGoalDialog";
import EditGoalForm from "./editGoalForm"

function GoalCard({ goal, onDelete, onGoalUpdated, onComplete }) {
  const isCompleted = goal.completed;
  const isArchived = !goal.is_active;


  return (

    <Card className={`bg-slate-900 border-slate-800 transition-all duration-300 ${!isCompleted && "hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"}`}>

      <CardHeader className={isCompleted ? "opacity-60" : ""}>

        <CardTitle className="flex items-center gap-2 text-lg">
          {isCompleted && <span>✅</span>}
          <span className={isCompleted ? "line-through" : ""}>
            {goal.title}
          </span>
        </CardTitle>

        <CardDescription>
          {goal.category || "Personal Goal"}
        </CardDescription>
      </CardHeader>

      <CardContent className={isCompleted ? "opacity-60" : ""}>
        <p className="text-sm text-muted-foreground mb-4">
          {goal.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">

        {!isCompleted ? (
          <Button
            onClick={() => onComplete(goal.id)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Complete
          </Button>
        ) : (
          <Button
            disabled
            className="bg-emerald-600 text-white cursor-default"
          >
            Completed
          </Button>
        )}


        <div className="flex gap-2">
          {!isCompleted && !isArchived && (
            <EditGoalForm
              goal={goal}
              onGoalUpdated={onGoalUpdated}
            />
          )}

          {isCompleted && (
            <Button
              className="border border-indigo-600text-indigo-300hover:bg-indigo-600 hover:text-white"
              onClick={() => onArchive(goal.id)}
            >
              Archive
            </Button>
          )}

          <DeleteGoalDialog
            goalTitle={goal.title}
            onConfirm={() => onDelete(goal.id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default GoalCard;