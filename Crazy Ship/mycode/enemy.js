function Enemy(){

    this.pos = createVector(width, 0);
    this.size = 40;
    this.theme = createVector(210,20,20)
    this.vel = 8;
    this.display = function (){

        noFill();
        strokeWeight(3)
        stroke(this.theme.x, this.theme.y, this.theme.z);
        ellipse(this.pos.x, this.pos.y, this.size, this.size)

    }

    this.move = function(){
        this.pos.x -= this.vel;

    }

    //this.explode = function(){
        //let x = 

    //}

}