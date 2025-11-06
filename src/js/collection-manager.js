/**
 * Collection Manager - Manages user's glasses collection
 */
import pb from "../utils/pb"

export class CollectionManager {
    constructor() {
        this.glassesCollection = "paire_lunettes"
        this.generatedCollection = "paire_generee"
        this.usersCollection = "users"
    }

    /**
     * Get all glasses for the current user (both configured and AI-generated)
     */
    async getUserGlasses() {
        try {
            if (!pb.authStore.isValid) {
                return []
            }

            const userId = pb.authStore.model?.id

            const user = await pb.collection(this.usersCollection).getOne(userId, {
                expand: "paire_personnalisee,paire_generee",
            })

            // Get configured glasses
            let configuredGlasses = user.expand?.paire_personnalisee || []
            if (!Array.isArray(configuredGlasses)) {
                configuredGlasses = [configuredGlasses]
            }
            // Add collection identifier
            configuredGlasses = configuredGlasses.map((glass) => ({
                ...glass,
                _collection: "paire_lunettes",
            }))

            // Get AI-generated glasses
            let generatedGlasses = user.expand?.paire_generee || []
            if (!Array.isArray(generatedGlasses)) {
                generatedGlasses = [generatedGlasses]
            }
            // Add collection identifier
            generatedGlasses = generatedGlasses.map((glass) => ({
                ...glass,
                _collection: "paire_generee",
            }))

            // Merge both collections
            const allGlasses = [...configuredGlasses, ...generatedGlasses]

            return allGlasses
        } catch (error) {
            console.error("Error loading user glasses:", error)
            throw error
        }
    }

    /**
     * Delete a glasses configuration
     */
    async deleteGlasses(glassesId, collectionName) {
        try {
            await pb.collection(collectionName).delete(glassesId)
        } catch (error) {
            console.error("Error deleting glasses:", error)
            throw error
        }
    }
}
