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
            const recordData = {
                nom: data.nom,
                code_svg: data.code_svg,
                largeur_pont: Number(data.largeur_pont),
                taille_verre: Number(data.taille_verre),
                couleur: data.couleur,
                materiau_branche: data.materiau_branche,
                materiau_monture: data.materiau_monture,
            }

            const record = await pb.collection(this.collection).create(recordData)

            if (pb.authStore.isValid) {
                const userId = pb.authStore.model?.id
                const user = await pb.collection("users").getOne(userId)

                const existingPaires = user.paire_personnalisee || []

                await pb.collection("users").update(userId, {
                    paire_personnalisee: [...existingPaires, record.id],
                })
            }

            return record
        } catch (error) {
            console.error("Error saving glasses:", error)
            throw error
        }
    }

    /**
     * Load glasses configuration from PocketBase
     */
    async loadGlasses(id) {
        try {
            const record = await pb.collection(this.collection).getOne(id)
            return record
        } catch (error) {
            console.error("Error loading glasses:", error)
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
            return records
        } catch (error) {
            console.error("Error loading all glasses:", error)
            throw error
        }
    }
}
