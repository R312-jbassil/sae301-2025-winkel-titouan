/**
 * SVG Controller - Manages glasses SVG manipulation
 */
export class SVGController {
    constructor(svgElement) {
        this.svg = svgElement
        this.config = {
            branchesColor: "#000000",
            montureColor: "#000000",
            tailleVerre: 52,
            largeurPont: 16,
        }
    }

    /**
     * Update branches color
     */
    updateBranchesColor(color) {
        this.config.branchesColor = color
        const branches = this.svg.querySelector("#branches")
        if (branches) {
            const paths = branches.querySelectorAll(".cls-4")
            paths.forEach((path) => {
                path.style.fill = color
            })
        }
    }

    /**
     * Update monture (frame) color
     */
    updateMontureColor(color) {
        this.config.montureColor = color
        const monture = this.svg.querySelector("#monture")
        if (monture) {
            const paths = monture.querySelectorAll(".cls-4")
            paths.forEach((path) => {
                path.style.fill = color
            })
        }
    }

    /**
     * Update monture transform combining both width and height scales
     */
    updateMontureTransform() {
        const monture = this.svg.querySelector("#monture")
        if (monture) {
            const scaleX = this.config.largeurPont / 16
            const scaleY = this.config.tailleVerre / 52
            monture.style.transform = `scale(${scaleX}, ${scaleY})`
            monture.style.transformOrigin = "center center"
            monture.style.transformBox = "fill-box"
            console.log("[v0] Monture transform updated - scaleX:", scaleX, "scaleY:", scaleY)
        } else {
            console.error("[v0] #monture element not found in SVG")
        }
    }

    /**
     * Update lens size (48-56mm) - affects monture height
     */
    updateLensSize(size) {
        console.log("[v0] Updating lens size to:", size)
        this.config.tailleVerre = size
        this.updateMontureTransform()
    }

    /**
     * Update bridge width (14-22mm) - affects monture width
     */
    updateBridgeWidth(width) {
        console.log("[v0] Updating bridge width to:", width)
        this.config.largeurPont = width
        this.updateMontureTransform()
    }

    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config }
    }

    /**
     * Get SVG as string for storage
     */
    getSVGString() {
        return this.svg.outerHTML
    }
}
