import type { Card as CardType } from '../types/game';

type Props = {
  card?: CardType;
  hidden?: boolean;
};

export function Card({ card, hidden }: Props) {
  if (hidden || !card) {
    return <div className="playing-card hidden">?</div>;
  }

  const isRed = card.suit === 'Hearts' || card.suit === 'Diamonds';

  return (
    <div className={`playing-card ${isRed ? 'red' : ''}`}>
      <div>{card.rank}</div>
      <div>{card.suit}</div>
    </div>
  );
}
