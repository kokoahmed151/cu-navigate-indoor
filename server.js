// server.js (CommonJS)

// تحميل متغيرات البيئة من .env (لو موجودة في الـ local)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

// ✅ استخدم PORT من الـ env في الاستضافة، و 3000 في الـ local
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(cors());          // لو حابب تقفله على Origin معيّن نقدر نزبطه
app.use(express.json());  // بدل bodyParser.json()

// ===== OpenAI Client =====
const apiKey = process.env.OPENAI_API_KEY || "";

// تحذير لو الـ key مش متظبط
if (!apiKey) {
  console.error("❌ OPENAI_API_KEY is not set. Please add it in your environment variables.");
}

const client = new OpenAI({ apiKey });

// ===== Health Check (عشان الاختبار من البراوزر / Render) =====
app.get("/", (req, res) => {
  res.send("CU Navigate AI backend is running ✅");
});

// ===== Chat Endpoint =====
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

    // ===== استخراج النص من الـ SDK الجديد =====
    let reply = "I could not generate a reply.";

    try {
      const firstOutput = completion.output?.[0];
      const blocks = firstOutput?.content || [];

      const text = blocks
        .map((block) => {
          if (block.type === "output_text" && block.text) {
            // block.text ممكن تكون string أو object { value }
            if (typeof block.text === "string") return block.text;
            if (typeof block.text.value === "string") return block.text.value;
          }
          return "";
        })
        .join(" ")
        .trim();

      if (text) reply = text;
    } catch (parseErr) {
      console.error("Parse error while reading OpenAI response:", parseErr);
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

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 CU Navigate AI server running on port ${PORT}`);
});
