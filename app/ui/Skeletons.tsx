export function CardSkeleton() {
  return <div className="card w-128 h-40 skeleton" />;
}

export function CardTableSkeleton() {
  const numCards = 24;
  const cardsArray = Array.from({ length: numCards }, (_, i) => <CardSkeleton key={i} />);

  return <div className="grid gap-4 grid-cols-6">{cardsArray}</div>;
}
