import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai", async (req, res) => {
  try {
    const prompt = req.body?.prompt?.trim();
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      console.log("OPENAI ERROR STATUS:", r.status);
      console.log("OPENAI ERROR BODY:", JSON.stringify(data, null, 2));
      return res.status(r.status).json(data);
    }
    const text =
      data.output_text ??
      (Array.isArray(data.output)
        ? data.output
            .flatMap((item) => item.content ?? [])
            .filter(
              (part) => part.type === "output_text" || part.type === "text",
            )
            .map((part) => part.text)
            .join("\n")
        : "");

    res.json({ output: text });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.listen(8787, () => console.log("AI server on http://localhost:8787/ai"));
