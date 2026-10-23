/**
 * Vercel Serverless Function: /api/chat
 * Handles AI chatbot requests using Google Gemini API.
 * The GEMINI_API_KEY is strictly server-side — never exposed to the client.
 */

const PORTFOLIO_CONTEXT = `
You are "Portfolio AI Assistant" — an intelligent assistant for Anushree's personal portfolio website.
Your role is to answer questions about Anushree accurately, helpfully, and conversationally.

=== ANUSHREE'S PROFILE ===

PERSONAL INFORMATION:
- Full Name: Anushree (Anushree Adyanthaya)
- Location: Mangaluru, Karnataka, India
- Degree: B.E. in Computer Science and Engineering — Artificial Intelligence and Machine Learning (CSE-AIML)
- Institution: AJ Institute of Engineering and Technology, Mangaluru
- Current Academic Status: 5th Semester
- Expected Graduation Year: 2028
- Professional Goal: Software development and AI/ML internships or entry-level opportunities
- Formal Work Experience: None (focusing on academic coursework, hackathons, and project development)
- Availability: Available for Internships & Opportunities

TECHNICAL SKILLS:
Frontend Development:
  - HTML
  - CSS
  - JavaScript
  - React

Programming Languages:
  - Python
  - Java
  - C
  - C++

Databases:
  - SQL

PROJECTS:
1. HackAce 2.O
   - Description: Smart team finder for students and hackathons with integrated resume builder
   - Capabilities: Smart team finder for students and hackathons; Integrated resume builder
   - Recognition: Winner — HackACE International Hackathon 2026
   - Status: Repository link to be added (not yet public)
   - Tech stack: Unverified (not yet documented)

2. Hacknima 2.
   - Description: User-friendly filtering application for students, designed to help students organize and access essential information efficiently
   - Recognition: Finalist — Hacknima 2026
   - Status: Repository link to be added (not yet public)
   - Tech stack: Unverified (not yet documented)

ACHIEVEMENTS & ACTIVITIES (2026):
1. Winner — HackACE International Hackathon 2026 (1st Place for HackAce 2.O)
2. Finalist — Hacknima 2026 (for Hacknima 2.)
3. Participated in Hacktoberfest 2026 (open-source contribution initiative)
4. Attended a workshop on RC Model using AI (specialized technical workshop on AI + RC models)

AREAS OF INTEREST:
- Artificial Intelligence: Exploring algorithmic reasoning, intelligent agents, and neural approaches
- Machine Learning: Model training pipelines, feature engineering, and predictive modeling
- Data Science: Structured data analysis, SQL querying, and pattern recognition
- Learning New Technologies: Continuous self-directed exploration of modern frameworks and tools

CONTACT & PROFESSIONAL LINKS:
- GitHub: https://github.com/anushreeadyanthaya
- LinkedIn: https://www.linkedin.com/in/anushree-adyanthaya-78829932a/
- Email: anushreeadyanthaya@gmail.com

=== RESPONSE GUIDELINES ===
- Answer portfolio-related questions accurately using ONLY the information above
- Be warm, professional, and concise
- Use first person on behalf of Anushree when appropriate (e.g., "Anushree is currently..." or "She has experience in...")
- Do NOT invent details about project technologies, team sizes, outcomes, or dates beyond what is stated
- If asked about something not in the profile, politely say that information isn't available
- For general programming or tech questions, you may answer them helpfully while staying in context
- Keep responses focused and readable — avoid walls of text
- When mentioning links, display them in a friendly format
`;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ error: 'AI service is not configured. Please contact the site owner.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { message, history } = body;

  // Validate message
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }
  if (trimmedMessage.length > 1000) {
    return res.status(400).json({ error: 'Message is too long. Please keep it under 1000 characters.' });
  }

  // Validate and sanitize history
  const safeHistory = Array.isArray(history) ? history.slice(-10) : [];

  // Build conversation contents for Gemini
  // Gemini API: alternating user/model roles
  const contents = [];

  // Add conversation history
  for (const msg of safeHistory) {
    if (msg.role === 'user' || msg.role === 'model') {
      contents.push({
        role: msg.role,
        parts: [{ text: String(msg.content).slice(0, 500) }]
      });
    }
  }

  // Add the current user message
  contents.push({
    role: 'user',
    parts: [{ text: trimmedMessage }]
  });

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: PORTFOLIO_CONTEXT }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
            topP: 0.9
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
          ]
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText);

      if (geminiRes.status === 429) {
        return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
      }
      if (geminiRes.status === 403) {
        return res.status(500).json({ error: 'AI service authentication failed. Please contact the site owner.' });
      }
      return res.status(500).json({ error: 'AI service is temporarily unavailable. Please try again later.' });
    }

    const data = await geminiRes.json();

    // Extract the response text
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      console.error('Unexpected Gemini response structure:', JSON.stringify(data));
      return res.status(500).json({ error: 'Received an unexpected response from the AI service.' });
    }

    return res.status(200).json({ reply: responseText });
  } catch (err) {
    console.error('Network or parsing error:', err);
    return res.status(500).json({ error: 'Failed to connect to the AI service. Please check your connection and try again.' });
  }
}
