import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OverviewCardsProps = {
  total: number;
  interviews: number;
  rejections: number;
  responseRate: number;
};

export function OverviewCards({ total, interviews, rejections, responseRate }: OverviewCardsProps) {
  const cards = [
    { label: "Total Applications", value: total },
    { label: "Interviews", value: interviews },
    { label: "Rejections", value: rejections },
    { label: "Response Rate", value: `${responseRate.toFixed(1)}%` }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
