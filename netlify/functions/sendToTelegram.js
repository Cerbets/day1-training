export async function handler(event) {
  const data = JSON.parse(event.body);

  const TELEGRAM_TOKEN = "7401471745:AAFStdj_RtmmwXZ2d14qZdCkQp5zElyN-0Y";//process.env.TELEGRAM_TOKEN;
  const CHAT_ID = "8439" ;//process.env.TELEGRAM_CHAT_ID

  const message = `📩 New Form Submission:\n\n👤 Name: ${data.name}\n❓ Question 1: ${data.q1}`;

  const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const res = await fetch(telegramURL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'sent' }),
  };
}
