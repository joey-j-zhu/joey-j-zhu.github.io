class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(point1, point2) {
        return 0; //TODO
    }

    norm(point1,) {
        return 0; //TODO
    }

    intersectingPoints(point1, radius1, point2, radius2) {
        return point1, point2; //TODO
    }
}

class SortedList {
    constructor() {
        this.items = [];
    }

    push(a) {
        this.items.add(a);
    }

    pop(i) {
        return 0;
    }

    nthLargest(n) {
        return 0;
    }
}

class PoincareDisk {
    constructor(radius) {
        this.radius = radius;
        this.points = [];
    }

    poincareDistance(point1, point2) {
        return 0; //TODO
    }

    addEuclideanPoint(point) {
        this.points.push(point); 
    }

    euclideanCIrcle(point, radius) {
        return point, 0; //TODO
    }

    equidistantEuclideanPoints(point1, point2, dist) {
        euclideanCenter1, euclideanRadius1 = euclideanCircle(point1, dist);
        euclideanCenter2, euclideanRadius2 = euclideanCircle(point2, dist);
        return intersectingPoints(euclideanCenter1, euclideanRadius1, euclideanCenter2, euclideanRadius2);
    }


}

