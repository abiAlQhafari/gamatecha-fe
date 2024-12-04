import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full h-96">
      <Skeleton className="h-full w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-full w-[250px]" />
        <Skeleton className="h-full w-[200px]" />
      </div>
    </div>
  );
}
