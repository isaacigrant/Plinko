class Chip {
    constructor(startX, startY, startR) {
        var options = {
            restitution: 1,
            friction: 0,
        }

        this.body = Bodies.circle(startX, startY, startR, options);
        this.position = this.body.position;
        this.radius = startR;
        
        Composite.add(world, this.body);
    }

    Show() {
        fill(255);
        stroke(255);
        push(); //Limits changes to specific object(s), instead of everything by default
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.radius * 2);
        pop(); //Goes back to allowing general changes to objects
    }
}