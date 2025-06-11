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

function polysIntersect(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        const startA = poly1[i];
        // Last point connects back to the first
        const endA = poly1[(i + 1) % poly1.length];

        for (let j = 0; j < poly2.length; j++) {
            const startB = poly2[j];
            const endB = poly2[(j + 1) % poly2.length];

            const touch = getIntersection(startA, endA, startB, endB);
            if (touch) {
                return true; 
            }
        }
    }
    return false; 
}

function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}
    