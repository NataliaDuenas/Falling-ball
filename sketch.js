let balon;
let puntaje = 0;
let dx = 0;
let dy = 0.8;
let y = 0;
let Pista = [];
let cond = true;
let v_pista = 0;
class Bola {
  constructor(rgba) {
    (this.x = size / 2),
      (this.y = 0),
      (this.rgba = color(rgba)),
      (this.escala = 1),
      (this.outline = 0),
      (this.permitir = true);
  }

  desplazar(dx, cond) {
    if (cond) {
      this.x += dx;
    }
  }

  caer(dy) {
    if (this.permitir) {
      this.y += dy;
    }
  }
  dibujo() {
    this.escala = size / 10;
    fill(this.rgba);
    push();
    strokeWeight(this.outline);
    translate(this.x, this.y);
    circle(0, 0, this.escala);
    pop();
    //print(this.x);
  }
}

class Linea {
  constructor(x, y, rgba, pos, largo) {
    (this.x = x),
      (this.y = y),
      (this.rgba = color(rgba)),
      (this.escala = 1),
      (this.permitir = false),
      (this.outline = 0);
    (this.pos = pos), (this.largo = largo);
  }
  subir(y) {
    if (this.permitir == false) {
      this.y -= y;
    }
  }

  dibujo() {
    this.escala = size;

    push();
    strokeWeight(this.outline);
    fill(this.rgba);
    rect(this.x, this.y, this.escala, this.escala / 20);
    fill("black");
    rect(this.pos, this.y, this.escala * this.largo, this.escala / 20);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (windowWidth < windowHeight) {
    size = windowWidth;
  } else {
    size = windowHeight;
  }
  balon = new Bola("blue");

  for (let k = 0; k < 4; k++) {
    pos = random(0, size * (1 - 1 / 4));
    largo = random(0.1, 0.5);
    Camino = new Linea(0, ((k + 1) / 4) * size, "white", pos, largo);
    Pista.push(Camino);
  }
}

function draw() {
  background(0);
  Fondo();
  Collission();
  Puntaje()
  Modo= Limites();
  if (Modo == 1){
   TextoGameOver()
  frameRate(0)
  }
  balon.dibujo();
}

function Fondo() {
  for (let a = 0; a < 4; a++) {
    v_pista = 0.5+ puntaje/10 ;
    Pista[a].dibujo();
    Pista[a].subir(v_pista);
    if (Pista[a].y < -Pista[a].escala / 20) {
      pos = random(0, size * (1 - 1 / 4));
      largo = random(0.1, 0.5);
      y = (-4 / 5 - 1 / 5) * size - Pista[a].escala / 20;
      Pista[a].subir(y);
      Pista[a].pos = pos;
      Pista[a].largo = largo;
      puntaje++;
    }
  }
}

function Limites() {
  Modo=0
  if (balon.y < -balon.escala / 2) {
    Modo=1
  }
  if (balon.y > size - balon.escala / 2) {
    dy = -v_pista - 0.8;
    balon.caer(dy);
  }
  if (balon.x > size - balon.escala / 2) {
    dx = 0;
    balon.desplazar(dx, cond);
  }
  if (balon.x < balon.escala / 2) {
    dx = 0;
    balon.desplazar(dx, cond);
  }
  return Modo
}

function Collission() {
  let a = [255, 255, 255, 255];
  dy = 0.8;
  v_relative = v_pista;

  for (let i = PI; i > -PI; i -= 0.1) {
    x = balon.x + (balon.escala * cos(i)) / 2;
    y = balon.y + (balon.escala * sin(i)) / 2;

    c = get(x, y);

    if (arraysIdentical(a, c)) {
      dy = -v_relative;
      continue;
    }
    c = get(x + dx, y);

    if (arraysIdentical(a, c)) {
      dx = 0;
      dy = -v_relative;
      continue;
    }
  }

  balon.desplazar(dx, cond);
  balon.caer(dy);
}

function TextoGameOver(){
  textSize(150)
  textStyle(BOLDITALIC)
  fill('MistyRose');
  text('Game Over', 0, size*1/8, width)
  textSize(151)
  textStyle(BOLDITALIC)
  fill('red');
  text('Game Over', 5, size*1/8, width)
}

function Puntaje(){
   fill('MistyRose');
  textSize(40)
  text('SCORE', size, size*1/8,30)
   text(puntaje, size+60,size*1/5,30)
}

function keyTyped() {
  if (key == "a") {
    dx = -size/100
  }
  if (key == "d") {
    dx = size/100;
  }
}

function keyReleased() {
  dx = 0;
}

function arraysIdentical(a, b) {
  //Autor:Tim Down,https://stackoverflow.com/questions/51276005/javascript-how-to-check-for-certain-items-in-an-array
  var i = a.length;
  if (i != b.length) return false;
  while (i--) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
