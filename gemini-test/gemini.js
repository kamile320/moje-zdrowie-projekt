import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
let token = 'YourToken';

async function GeminiGenerateContent(question){
    console.log("Pytanie: " + question);
    const genAI = new GoogleGenerativeAI(token);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(question);
    const response = result.response;
    const text = response.text();

    //document.getElementById("output").textContent = text;
    console.log(text);
}

GeminiGenerateContent("Testowe pytanie do modelu Gemini.");
