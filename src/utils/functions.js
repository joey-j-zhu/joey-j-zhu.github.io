export function interpolateTrig(a, b, t) {
    let tsin = 1 - Math.cos(Math.PI * t / 2.0);
    return a + tsin * (b - a);
}