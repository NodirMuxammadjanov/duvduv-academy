import { google } from 'googleapis';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeTelegram(value) {
  const trimmed = normalizeText(value).replace(/^@+/, '');
  return trimmed ? `@${trimmed}` : '';
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = normalizeText(body.name);
    const age = normalizeText(body.age);
    const phone = normalizeText(body.phone);
    const telegram = normalizeTelegram(body.telegram);
    const field = normalizeText(body.field);
    const experience = normalizeText(body.experience);
    const income = normalizeText(body.income);
    const languages = normalizeText(body.languages);
    const payment = normalizeText(body.payment);

    if (!name || !age || !phone || !telegram || !field || !experience || !income || !languages || !payment) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Name, age, phone, telegram, field, experience, income, languages, and payment are required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:J',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
            name,
            age,
            phone,
            telegram,
            field,
            experience,
            income,
            languages,
            payment,
          ],
        ],
      },
    });

    return new Response(JSON.stringify({ success: true, data: response.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GOOGLE_SHEETS_ERROR:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
