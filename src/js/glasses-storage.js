/**
 * Glasses Storage - Manages PocketBase interactions
 */
import pb from "../utils/pb"

export class GlassesStorage {
    constructor() {
        this.collection = "paire_lunettes"
    }

    /**
     * Save glasses configuration to PocketBase
     */
    async saveGlasses(data) {
        try {
            console.log("[v0] Attempting to save glasses with data:", data)

            const recordData = {
                nom: data.nom,
                code_svg: data.code_svg,
                largeur_pont: Number(data.largeur_pont),
                taille_verre: Number(data.taille_verre),
                couleur: data.couleur,
                materiau_branche: data.materiau_branche,
                materiau_monture: data.materiau_monture,
            }

            console.log("[v0] Prepared record data:", recordData)

            const record = await pb.collection(this.collection).create(recordData)
            console.log("[v0] Glasses saved successfully:", record.id)

            if (pb.authStore.isValid) {
                const userId = pb.authStore.model?.id
                const user = await pb.collection("users").getOne(userId)

                const existingPaires = user.paire_personnalisee || []

                await pb.collection("users").update(userId, {
                    paire_personnalisee: [...existingPaires, record.id],
                })

                console.log("[v0] Glasses added to user's collection")
            }

            return record
        } catch (error) {
            console.error("[v0] Error saving glasses:", error)
            console.error("[v0] Error response:", error.response)
            console.error("[v0] Error data:", JSON.stringify(error.data, null, 2))
            throw error
        }
    }

    /**
     * Load glasses configuration from PocketBase
     */
    async loadGlasses(id) {
        try {
            const record = await pb.collection(this.collection).getOne(id)
            console.log("[v0] Glasses loaded successfully:", record.id)
            return record
        } catch (error) {
            console.error("[v0] Error loading glasses:", error)
            throw error
        }
    }

    /**
     * Get all saved glasses
     */
    async getAllGlasses() {
        try {
            const records = await pb.collection(this.collection).getFullList({
                sort: "-created",
            })
            console.log("[v0] Loaded all glasses:", records.length)
            return records
        } catch (error) {
            console.error("[v0] Error loading all glasses:", error)
            throw error
        }
    }
}
