import { useState } from 'react';
import './App.css';
import products from './products';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>신발 쇼핑몰입니다</h1>
        <div className="cart-icon">🛒 {cartCount}</div>
      </header>

      <div className="subtext">현재 {products.length}개의 신발이 있습니다</div>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <div className="info">
              <strong>{p.brand}</strong>
              <p>{p.desc}</p>
              <p>{p.price.toLocaleString()}원</p>
              <div className="buttons">
                <button onClick={handleAddToCart}>담기</button>
                <button>구매</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
