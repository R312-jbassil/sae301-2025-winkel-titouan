/**
 * Generated SVG Storage - Manages PocketBase interactions for AI-generated SVGs
 */
import pb from "../utils/pb"

export class GeneratedSVGStorage {
    constructor() {
        this.collection = "paire_generee"
    }

    /**
     * Save generated SVG to PocketBase
     */
    async saveSVG(data) {
        try {
            console.log("[v0] Attempting to save generated SVG with data:", data)

            // Check if user is authenticated
            if (!pb.authStore.isValid) {
                throw new Error("User must be authenticated to save SVG")
            }

            const recordData = {
                nom: data.nom,
                code_svg: data.code_svg,
            }

            console.log("[v0] Prepared record data:", recordData)

            // Create the SVG record
            const record = await pb.collection(this.collection).create(recordData)
            console.log("[v0] SVG saved successfully:", record.id)

            // Add to user's paire_generee relation
            const userId = pb.authStore.model?.id
            const user = await pb.collection("users").getOne(userId)

            // Get existing paire_generee array or create empty array
            const existingPaires = user.paire_generee || []

            // Add new SVG ID to the array
            await pb.collection("users").update(userId, {
                paire_generee: [...existingPaires, record.id],
            })

            console.log("[v0] SVG added to user's collection")

            return record
        } catch (error) {
            console.error("[v0] Error saving SVG:", error)
            console.error("[v0] Error response:", error.response)
            console.error("[v0] Error data:", JSON.stringify(error.data, null, 2))
            throw error
        }
    }

    /**
     * Load generated SVG from PocketBase
     */
    async loadSVG(id) {
        try {
            const record = await pb.collection(this.collection).getOne(id)
            console.log("[v0] SVG loaded successfully:", record.id)
            return record
        } catch (error) {
            console.error("[v0] Error loading SVG:", error)
            throw error
        }
    }

    /**
     * Get all saved SVGs for current user
     */
    async getUserSVGs() {
        try {
            if (!pb.authStore.isValid) {
                console.log("[v0] User not authenticated")
                return []
            }

            const userId = pb.authStore.model?.id
            const user = await pb.collection("users").getOne(userId, { expand: "paire_generee" })

            const svgs = user.expand?.paire_generee || []
            console.log("[v0] Loaded user SVGs:", svgs.length)
            return svgs
        } catch (error) {
            console.error("[v0] Error loading user SVGs:", error)
            throw error
        }
    }

    /**
     * Delete a generated SVG
     */
    async deleteSVG(id) {
        try {
            await pb.collection(this.collection).delete(id)
            console.log("[v0] SVG deleted successfully:", id)
            return true
        } catch (error) {
            console.error("[v0] Error deleting SVG:", error)
            throw error
        }
    }

    /**
     * Update an existing SVG record
     */
    async updateSVG(id, collection, data) {
        try {
            console.log("[v0] Updating SVG:", id, "in collection:", collection)

            const recordData = {
                code_svg: data.code_svg,
            }

            // Only update name if provided
            if (data.nom) {
                recordData.nom = data.nom
            }

            console.log("Update data:", recordData)

            const record = await pb.collection(collection).update(id, recordData)
            console.log("SVG updated successfully:", record.id)

            return record
        } catch (error) {
            console.error("Error updating SVG:", error)
            throw error
        }
    }
}
