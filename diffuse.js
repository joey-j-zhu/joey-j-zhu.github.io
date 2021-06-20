// DIFFUSE GRID

var SIZE = [64, 64];
var X = 0;
var Y = 1;

function grid(c) {
    var a = new Array(c[Y]);
    for (var y = 0; y < SIZE[Y]; y++) {
        a[y] = new Array(c[X]);
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

function step(arr, wFunc, d, diff, probWeight) {
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

var MOUSE_BUFFER = 10;
currentBuffer = 1;

function globalToLocal(c) {
    return [SIZE[X] * (c[X] - G0[X]) / (G1[X] - G0[X]), SIZE[Y] * (c[Y] - G0[Y]) / (G1[Y] - G0[Y])];
}
var cursorStream = [globalToLocal(mouse)]

var totalC = [mouse[X], mouse[Y]];
var smoothC = [mouse[X], mouse[Y]];
var prevC = globalToLocal([mouse[X], mouse[Y]]);

var MOUSE_RANGE = [50, 50];
var FEED_RATE = 100;
var FADE_RATE = 0.2;
var MOVE_RATE = 0.8

function heat(grid, c) {
    var ax = Math.max(0, c[X] - MOUSE_RANGE[X]);
    var bx = Math.min(SIZE[X] - 1, (c[X] + MOUSE_RANGE[X]) + 1);
    var ay = Math.max(0, c[Y] - MOUSE_RANGE[Y]);
    var by = Math.min(SIZE[Y] - 1, (c[Y] + MOUSE_RANGE[Y]) + 1);
    for (var x = ax; x <= bx; x++) {
        for (var y = ay; y < by; y++) {
            var dx = x - c[x];
            var dy = y - c[y];
            var r2 = dx * dx + dy * dy;
            grid[y][x] += FEED_RATE * Math.random() / (r2 + 1);
        }
    }
}

function addFrame(gc) {
    var c = globalToLocal(gc);
    cursorStream.push(c);

    if (currentBuffer == MOUSE_BUFFER) {
        var last = cursorStream.pop();
        self.totalC[X] = self.totalC[X] - last[X];
        self.totalC[Y] = self.totalC[Y] - last[Y];
    } else {
        currentBuffer++;
    }
    prevC = smoothC;
    smoothC[X] = smoothC[X] + (totalC[X] / MOUSE_BUFFER - smoothC[X]) * MOVE_RATE;
    smoothC[Y] = smoothC[Y] + (totalC[Y] / MOUSE_BUFFER - smoothC[Y]) * MOVE_RATE;
}

function mouseV() {
    return [smoothC[X] - prev[X], smoothC[Y] - prev[Y]];
}



// MAIN

var mainGrid = grid(SIZE[X], SIZE[Y]);
