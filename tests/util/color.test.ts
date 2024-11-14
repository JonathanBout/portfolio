import { CSSColor, contrastingColor } from "../../src/util/color"

import { expect, test } from "vitest"

test('color is parsed correctly', () => {
    expect(CSSColor.fromString("#fff")).toStrictEqual(new CSSColor({ alpha: 1, type: "rgb", values: [255, 255, 255] }))
    expect(CSSColor.fromString("#000")).toStrictEqual(new CSSColor({ alpha: 1, type: "rgb", values: [0, 0, 0] }))
    expect(CSSColor.fromString("rgb(255, 100, 255)")).toStrictEqual(new CSSColor({ alpha: 1, type: "rgb", values: [255, 100, 255] }))
    expect(CSSColor.fromString("rgba(255, 100, 255, 0.5)")).toStrictEqual(new CSSColor({ alpha: 0.5, type: "rgb", values: [255, 100, 255] }))
    expect(CSSColor.fromString("hsl(120, 100%, 50%)")).toStrictEqual(new CSSColor({ alpha: 1, type: "hsl", values: [120, 100, 50] }))
})

test('contrasting color is calculated correctly', () => {
    expect(contrastingColor(CSSColor.fromString("#fff"))).toStrictEqual(CSSColor.fromString("#000"))
    expect(contrastingColor(CSSColor.fromString("#000"))).toStrictEqual(CSSColor.fromString("#ffffff"))
    expect(contrastingColor(CSSColor.fromString("rgb(255, 100, 255)"))).toStrictEqual(CSSColor.fromString("#000000"))
    expect(contrastingColor(CSSColor.fromString("rgba(255, 100, 255, 0.5)"))).toStrictEqual(CSSColor.fromString("#000000"))
    expect(contrastingColor(CSSColor.fromString("hsl(120, 100%, 50%)"))).toStrictEqual(CSSColor.fromString("#ffffff"))
})

