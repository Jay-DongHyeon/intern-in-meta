import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App 컴포넌트', () => {
  test('헤더와 장바구니 초기값이 표시된다', () => {
    render(<App />);
    expect(screen.getByText(/신발 쇼핑몰입니다/)).toBeInTheDocument();
    expect(screen.getByText(/🛒 0/)).toBeInTheDocument();
  });

  test('상품 수량 안내 문구가 표시된다', () => {
    render(<App />);
    expect(screen.getByText(/개의 신발이 있습니다/)).toBeInTheDocument();
  });

  test('"담기" 버튼 클릭 시 장바구니 수량이 증가한다', () => {
    render(<App />);
    const addButton = screen.getAllByText('담기')[0];
    fireEvent.click(addButton);
    expect(screen.getByText(/🛒 1/)).toBeInTheDocument();
    expect(screen.getAllByText('담김!')[0]).toBeInTheDocument();
  });

  test('"담김!" 버튼 클릭 시 장바구니 수량이 감소한다', () => {
    render(<App />);
    const addButton = screen.getAllByText('담기')[0];
    fireEvent.click(addButton); // 담기
    fireEvent.click(screen.getAllByText('담김!')[0]); // 취소
    expect(screen.getByText(/🛒 0/)).toBeInTheDocument();
    expect(screen.getAllByText('담기')[0]).toBeInTheDocument();
  });

  test('상품 카드가 모두 렌더링된다', () => {
    render(<App />);
    const cards = screen.getAllByRole('img');
    expect(cards.length).toBe(6); // products.js 기준
  });
});
