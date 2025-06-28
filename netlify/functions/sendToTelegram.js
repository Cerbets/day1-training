export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_TOKEN || !CHAT_ID) {
      return {
        statusCode: 500,
        body: "Telegram token or chat ID is missing.",
      };
    }

    let message = `📩 New Form Submission:\n\n👤 Name: ${data.name}\n\n`;

for (let i = 1; i <= 13; i++) {
  message += `❓ Question ${i}: ${data[`q${i}`]}\n`;
}
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { statusCode: 500, body: `Telegram API error: ${errorText}` };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "sent" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Internal error: ${error.message}`,
    };
  }
}
