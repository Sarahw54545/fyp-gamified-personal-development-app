import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GoalPreview() {
  return (
    <Card>
      <CardContent className="p-6">

        <h3 className="mb-4 font-semibold">
          Today's Goals
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between">
            *GOAL 1*
            <Button size="sm">Complete</Button>
          </div>

          <div className="flex justify-between">
            *GOAL 2*
            <Button size="sm">Complete</Button>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}