import type { Card as CardType } from '../types/game';
import { Card } from './Card';

type Props = {
  label: string;
  cards: CardType[];
  score: number | null;
  hiddenCount?: number;
};

export function Hand({ label, cards, score, hiddenCount = 0 }: Props) {
  return (
    <div className="hand">
      <div className="hand-header">
        <span>{label}</span>
        <span>{score !== null ? `Score: ${score}` : 'Score: -'}</span>
      </div>
      <div className="hand-cards">
        {cards.map((card, i) => (
          <Card key={i} card={card} />
        ))}
        {hiddenCount > 0 && <Card hidden />}
        {hiddenCount > 1 && <Card hidden />}
        {cards.length === 0 && hiddenCount === 0 && <span>No cards</span>}
      </div>
    </div>
  );
}
