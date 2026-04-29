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

  return (

    <Card className={`bg-slate-900 border-slate-800 transition-all duration-300 ${!isCompleted && "hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"} ${isCompleted && "opacity-60"}`}>
      
      <CardHeader>
        <CardTitle className={`text-lg ${isCompleted && "line-through"}`}>
          {goal.title} {isCompleted && "✅"}
        </CardTitle>
        <CardDescription>
          {goal.category || "Personal Goal"}
        </CardDescription>
      </CardHeader>


      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {goal.description}
        </p>

        {/* <div className="flex justify-between text-sm">
          <span>XP Reward</span>
          <span className="text-indigo-400 font-semibold">
            +{goal.xp_reward || 10} XP
          </span>
        </div> */}
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        <Button variant="success" disabled={isCompleted} onClick={() => onComplete(goal.id)}>
          {isCompleted ? "Completed" : "Complete"}
        </Button>

        <EditGoalForm
          goal={goal}
          onGoalUpdated={onGoalUpdated}
        />

        <DeleteGoalDialog
          goalTitle={goal.title}
          onConfirm={() => onDelete(goal.id)}
        />
      </CardFooter>
    </Card>
  );
}

export default GoalCard;