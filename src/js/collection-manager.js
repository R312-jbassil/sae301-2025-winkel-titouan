/**
 * Collection Manager - Manages user's glasses collection
 */
import pb from "../lib/pocketbase"

export class CollectionManager {
    constructor() {
        this.collectionName = "paire_lunettes"
        this.usersCollection = "users"
    }

    /**
     * Get all glasses for the current user
     */
    async getUserGlasses() {
        try {
            if (!pb.authStore.isValid) {
                console.log("[v0] User not authenticated")
                return []
            }

            const userId = pb.authStore.model?.id
            console.log("[v0] Fetching glasses for user:", userId)
            console.log("[v0] User model:", pb.authStore.model)

            const user = await pb.collection(this.usersCollection).getOne(userId, {
                expand: "paire_personnalisee",
            })

            console.log("[v0] User data:", user)
            console.log("[v0] Expanded paire_personnalisee:", user.expand?.paire_personnalisee)

            const glasses = user.expand?.paire_personnalisee || []

            // If glasses is not an array, convert it to array
            if (!Array.isArray(glasses)) {
                console.log("[v0] Converting single glass to array")
                return [glasses]
            }

            return glasses
        } catch (error) {
            console.error("[v0] Error loading user glasses:", error)
            console.error("[v0] Error details:", error.data)
            throw error
        }
    }

    /**
     * Delete a glasses configuration
     */
    async deleteGlasses(glassesId) {
        try {
            console.log("[v0] Deleting glasses:", glassesId)
            await pb.collection(this.collectionName).delete(glassesId)
            console.log("[v0] Glasses deleted successfully")
        } catch (error) {
            console.error("[v0] Error deleting glasses:", error)
            throw error
        }
    }
}
