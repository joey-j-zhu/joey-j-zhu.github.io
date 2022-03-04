var X = 0;
var Y = 1;

var T = 10;
var SIZE = [75, 25];
var MOUSE_RANGE = [10, 10];
var RAND_RANGE = 1;
var FEED_RATE = 0.2;
var FADE_RATE = 0.99;
var SWAPS = 300; // Number of diffusion swaps per frame
var MIX_COEF = 0.8; // Amount of mixing per frame
var MOVE_RATE = 0.2;
var VFADE_RATE = 1;
var VWEIGHT = 10;
// Global variables for fitting animation to webpage size. I need to change my code
// so this scales with the webpage size.
var G0 = [0, 0];
var G1 = [960, 480];
var CELL_SIZE = [(G1[X] - G0[X]) / SIZE[X], (G1[Y] - G0[Y]) / SIZE[Y]];

var RAD = 15;
var BASE = 0;

// The window size when calculating moving averages for smoothing
var MOUSE_BUFFER = 32;
var GRID_BUFFER = 8;

// I kinda eyeballed most of the colors and color functions
var BASE_COLOR = "#606060";
var BG_COLOR = "#101010";
var SHADOW_OFFSET = 5;

function sigmoid(input) {
    return 1 / (1 + Math.exp(input * -1))
}


// DIFFUSE GRID
function grid(c) {
    var a = new Array(c[Y]);
    for (var y = 0; y < SIZE[Y]; y++) {
        a[y] = new Array(c[X]);
        for (var x = 0; x < SIZE[X]; x++) {
            a[y][x] = 0;
        }
    }
    return a;
}

// Return a random integer in [a, b)
function randint(a, b) {
    return (a + Math.floor(Math.random() * (b - a)));
}

// Flip a coin weighted p for True
function flip(p) {
    return (Math.random() < p);
}

// Clip the input between 0 and 1
function clip(c) {
    return [Math.min(Math.max(0, c[X]), SIZE[X] - 1), Math.min(Math.max(0, c[Y]), SIZE[Y] - 1)];
}

function clip1d(a) {
    return Math.min(Math.max(0, a), 0.9999);
}

// Randomly sample from the entire grid
function gridSample() {
    return [randint(0, SIZE[X]), randint(0, SIZE[Y])];
}

// Sample from the axis-aligned square of length 2d+1 centered on x, y
function boxSample(c, d) {
    var dx = randint(0 - d, d + 1);
    var dy = randint(0 - d, d + 1);
    return [c[X] + dx, c[Y] + dy];
}

// Chance of stochastically incrementing a number to calculate diffusion
function stoc(n) {
    var fn = Math.floor(n);
    var d = flip(n - fn);
    if (d == true) {
        return fn + 1;
    } else {
        return fn;
    }
}

function neighbor(c, d, v) {  
    return boxSample(clip([(c[X] + stoc(v[X])) % SIZE[X], c[Y] + stoc(v[Y])]), 0);
    //return boxSample(c, d);
}

// P must be an array
function sampleFilter(arr) {
    var x = 0;
    var y = 0;
    var finished = false;
    while (!finished) {
        var s = gridSample;
        finished = flip(arr[y][x]);
    }
}

// Mix the values at these two points and change their values accordingly
function transfer(arr, x1, y1, x2, y2, amt1, amt2) {
    var cell1 = arr[y1][x1];
    var cell2 = arr[y2][x2];
    arr[y1][x1] = cell1 + amt1 * (cell2 - cell1);
    arr[y2][x2] = cell2 + amt2 * (cell1 - cell2);
}

// A single "step" in the diffusion simulation which mixes values at two points.
// Each timestep computes many of these at a time, randomly selecting nearby pairs of points.
function step(arr, d, diffusion, vx, vy) {
    var nc;
    var c = gridSample();
    nc = neighbor(c, d, [vx[c[Y]][c[X]], vy[c[Y]][c[X]]]);
    if (nc[X] == clip(nc)[X] && nc[Y] == clip(nc)[Y]) {
        // If the neighbor is valid, mix
        transfer(arr, c[X], c[Y], Math.floor(nc[X]), Math.floor(nc[Y]), diffusion, diffusion);
        console.log(nc[X] - c[X]);
    } else {
        // Else, just drain
        arr[c[Y]][c[X]] *= (1 - diffusion);
    }
}



// CURSOR

var mouse = [0, 0];
var currentBuffer = 1;

function globalToLocal(c) {
    return [SIZE[X] * (c[X] - G0[X]) / (G1[X] - G0[X]), SIZE[Y] * (c[Y] - G0[Y]) / (G1[Y] - G0[Y])];
}

function localToGlobal(c) {
    return [G0[X] + (G1[X] - G0[X]) * c[X] / SIZE[X], G0[Y] + (G1[Y] - G0[Y]) * c[Y] / SIZE[Y]];
}

// Keep track of the cursor's last 10 positions to make a moving average to smooth out
// cursor tracking. I don't actually implement this in the current version, which is entirely
// randomly generated.
var cursorStream = [globalToLocal(mouse)]

var totalC = [mouse[X], mouse[Y]];
var smoothC = [mouse[X], mouse[Y]];
var prevC = globalToLocal([mouse[X], mouse[Y]]);

// Add heat to the grid in a blurred area around the smoothed cursor.
function heat(grid, c) {
    c[X] = Math.floor(c[X]);
    c[Y] = Math.floor(c[Y]);
    var ax = Math.max(0, c[X] - MOUSE_RANGE[X]);
    var bx = Math.min(SIZE[X] - 1, (c[X] + MOUSE_RANGE[X]) + 1);
    var ay = Math.max(0, c[Y] - MOUSE_RANGE[Y]);
    var by = Math.min(SIZE[Y] - 1, (c[Y] + MOUSE_RANGE[Y]) + 1);
    for (var x = ax; x <= bx; x++) {
        for (var y = ay; y < by; y++) {
            var dx = x - c[X];
            var dy = y - c[Y];
            var r2 = dx * dx + dy * dy;
            grid[y][x] = grid[y][x] + FEED_RATE * Math.random() / (r2 + 1);
        }
    }
}

// Pull the area of the grid near the cursor towards a target value.
function pull(grid, c, target) {
    c[X] = Math.floor(c[X]);
    c[Y] = Math.floor(c[Y]);
    var ax = Math.max(0, c[X] - MOUSE_RANGE[X]);
    var bx = Math.min(SIZE[X] - 1, (c[X] + MOUSE_RANGE[X]) + 1);
    var ay = Math.max(0, c[Y] - MOUSE_RANGE[Y]);
    var by = Math.min(SIZE[Y] - 1, (c[Y] + MOUSE_RANGE[Y]) + 1);
    for (var x = ax; x <= bx; x++) {
        for (var y = ay; y <= by; y++) {
            var dx = x - c[X];
            var dy = y - c[Y];
            var r2 = dx * dx + dy * dy;
            grid[y][x] += (target - grid[y][x]) * FEED_RATE / (r2 + 1);
        }
    }
}

function addFrame(gc) {
    var c = gc;
    // Add to top of stream
    cursorStream.push([c[X], c[Y]]);
    totalC[X] += c[X];
    totalC[Y] += c[Y];
    
    if (currentBuffer == MOUSE_BUFFER) {
        // If stream is at size, take out bottom
        var last = cursorStream.shift();
        totalC[X] = totalC[X] - last[X];
        totalC[Y] = totalC[Y] - last[Y];
    } else {
        currentBuffer++;
    }
    prevC[X] = smoothC[X];
    prevC[Y] = smoothC[Y];
    
    smoothC[X] = smoothC[X] + (totalC[X] / currentBuffer - smoothC[X]) * MOVE_RATE;
    smoothC[Y] = smoothC[Y] + (totalC[Y] / currentBuffer - smoothC[Y]) * MOVE_RATE;
}

function mouseV() {
    return [smoothC[X] - prevC[X], smoothC[Y] - prevC[Y]];
}




// GRID BUFFER

var smoothGrid = grid(SIZE);
var totalGrid = grid(SIZE);

var gridStream = [grid(SIZE)];

var currGridBuffer = 1;


function addGridFrame(newGrid) {
    // Add to the total grid
    for (var y = 0; y < SIZE[Y]; y++) {
        for (var x = 0; x < SIZE[X]; x++) {
            totalGrid[y][x] += newGrid[y][x];
        }
    }
    
    if (currGridBuffer == GRID_BUFFER) {
        // If buffer is full, take out bottom of stream and set values to incoming grid
        // And recalculate sliding total
        var last = gridStream.shift();
        for (var y = 0; y < SIZE[Y]; y++) {
            for (var x = 0; x < SIZE[X]; x++) {
                totalGrid[y][x] -= last[y][x];
                last[y][x] = newGrid[y][x];
            }
        }
        gridStream.push(last);
    } else {
        // If buffer isn't full, add a copy of current and up counter
        var newArr = grid(SIZE);
        for (var y = 0; y < SIZE[Y]; y++) {
            for (var x = 0; x < SIZE[X]; x++) {
                newArr[y][x] = newGrid[y][x];
            }
        }
        gridStream.push(newArr);
        currGridBuffer++;
    }
    
    // Pull smooth grid to buffer average
    for (var y = 0; y < SIZE[Y]; y++) {
        for (var x = 0; x < SIZE[X]; x++) {
            smoothGrid[y][x] += (totalGrid[y][x] / currGridBuffer - smoothGrid[y][x]) * MOVE_RATE;
        }
    }
}






// CANVAS

canvasSize = [G1[X] - G0[X], G1[Y] - G0[Y]];

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ticks = 0;

// Grids: mainGrid concerns the actual display/heat values
// A vector field is stored in vxGrid and vyGrid
var mainGrid = grid(SIZE);
var vxGrid = grid(SIZE);
var vyGrid = grid(SIZE);


// Shapes and colors
function drawLine(canvas, c1, c2, width, color) {
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    // draw a red line
    canvas.beginPath();
    canvas.moveTo(c1[X], c1[Y]);
    canvas.lineTo(c2[X], c2[Y]);
    canvas.stroke();
}


function drawCircle(canvas, c, radius) {
    canvas.beginPath();
    canvas.arc(c[X], c[Y], radius, 0 , 2 * Math.PI);
    canvas.fillStyle = BASE_COLOR;
    canvas.fill();
}

function drawRect(canvas, c0, c1, color) {
    canvas.beginPath();
    canvas.rect(c0[X], c0[Y], c1[X], c1[Y]);
    canvas.fillStyle = color;
    canvas.fill();
}

function drawCross(canvas, center, length, thickness, color) {
    drawRect(canvas, [center[X] - thickness, center[Y] - length], [thickness, length * 2 - thickness], color);
    drawRect(canvas, [center[X] - length, center[Y] - thickness], [length * 2 - thickness, thickness], color);
}

function drawDiagCross(canvas, center, length, thickness, color, mult, jump) {
    function transform(c) {     
        c[Y] += 4 * Math.sin(0.01 * c[X] + 0.01 * c[Y] - 0.02 * ticks) * (1 - Math.exp(-ticks / 5000));
        c[X] += 6 * Math.cos(0.01 * c[X] - 0.01 * c[Y] - 0.02 * ticks) * (1 - Math.exp(-ticks / 5000));
        var stretch = (c[Y] - G1[Y]) * (c[Y] - G1[Y]);
        var newX = (c[X] - G1[X] / 2) * (1 + b * stretch) + G1[X] / 2;
        var newY = c[Y] - a * stretch + d * (c[X] - G1[X] / 2) * (c[X] - G1[X] / 2);

        var mouseForce = 3.5 *  warp / (2.57 + 0.001 * mag2([smoothC[X] - newX, smoothC[Y] - newY]));
        // newX += (smoothC[X] - newX) * mouseForce;
        newY += (smoothC[Y] - newY) * mouseForce + jump;
        return [newX, newY];
    }

    length = Math.max(0, length - 0.45) * mult;
    if (length > 0) {
        var a = 0.0001;
        var b = 0.00001;
        var d = 0.0003;
        var warp = Math.sqrt(Math.sqrt(mag2(mouseV())) / 12) / 4;
        drawLine(canvas, 
            transform([center[X] - length, center[Y] - length]), 
            transform([center[X] + length, center[Y] + length]), 
            thickness, color);
        drawLine(canvas, 
            transform([center[X] + length, center[Y] - length]), 
            transform([center[X] - length, center[Y] + length]), 
            thickness, color);
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// RGB values are in range [0, 1)]
function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(r * 256)) + componentToHex(Math.floor(g * 256)) + componentToHex(Math.floor(b * 256));
}

function nrgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(256 - r * 256)) + componentToHex(Math.floor(256 - g * 256)) + componentToHex(Math.floor(256 - b * 256));
}

function headline(canvas, message) {
    canvas.font = "96px Raleway";
    canvas.textAlign = "center";
    canvas.fillStyle = "#080808";
    canvas.fillText(message, (G1[X] - G0[X]) / 2, (G1[Y] - G0[Y]) * 9 / 10 + SHADOW_OFFSET + 24);
    canvas.fillStyle = "#ffffff";
    canvas.fillText(message, (G1[X] - G0[X]) / 2, (G1[Y] - G0[Y]) * 9 / 10 + 24);
}

// Displays an array of shapes with parameters from the smoothed-out grid
// TODO: y loop cut short because last one doesn't render. Fix it
function render(canvas, grid , xOffset, yOffset , bgRed, bgGreen, bgBlue, blend, glow, xShift, mult) {
    var c;
    var l;
    for (var y = 0; y < SIZE[Y]; y++) {
        for (var x = 0; x < SIZE[X]; x++) {
            var xPrime = (x + xShift) % SIZE[X];
            l = BASE + RAD * (grid[y][xPrime]) * 2;
            c = localToGlobal([x + 0.5, y + 0.5]);

            var r = 0.4 + 0.006 * (x + y) + 0.05 * Math.sin(ticks * 0.24 / T);
            var g = 0.3 + 0.002 * (x - y) + 0.04 * Math.cos(ticks * 0.48 / T );
            var b = 0.45 - 0.006 * (x / 2 + y) - 0.1 * Math.sin(ticks * 0.89 / T);
            
            if (grid[y][xPrime] < 0) {
                r = 1 - r;
                g = 1 - g;
                b = 1 - b;
            }
            
            
            if ((x + y) % 2 == 0) {
                var fog = Math.min(1, Math.max(0, blend + y/15));
                r += fog * (bgRed - r);
                g += fog * (bgGreen - g);
                b += fog * (bgBlue - b);

                var blur = Math.min(1, Math.max(0, glow - (y-25)/5));;
                r = clip1d(r * (1 + 2 * blur  * grid[y][xPrime] * grid[y][xPrime]));
                g = clip1d(g * (1 + 1.5 * blur  * grid[y][xPrime] * grid[y][xPrime]));
                b = clip1d(b * (1 + 0.75 * blur   * grid[y][xPrime] * grid[y][xPrime]));

                var hex = rgbToHex(r, g, b);
                drawDiagCross(canvas, [c[X] + xOffset, c[Y] + yOffset], Math.min(10, Math.abs(l)), 1, hex, mult, grid[y][xPrime] * 12.5);
            //drawCircle(canvas, c, BASE + RAD * grid[y][x]);
            }
        }
    }
    headline(canvas, "JOEY ZHU");
}

function mag2(c) {
    return c[X] * c[X] + c[Y] * c[Y];
}

// Updates the grid
function update() {
    // Update streams
    addFrame(mouse);
    addGridFrame(mainGrid);

    // Run a number of Stochastic diffusion/flow iterations
    for (var i = 0; i < SWAPS; i++) {
        step(mainGrid, RAND_RANGE, MIX_COEF, vxGrid, vyGrid);
    }

    // Update 
    //pull(mainGrid, globalToLocal([smoothC[X], smoothC[Y]]), 0.5);
    var vel = globalToLocal(mouseV());

    // Make functions
    if (mag2(vel) > 0) {
        pull(vxGrid, globalToLocal(smoothC), VWEIGHT * vel[X]);
        pull(vyGrid, globalToLocal(smoothC), VWEIGHT * vel[Y]);
    }

    for (var y = 0; y < SIZE[Y]; y++) {
        for (var x = 0; x < SIZE[X]; x++) {
            mainGrid[y][x] = mainGrid[y][x] * FADE_RATE;
            vxGrid[y][x] = vxGrid[y][x] * VFADE_RATE;
            vyGrid[y][x] = vyGrid[y][x] * VFADE_RATE;
        }
    }

    if (ticks % 4 == 0) {
        var fx = randint(0, SIZE[X] - 1);
        var fy = randint(0, SIZE[Y] - 1);

        var vx = (Math.random() - 0.5) * 5;
        var vy = (Math.random() - 0.5) * 5;
        var size = Math.random() * 15;

        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;

        //mainGrid[fy][fx] += 0.5 * Math.random();
        pull(mainGrid, [fx, fy], size);
        pull(vxGrid, [fx, fy], -vx * VWEIGHT);
        pull(vyGrid, [fx, fy], -vy * VWEIGHT);
        
        fx += dx * 2;
        fy += dy * 2;
        var f = clip([fx, fy]);
        fx = f[X];
        fy = f[Y];

        //mainGrid[fy][fx] += 0.5 * Math.random();
        pull(mainGrid, [fx, fy], -size);
        pull(vxGrid, [fx, fy], vx * VWEIGHT);
        pull(vyGrid, [fx, fy], vy * VWEIGHT);
    }

    ticks++;
}




// INTERFACE
var bg = 0.1;
function mainloop() {
    requestAnimationFrame(mainloop);
    ctx.clearRect(0, 0, canvasSize[X], canvasSize[Y]);

    var speed = 10 - 7.7 * (1 - Math.exp(-ticks / 500));
    var yRot =  1;
    var xRot = 0;
    render(ctx, smoothGrid, -(ticks / speed) % (CELL_SIZE[X] * 2)  - 4 * xRot, -4 * yRot,
            bg, bg, bg, 0.2,
            0, 2 * Math.trunc((ticks / speed) / (CELL_SIZE[X] * 2)), 0.6);

    render(ctx, smoothGrid, -(ticks / speed) % (CELL_SIZE[X] * 2), 0,
            bg, bg, bg, -0.5,
            4, 2 * Math.trunc((ticks / speed) / (CELL_SIZE[X] * 2)), 1.3);
    update();
}

window.addEventListener('mousemove', function(e) {
    var cRect = canvas.getBoundingClientRect();
    mouse[X] = e.x - cRect.left;
    mouse[Y] = e.y - cRect.top;
});



mainloop();






