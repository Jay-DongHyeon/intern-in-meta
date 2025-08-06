import { useState } from 'react';
import './CardList.css';
import CardInput from './CardInput';

function CardList({ onClose }) {
  const [cards, setCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCard = (cardData) => {
    const newCard = {
      id: Date.now(),
      number: maskCardNumber(cardData.cardNumber),
      expiry: cardData.expiry,
      owner: cardData.ownerName
    };
    setCards((prev) => [...prev, newCard]);
    setIsAdding(false);
  };

  const maskCardNumber = (num) => {
    if (!num) return '1111 2222 **** ****';
    const clean = num.replace(/\D/g, '');
    const groups = clean.match(/.{1,4}/g) || [];
    while (groups.length < 4) groups.push('****');
    return groups
      .map((g, i) => (i < 2 ? g : '****'))
      .join(' ');
  };

  const handlePayWithCard = (card) => {
    alert(`${card.number} 카드로 결제합니다.`);
  };

  return (
    <div className="card-list">
      {isAdding ? (
        <CardInput
          onSubmit={handleAddCard}
          onClose={() => setIsAdding(false)}
        />
      ) : (
        <>
          <div className="card-list-header">
            <span>보유카드</span>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>

          {cards.length === 0 ? (
            <div className="empty-state">
              <p>새로운 카드를 등록해주세요.</p>
              <div className="add-card-box" onClick={() => setIsAdding(true)}>
                <span className="plus">+</span>
              </div>
            </div>
          ) : (
            <div className="cards">
              {cards.map((card) => (
                <div key={card.id} className="card-item">
                  <div className="card-ui">
                    <div className="chip"></div>
                    <div className="card-number">{card.number}</div>
                    <div className="card-footer">
                      <span>{card.owner || 'NAME'}</span>
                      <span>{card.expiry}</span>
                    </div>
                  </div>
                  <button
                    className="pay-btn"
                    onClick={() => handlePayWithCard(card)}
                  >
                    이 카드로 결제하기
                  </button>
                </div>
              ))}
              <div className="add-card-box" onClick={() => setIsAdding(true)}>
                <span className="plus">+</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CardList;
