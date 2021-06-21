// DIFFUSE GRID

var SIZE = [48, 27];
var X = 0;
var Y = 1;

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

function randint(a, b) {
    return (a + Math.floor(Math.random() * (b - a)));
}

// Flip a coin weighted p for True
function flip(p) {
    return (Math.random() < p);
}

function clip(c) {
    return [Math.min(Math.max(0, c[X]), SIZE[X] - 1), Math.min(Math.max(0, c[Y]), SIZE[Y] - 1)];
}

// Randomly sample from the entire grid
function gridSample() {
    return [randint(0, SIZE[X] - 1), randint(0, SIZE[Y] - 1)];
}

// Sample from the axis-aligned square of length 2d+1 centered on x, y
function boxSample(c, d) {
    var dx = randint(-d, d + 1);
    var dy = randint(-d, d + 1);
    return clip(c[X] + dx, c[Y] + dy);
}


function stoc(n) {
    var fn = Math.floor(n);
    var d = self.flip(n - fn);
    if (d == true) {
        return fn + 2;
    } else {
        return fn;
    }
}

function invsqNeighbor(x, y, maxDist, vx, vy) {
    c = boxSample(x + stoc(vx), y + stoc(vy));
    return clip(c[X], c[Y]);
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

function transfer(arr, x1, y1, x2, y2, amt1, amt2) {
    var cell1 = arr[y1][x1];
    var cell2 = arr[y2][x2];
    arr[y1][x1] = cell1 + amt1 * (cell2 - cell1);
    arr[y2][x2] = cell2 + amt2 * (cell1 - cell2);
}

function step(arr, wFunc, d) {
    var x = 0;
    var y = 0;
    var finished = false;
    var nc;
    var finished = false;
    while (!finished) {
        c = sampleFilter(arr);
        finished = flip(wFunc(arr[y][x]));
    }
    var nc = invsqNeighbor(x, y, d);
    transfer(c[X], c[Y], nc[X], nc[Y], d, d);
}





// CURSOR

var mouse = [0, 0];

var G0 = [0, 0];
var G1 = [960, 540];
var CELL_SIZE = [(G1[X] - G0[X]) / SIZE[X], (G1[Y] - G0[Y]) / SIZE[Y]];

var MOUSE_BUFFER = 20;
var currentBuffer = 1;

function globalToLocal(c) {
    return [SIZE[X] * (c[X] - G0[X]) / (G1[X] - G0[X]), SIZE[Y] * (c[Y] - G0[Y]) / (G1[Y] - G0[Y])];
}

function localToGlobal(c) {
    return [G0[X] + (G1[X] - G0[X]) * c[X] / SIZE[X], G0[Y] + (G1[Y] - G0[Y]) * c[Y] / SIZE[Y]];
}

var cursorStream = [globalToLocal(mouse)]

var totalC = [mouse[X], mouse[Y]];
var smoothC = [mouse[X], mouse[Y]];
var prevC = globalToLocal([mouse[X], mouse[Y]]);

var MOUSE_RANGE = [100, 100];
var FEED_RATE = 0.8;
var FADE_RATE = 0.8;
var MOVE_RATE = 0.2;

function heat(grid, c) {
    var ax = Math.max(0, c[X] - MOUSE_RANGE[X]);
    var bx = Math.min(SIZE[X] - 1, (c[X] + MOUSE_RANGE[X]) + 1);
    var ay = Math.max(0, c[Y] - MOUSE_RANGE[Y]);
    var by = Math.min(SIZE[Y] - 1, (c[Y] + MOUSE_RANGE[Y]) + 1);
    for (var x = ax; x <= bx; x++) {
        for (var y = ay; y < by; y++) {
            var dx = x - c[X];
            var dy = y - c[Y];
            var r2 = dx * dx + dy * dy;
            grid[y][x] = grid[y][x] + FEED_RATE / (r2 + 1);
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
    prevC = smoothC;
    
    smoothC[X] = smoothC[X] + (totalC[X] / currentBuffer - smoothC[X]) * MOVE_RATE;
    smoothC[Y] = smoothC[Y] + (totalC[Y] / currentBuffer - smoothC[Y]) * MOVE_RATE;
}

function mouseV() {
    return [smoothC[X] - prev[X], smoothC[Y] - prev[Y]];
}




// GRID BUFFER






// CANVAS

canvasSize = [G1[X] - G0[X], G1[Y] - G0[Y]];

var BASE_COLOR = "#606060";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var mainGrid = grid(SIZE[X], SIZE[Y]);

var RAD = 5;
var BASE = 2;

function drawCircle(canvas, c, radius) {
    canvas.beginPath();
    canvas.arc(c[X], c[Y], radius, 0 , 2 * Math.PI);
    canvas.fillStyle = BASE_COLOR;
    canvas.fill();
}

function drawRect(canvas, c0, c1) {
    canvas.beginPath();
    canvas.rect(c0[X], c0[Y], c1[X], c1[Y]);
    canvas.fillStyle = "white";
    canvas.fill();
    canvas.stroke();
}

function render(canvas, grid) {
    var c;
    for (var y = 0; y < SIZE[Y]; y++) {
        for (var x = 0; x < SIZE[X]; x++) {
            c = localToGlobal([x + 0.5, y + 0.5]);
            drawCircle(canvas, c, BASE + RAD * grid[y][x]);
        }
    }
}

function update(grid) {
    addFrame(mouse);
    for (var i = 0; i < 100; i++) {
        //step(grid, 3);
    }

    heat(grid, globalToLocal(smoothC));
    for (var y = 0; y < SIZE[Y]; y++) {
        for (var x = 0; x < SIZE[X]; x++) {
            mainGrid[y][x] = mainGrid[y][x] * FADE_RATE;
        }
    }
}



// INTERFACE

function mainloop() {
    requestAnimationFrame(mainloop);
    ctx.clearRect(0, 0, canvasSize[X], canvasSize[Y]);
    
    render(ctx, mainGrid);
    update(mainGrid);
}

mainloop();

window.addEventListener('mousemove', function(e) {
    mouse[X] = e.x;
    mouse[Y] = e.y;
})