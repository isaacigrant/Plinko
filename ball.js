function Ball(x, y, r) {
    this.body = Bodies.circle(x, y, r);
    this.position = this.body.position;
    this.radius = r;

    Composite.add(world, this.body);
}

Ball.prototype.show = function() {
    fill(255);
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.radius * 2);
    pop();
}