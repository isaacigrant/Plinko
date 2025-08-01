class Ball {
    constructor(startX, startY, startR) {
        this.body = Bodies.circle(startX, startY, startRadius);
        this.position = this.body.position;
        this.radius = startR;

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