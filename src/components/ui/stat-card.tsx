import { Card, CardContent, CardHeader } from "../ui/card";

interface StatCardProps {
  title?: string;
  count?: number;
  subCount?: number;
}

export function StatCard({ title, count }: StatCardProps) {
  return (
    <Card className="rounded-3xl">
      <CardHeader className=" justify-between flex-row">
        <span className="text-sm font-light opacity-75">{title}</span>
      </CardHeader>

      <CardContent className="mb-6">
        <span className="text-3xl">{count}</span>
      </CardContent>
    </Card>
  );
}
