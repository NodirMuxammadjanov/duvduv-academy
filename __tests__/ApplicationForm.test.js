/**
 * Tests: ApplicationForm Component
 * Tests multi-step form flow, validation, submit, and error states
 */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationForm from '@/components/ApplicationForm';

// Mock framer-motion animations (not relevant to logic tests)
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock fetch globally
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ApplicationForm — Step 1: Shaxsiy ma\'lumotlar', () => {
  test('renders step 1 fields on initial load', () => {
    render(<ApplicationForm />);
    expect(screen.getByPlaceholderText(/Masalan: Nodirbek Ergashev/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Masalan: 24/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\+998 90-123-45-67/)).toBeInTheDocument();
  });

  test('phone input pre-filled with +998 prefix', () => {
    render(<ApplicationForm />);
    const phoneInput = screen.getByPlaceholderText(/\+998 90-123-45-67/);
    expect(phoneInput).toHaveValue('+998 ');
  });

  test('"Davom etish" button is visible on step 1', () => {
    render(<ApplicationForm />);
    expect(screen.getByText(/Davom etish/)).toBeInTheDocument();
  });

  test('shows 3 step indicators', () => {
    render(<ApplicationForm />);
    // 3 stepDot elements
    const dots = document.querySelectorAll('[class*="stepDot"]');
    expect(dots.length).toBe(3);
  });

  test('clicking "Davom etish" advances to step 2', async () => {
    render(<ApplicationForm />);
    const nextBtn = screen.getByText(/Davom etish/);
    fireEvent.click(nextBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Siz haqingizda/)).toBeInTheDocument();
    });
  });
});

describe('ApplicationForm — Step 2: Siz haqingizda', () => {
  async function goToStep2() {
    render(<ApplicationForm />);
    fireEvent.click(screen.getByText(/Davom etish/));
    await waitFor(() => screen.getByText(/Siz haqingizda/));
  }

  test('shows occupation and experience fields', async () => {
    await goToStep2();
    expect(screen.getByPlaceholderText(/Masalan: Grafik dizayner/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Qancha vaqtdan beri/)).toBeInTheDocument();
  });

  test('shows back button on step 2', async () => {
    await goToStep2();
    expect(screen.getByText('Orqaga')).toBeInTheDocument();
  });

  test('"Orqaga" button goes back to step 1', async () => {
    await goToStep2();
    fireEvent.click(screen.getByText('Orqaga'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Masalan: Nodirbek Ergashev/)).toBeInTheDocument();
    });
  });

  test('clicking "Davom etish" from step 2 goes to step 3', async () => {
    await goToStep2();
    // Click the "Davom etish →" button (not the back btn)
    const nextBtns = screen.getAllByText(/Davom etish/);
    fireEvent.click(nextBtns[nextBtns.length - 1]);
    await waitFor(() => {
      expect(screen.getByText(/Qo'shimcha ma'lumotlar/)).toBeInTheDocument();
    });
  });
});

describe('ApplicationForm — Step 3: Qo\'shimcha ma\'lumotlar', () => {
  async function goToStep3() {
    render(<ApplicationForm />);
    // Step 1 → 2
    fireEvent.click(screen.getByText(/Davom etish/));
    await waitFor(() => screen.getByText(/Siz haqingizda/));
    // Step 2 → 3
    const nextBtns = screen.getAllByText(/Davom etish/);
    fireEvent.click(nextBtns[nextBtns.length - 1]);
    await waitFor(() => screen.getByText(/Qo'shimcha ma'lumotlar/));
  }

  test('renders telegram, payment, and source fields', async () => {
    await goToStep3();
    expect(screen.getByPlaceholderText('@username')).toBeInTheDocument();
    expect(screen.getByDisplayValue(/To'liq to'lash/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Ijtimoiy tarmoqlar/)).toBeInTheDocument();
  });

  test('"KURSGA YOZILISH" submit button is visible', async () => {
    await goToStep3();
    expect(screen.getByRole('button', { name: 'KURSGA YOZILISH' })).toBeInTheDocument();
  });

  test('submit sends POST to /api/lead with form data', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    await goToStep3();

    // Fill telegram
    fireEvent.change(screen.getByPlaceholderText('@username'), {
      target: { value: '@testuser' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'KURSGA YOZILISH' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/lead',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  test('shows success message after successful submit', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    await goToStep3();
    fireEvent.change(screen.getByPlaceholderText('@username'), { target: { value: '@testuser' } });
    fireEvent.click(screen.getByRole('button', { name: 'KURSGA YOZILISH' }));

    await waitFor(() => {
      expect(screen.getByText('Muvaffaqiyatli!')).toBeInTheDocument();
    });
  });

  test('shows error message when API returns failure', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: false, error: 'Server xatosi' }),
    });

    await goToStep3();
    fireEvent.change(screen.getByPlaceholderText('@username'), { target: { value: '@testuser' } });
    fireEvent.click(screen.getByRole('button', { name: 'KURSGA YOZILISH' }));

    await waitFor(() => {
      expect(screen.getByText('Server xatosi')).toBeInTheDocument();
    });
  });

  test('shows generic error message when fetch throws (network failure)', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    await goToStep3();
    fireEvent.change(screen.getByPlaceholderText('@username'), { target: { value: '@testuser' } });
    fireEvent.click(screen.getByRole('button', { name: 'KURSGA YOZILISH' }));

    await waitFor(() => {
      expect(screen.getByText(/Server bilan bog'lanishda xatolik/)).toBeInTheDocument();
    });
  });

  test('submit button is disabled while pending', async () => {
    let resolveFetch;
    global.fetch.mockReturnValueOnce(
      new Promise((resolve) => { resolveFetch = resolve; })
    );

    await goToStep3();
    fireEvent.change(screen.getByPlaceholderText('@username'), { target: { value: '@testuser' } });
    fireEvent.click(screen.getByRole('button', { name: 'KURSGA YOZILISH' }));

    // Button should be disabled while loading
    await waitFor(() => {
      expect(screen.getByText("Jo'natilmoqda...")).toBeDisabled();
    });

    // Resolve the fetch
    act(() => {
      resolveFetch({ json: async () => ({ success: true }) });
    });
  });
});

describe('ApplicationForm — Phone formatting', () => {
  test('phone input formats digits as user types', () => {
    render(<ApplicationForm />);
    const phoneInput = screen.getByPlaceholderText(/\+998 90-123-45-67/);
    
    fireEvent.change(phoneInput, { target: { value: '+998 901234567' } });
    expect(phoneInput).toHaveValue('+998 90-123-45-67');
  });

  test('phone does not exceed 9 digits', () => {
    render(<ApplicationForm />);
    const phoneInput = screen.getByPlaceholderText(/\+998 90-123-45-67/);
    
    fireEvent.change(phoneInput, { target: { value: '+998 9012345678999' } });
    // Should still be max 9 digits
    const digits = phoneInput.value.replace(/\D/g, '');
    expect(digits.length).toBeLessThanOrEqual(12); // 998 + 9 = 12
  });
});
