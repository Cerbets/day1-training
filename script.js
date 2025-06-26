const steps = document.querySelectorAll(".step");
let currentStep = 0;
  const correctAnswers = {
    q1: "10-5 PH2",
    q2: "Finishing duty at PH2",
    q3: "Tag @EMS in Code-A logs and mention PH1 lobby and the Reason of Code A",
    q4: "10-4 PH1 (PH2 /SH / Calls / medrun or etc)",
    q5: "4th floor",
    q6: "10-9 PH2 10 min",
    q7: "Leave the area immediately and write radio-code 10-10 and Yellow location",
    q8: "Only HC in RP or Voice Radio",
    q9: "In the Code-A logs channel under EMS Email/Discord",
    q10: "Just write Code-A and the Reason of Code A, no tagging needed", // Add if you have more questions
    q11: "?",
    q12: "?"
  };
// Attach click listeners to all "Next" buttons
document.querySelectorAll(".next").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (validateStep(index)) {
      steps[currentStep].classList.remove("active");
      steps[++currentStep].classList.add("active");
    }
  });
});

function validateStep(stepIndex) {
  // Step 0: Validate Name
  if (stepIndex === 0) {
    const nameInput = document.getElementById("Name");
    const val = nameInput.value.trim();
    const hasNumber = /\d/.test(val);
    const minLength = val.length >= 8;
    const notEmpty = val !== "";

    if (!notEmpty || !hasNumber || !minLength) {
      alert("⚠️ Please enter a valid name:\n\n• At least 6 characters\n• Must include an ID\n• Cannot be empty");
      return false;
    }
    return true;
  }

  // Step 1: Validate radio selected
 if (stepIndex >= 1) {
  const questionName = `q${stepIndex}`; // dynamically create name
  const radios = document.querySelectorAll(`input[name="${questionName}"]`);
  const selected = Array.from(radios).some(r => r.checked);

  if (!selected) {
    alert("⚠️ Please select one of the answers before continuing.");
    return false;
  }
  return true;
}

}
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("quizSubmitted") === "true") {
    document.getElementById("alreadySubmittedPopup").classList.remove("hidden");
  }
});
document.getElementById("quizForm").addEventListener("submit", async e => {
   if (localStorage.getItem("quizSubmitted") === "true") {
    document.getElementById("quizForm").innerHTML = "<p>Вы уже отправили форму.</p>";
    return;
  }
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {};

  // Get name
  data.name = formData.get("name");

  // Loop through q1 to q12
  for (let i = 1; i <= 12; i++) {
    const value = formData.get(`q${i}`);
    if (value) {
      console.log(correctAnswers["q"+i])
      console.log(value)
        if (value == correctAnswers["q"+i])
        data[`q${i}`] = "Right";
      else {
         data[`q${i}`] = correctAnswers["q"+i]
      }
    } else {
      data[`q${i}`] = "❌ Not answered";
    }
  }
  const data2 = data;

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

 
});

