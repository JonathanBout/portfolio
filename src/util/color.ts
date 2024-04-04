import parseCSSColor, { type Result as CSSColorType } from "parse-css-color"

export class CSSColor implements CSSColorType {
    alpha: number = 1
    type: string = "rgb"
    values: [number, number, number] = [0, 0, 0]

    toCSSColorString() {
        return `rgba(${this.values.join(", ")}, ${this.alpha})`
    }

    static fromString(color: string): CSSColor {
        const parsed = parseCSSColor(color)
        const res = new CSSColor()
        Object.assign(res, parsed)
        return res
    }
}

export function contrastingColor(originalColor: CSSColor) {
    const [r, g, b] = originalColor.values
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    const res = luminance > 0.5 ? "#000000" : "#ffffff"
    return CSSColor.fromString(res)
}
