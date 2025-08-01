class Ball {
    constructor(startX, startY, startRadius) {
        this.body = Bodies.circle(startX, startY, startRadius);
        this.position = this.body.position;
        this.radius = startRadius;

        Composite.add(world, this.body);
    }

    Show() {
        fill(255);
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.radius * 2);
        pop();
    }
}