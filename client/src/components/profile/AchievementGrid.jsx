import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AchievementGrid({ achievements }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Achievements 🏆</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => {
          const {
            key,
            title,
            description,
            type,
            tiers = [],
            completedTiers = [],
            currentValue,
            nextThreshold,
            completedToday,
          } = achievement;

          const progress =
            type === "progressive" && nextThreshold
              ? (currentValue / nextThreshold) * 100
              : 100;

          return (
            <Card
              key={key}
              className="bg-slate-900 border-slate-800 hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>

              <CardContent>
                {/* Progressive achievements */}
                {type === "progressive" && (
                  <div className="space-y-4">
                    {/* Tier pills */}
                    <div className="flex justify-center gap-3">
                      {tiers.map(({ threshold, label }) => {
                        const isCompleted =
                          completedTiers.includes(threshold);
                        const isNext = threshold === nextThreshold;

                        return (
                          <TooltipProvider key={threshold}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span
                                  className={[
                                    "text-sm px-3 py-1 rounded-full border cursor-default transition-colors",
                                    isCompleted &&
                                      "bg-indigo-600 text-white border-indigo-600",
                                    !isCompleted &&
                                      isNext &&
                                      "border-indigo-500 text-indigo-400",
                                    !isCompleted &&
                                      !isNext &&
                                      "border-slate-700 text-muted-foreground",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                >
                                  {threshold}
                                </span>
                              </TooltipTrigger>

                              <TooltipContent>
                                <p>{label}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>

                    {/* Progress bar */}
                    <Progress value={progress} />

                    {/* Progress text */}
                    <div className="flex justify-end">
                      <p className="text-xs text-muted-foreground">
                        {currentValue} / {nextThreshold}
                      </p>
                    </div>
                  </div>
                )}

                {/* Daily achievements */}
                {type === "daily" && (
                  <div className="flex justify-center pt-2">
                    <p className="text-sm">
                      {completedToday
                        ? "✅ Completed Today"
                        : "⏳ Not Completed"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}