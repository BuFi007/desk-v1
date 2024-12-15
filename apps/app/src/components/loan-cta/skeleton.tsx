import { Card, CardContent, CardFooter } from "@bu/ui/card";
import { Skeleton } from "@bu/ui/skeleton";

export function LoanCTASkeleton() {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-300/30">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-32 bg-white/20" />
        <Skeleton className="mt-4 h-8 w-full bg-white/20" />
        <Skeleton className="mt-2 h-4 w-3/4 bg-white/20" />
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Skeleton className="h-10 w-40 bg-white/20" />
      </CardFooter>
    </Card>
  );
}
