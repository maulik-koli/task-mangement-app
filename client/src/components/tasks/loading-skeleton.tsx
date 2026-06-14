import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatsCardSkeleton() {
  return (
    <Card size="sm">
      <CardHeader className="flex-row items-center justify-between pb-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="size-8 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-12" />
      </CardContent>
    </Card>
  );
}

function SearchSkeleton() {
  return <Skeleton className="h-10 w-full rounded-lg" />;
}

function TaskCardSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-3 w-24" />
          <div className="flex gap-1">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="size-6 rounded" />
            <Skeleton className="size-6 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Search */}
      <SearchSkeleton />

      {/* Task Cards */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <TaskCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { StatsCardSkeleton, SearchSkeleton, TaskCardSkeleton };
