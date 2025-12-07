// server.js (CommonJS)

require("dotenv").config(); // يقرأ من ملف .env

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ اقرأ الـ API key من .env مرة واحدة
const rawKey = process.env.OPENAI_API_KEY || "";
console.log("OPENAI_API_KEY length:", rawKey.length);
console.log(
  "OPENAI_API_KEY preview:",
  rawKey ? rawKey.slice(0, 10) + "..." + rawKey.slice(-4) : "NOT SET"
);

// ✅ client واحد بس
const client = new OpenAI({
  apiKey: rawKey,
});

// Endpoint للدردشة مع ChatGPT
app.post("/api/chat", async (req, res) => {
  try {
    const { message, profile, schedule } = req.body;

    const scheduleJson = JSON.stringify(schedule || []);

    const systemPrompt = `
You are CU Navigate AI Agent for an indoor navigation web app for Cairo University.

- You speak BOTH Arabic and English fluently.
- You answer like a friendly assistant for students (can say "يا نجم", "يا بطل" in Arabic responses).
- You receive the student's profile and a schedule array (lectures).
- Each lecture item has: title, time, dayCode, dayLabel, roomName, level.

Your tasks:
1. If the user asks about lecture time / room / location / day:
   - Search in the provided schedule JSON.
   - Pick the closest matching lecture by subject name (case-insensitive).
   - Answer with clear information: subject, day, time, room, level.
   - Answer in the SAME LANGUAGE the user used (Arabic if question is Arabic).
2. If the user asks "where is my first/next lecture":
   - Use the first lecture in today's dayCode if exists, otherwise first in the schedule.
3. If the user asks general questions not related to schedule:
   - Reply as a normal helpful ChatGPT assistant.

Important:
- DO NOT invent lectures that are not in schedule JSON.
- If you can't find a matching lecture, say that you couldn't find it in the schedule.
`;

    const userPrompt = `
User message: "${message}"

Student profile (may be null):
${JSON.stringify(profile || {}, null, 2)}

Schedule JSON:
${scheduleJson}
`;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_output_tokens: 400,
    });

    // 🟢 محاولة استخراج النص من الـ response (SDK الجديد)
    let reply = "I could not generate a reply.";
    try {
      const outputs = completion.output || [];
      if (outputs.length > 0) {
        const segments = outputs[0].content || [];
        const text = segments
          .map((seg) =>
            typeof seg.text === "string"
              ? seg.text
              : (seg.text && seg.text.value) || ""
          )
          .join(" ")
          .trim();
        if (text) reply = text;
      }
    } catch (e) {
      console.error("Parse error:", e);
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({
      error: "Error talking to OpenAI",
      details: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`CU Navigate AI server running at http://localhost:${port}`);
});
