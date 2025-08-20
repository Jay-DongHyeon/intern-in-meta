// src/CartPage.jsx
import { useEffect, useMemo, useState } from "react";
import products from "./products";
import "./CartPage.css";

/**
 * props
 * - cartItems: string[]  // 상품 id 배열(중복 허용: [ '1','1','2' ] = 1번 2개, 2번 1개)
 * - setCartItems: (next: string[]) => void
 * - onBack: () => void            // 상단 뒤로가기
 * - onCheckout: () => void        // 결제 버튼 클릭
 */
export default function CartPage({
  cartItems = [],
  setCartItems,
  onBack,
  onCheckout,
}) {
  // cartItems -> { id: qty } 로 변환해 내부 편집
  const initialQtyMap = useMemo(() => {
    const map = {};
    for (const id of cartItems) map[id] = (map[id] || 0) + 1;
    return map;
  }, [cartItems]);

  const [qtyMap, setQtyMap] = useState(initialQtyMap);

  // 외부 cartItems가 바뀌면 동기화
  useEffect(() => setQtyMap(initialQtyMap), [initialQtyMap]);

  // products + qty 합치기
  const lines = useMemo(() => {
    return Object.entries(qtyMap)
      .filter(([, q]) => q > 0)
      .map(([id, qty]) => {
        const p = products.find((x) => String(x.id) === String(id));
        return p ? { product: p, qty } : null;
      })
      .filter(Boolean);
  }, [qtyMap]);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines]
  );
  const shipping = subtotal > 0 ? 3000 : 0;
  const total = subtotal + shipping;

  // qtyMap -> cartItems 배열로 직렬화
  const commitToParent = (nextMap) => {
    if (!setCartItems) return;
    const arr = [];
    Object.entries(nextMap).forEach(([id, q]) => {
      for (let i = 0; i < q; i++) arr.push(id);
    });
    setCartItems(arr);
  };

  const inc = (id) => {
    const next = { ...qtyMap, [id]: (qtyMap[id] || 0) + 1 };
    setQtyMap(next);
    commitToParent(next);
  };
  const dec = (id) => {
    const current = qtyMap[id] || 0;
    const next = { ...qtyMap, [id]: Math.max(0, current - 1) };
    setQtyMap(next);
    commitToParent(next);
  };
  const remove = (id) => {
    const next = { ...qtyMap, [id]: 0 };
    setQtyMap(next);
    commitToParent(next);
  };

  return (
    <div className="cart-wrap">
      {/* 상단 바 */}
      <div className="cart-topbar">
        <button aria-label="뒤로가기" className="back-btn" onClick={onBack}>
          ←
        </button>
        <div className="topbar-title">장바구니</div>
      </div>

      {/* 헤더 */}
      <div className="cart-header">
        <h1>장바구니</h1>
        <p>
          현재 <strong>{lines.length}</strong>개의 상품이 담겨있습니다.
        </p>
      </div>

      {/* 리스트 */}
      <div className="cart-list">
        {lines.length === 0 ? (
          <div className="empty">장바구니가 비어 있습니다.</div>
        ) : (
          lines.map(({ product, qty }) => (
            <div key={product.id} className="cart-item">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.desc || product.title || "상품"}
                  className="thumb"
                />
              )}
              <div className="meta">
                <div className="brand">{product.brand}</div>
                <div className="price">
                  {Number(product.price).toLocaleString()}원
                </div>
                <div className="qty">
                  <button
                    className="qty-btn"
                    onClick={() => dec(product.id)}
                    aria-label="수량 감소"
                  >
                    –
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => inc(product.id)}
                    aria-label="수량 증가"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove"
                onClick={() => remove(product.id)}
                aria-label="삭제"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* 요약 */}
      <div className="summary">
        <div className="row">
          <span>상품 금액</span>
          <strong>{subtotal.toLocaleString()}원</strong>
        </div>
        <div className="row">
          <span>배송비</span>
          <strong>{shipping.toLocaleString()}원</strong>
        </div>
        <div className="row total">
          <span>총 금액</span>
          <strong>{total.toLocaleString()}원</strong>
        </div>
        <button
          className="checkout"
          onClick={onCheckout}
          disabled={lines.length === 0}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
