import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

function GoalCard({ goal }) {
  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{goal.title}</CardTitle>
        <CardDescription>
          {goal.category || "Personal Goal"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {goal.description}
        </p>

        <div className="flex justify-between text-sm">
          <span>XP Reward</span>
          <span className="text-indigo-400 font-semibold">
            +{goal.xp_reward || 10} XP
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default GoalCard;