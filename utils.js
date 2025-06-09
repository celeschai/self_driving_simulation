function lerp(A, B, t){
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
    const denominator = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (denominator === 0) return null; // Lines are parallel

    const ua = ((D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)) / denominator;
    const ub = ((B.x - A.x) * (A.y - C.y) - (B.y - A.y) * (A.x - C.x)) / denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null; // Intersection not within the segments

    const intersection = {
        x: lerp(A.x, B.x, ua),
        y: lerp(A.y, B.y, ua),
        offset: ua
    };
    return intersection;
}
