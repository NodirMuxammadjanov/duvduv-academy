/**
 * Tests: FAQ Component — accordion open/close behavior
 */
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '@/components/FAQ';

// framer-motion mock (not needed for logic tests)
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('FAQ Component', () => {
  test('renders all 6 questions', () => {
    render(<FAQ />);
    // All question texts should be visible
    expect(screen.getByText(/Kursga qabul qilinish uchun tajriba kerakmi/)).toBeInTheDocument();
    expect(screen.getByText(/Kurs qaysi tilda o'tadi/)).toBeInTheDocument();
    expect(screen.getByText(/Bo'lib to'lash mumkinmi/)).toBeInTheDocument();
    expect(screen.getByText(/Darsga kela olmasam nima bo'ladi/)).toBeInTheDocument();
    expect(screen.getByText(/Bepul leksiyalardan nimasi farq qiladi/)).toBeInTheDocument();
    expect(screen.getByText(/Agency 605 da ishlash kafolatlanadimi/)).toBeInTheDocument();
  });

  test('answers are hidden initially', () => {
    render(<FAQ />);
    // No answer text should appear before clicking
    expect(screen.queryByText(/Yo'q, tajriba shart emas/)).not.toBeInTheDocument();
  });

  test('clicking a question reveals its answer', () => {
    render(<FAQ />);
    const firstQuestion = screen.getByText(/Kursga qabul qilinish uchun tajriba kerakmi/);
    fireEvent.click(firstQuestion.closest('[class*="item"]') || firstQuestion.parentElement);
    expect(screen.getByText(/Yo'q, tajriba shart emas/)).toBeInTheDocument();
  });

  test('clicking open question again closes it', () => {
    render(<FAQ />);
    const firstItem = screen.getByText(/Kursga qabul qilinish uchun tajriba kerakmi/).closest('div[class]');
    
    fireEvent.click(firstItem);
    expect(screen.getByText(/Yo'q, tajriba shart emas/)).toBeInTheDocument();
    
    fireEvent.click(firstItem);
    expect(screen.queryByText(/Yo'q, tajriba shart emas/)).not.toBeInTheDocument();
  });

  test('opening one question closes the previously open one', () => {
    render(<FAQ />);
    
    const firstItem = screen.getByText(/Kursga qabul qilinish uchun tajriba kerakmi/).closest('div[class]');
    const secondItem = screen.getByText(/Kurs qaysi tilda o'tadi/).closest('div[class]');
    
    fireEvent.click(firstItem);
    expect(screen.getByText(/Yo'q, tajriba shart emas/)).toBeInTheDocument();
    
    fireEvent.click(secondItem);
    // First answer should close
    expect(screen.queryByText(/Yo'q, tajriba shart emas/)).not.toBeInTheDocument();
    // Second answer should open
    expect(screen.getByText(/Darslar o'zbek tilida olib boriladi/)).toBeInTheDocument();
  });

  test('shows plus icon when question is closed', () => {
    render(<FAQ />);
    const icons = screen.getAllByText('+');
    expect(icons.length).toBe(6);
  });

  test('shows minus icon when question is open', () => {
    render(<FAQ />);
    const firstItem = screen.getByText(/Kursga qabul qilinish uchun tajriba kerakmi/).closest('div[class]');
    fireEvent.click(firstItem);
    expect(screen.getByText('−')).toBeInTheDocument();
  });
});
