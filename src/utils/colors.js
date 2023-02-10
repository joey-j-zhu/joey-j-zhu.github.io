export function componentToHex(color) {
    var c = Math.min(255, Math.max(0, Math.round(color)))
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function interpolateColor(colorA, colorB, t, interpolationFunction) {
    return new Color ({
        red: interpolationFunction(colorA.red, colorB.red, t),
        green: interpolationFunction(colorA.green, colorB.green, t),
        blue: interpolationFunction(colorA.blue, colorB.blue, t),
    })
}

export class Color {
    constructor({red, green, blue}) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }



    // Descructively interpolate colors to avoid piling up Color instances
    interpolateTo(colorB, t, interpolationFunction) {
        this.red = interpolationFunction(this.red, colorB.red, t);
        this.green = interpolationFunction(this.green, colorB.green, t);
        this.blue = interpolationFunction(this.blue, colorB.blue, t);
    }

    getHex() {
        return "#" + componentToHex(this.red) + componentToHex(this.green) + componentToHex(this.blue);
    }
}