/**
 * Tests: /api/lead Route Handler
 * Tests the Google Sheets API integration with mocked googleapis
 */

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

process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = 'test@test.iam.gserviceaccount.com';
process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\ntest\n-----END PRIVATE KEY-----\n';
process.env.GOOGLE_SHEET_ID = 'test-sheet-id-123';

const { POST } = require('@/app/api/lead/route');

function makeRequest(body) {
  return {
    json: async () => body,
  };
}

describe('POST /api/lead', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['name', { age: '24', phone: '+998 90-123-45-67', telegram: '@testuser', field: 'Marketing', experience: '1-2 yil', income: '3-5 million', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['age', { name: 'Test User', phone: '+998 90-123-45-67', telegram: '@testuser', field: 'Marketing', experience: '1-2 yil', income: '3-5 million', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['phone', { name: 'Test User', age: '24', telegram: '@testuser', field: 'Marketing', experience: '1-2 yil', income: '3-5 million', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['telegram', { name: 'Test User', age: '24', phone: '+998 90-123-45-67', field: 'Marketing', experience: '1-2 yil', income: '3-5 million', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['field', { name: 'Test User', age: '24', phone: '+998 90-123-45-67', telegram: '@testuser', experience: '1-2 yil', income: '3-5 million', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['experience', { name: 'Test User', age: '24', phone: '+998 90-123-45-67', telegram: '@testuser', field: 'Marketing', income: '3-5 million', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['income', { name: 'Test User', age: '24', phone: '+998 90-123-45-67', telegram: '@testuser', field: 'Marketing', experience: '1-2 yil', languages: 'O\'zbek', payment: 'Bittada 750$ to\'layman' }],
    ['languages', { name: 'Test User', age: '24', phone: '+998 90-123-45-67', telegram: '@testuser', field: 'Marketing', experience: '1-2 yil', income: '3-5 million', payment: 'Bittada 750$ to\'layman' }],
    ['payment', { name: 'Test User', age: '24', phone: '+998 90-123-45-67', telegram: '@testuser', field: 'Marketing', experience: '1-2 yil', income: '3-5 million', languages: 'O\'zbek' }],
  ])('returns 400 when %s is missing', async (_field, payload) => {
    const resp = await POST(makeRequest(payload));
    const body = await resp.json();

    expect(resp.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/required/i);
  });

  test('returns 200 and success:true with valid data', async () => {
    const req = makeRequest({
      name: 'Nodirbek Ergashev',
      age: '24',
      phone: '+998 90-123-45-67',
      telegram: 'nodirbek',
      field: 'Marketing',
      experience: '1-2 yil',
      income: '3-5 million',
      languages: "O'zbek, Rus, Ingliz",
      payment: "3 ga bo'lib, har oy 250$ dan",
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
      field: 'Design',
      experience: '3 yildan ko\'p',
      income: '10 million+',
      languages: 'O\'zbek, Rus',
      payment: 'Bittada 750$ to\'layman',
    };

    await POST(makeRequest(formData));

    expect(mockAppend).toHaveBeenCalledTimes(1);

    const callArgs = mockAppend.mock.calls[0][0];
    const row = callArgs.requestBody.values[0];

    expect(callArgs.range).toBe('Sheet1!A:J');
    expect(callArgs.valueInputOption).toBe('RAW');
    expect(row).toHaveLength(10);
    expect(row[1]).toBe(formData.name);
    expect(row[2]).toBe(formData.age);
    expect(row[3]).toBe(formData.phone);
    expect(row[4]).toBe(formData.telegram);
    expect(row[5]).toBe(formData.field);
    expect(row[6]).toBe(formData.experience);
    expect(row[7]).toBe(formData.income);
    expect(row[8]).toBe(formData.languages);
    expect(row[9]).toBe(formData.payment);
  });

  test('normalizes telegram usernames without @', async () => {
    const { google } = require('googleapis');
    const mockAppend = google.sheets().spreadsheets.values.append;

    await POST(
      makeRequest({
        name: 'Test',
        age: '24',
        phone: '+998 90-000-00-00',
        telegram: 'testuser',
        field: 'Marketing',
        experience: '1-2 yil',
        income: '3-5 million',
        languages: 'O\'zbek',
        payment: 'Bittada 750$ to\'layman',
      })
    );

    const row = mockAppend.mock.calls[0][0].requestBody.values[0];
    expect(row[4]).toBe('@testuser');
  });

  test('returns 500 when Google Sheets throws an error', async () => {
    const { google } = require('googleapis');
    google.sheets().spreadsheets.values.append.mockRejectedValueOnce(
      new Error('Sheets API quota exceeded')
    );

    const req = makeRequest({
      name: 'Test',
      age: '24',
      phone: '+998 90-000-00-00',
      telegram: '@testuser',
      field: 'Marketing',
      experience: '1-2 yil',
      income: '3-5 million',
      languages: 'O\'zbek',
      payment: 'Bittada 750$ to\'layman',
    });

    const resp = await POST(req);
    const body = await resp.json();

    expect(resp.status).toBe(500);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Sheets API quota exceeded');
  });
});
