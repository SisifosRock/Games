function Ship(){

    this.pos = createVector(width/2, height/2);
    this.start = false;
    this.energy = 100;
    this.max_energy = 800;
    this.level = 1;
    this.theme = createVector(0, 0, 0);
    this.size = 70;
    this.score = 0;

    this.evolution = function () {
        if (this.level == 1) {
            this.theme = createVector(255, 204, 0);
            this.size = 70;
            this.max_energy = 800;

        } else if (this.level == 2){
            this.theme = createVector(204, 0, 0);
            this.size = 80;
            this.max_energy = 900;

        } else if (this.level == 3){
            this.theme = createVector(153, 51, 153);
            this.size = 90;
            this.max_energy = 1000;

        } else if (this.level == 4){
            this.theme = createVector(51, 51, 255);
            this.size = 100;
            this.max_energy = 1000;

        }
    }

    this.move = function(){

        this.pos.x = mouseX;
        this.pos.y = mouseY;

    }

    this.display = function(){

        noFill();
        stroke(this.theme.x, this.theme.y, this.theme.z);
        triangle(this.pos.x + this.size, this.pos.y, this.pos.x - (this.size)/2, this.pos.y + (this.size)/2, this.pos.x - (this.size)/2, this.pos.y - (this.size)/2);

        stroke(this.theme.x, this.theme.y, this.theme.z);
        line(this.pos.x, this.pos.y, this.pos.x + this.size, this.pos.y);
        line(this.pos.x, this.pos.y, this.pos.x - (this.size)/2, this.pos.y + (this.size)/2);
        line(this.pos.x, this.pos.y, this.pos.x - (this.size)/2, this.pos.y - (this.size)/2);
    }

    this.shoot = function(){

        var x = this.pos.x + this.size + 1;
        var y = this.pos.y - this.size/20;
        fill(ship.theme.x, ship.theme.y, ship.theme.z);
        noStroke();
        rect(x, y, width - x, this.size/10);

        while (x < width){
            x++;
        } 
    }

}