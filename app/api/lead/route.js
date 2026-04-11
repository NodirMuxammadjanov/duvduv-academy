import { google } from 'googleapis';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, age, phone, telegram, occupation, experience, payment, source } = body;

    // Validate required fields
    if (!name || !phone) {
      return new Response(JSON.stringify({ success: false, error: 'Name and Phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
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
      range: 'Sheet1!A:I', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
            name,
            age,
            phone,
            telegram,
            occupation,
            experience,
            payment,
            source,
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
