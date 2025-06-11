class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 5; 
        this.rayLength = 150; 
        this.raySpread = Math.PI / 2; 

        this.rays = [];
        this.readings = [];
    }

    update(roadBorders, traffic){
        this.#castRays();
        this.readings = [];
        for(let i = 0; i < this.rays.length; i++){
            this.readings.push(
                this.#getReading(
                    this.rays[i], 
                    roadBorders,
                    traffic
                    )
                );
        }
    }

    #getReading(ray, roadBorders, traffic){
        let touches = [];
        for(let i = 0; i < roadBorders.length; i++){
            const touch = getIntersection(
                ray.start,
                ray.end,
                roadBorders[i][0],  
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        for(let i = 0; i < traffic.length; i++){
            const poly = traffic[i].polygon;
            for(let j = 0; j < poly.length; j++){
                const nextIndex = (j + 1) % poly.length;
                const touch = getIntersection(
                    ray.start,
                    ray.end,
                    poly[j],
                    poly[nextIndex]
                );
                if(touch){
                    touches.push(touch);
                }
            }
        }

        if(touches.length == 0){
            return null; //no intersection found
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }
        

    #castRays(){
        this.rays=[];
        for(let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount==1?0.5:i / (this.rayCount - 1)
            ) + this.car.angle;
               
            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: start.x - Math.sin(rayAngle) * this.rayLength,
                y: start.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push({start, end});
        }
    }

    draw(ctx){
        for(let i = 0; i < this.rayCount; i++){
            let end = this.rays[i].end;
            if(this.readings[i]){
                end = this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";

            ctx.moveTo(this.rays[i].start.x, this.rays[i].start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";

            ctx.moveTo(this.rays[i].end.x, this.rays[i].end.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}