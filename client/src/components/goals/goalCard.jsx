import { useState } from "react"
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
import { startOfToday, getRelativeDueText } from "@/lib/dates";

function GoalCard({ goal, onDelete, onGoalUpdated, onComplete, variant }) {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = goal.completed;
  const isArchived = !goal.is_active;

  const today = startOfToday();

  const hasDueDate = !!goal.due_date;
  const dueDate = hasDueDate ? new Date(goal.due_date) : null;

  const isOverdue =
    hasDueDate &&
    !goal.completed &&
    dueDate < today;

  return (

    
    <Card
      className={`transition-all duration-300 flex flex-col ${variant === "dashboard" ? "bg-slate-800 border-slate-700" : "bg-slate-900 border-slate-800"}${isOverdue ? "hover:border-red-500/60 border-red-950 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] bg-red-950/20" : !isCompleted && "hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"}`}>

      <CardHeader className={isCompleted ? "opacity-60 overflow-hidden" : "overflow-hidden"}>


        <CardTitle className="flex items-start gap-2 text-lg leading-snug">
          {isCompleted && <span className="mt-0.5">✅</span>}
          <span
            className={`block break-words whitespace-normal line-clamp-2 ${isCompleted ? "line-through" : ""
              }`}
          >
            {goal.title}
          </span>
        </CardTitle>




        {hasDueDate && !isCompleted && (
          <p
            className={`text-xs mb-2 ${isOverdue ? "text-red-400 font-medium" : "text-muted-foreground"
              }`}
          >
            {getRelativeDueText(dueDate)}
          </p>
        )}


        <CardDescription>
          <p className={`text-sm line-clamp-3 ${isOverdue ? "text-slate-200" : "text-muted-foreground"}`}>
            {goal.category || "Personal Goal"}
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className={isCompleted ? "opacity-60" : ""}>
        <div
          className={`relative transition-all ${expanded ? "max-h-none" : "max-h-[4.5rem] overflow-hidden"
            }`}
        >
          <p
            className={`text-sm whitespace-pre-wrap break-words ${isOverdue ? "text-slate-200" : "text-muted-foreground"
              }`}
          >
            {goal.description}
          </p>

          {!expanded && goal.description?.length > 120 && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-900" />
          )}
        </div>

        {goal.description?.length > 120 && (
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-3">

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