/**
 * Tests: ApplicationForm Component
 * Tests single-step form fields, submit, validation, and error states
 */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ApplicationForm from '@/components/ApplicationForm';

// Mock framer-motion animations (not relevant to logic tests)
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    form: ({ children, ...props }) => {
      const { initial, animate, exit, transition, ...rest } = props;
      return <form {...rest}>{children}</form>;
    },
  },
}));

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

function fillRequiredFields() {
  fireEvent.change(screen.getByPlaceholderText(/Masalan: Nodirbek Ergashev/), {
    target: { value: 'Test User' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Masalan: 24/), {
    target: { value: '24' },
  });
  fireEvent.change(screen.getByPlaceholderText(/\+998 90-123-45-67/), {
    target: { value: '+998 901234567' },
  });
  fireEvent.change(screen.getByPlaceholderText('@username'), {
    target: { value: '@testuser' },
  });
}

describe('ApplicationForm - single-step form', () => {
  test('renders only the required fields', () => {
    render(<ApplicationForm />);

    expect(screen.getByLabelText(/To'liq ism/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Yosh/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telegram username/i)).toBeInTheDocument();
  });

  test('does not render multi-step controls or removed fields', () => {
    render(<ApplicationForm />);

    expect(screen.queryByText(/Davom etish/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Orqaga/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Kasbingiz/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Tajribangiz/)).not.toBeInTheDocument();
    expect(screen.queryByText(/To'lov varianti/)).not.toBeInTheDocument();
    expect(screen.queryByText(/qayerdan eshitdingiz/)).not.toBeInTheDocument();
    expect(document.querySelectorAll('[class*="stepDot"]').length).toBe(0);
  });

  test('phone input is pre-filled with +998 prefix', () => {
    render(<ApplicationForm />);
    const phoneInput = screen.getByPlaceholderText(/\+998 90-123-45-67/);
    expect(phoneInput).toHaveValue('+998 ');
  });

  test('submit button text is "Kursga yozilish"', () => {
    render(<ApplicationForm />);
    expect(screen.getByRole('button', { name: 'Kursga yozilish' })).toBeInTheDocument();
  });

  test('submit sends POST to /api/lead with only required form data', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<ApplicationForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Kursga yozilish' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/lead',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Test User',
            age: '24',
            phone: '+998 90-123-45-67',
            telegram: '@testuser',
          }),
        })
      );
    });
  });

  test('shows success message after successful submit', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<ApplicationForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Kursga yozilish' }));

    await waitFor(() => {
      expect(screen.getByText('Muvaffaqiyatli!')).toBeInTheDocument();
    });
  });

  test('shows error message when API returns failure', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: false, error: 'Server xatosi' }),
    });

    render(<ApplicationForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Kursga yozilish' }));

    await waitFor(() => {
      expect(screen.getByText('Server xatosi')).toBeInTheDocument();
    });
  });

  test('shows generic error message when fetch throws', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    render(<ApplicationForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Kursga yozilish' }));

    await waitFor(() => {
      expect(screen.getByText(/Server bilan bog'lanishda xatolik/)).toBeInTheDocument();
    });
  });

  test('submit button is disabled while pending', async () => {
    let resolveFetch;
    global.fetch.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    render(<ApplicationForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Kursga yozilish' }));

    await waitFor(() => {
      expect(screen.getByText("Jo'natilmoqda...")).toBeDisabled();
    });

    act(() => {
      resolveFetch({ json: async () => ({ success: true }) });
    });
  });
});

describe('ApplicationForm - Phone formatting', () => {
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
    const digits = phoneInput.value.replace(/\D/g, '');
    expect(digits.length).toBeLessThanOrEqual(12);
  });
});
