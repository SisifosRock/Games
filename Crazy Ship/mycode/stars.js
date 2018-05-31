function Stars (){

    this.pos = createVector(width, floor(Math.random() * 600));
    this.length = floor(Math.random()*280 + 20);
    this.height = Math.random()*1 + 1;
    this.area = this.length*this.height
    this.velocity = this.area/12

    this.display = function () {
        noStroke();
        fill(255);
        rect(this.pos.x, this.pos.y, this.length, this.height, 20);
    }

}