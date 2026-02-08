import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function XPWidget() {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">

        <h3 className="mb-2 font-semibold">
          XP Progress
        </h3>

        <Progress value={68} />

        <p className="mt-2 text-sm text-muted-foreground">
          *XP AMOUNT* / *TOTAL XP AMOUNT* XP
        </p>

      </CardContent>
    </Card>
  );
}