import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname, { index: false }));

app.get(["/", "/index.html"], (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/panchayat", (_req, res) => {
  res.sendFile(path.join(__dirname, "panchayat.html"));
});

const knowledge = [
  {
    keywords: ["history", "village", "bir bangran"],
    answer: "Bir Bangran is presented as a village heritage platform focused on preserving local history, public service, defence contributions, photographs, documents and community memories. Replace this demo answer with verified village records."
  },
  {
    keywords: ["hero", "heroes", "person", "defence", "officer"],
    answer: "The Heroes archive is designed for verified biographies of defence personnel, administrative officers and other notable people connected with Bir Bangran."
  },
  {
    keywords: ["archive", "photo", "document", "gallery"],
    answer: "The digital archive can preserve photographs, scanned documents, newspaper clippings, certificates, videos and other verified historical material."
  },
  {
    keywords: ["timeline", "year", "event"],
    answer: "The timeline groups the heritage journey into major eras. For the final project, replace the demo milestones with dates and events verified by local records and families."
  },
  {
    keywords: ["ai", "assistant"],
    answer: "The Heritage AI Assistant is a demo in this starter. For production, connect it to a server-side LLM/RAG system using verified Bir Bangran records."
  }
];

function answerQuestion(question = "") {
  const text = question.toLowerCase();
  const match = knowledge.find(item => item.keywords.some(word => text.includes(word)));
  return match?.answer ||
    "I can help with Bir Bangran history, heroes, defence personnel, administrative officers, archives, photographs and the timeline. Try asking about one of these topics.";
}


const submissions = [];

app.post("/api/contact", (req, res) => {
  const { name, email, type, source = "", message, consent } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim() || consent !== "on") {
    return res.status(400).json({ ok: false, error: "Please complete the required fields and consent." });
  }
  const submission = {
    id: `BB-${Date.now()}`,
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 180),
    type: String(type || "other").slice(0, 40),
    source: String(source).trim().slice(0, 300),
    message: message.trim().slice(0, 5000),
    createdAt: new Date().toISOString()
  };
  submissions.push(submission);
  // Demo mode: keep submissions in memory. Connect a database/email service for production.
  res.status(201).json({ ok: true, id: submission.id });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Bir Bangran Heritage API" });
});

app.post("/api/ask", (req, res) => {
  res.json({ answer: answerQuestion(req.body?.question) });
});

app.listen(PORT, () => {
  console.log(`Bir Bangran running at http://localhost:${PORT}`);
});
