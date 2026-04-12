/**
 * Tests: /api/lead Route Handler
 * Tests the Google Sheets API integration with mocked googleapis
 */

// Polyfill Response for Jest jsdom environment
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = init?.headers || {};
    }
    async json() {
      return JSON.parse(this.body);
    }
  };
}

// Mock googleapis BEFORE importing the route
jest.mock('googleapis', () => ({
  google: {
    auth: {
      GoogleAuth: jest.fn().mockImplementation(() => ({})),
    },
    sheets: jest.fn().mockReturnValue({
      spreadsheets: {
        values: {
          append: jest.fn().mockResolvedValue({
            data: { updates: { updatedRows: 1 } },
          }),
        },
      },
    }),
  },
}));

// Mock Next.js env
process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@test.iam.gserviceaccount.com';
process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\ntest\n-----END PRIVATE KEY-----\n';
process.env.GOOGLE_SHEET_ID = 'test-sheet-id-123';

const { POST } = require('@/app/api/lead/route');

// Helper: create a mock Request object
function makeRequest(body) {
  return {
    json: async () => body,
  };
}

describe('POST /api/lead', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 400 when name is missing', async () => {
    const req = makeRequest({ phone: '+998 90-123-45-67' });
    const resp = await POST(req);
    const body = await resp.json();

    expect(resp.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/required/i);
  });

  test('returns 400 when phone is missing', async () => {
    const req = makeRequest({ name: 'Nodirbek' });
    const resp = await POST(req);
    const body = await resp.json();

    expect(resp.status).toBe(400);
    expect(body.success).toBe(false);
  });

  test('returns 200 and success:true with valid data', async () => {
    const req = makeRequest({
      name: 'Nodirbek Ergashev',
      age: '24',
      phone: '+998 90-123-45-67',
      telegram: '@nodirbek',
      occupation: 'Dizayner',
      experience: '2 yil',
      payment: "To'liq to'lash — $750",
      source: 'Ijtimoiy tarmoqlar',
    });

    const resp = await POST(req);
    const body = await resp.json();

    expect(resp.status).toBe(200);
    expect(body.success).toBe(true);
  });

  test('calls Google Sheets append with correct column order', async () => {
    const { google } = require('googleapis');
    const mockAppend = google.sheets().spreadsheets.values.append;

    const formData = {
      name: 'Test User',
      age: '22',
      phone: '+998 90-000-00-00',
      telegram: '@testuser',
      occupation: 'Talaba',
      experience: 'Yo\'q',
      payment: "Bo'lib to'lash — 3 × $250",
      source: 'Do\'stlarimdan',
    };

    await POST(makeRequest(formData));

    expect(mockAppend).toHaveBeenCalledTimes(1);

    const callArgs = mockAppend.mock.calls[0][0];
    const row = callArgs.requestBody.values[0];

    // row: [timestamp, name, age, phone, telegram, occupation, experience, payment, source]
    expect(row[1]).toBe(formData.name);
    expect(row[2]).toBe(formData.age);
    expect(row[3]).toBe(`'${formData.phone}`);
    expect(row[4]).toBe(formData.telegram);
    expect(row[5]).toBe(formData.occupation);
    expect(row[6]).toBe(formData.experience);
    expect(row[7]).toBe(formData.payment);
    expect(row[8]).toBe(formData.source);
  });

  test('returns 500 when Google Sheets throws an error', async () => {
    const { google } = require('googleapis');
    google.sheets().spreadsheets.values.append.mockRejectedValueOnce(
      new Error('Sheets API quota exceeded')
    );

    const req = makeRequest({
      name: 'Test',
      phone: '+998 90-000-00-00',
    });

    const resp = await POST(req);
    const body = await resp.json();

    expect(resp.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Sheets API quota exceeded');
  });
});
