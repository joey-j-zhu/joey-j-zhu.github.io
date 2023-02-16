
import {X, Y, GRID_SIZE, CELL_SIZE, T, G0, G1, BASE_COLOR, BASE, RAD} from './constants.js';

var canvasSize = [G1[X] - G0[X], G1[Y] - G0[Y]];

function globalToLocal(c) {
    return [GRID_SIZE[X] * (c[X] - G0[X]) / (G1[X] - G0[X]), GRID_SIZE[Y] * (c[Y] - G0[Y]) / (G1[Y] - G0[Y])];
}

function clip1d(a) {
    return Math.min(Math.max(0, a), 0.9999);
}

// RGB values are in range [0, 1)]

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(r * 256)) + componentToHex(Math.floor(g * 256)) + componentToHex(Math.floor(b * 256));
}

function nrgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(256 - r * 256)) + componentToHex(Math.floor(256 - g * 256)) + componentToHex(Math.floor(256 - b * 256));
}

function localToGlobal(c) {
    return [G0[X] + (G1[X] - G0[X]) * c[X] / GRID_SIZE[X], G0[Y] + (G1[Y] - G0[Y]) * c[Y] / GRID_SIZE[Y]];
}

function drawCircle(canvas, c, radius) {
    canvas.beginPath();
    canvas.arc(c[X], c[Y], radius * 2, 0 , 2 * Math.PI);
    canvas.fillStyle = BASE_COLOR;
    canvas.fill();
}

function drawRect(canvas, c0, c1, color) {
    canvas.beginPath();
    canvas.rect(c0[X], c0[Y], c1[X], c1[Y]);
    canvas.fillStyle = BASE_COLOR;
    canvas.fill();
}

function drawLine(canvas, c1, c2, width, color) {
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    // draw a red line
    canvas.beginPath();
    canvas.moveTo(c1[X], c1[Y]);
    canvas.lineTo(c2[X], c2[Y]);
    canvas.stroke();
}

function drawCross(canvas, center, length, thickness, color) {
    drawRect(canvas, [center[X] - thickness, center[Y] - length], [thickness * 2, length * 2], color);
    drawRect(canvas, [center[X] - length, center[Y] - thickness], [length * 2, thickness * 2], color);
}

function drawDiagCross(canvas, center, length, thickness, color, mult, jump, timer) {
    function transform(c) {    
        // //console.log(c);
        // c[Y] += 4 * Math.sin(0.01 * c[X] + 0.01 * c[Y] - 0.02 * timer) * (1 - Math.exp(-timer / 5000));
        // c[X] += 6 * Math.cos(0.01 * c[X] - 0.01 * c[Y] - 0.02 * timer) * (1 - Math.exp(-timer / 5000));
        // var stretch = (c[Y] - G1[Y]) * (c[Y] - G1[Y]);
        
        // var newX = (c[X] - G1[X] / 2) * (1 + b * stretch) + G1[X] / 2;
        // var newY = c[Y] - a * stretch + d * (c[X] - G1[X] / 2) * (c[X] - G1[X] / 2);

        // // var mouseForce = 6 *  warp / (0.7 + 0.001 * mag2([smoothC[X] - newX, smoothC[Y] - newY]));
        // var mouseForce = 0;
        // //newX += (smoothC[X] - newX) * mouseForce;
        // //newY += (smoothC[Y] - newY) * mouseForce + jump;
        // newY += jump;
        
        // return [newX, newY];
        return c;
    }

    length = Math.max(0, length - 0.45) * mult;
    if (length > 0) {
        var a = 0.0001;
        var b = 0.00001;
        var d = 0.0003;
        //center[Y] += length * jump * 0.05;

        //var warp = Math.sqrt(Math.sqrt(mag2(mouseV())) / 12) / 4;
        var warp = 0;
        drawLine(canvas, 
            transform([center[X] - length, center[Y] - length]), 
            transform([center[X] + length, center[Y] + length]), 
            thickness, color);
        drawLine(canvas, 
            transform([center[X] + length, center[Y] - length]), 
            transform([center[X] - length, center[Y] + length]), 
            thickness, color);
    }
    //console.log("diagonal cross drawn");
}

const FoldGraphics = ({
    system,
}) => {
    function render(canvas, grid, xOffset, yOffset, bgRed, bgGreen, bgBlue, blend, glow, xShift, mult) {
        var c;
        var l;
        for (var y = 0; y < GRID_SIZE[Y]; y++) {
            for (var x = 0; x < GRID_SIZE[X]; x++) {
                var xPrime = (x + xShift) % GRID_SIZE[X];
                l = BASE + RAD * (grid.getVal(xPrime, y)) * 2;
                c = localToGlobal([x + 0.5, y + 0.5]);
                
    
                var r = 0.4 + 0.006 * (x + y) + 0.05 * Math.sin(system.timer * 0.24 / T);
                var g = 0.3 + 0.002 * (x - y) + 0.04 * Math.cos(system.timer * 0.48 / T );
                var b = 0.45 - 0.006 * (x / 2 + y) - 0.1 * Math.sin(system.timer * 0.89 / T);
                
                if (grid.getVal(xPrime, y) < 0) {
                    r = 1 - r;
                    g = 1 - g;
                    b = 1 - b;
                }
                
                if ((x + y) % 2 == 0) {
                    var fog = Math.min(1, Math.max(0, blend + y/15)) * 0.6;
                    r += fog * (bgRed - r);
                    g += fog * (bgGreen - g);
                    b += fog * (bgBlue - b);
    
                    var blur = Math.min(1, Math.max(0, glow - (y-25)/5));;
                    r = clip1d(r * (1 + 2 * blur  * grid.getVal(xPrime, y) * grid.getVal(xPrime, y)));
                    g = clip1d(g * (1 + 1.5 * blur  * grid.getVal(xPrime, y) * grid.getVal(xPrime, y)));
                    b = clip1d(b * (1 + 0.75 * blur   * grid.getVal(xPrime, y) * grid.getVal(xPrime, y)));
                    
                    //console.log(c);
                    var hex = rgbToHex(r, g, b);
                    drawDiagCross(canvas, [c[X] + xOffset, c[Y] + yOffset], Math.min(10, Math.abs(l)), 1, hex, mult, grid.getVal(xPrime, y) * 5, system.timer);
                //drawCircle(canvas, c, BASE + RAD * grid[y][x]);
                }
            }
        }
    }

    var canv = document.getElementById("fold-graphics");
    var ctx = canv != null ? canv.getContext('2d') : null;
    if (ctx != null && system != undefined) {
        ctx.clearRect(G0[X], G0[Y], G1[X], G1[Y]);
        var bg = 0.1;
        var speed = 100;
        var yRot =  1;
        var xRot = 0;
        // render(ctx, system.smoothGrid, -(system.timer / speed) % (CELL_SIZE[X] * 2)  - 4 * xRot, -4 * yRot,
        //         bg, bg, bg, 0.2,
        //         0, 2 * Math.trunc((system.timer / speed) / (CELL_SIZE[X] * 2)), 0.6);

        render(ctx, system.smoothGrid, -(system.timer / speed) % (CELL_SIZE[X] * 2), 0,
                bg, bg, bg, -0.5,
                8, 2 * Math.trunc((system.timer / speed) / (CELL_SIZE[X] * 2)), 1.3);
    }
};


export default FoldGraphics;


