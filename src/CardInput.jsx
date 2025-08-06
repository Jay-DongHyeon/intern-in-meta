import { useState } from 'react';
import './CardInput.css';

function CardInput({ onSubmit, onClose }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [cvc, setCvc] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');

  // 카드 번호 포맷팅
  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '').slice(0, 16);
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  // 만료일 포맷팅
  const formatExpiry = (value) => {
    const numbers = value.replace(/\D/g, '').slice(0, 4);
    if (numbers.length < 3) return numbers;
    return numbers.slice(0, 2) + '/' + numbers.slice(2);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
  };

  // 만료일 유효성 검사
  const isExpiryValid = (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    const [month, year] = value.split('/').map(Number);
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  // CVC 유효성 검사
  const isCvcValid = (value) => /^\d{3,4}$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      alert('카드 번호는 16자리여야 합니다.');
      return;
    }
    if (!isExpiryValid(expiry)) {
      alert('만료일이 유효하지 않습니다.');
      return;
    }
    if (!isCvcValid(cvc)) {
      alert('보안코드는 3~4자리 숫자여야 합니다.');
      return;
    }

    if (onSubmit) {
      onSubmit({ cardNumber, expiry, ownerName, cvc, pw1, pw2 });
    }
  };

  const maskCardNumber = (num) => {
    const parts = num.split(' ');
    if (parts.length === 4) {
      return `${parts[0]} ${parts[1]} **** ****`;
    }
    return '1111 2222 **** ****';
  };

  return (
    <div className="card-input-page">
      <div className="header">
        <button className="back-btn" onClick={onClose}>←</button>
        <span className="title">카드 추가</span>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="card-preview">
        <div className="chip"></div>
        <div className="card-number">{maskCardNumber(cardNumber)}</div>
        <div className="card-footer">
          <span className="name">{ownerName || 'NAME'}</span>
          <span className="expiry">{expiry || 'MM/YY'}</span>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          카드 번호
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>

        <label>
          만료일
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            required
          />
        </label>

        <label className="owner-label">
          카드 소유자 이름 <span>{ownerName.length}/30</span>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            maxLength={30}
            placeholder="카드에 표시된 이름"
            required
          />
        </label>

        <label>
          보안 코드(CVC)
          <div className="cvc-row">
            <input
              type="password"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              maxLength={4}
              placeholder="***"
              required
            />
            <span className="help">?</span>
          </div>
        </label>

        <label>
          카드 비밀번호
          <div className="pw-row">
            <input
              type="password"
              maxLength={1}
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              required
            />
            <input
              type="password"
              maxLength={1}
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
            />
            <span className="dot">• •</span>
          </div>
        </label>

        <button type="submit" className="submit-btn">
          작성 완료
        </button>
      </form>
    </div>
  );
}

export default CardInput;
