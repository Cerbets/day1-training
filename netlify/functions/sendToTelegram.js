export async function handler(event) {
  const TELEGRAM_TOKEN =process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

let message = `📩 New Form Submission:\n\n👤 Name: ${data2.name}\n\n`;

for (let i = 1; i <= 12; i++) {
  message += `❓ Question ${i}: ${data2[`q${i}`]}\n`;
}

  const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
   localStorage.setItem("quizSubmitted", "true");
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
