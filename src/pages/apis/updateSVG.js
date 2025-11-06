import pb from "../../utils/pb"

export async function POST({ request }) {
    const data = await request.json()
    console.log("[v0] Received data to update:", data)

    try {
        const { id, ...updateData } = data
        const record = await pb.collection("svg_generations").update(id, updateData)
        console.log("[v0] SVG updated with ID:", record.id)

        return new Response(JSON.stringify({ success: true, id: record.id }), {
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error("[v0] Error updating SVG:", error)
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        })
    }
}
