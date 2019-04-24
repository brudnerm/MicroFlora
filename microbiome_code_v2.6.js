// Create microbiome array
var arrayStrings;
var microbiome = [];
let img;


// Create a physics instance which uses the Verlet integration method
var physics = new Physics();
physics.integrator = new Verlet();

function preload() {
    arrayStrings = loadStrings("microbiome_data_v1.1.csv");
    fontBold = loadFont('assets/UniversLTStd-Bold.otf');
    fontBook = loadFont('assets/UniversLTStd.otf');
    img = loadImage('assets/microbiome.png');
}

function setup() {
    createCanvas(1368, 1800);


    //fill microbiome array
    for (let i = 1; i < arrayStrings.length; i++) {
        var line = arrayStrings[i];
        var arr = line.split(",");
        var SGBid = int(arr[0]);
        var numberGenomes = int(arr[1]);
        var uSGB = str(arr[2]);
        var taxPhylum = str(arr[3]);
        var taxClass = str(arr[4]);
        var taxOrder = str(arr[5]);
        var taxFamily = str(arr[5]);
        var taxGenus = str(arr[6]);
        var taxSpecies = str(arr[7]);
        var percentage = str(arr[8]);

        // push bacteria genomes to microbiome array
        if (numberGenomes > 50) {
            var bacteria = new Bacteria(
                SGBid,
                numberGenomes,
                uSGB,
                taxPhylum,
                taxClass,
                taxOrder,
                taxFamily,
                taxGenus,
                taxSpecies);
            microbiome.push(bacteria);
        }
    }
}

function draw() {


    physics.step();
    background("black");

    image(img, 0, 0, 1368, 768);


    var mX = mouseX - (width / 2);
    var mY = height / 2 - mouseY;

    collisions();

    for (var i = 0; i < microbiome.length - 1; i++) {
        var p = microbiome[i];
        p.draw();
    }

    for (var i = 0; i < microbiome.length - 1; i++) {
        var p = microbiome[i];
        p.draw2();
    }

}



// Create collisions
function collisions() {

    for (var i = 0; i < microbiome.length - 1; i++) {
        for (var j = i + 1; j < microbiome.length; j++) {
            // define vector of particle a
            var pa = microbiome[i];
            // define vector of particle b
            var pb = microbiome[j];
            //determine vector of b-a
            var ab = p5.Vector.sub(pb.pos, pa.pos);
            //square the vector of b-a
            var distSq = ab.magSq();
            //sets if conditions to determine if particles overlap
            if (distSq <= sq(pa.circleRadius + pb.circleRadius)) {
                // calculate distance between a and b
                var dist = sqrt(distSq);
                // calculate overlap: 
                // (vector of a + vector of b) - distance between 
                var overlap = (pa.circleRadius + pb.circleRadius) - dist;
                // divides the vector ab by the distance
                ab.div(dist);
                // multiplies the overlap to normalize
                ab.mult(overlap * .5);
                // adds the vector ab to vector pb to move particle b's vector
                pb.pos.add(ab);
                // determines inverse of vector ab
                ab.mult(-1);
                // adds the inverse vector ab to particle a's vector
                pa.pos.add(ab);
                //            } else {
                //               
            }
        }
    }
}


//set up Bacteria class
class Bacteria {

    //define Bacteria class properties
    constructor(SGBid,
        numberGenomes,
        uSGB,
        taxPhylum,
        taxClass,
        taxOrder,
        taxFamily,
        taxGenus,
        taxSpecies,
        percentage,
        R, G, B) {
        this.SGBid = SGBid;
        this.numberGenomes = numberGenomes;
        var circleRadius = sqrt(numberGenomes);
        var circleDiameter = circleRadius * 2;
        this.uSGB = uSGB;
        this.taxPhylum = taxPhylum;
        this.taxClass = taxClass;
        this.taxOrder = taxOrder;
        this.taxFamily = taxFamily;
        this.taxGenus = taxGenus;
        this.taxSpecies = taxSpecies;
        this.percentage = percentage;
        this.pos = createVector(0, 1);
        this.pos.rotate(random(0, TWO_PI), random(0, TWO_PI));
        this.pos.mult(1 / sq((circleRadius)));
        this.red = R;
        this.green = G;
        this.blue = B;

        // CHANGE CIRCLE DIAMETER
        this.circleDiameter = circleDiameter;
        this.circleRadius = circleRadius;

        var particle1 = new Particle(1);
        this.particle1 = particle1;

        // Programmed Variables
        this.widthCenter = 700;
        this.heightCenter = 1150;
        this.borderTop = -400;
        this.borderBottom = 350;
        this.borderRight = -300;
        this.borderLeft = 200;

    }

    draw() {

        var yoff = 0;
        var mX = mouseX - this.widthCenter;
        var mY = this.heightCenter - mouseY;
        push();
        translate(width / 2, height / 2);
        stroke(65);

        //Color bacteria
        if (this.taxPhylum == "Firmicutes") {
            this.R = 250;
            this.G = 125;
            this.B = 75;
            if (this.taxClass == "Clostridia") {
                this.R = 186;
                this.G = 50;
                this.B = 36;
                if (this.taxGenus == "Ruminococcaceae") {
                    this.R = 50;
                    this.G = 75;
                    this.B = 250;
                }
                if (this.taxGenus == "Lachnospiraceae") {
                    this.R = 46;
                    this.G = 255;
                    this.B = 247;
                }
                if (this.taxGenus == "Eubacteriaceae") {
                    this.R = 100;
                    this.G = 100;
                    this.B = 150;
                } else if (this.uSGB == "Yes") {
                    this.R = 250;
                    this.G = 250;
                    this.B = 250;
                    fill(this.R, this.G, this.B);
                }
            }
            fill(this.R, this.G, this.B);
        } else if (this.taxPhylum == "Proteobacteria") {
            this.R = 125;
            this.G = 0;
            this.B = 0;
        } else if (this.uSGB == "Yes") {
            this.R = 250;
            this.G = 250;
            this.B = 250;
            fill(this.R, this.G, this.B);
        } else if (this.taxPhylum == "Actinobacteria") {
            this.R = 125;
            this.G = 175;
            this.B = 75;
        } else if (this.uSGB == "Yes") {
            this.R = 250;
            this.G = 250;
            this.B = 250;
            fill(this.R, this.G, this.B);
        } else if (this.taxPhylum == "Bacteroidetes") {
            this.R = 107;
            this.G = 179;
            this.B = 145;
            if (this.taxGenus == "Rikenellaceae") {
                this.R = 50;
                this.G = 50;
                this.B = 175;
            }
            fill(this.R, this.G, this.B);
        } else if (this.uSGB == "Yes") {
            this.R = 250;
            this.G = 250;
            this.B = 250;
            fill(this.R, this.G, this.B);

        } else {
            this.R = 121;
            this.G = 100;
            this.B = 75;
            fill(this.R, this.G, this.B);
        }

        // Create particles
        var particle1 = this.particle1;
        particle1.setRadius(this.circleRadius);
        particle1.moveTo(new Vector(this.pos.x, this.pos.y));
        var particleDiameter = particle1.radius * 2;

        pop();

        //  Mouse-over Grab and Move Blob
        if (mouseIsPressed && dist(this.pos.x, this.pos.y, mX, -mY) <= this.circleDiameter / 2) {
            this.circleDiameter = 500;
            this.pos.x = mX;
            this.pos.y = -mY;
        } else {
            this.circleDiameter = this.circleRadius * 2;
        }

        //  Set Borders
        while (this.pos.x < this.borderRight) {
            this.pos.x++;
        }
        while (this.pos.x > this.borderLeft) {
            this.pos.x--;
        }
        while (this.pos.y < this.borderTop) {
            this.pos.y++;
        }
        while (this.pos.y > this.borderBottom) {
            this.pos.y--;
        }

        //  Mouse-over Highlight Blob 
        push();
        translate(this.pos.x + this.widthCenter, this.pos.y + this.heightCenter);

        if (dist(mX, -mY, this.pos.x, this.pos.y) <= this.circleRadius) {
            stroke(250);
            strokeWeight(3);
        } else {
            stroke(25);
            strokeWeight(.4);
        }

        // Draw Blob
        fill(this.R, this.G, this.B);
        var wiggle = frameCount / 5
        var pseudopods = 4;
        beginShape();
        var xoff = 0;
        for (var a = 0.1; a < TWO_PI; a += .1) {
            var offset = map(noise(xoff + yoff + wiggle), 0, 1, -1 * pseudopods, pseudopods);
            var blobRadius = this.circleRadius + offset;
            var x = blobRadius * cos(a);
            var y = blobRadius * sin(a);
            curveVertex(x, y);
            xoff += this.SGBid / 10;
        }
        endShape();
        pop();
        yoff += 0.01;

        var bump = offset / 3;

        this.pos.add(bump, bump);
    }

    draw2() {
        //sets mouse coordinates variable
        var mX = mouseX - this.widthCenter;
        var mY = this.heightCenter - mouseY;

        //Hover over circle stroke
        if (dist(mX, -mY, this.pos.x, this.pos.y) <= this.circleRadius) {

            //Label
            push();
            translate(this.widthCenter, this.heightCenter)
            var mX = this.pos.x;
            var mY = -1 * this.pos.y + this.circleRadius;
            var labelX = -600;
//            var labely = this.pos.y;
//            var labelY = this.pos.y + 25;
            stroke(240, 240, 240);
            strokeWeight(3);

            var labelY = map(this.pos.y,
                            this.borderTop, 
                            this.borderBottom,
                            -450, 100);
            beginShape(LINES);
            vertex(this.pos.x, this.pos.y);
            vertex(labelX + 200, labelY - 25);
            vertex(labelX + 200, labelY - 25);
            vertex(labelX - 60, labelY - 25);
            endShape();
            pop();

            //Label text
            push();
            translate(this.widthCenter, this.heightCenter)
            fill(275);
            push();
            textFont(fontBold);
            textSize(16);
            textAlign(RIGHT);
            text("Phylum", labelX + 5, labelY + 5);
            text("Class", labelX + 5, labelY + 30);
            text("Order", labelX + 5, labelY + 55);
            text("Family", labelX + 5, labelY + 80);
            text("Genus", labelX + 5, labelY + 105);
            text("Species", labelX + 5, labelY + 130);
            pop();

            push();
            textFont(fontBold);
            textSize(22);
            fill(this.R, this.G, this.B);
            text("Identified " + this.numberGenomes + " times", labelX - 60, labelY - 45)
            pop();

            push();
            textFont(fontBook);
            textSize(14);
            push()
            text(this.taxPhylum, labelX + 15, labelY + 5);
            text(this.taxClass, labelX + 15, labelY + 30);
            text(this.taxOrder, labelX + 15, labelY + 55);
            text(this.taxFamily, labelX + 15, labelY + 80);
            text(this.taxGenus, labelX + 15, labelY + 105);
            text(this.taxSpecies, labelX + 15, labelY + 130);
            pop();
            pop();

            // Draw Blob
            push();
            translate(this.pos.x, this.pos.y)
            fill(this.R, this.G, this.B);
            stroke(240);
            strokeWeight(3);
            var yoff = 0.01;
            var wiggle = frameCount * 0.25
            var pseudopods = 4;
            beginShape();
            var xoff = 0;
            for (var a = 0.1; a < TWO_PI; a += .1) {
                var offset = map(noise(xoff + yoff + wiggle), 0, 1, -1 * pseudopods, pseudopods);
                var blobRadius = this.circleRadius + offset;
                var x = blobRadius * cos(a);
                var y = blobRadius * sin(a);
                curveVertex(x, y);
                xoff += this.SGBid / 10;
            }
            endShape(CLOSE);
            pop();
            yoff += 0.01;
            pop();
        }
    }
}
