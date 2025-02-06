const askbox = document.getElementById("askbox");
const resultbox = document.getElementById("result");
const thoughtbox = document.getElementById("thoughts");

const askbtn = document.getElementById("ask");

// use pollinations ai with llama
async function askAi(text) {
    const response = await fetch("https://text.pollinations.ai", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama',
            messages: [
                {
                    role: 'user',
                    content: text
                }
            ]
        })
    });

    const responsee = response.text();
    return responsee;
}

askbtn.addEventListener("click", async () => {
    thoughtbox.innerText = "";
    resultbox.innerText = "Please wait.."
    askbtn.innerText = "Wait";
    askbtn.setAttribute("disabled", "disabled");

    const resp1 = await askAi(askbox.value + ` [End of user prompt]${Math.random()}`);
    thoughtbox.value += "Response 1: " + resp1 + "\n";
    const resp2 = await askAi(askbox.value + ` [End of user prompt]${Math.random()}`);
    thoughtbox.value += "Response 2: " + resp2 + "\n";
    const resp3 = await askAi(askbox.value + ` [End of user prompt]${Math.random()}`);
    thoughtbox.value += "Response 3: " + resp3 + "\n";

    const prompt = `
Ignore all previous instructions.
You are to choose the best response out of these three (which one is the most accurate & best for the user).

Choices:

${thoughtbox.value}

End of choices.

Reply to this message with ONLY the contents of chosen message.
            `;

    const resp4 = await askAi(prompt);
    resultbox.value = resp4;

    askbtn.innerText = "Ask";
    askbtn.removeAttribute("disabled");
});