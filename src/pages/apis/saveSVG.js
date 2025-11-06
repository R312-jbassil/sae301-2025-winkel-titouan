import pb from "../../utils/pb"

export async function POST({ request }) {
    console.log("[v0] saveSVG endpoint called")

    try {
        const data = await request.json()
        console.log("[v0] Received data to save:", data)

        if (!pb.authStore.isValid) {
            console.error("[v0] User not authenticated")
            return new Response(JSON.stringify({ success: false, error: "User not authenticated" }), {
                headers: { "Content-Type": "application/json" },
                status: 401,
            })
        }

        const userId = pb.authStore.model?.id
        console.log("[v0] User ID:", userId)

        const dataWithUser = {
            ...data,
            user_id: userId,
        }

        const record = await pb.collection("svg_generations").create(dataWithUser)
        console.log("[v0] SVG saved with ID:", record.id)

        return new Response(JSON.stringify({ success: true, id: record.id }), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error("[v0] Error saving SVG:", error)
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        })
    }
}
