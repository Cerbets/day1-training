const steps = document.querySelectorAll(".step");
let currentStep = 0;
  const correctAnswers = {
    q1: "10-5 PH2",
    q2: "Using 10-7 without typing replacing is prohibited",
    q3: "Tag @EMS in Code-A logs and mention PH1 lobby and the Reason of Code A",
    q4: "10-4 PH1 (PH2 /SH / Calls / medrun or etc)",
    q5: "4th floor",
    q6: "10-9 PH2 10 min",
    q7: "Leave the area immediately and write radio-code 10-10 and Yellow location",
    q8: "Only HC in RP or Voice Radio",
    q9: "In the Code-A logs channel under EMS Email/Discord",
    q10: "Just write Code-A and the Reason of Code A, no tagging needed", // Add if you have more questions
    q11: "$1,000 without insurance, same price with medical insurance",
    q12: "$1,300 med kit,$500 pill with insurance,70k sex change",
    q13: "false",

  };
// Attach click listeners to all "Next" buttons
document.querySelectorAll(".next").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (validateStep(index) || currentStep > 12) {
      steps[currentStep].classList.remove("active");
      steps[++currentStep].classList.add("active");
    }
  });
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Пользователь переключился на другую вкладку или свернул окно');
    // Отправьте это событие на сервер или сохраните локально
  } else {
    alert("This is just a simple check to test you. Please don't look up the answers — it's totally fine if you get something wrong, nothing bad will happen.")
  }
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
 if (stepIndex >= 1 ) {
  const questionName = `q${stepIndex}`; // dynamically create name
  const radios = document.querySelectorAll(`input[name="${questionName}"]`);
  const selected = Array.from(radios).some(r => r.checked);

  if (!selected && currentStep < 13) {
    console.log(currentStep)
    alert("⚠️ Please select one of the answers before continuing.");
    return false;
  }
  return true;
}

}
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("quizSubmitted2") === "true") {
    document.getElementById("alreadySubmittedPopup").classList.remove("hidden");
  }
});
document.getElementById("quizForm").addEventListener("submit", async e => {
   if (localStorage.getItem("quizSubmitted2") === "true") {
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
 const response = await fetch("/.netlify/functions/sendToTelegram", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    document.getElementById("quizForm").remove();
    document.getElementById("thanks").classList.remove("hidden");
    localStorage.setItem("quizSubmitted2","true")
  } else {
    alert("Failed to send. Try again.");
  }

});

