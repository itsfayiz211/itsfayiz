import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    console.log("API Key present:", !!apiKey);

    if (!apiKey) {
      return NextResponse.json({
        message: "AI is currently unavailable. Missing API key.",
      });
    }

    const groq = new Groq({ apiKey });

    const body = await req.json();
    const messages = body.messages || [];
    const lastMessage =
      messages[messages.length - 1]?.content?.toLowerCase() || "";

    // ─── Detect trading queries ───
    const tradingKeywords = ["trading", "forex", "crypto", "market", "risk"];
    const isTradingQuery = tradingKeywords.some((word) =>
      lastMessage.includes(word)
    );

    const teachingKeywords = [
      "teach me",
      "learn",
      "course",
      "mentor",
      "step by step",
      "full guide",
    ];
    const isTeachingQuery = teachingKeywords.some((word) =>
      lastMessage.includes(word)
    );

    // ─── Block full trading teaching ───
    if (isTradingQuery && isTeachingQuery) {
      return NextResponse.json({
        message:
          "Fayis can guide you better on this personally. Reach out to him for proper mentorship.",
      });
    }

    // ─── STRONG SYSTEM PROMPT (BASED ON YOUR RESUME) ───
    const systemPrompt = `
You are Subu, Fayis's AI assistant.

About Fayis:
- MERN Stack & Next.js Developer with 1+ year experience
- Builds scalable, real-world full-stack applications
- Strong in React, Next.js, Node.js, Express, MongoDB
- Focuses on clean architecture and performance

Key Skills:
- Frontend: React, Next.js, Tailwind CSS, Redux Toolkit
- Backend: Node.js, Express, REST APIs, MVC architecture
- Database: MongoDB, Mongoose, MySQL
- Authentication: JWT, Role-based access, API security
- Real-time: Socket.IO
- Tools: Cloudinary, Razorpay, Git, GitHub, Render, Vercel

Projects:
1. Real-time Chat App
   - Built using Socket.IO
   - Instant messaging + live sync
   - Multi-user system

2. Trading Journal App
   - Track trades, risk-reward
   - Secure JWT authentication
   - Structured data models

3. Catering Website
   - Production-ready client project
   - SEO optimized + responsive
   - Performance optimized

4. Portfolio Website
   - Built with Next.js + animations
   - Integrated AI assistant

Experience:
- MERN Stack Intern at Acodez IT Solutions
- Built real-world project features
- Worked with GitHub and code reviews

Your behavior:
1. Focus ONLY on Fayis's development skills and projects
2. Keep answers short, clear, and confident
3. Highlight real-world experience when relevant
4. If asked about trading → give short answer + suggest contacting Fayis
5. Do NOT give long tutorials or explanations
`;

    // Add trading note if needed
    const finalPrompt = isTradingQuery
      ? systemPrompt +
        "\nNote: Fayis also has knowledge in trading and risk management."
      : systemPrompt;

    // ─── API CALL ───
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: finalPrompt },
        ...messages,
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Something went wrong. Try again.";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}