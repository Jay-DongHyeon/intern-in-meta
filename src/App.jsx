import { useState } from 'react';
import './App.css';
import products from './products';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleToggleCart = (id) => {
    if (cartItems.includes(id)) {
      // 취소
      setCartItems((prev) => prev.filter((item) => item !== id));
      setCartCount((prev) => prev - 1);
    } else {
      // 담기
      setCartItems((prev) => [...prev, id]);
      setCartCount((prev) => prev + 1);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>신발 쇼핑몰입니다</h1>
        <div className="cart-icon">🛒 {cartCount}</div>
      </header>

      <div className="subtext">
        {products.length > 0
          ? `현재 ${products.length}개의 신발이 있습니다`
          : '상품 없음'}
      </div>

      {products.length > 0 && (
        <div className="product-grid">
          {products.map((p) => {
            const isInCart = cartItems.includes(p.id);
            return (
              <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.desc} />
                <div className="info">
                  <strong>{p.brand}</strong>
                  <p>{p.desc}</p>
                  <p>{p.price.toLocaleString()}원</p>
                  <div className="buttons">
                    <button
                      onClick={() => handleToggleCart(p.id)}
                      className={isInCart ? 'cancel' : ''}
                    >
                      {isInCart ? '담김!' : '담기'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
