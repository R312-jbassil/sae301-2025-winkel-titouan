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
     * Update lens size (48-56mm)
     */
    updateLensSize(size) {
        console.log("[v0] Updating lens size to:", size)
        this.config.tailleVerre = size
        const verres = this.svg.querySelector("#verres")

        if (verres) {
            const scale = size / 52
            verres.style.transform = `scale(${scale})`
            verres.style.transformOrigin = "center center"
            verres.style.transformBox = "fill-box"
            console.log("[v0] Lens size updated, scale:", scale)
        } else {
            console.error("[v0] #verres element not found in SVG")
        }
    }

    /**
     * Update bridge width (14-22mm)
     */
    updateBridgeWidth(width) {
        console.log("[v0] Updating bridge width to:", width)
        this.config.largeurPont = width
        const monture = this.svg.querySelector("#monture")

        if (monture) {
            const scale = width / 16
            monture.style.transform = `scaleX(${scale})`
            monture.style.transformOrigin = "center center"
            monture.style.transformBox = "fill-box"
            console.log("[v0] Bridge width updated, scale:", scale)
        } else {
            console.error("[v0] #monture element not found in SVG")
        }
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
