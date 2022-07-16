
class Vec2d {
    constructor(arr) {
        this.x = arr.x; this.y = arr.y;
        this.mag2 = this.x*this.x + this.y*this.y;
        this.mag = Math.sqrt(this.mag2);
    }

    add(other) {
        return new Vec2d({x: this.x + other.x, y: this.y + other.y});
    }

    minus(other) {
        let r = new Vec2d({x: this.x - other.x, y: this.y - other.y});
        return r;
    }

    unit() {
        return new Vec2d({x: this.x / this.mag, y: this.y / this.mag});
    }

    tuple() {
        return [this.x, this.y];
    }

    to_obj() {
        return {x: this.x, y: this.y};
    }
}

class Ball {
    constructor(arr) {
        this.body = arr.body;
        this.velocity = arr.velocity;
        this.init_vel = this.velocity;
        this.mass = arr.mass;
        this.radius = arr.radius;
        this.pathx = [];
        this.pathy = [];
    }

    setVelocity(vel) {
        this.velocity = new Vec2d(vel);
        Matter.Body.setVelocity(this.body, vel);
    }
}

function generateRandom(maxLimit = 100){
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand); // 99
  return rand;
}


const baseSpeed = 2;
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

var drawTrail = false;
var cv = document.getElementById("canvas");
var collballs = false;

function setDrawTrail() {
    drawTrail = !drawTrail;

}

function setCollideBalls() {
    collballs = !collballs;
}


var ctx = cv.getContext('2d');

function plotTrail(b) {
    if (b.pathx.length > 0) {
        let minx = Math.min(...b.pathx); let miny = Math.min(...b.pathy);
        let maxx = Math.max(...b.pathx); let maxy = Math.max(...b.pathy);
        let width = maxx - minx + 1;
        let height = maxy - miny + 1;
        // var imgdata = ctx.getImageData(minx,miny, width, height);
        // var imgdatalen = imgdata.data.length;
        for (var i=0; i<b.pathx.length; i++) {
            ctx.fillStyle = 'rgba(255,255,255,255)';
            ctx.fillRect(b.pathx[i], b.pathy[i], 2,2);
            // let ind = width * b.pathy[i] + b.pathx[i];
            // imgdata.data[4*ind] = 255;
            // imgdata.data[4*ind+1] = 255;
            // imgdata.data[4*ind+2] = 255;
            // imgdata.data[4*ind+3] = 255;
        }
        // for(var i=0;i<imgdatalen/4;i++) {  //iterate over every pixel in the canvas
        //     imgdata.data[4*i] = 255;    // RED (0-255)
        //     imgdata.data[4*i+1] = 0;    // GREEN (0-255)
        //     imgdata.data[4*i+2] = 0;    // BLUE (0-255)
        //     imgdata.data[4*i+3] = 255;  // APLHA (0-255)
        // }
        // ctx.putImageData(imgdata,minx,miny);
    }
}


// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    canvas: cv,
    options: {
        width: 1200,
        height: 720,
        wireframes: false
    }
});

var v1 = new Vec2d({x:1,y:2});
var v2 = new Vec2d({x:3,y:4});

engine.gravity = {x: 0, y: 0};

const BALL_RAD = 5;

// create two boxes and a ground
var c1 = Bodies.circle(400, 400, BALL_RAD, {restitution: 0.5, frictionAir: 0, friction: 0.0,
                                    render: {fillStyle: 'white'}
                                    });
c1.collisionFilter = {group: -2, category: 2, mask: 1};

var balls = [new Ball({body: c1, velocity: new Vec2d(c1.velocity), mass: 80, radius: BALL_RAD}), 
            ];

var topWall = Bodies.rectangle(600, 0, 1200, 20, {label:"wallH", isStatic: true });
topWall.collisionFilter = {group: 0, category: 1, mask:2};
var leftWall = Bodies.rectangle(10, 500, 20, 1000, {label:"wallV", isStatic: true });
leftWall.collisionFilter = {group: 0, category: 1, mask: 2};
var rightWall = Bodies.rectangle(1200, 500, 20, 1000, {label:"wallV", isStatic: true });
rightWall.collisionFilter = {group: 0, category: 1, mask:2};
var bottomWall = Bodies.rectangle(600, 720, 1200, 20, {label:"wallH", isStatic: true });
bottomWall.collisionFilter = {group: 0, category: 1, mask:2};
// add all of the bodies to the world
Composite.add(engine.world, [c1, leftWall, rightWall, topWall, bottomWall]);
Matter.Body.setVelocity(c1, {x: 0, y: 0})
Matter.Body.setInertia(c1, Infinity);

let xcoords = [230, 350, 450];
let ycoords = [300, 390, 380];

let xvels = [0, 0, 0];
let yvels = [0.5, 1.1, 1];


function addBodyAtPosWithVel(xcoord, ycoord, xvel, yvel) {
    var c2 = Bodies.circle(xcoord, ycoord, BALL_RAD, {restitution: 0.5, frictionAir: 0, friction: 0.0
                                            });
    c2.collisionFilter = {group: -2, category: 2, mask: 1};
    let c2B = new Ball({body: c2, velocity: new Vec2d(c2.velocity), mass: 1, radius: BALL_RAD});
    c2B.setVelocity({x:xvel, y:yvel});

    Matter.Body.setInertia(c2, Infinity);
    balls.push(c2B);
    Composite.add(engine.world, c2);
}

function addBodyAtPos(xcoord, ycoord) {
    let xvel; let yvel;

    xvel = Math.random() * 4 - 2;
    yvel = Math.random() * 4 - 2;
    addBodyAtPosWithVel(xcoord, ycoord,xvel,yvel);
}

function addRandomBody() {
    let xcoord; let ycoord;
    let _x = generateRandom(201) + 50;
    let _y = generateRandom(201) + 50;
    let xside = generateRandom(2);
    let yside = generateRandom(2);
    if (xside === 0)
        xcoord = c1.position.x - _x;
    else xcoord = c1.position.x + _x;

    if (yside === 0)
        ycoord = c1.position.y - _y;
    else ycoord = c1.position.y + _y;
    //xcoord = xcoords[i]; ycoord = ycoords[i];

    //xvel = xvels[i]; yvel = yvels[i]
    addBodyAtPos(xcoord, ycoord);

    
}



for(var i = 0; i < 3; i++) {
    addRandomBody();
}



//https://compiled.ctl.columbia.edu/articles/how-to-simulate-gas-particles-with-matterjs/
const adjustE = function(p) {

    if (p.body.speed !== 0) {

        let speedMultiplier = baseSpeed / p.body.speed;

        Matter.Body.setVelocity(
            p.body, {
                x: p.body.velocity.x * speedMultiplier,
                y: p.body.velocity.y * speedMultiplier
            }
        );
    }
};



function accel(bi, bj, i, j) {
    const G = 10;
    let pos1 = new Vec2d(bi.body.position);
    let pos2 = new Vec2d(bj.body.position);
    let dt = 1;

    let r = pos2.minus(pos1);
    let r_un = r.unit();
    let du_mag = (G * bj.mass/r.mag2) * dt; //du = Gm_2/r^2 dt
    if (du_mag >= (G * bj.mass/((bi.radius + bj.radius)**2) * dt))
        du_mag = (G * bj.mass/((bi.radius + bj.radius)**2) * dt);
    let du = new Vec2d({x: du_mag * r_un.x, y: du_mag * r_un.y});

    // let dr = new Vec2d({x: -bi.velocity.x * 1, y: -bi.velocity.y * 1}); //dr = -u dt
    // let new_pos = r.add(dr);
    let max_u_mag = Math.sqrt(2 * G * bj.mass/(bi.radius + bj.radius)  + 2);
    bi.velocity = bi.velocity.add(du);
    if (bi.velocity.mag > max_u_mag) { //assuming C = 2
        let biv_unit = bi.velocity.unit();
        bi.velocity = new Vec2d({x: max_u_mag * biv_unit.x, y: max_u_mag * biv_unit.y});
    }
    //console.log(G * bi.mass * bj.mass / r.mag, 'potential of each');

}

function setBallVel(body, vel) {
    for (var i = balls.length - 1; i >= 0; i--) {
        if (body == balls[i].body) {
            balls[i].velocity = new Vec2d(vel);
            break;
        }

    }
}

function findBallforBody(body) {
    for (var i = balls.length - 1; i >= 0; i--) {
        if (body == balls[i].body) {
            return balls[i]
        }

    }
}

function saveBallPos(b) {
    b.pathx.push(b.body.position.x);
    b.pathy.push(b.body.position.y);
    if (b.pathx.length > 50) {
        b.pathx.shift();
        b.pathy.shift();
    }
}

function clearBalls() {
    let c1 = balls[0];
    balls = []
    balls.push(c1);
    Composite.clear(engine.world);
    Engine.clear(engine);
    Matter.Body.setInertia(c1.body, Infinity);
    Composite.add(engine.world, [c1.body, leftWall, rightWall, topWall, bottomWall]);
}


Matter.Events.on(engine, "collisionStart", e => {
    e.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair
        if (bodyA.label === "wallH") {
            let vel = { x: bodyB.velocity.x, y: -bodyB.velocity.y };
            Matter.Body.setVelocity(bodyB, vel); //Horizontal wall collision
            setBallVel(bodyB, vel);
        }
        else if (bodyB.label === "wallH") {
            let vel = { x: bodyA.velocity.x, y: -bodyA.velocity.y };
            Matter.Body.setVelocity(bodyA, vel); //Horizontal wall collision
            setBallVel(bodyA, vel);
        }
        else if (bodyA.label === "wallV") {
            let vel = { x: -bodyB.velocity.x, y: bodyB.velocity.y };
            Matter.Body.setVelocity(bodyB, vel); //Vertical wall collision
            setBallVel(bodyB, vel);
        }
        else if (bodyB.label === "wallV") {
            let vel = { x: -bodyA.velocity.x, y: bodyA.velocity.y };
            Matter.Body.setVelocity(bodyA, vel); //Vertical wall collision
            setBallVel(bodyA, vel);
        }
        else { //Two balls collision
            const vAXBefore = bodyA.velocity.x;
            const vBXBefore = bodyB.velocity.x;
            const vAYBefore = bodyA.velocity.y;
            const vBYBefore = bodyB.velocity.y;
            const mA = findBallforBody(bodyA).mass
            const mB = findBallforBody(bodyB).mass
            const { vAFinal: vAXFinal, vBFinal: vBXFinal } = calcElasticCollision(mA, mB, vAXBefore, vBXBefore);
            const { vAFinal: vAYFinal, vBFinal: vBYFinal } = calcElasticCollision(mA, mB, vAYBefore, vBYBefore);
            if (bodyA.label !== "wall") {
                let vel = { x: vAXFinal, y: vAYFinal };
                Matter.Body.setVelocity(bodyA, vel);
                setBallVel(bodyA, vel);
            }
            if (bodyB.label !== "wall") {
                let vel = { x: vBXFinal, y: vBYFinal };
                Matter.Body.setVelocity(bodyB, vel);
                setBallVel(bodyB, vel);
            }
        }
    })
});

const calcElasticCollision = (mA, mB, vAInitial, vBInitial) => ({
    vAFinal: (((mA - mB) / (mA + mB)) * vAInitial) + (((2 * mB) / (mA + mB)) * vBInitial),
    vBFinal: (((2 * mA) / (mA + mB)) * vAInitial) + (((mB - mA) / (mA + mB)) * vBInitial)
});


// Run adjustE on each particle every 100 milliseconds.
let counter = 0;
Matter.Events.on(engine, 'beforeUpdate', function(e) {
    if (balls.length > 450) Composite.remove(balls.pop().body);
    if (collballs) {
        for (var i = balls.length - 1; i >= 0; i--) {
            balls[i].body.collisionFilter.group = 2
        }
    } else {
        for (var i = balls.length - 1; i >= 0; i--) {
            balls[i].body.collisionFilter.group = -2
        }
    }
    if (e.timestamp >= counter + 100) {
        //balls.forEach( function (b) {adjustE(b)});
        for (var i = balls.length - 1; i >= 0; i--) {
            for (var j = balls.length - 1; j >= 0; j--) {
                if (balls[i].body != balls[j].body) {
                    accel(balls[i], balls[j], i, j);
                }
            }
            
            Matter.Body.setVelocity(balls[i].body, balls[i].velocity.to_obj());
            saveBallPos(balls[i]);
        }
        counter = e.timestamp;

    }
});

Matter.Events.on(render, 'afterRender', function(e) {
    if (drawTrail) {
        for (var i = balls.length - 1; i >= 0; i--) {
            plotTrail(balls[i]);
        }
    }
});

cv.addEventListener('mousedown',
    function (e) {
        setTimeout(function() {
            addBodyAtPos(e.offsetX, e.offsetY);
        }, 200);
    }
)

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
