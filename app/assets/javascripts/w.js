var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

'floor|ceil|random|round|abs|sqrt|PI|atan2|sin|cos|pow|max|min|hypot'
  .split('|')
  .forEach(function(p) { window[p] = Math[p]; });

var TAU = PI*2;

function r(n) { return random()*n; }
function rrng(lo, hi) { return lo + r(hi-lo); }
function rint(lo, hi) { return lo + floor(r(hi - lo + 1)); }
function choose(args) { return args[rint(0, args.length-1)]; }

/*---------------------------------------------------------------------------*/

var W, H, frame, t0, time, DPR;

function dpr(n) { return n * DPR}

function resize() {
  var w = innerWidth;
  var h = innerHeight;
  DPR = devicePixelRatio || 1;
  
  canvas.style.width = w+'px';
  canvas.style.height = h+'px';
  
  W = canvas.width = w * DPR;
  H = canvas.height = h * DPR;
}

function loop(t) {
//  console.log(1000/(t-t0)); t0 = t;
  frame = requestAnimationFrame(loop);
  draw();
  time++;
}

function pause() {
  cancelAnimationFrame(frame);
  frame = frame ? null : requestAnimationFrame(loop);
}

function reset() {
  cancelAnimationFrame(frame);
  resize();
  ctx.clearRect(0, 0, W, H);
  init();
  time = 0;
  frame = requestAnimationFrame(loop);
}

/*---------------------------------------------------------------------------*/

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.add = function(a, b) { return new Vector(a.x + b.x, a.y + b.y); };
Vector.sub = function(a, b) { return new Vector(a.x - b.x, a.y - b.y); };
Vector.mul = function(a, n) { return new Vector(a.x * n, a.y * n); };
Vector.div = function(a, n) { return new Vector(a.x / n, a.y / n); };

Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
};

Vector.prototype.add = function(other) {
  this.x += other.x;
  this.y += other.y;
  return this;
};

Vector.prototype.sub = function(other) {
  this.x -= other.x;
  this.y -= other.y;
  return this;
};

Vector.prototype.mul = function(n) {
  this.x *= n;
  this.y *= n;
  return this;
};

Vector.prototype.div = function(n) {
  this.x /= n;
  this.y /= n;
  return this;
}

Vector.prototype.mag = function() {
  var x = this.x, y = this.y;
  return sqrt(x*x + y*y);
};

Vector.prototype.normalize = function() {
  return this.div(this.mag());
};

Vector.prototype.constrain = function(n) {
  var m = this.mag();
  return m > n ? this.mul(n/m) : this;
};

Vector.prototype.zero = function() {
  this.x = 0;
  this.y = 0;
};

function vec(x, y) {
  return new Vector(x, y);
}

/*---------------------------------------------------------------------------*/

function Circle(loc, vel, radius) {
  this.loc = loc;
  this.vel = vel;
  this.r = radius;
}

Circle.prototype.init = function() {
  this.loc = vec(W/2, H/2);
  this.vel = vec(2*rrng(dpr(-1), dpr(1)),
                 2*rrng(dpr(-1), dpr(1)));
  this.r = rrng(dpr(50), dpr(100));
};

Circle.prototype.move = function(draw) {
  this.loc.add(this.vel);
  
  if (draw) {
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.r, 0, TAU);
    ctx.strokeStyle = 'grey';
    ctx.stroke();
  }
  return this;
};

Circle.prototype.bounce = function() {
  var x = this.loc.x;
  var y = this.loc.y;
  var r = this.r;
  
  if (x < r) {
    this.loc.x = r; this.vel.x *= -1
  } else if (x > W - r) {
    this.loc.x = W-r; this.vel.x *= -1
  }
  
  if (y < r) {
    this.loc.y = r; this.vel.y *= -1;
  } else if (y > H - r) {
    this.loc.y = H-r; this.vel.y *= -1;
  }
  
  return this;
};

function color(v) {
  var h = floor(360 * ((v.x / W) + (v.y / H))/2);
  var s = '50%';
  var l = '33%';
  return 'hsla('+h+','+s+','+l+',0.2)';
}


function pushIntersections(ixs, a, b) {
  var dx = a.loc.x - b.loc.x;
  var dy = a.loc.y - b.loc.y;
  var d = sqrt(dx*dx + dy*dy);

  if (d >= a.r + b.r) return;
  if (d < abs(a.r - b.r)) return;

  var c = (a.r*a.r - b.r*b.r + d*d) / (2 * d);

  var x = a.loc.x - (dx*c/d);
  var y = a.loc.y - (dy*c/d);

  var h = sqrt(a.r*a.r - c*c);

  var rx = -dy*h/d;
  var ry = dx*h/d;

  ixs.push({x: x+rx, y: y+ry, d: d},
           {x: x-rx, y: y-ry, d: d});
}

function isOffScreen(circle) {
  var x = circle.loc.x;
  var y = circle.loc.y;
  var r = circle.r;
  return (x + r < 0 || x - r > W) && (y + r < 0 || y - r > H);
}


/*---------------------------------------------------------------------------*/

var C;
var Circles;
var Scale;
var Reset, R;

function init() {
  C = 30;
  Circles = [];
  
  for (var i = 0; i < C; i++) {
    var circle = new Circle();
    circle.init();
    Circles.push(circle);
  }
  
  Scale = chroma.scale('YlOrRd').mode('lab');
  Reset = min(W, H) / 2 / dpr(2);
  R = 0;
  
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i < C; i++) {
    var c = Circles[i];
    c.move();
  }
  
  var ixs = [];
  for (var i = 0; i < C; i++) {
    var a = Circles[i];
    for (var j = i+1; j < C; j++) {
      var b = Circles[j];
      pushIntersections(ixs, a, b);
    }
  }
 
  for (var i = 0; i < ixs.length; i++) {
    var ix = ixs[i];
    var n = ix.d/dpr(200);
    ctx.beginPath();
    ctx.arc(ix.x, ix.y, dpr(20*n), 0, TAU);
    ctx.fillStyle = Scale(n).css();
    ctx.fill();
  }
  
  if (++R >= Reset) {
    R = 0;
    Circles.forEach(function(circle) {
      circle.init();
    });
  }
}

/*---------------------------------------------------------------------------*/

document.onclick = pause;
document.ondblclick = reset;

reset();

