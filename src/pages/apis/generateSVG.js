import OpenAI from "openai"

const BASE_URL = import.meta.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
const ACCESS_TOKEN = import.meta.env.OPENROUTER_API_KEY
const MODEL = import.meta.env.OPENROUTER_MODEL || "openai/gpt-3.5-turbo"

export const POST = async ({ request }) => {
    console.log("[v0] Received request to generate SVG")

    try {
        const messages = await request.json()
        console.log("[v0] Messages received:", messages)

        const client = new OpenAI({
            baseURL: BASE_URL,
            apiKey: ACCESS_TOKEN,
        })

        const SystemMessage = {
            role: "system",
            content:
                "You are an SVG code generator for eyeglasses. Generate SVG code for eyeglasses based on the user's requests. Make sure to include ids for each part of the generated SVG (frame, lenses, temples, etc.). The SVG should be well-structured and visually appealing. Always return valid SVG code wrapped in <svg> tags.",
        }

        console.log("[v0] Calling OpenAI API...")
        const chatCompletion = await client.chat.completions.create({
            model: MODEL,
            messages: [SystemMessage, ...messages],
        })

        const message = chatCompletion.choices[0].message || ""
        console.log("[v0] Generated response:", message)

        const svgMatch = message.content.match(/<svg[\s\S]*?<\/svg>/i)
        message.content = svgMatch ? svgMatch[0] : ""

        console.log("[v0] Extracted SVG:", message.content)

        return new Response(JSON.stringify({ svg: message }), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error("[v0] Error generating SVG:", error)
        return new Response(JSON.stringify({ error: error.message || "Failed to generate SVG" }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        })
    }
}
