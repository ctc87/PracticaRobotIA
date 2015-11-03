/*  clase SistemaDeNavegacion contiene un mapa del entorno (Matriz),el número de filas el número de columas 
    y lo que contienen todas las direciones posibles:
    ->0 POsición vacia
    ->1 Obstaculo
    ->2 Un robot  --> por motivos del desarrollo creo que voy a eliminar el 2 del robot
    ->3 Un objeto de prioridad 0 
    ->4 Un objeto de prioridad 1
    ->5 Un objeto de prioridad 2
    ->6 Un objeto de prioridad 3
    ->7 Un objeto de prioridad 4
    ->8 Un objeto de prioridad 5
    ->9 Un objeto de prioridad 6
    ->10 Un objeto de prioridad 7
    ->11 Un objeto de prioridad 8
    ->12 Un objeto de prioridad 9
*/

function SistemaDeNavegacion(posSalida, colEntorno, filEntorno, mapaEntorno) {
  this.sn = 0;
  this.so = 0;
  this.ss = 0;
  this.se = 0;
  this.n = colEntorno;
  this.m = filEntorno;
  this.mapa = mapaEntorno;
  this.posActual = posSalida;
};

// Método que informa al sistema de navegación del robot que hay alrededor suyo
  
SistemaDeNavegacion.prototype.actualizarDatos = function() {
  if(this.posActual.n == 0) {
    this.sn = 1;
  } else {
    this.sn = this.mapa[parseInt(this.posActual.n - 1)][this.posActual.m];
  }
  
  if(this.posActual.m == 0) {
    this.so = 1;
  } else {
    this.so = this.mapa[this.posActual.n][parseInt(this.posActual.m - 1)];
  }
  
  if(this.posActual.m == parseInt(this.m - 1)) {
    this.se = 1;
  } else {
    this.se = this.mapa[this.posActual.n][parseInt(this.posActual.m + 1)];
  }
  
  if(this.posActual.n == parseInt(this.n - 1)) {
    this.ss = 1;
  } else {
    this.ss = this.mapa[parseInt(this.posActual.n + 1)][this.posActual.m];
  }

};

// Método que cambia el atributo posición actual por otro valor dado( el atributo de posActual es un objeto con dos cordenadas i y j)
SistemaDeNavegacion.prototype.cambiarPosActual = function(posActual) {
  this.posActual = posActual;
}

