import { useState } from 'react';
import './App.css';
import products from './products';
import CardList from './CardList';
import CartPage from './CartPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showCardPage, setShowCardPage] = useState(false);

  const cartCount = cartItems.length;

  const handleToggleCart = (id) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBuy = () => {
    setShowCartPage(true); // 구매 → 장바구니 페이지로 이동
  };

  return (
    <div className="App">
      {showCartPage ? (
        <CartPage
          cartItems={cartItems}
          setCartItems={setCartItems}
          onBack={() => setShowCartPage(false)}
          onCheckout={() => {
            setShowCartPage(false);
            setShowCardPage(true);
          }}
        />
      ) : showCardPage ? (
        <CardList onClose={() => setShowCardPage(false)} />
      ) : (
        <>
          <header className="header">
            <h1>신발 쇼핑몰입니다</h1>
            <div className="cart-icon" onClick={() => setShowCartPage(true)}>
              🛒 {cartCount}
            </div>
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
                          className={`add ${isInCart ? 'cancel' : ''}`}
                        >
                          {isInCart ? '담김!' : '담기'}
                        </button>
                        <button onClick={handleBuy} className="buy">
                          구매
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
