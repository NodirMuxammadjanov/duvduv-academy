/**
 * Tests: Navbar and Hero static components
 * Tests render correctness, links, and critical UI elements
 */
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
}));

describe('Navbar', () => {
  test('renders brand name DUV-DUV GAP', () => {
    render(<Navbar />);
    expect(screen.getByText('DUV-DUV')).toBeInTheDocument();
    expect(screen.getByText('GAP')).toBeInTheDocument();
  });

  test('CTA button links to #contact section', () => {
    render(<Navbar />);
    const ctaLink = screen.getByText('KURSGA YOZILISH');
    expect(ctaLink).toHaveAttribute('href', '#contact');
  });

  test('renders a nav element', () => {
    render(<Navbar />);
    expect(document.querySelector('nav')).toBeInTheDocument();
  });
});

describe('Hero', () => {
  test('renders h1 with correct text', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /O'zbekistondagi.*birinchi.*kreativ reklama maktabi/i
    );
  });

  test('"KURSGA YOZILISH" CTA links to #contact', () => {
    render(<Hero />);
    const primaryBtn = screen.getByText("KURSGA YOZILISH");
    expect(primaryBtn).toHaveAttribute('href', '#contact');
  });

  test('"DASTURNI KO\'RISH" button links to #program', () => {
    render(<Hero />);
    const secondaryBtn = screen.getByText("DASTURNI KO'RISH");
    expect(secondaryBtn).toHaveAttribute('href', '#program');
  });

  test('shows acceptance rate stat: 12%', () => {
    render(<Hero />);
    expect(screen.getByText('12%')).toBeInTheDocument();
  });

  test('shows duration stat: 3 OY', () => {
    render(<Hero />);
    expect(screen.getByText('3 OY')).toBeInTheDocument();
  });

  test('hero image has proper alt text', () => {
    render(<Hero />);
    const img = screen.getByAltText(/Duv-Duv Academy/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/hero-image.jpg');
  });
});
