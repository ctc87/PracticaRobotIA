
// Esta es la clase del robot que transporta los paquetes y los clasifica por prioridad
function RobotEmbalizador(posSalidaEntorno) {
  this.posActualrobot  = new PosConDireccion(posSalidaEntorno.n, posSalidaEntorno.m)
  this.suLugar =  new PosConDireccion(posSalidaEntorno.n, posSalidaEntorno.m);
  Robot.call(this, this.posActualrobot);
};

// Creamos el objeto RobotEmbalizador.prototype que hereda desde Robot.prototype
// Nota: Un error común es utilizar "new Robot()" para crear RobotEmbalizador.prototype 
// Esto es incorrecto por varias razones, y no menos importante, nosotros no le estamos pasando nada
// a Robot desde el argumento "PosSalida". El lugar correcto para llamar a Robot
// es arriba, donde nosotros llamamos a RobotEmbalizador.

RobotEmbalizador.prototype = Object.create(Robot.prototype);
// Establecer la propiedad "constructor" para referencias  a RobotEmbalizador
RobotEmbalizador.prototype.constructor = RobotEmbalizador;

// función para recoger todos los paquetes 
RobotEmbalizador.prototype.buscarPosCaja = function(it) {
    
  var posicionDestino = new PosConDireccion(0, Math.abs(this.Navegador.mapa[0].length/2 + 4));
  while(this.Navegador.mapa[posicionDestino.n][posicionDestino.m] == 1 || this.Navegador.mapa[posicionDestino.n][posicionDestino.m] == 0) { 
    posicionDestino.n++;
  }
  return posicionDestino;
}

// metodo para recoger una caja
RobotEmbalizador.prototype.recogerUnaCaja = function(caja) {
    var posicionDestino = this.buscarPosCaja();
    this.trayectoria = this.hillClimbing(posicionDestino);
    var direccion = "";
    var j = 1;
    while(j < this.trayectoria.length) {
      direccion = this.trayectoria[j].direccion;
      this.caminar(direccion);
      j++
    }
    this.Navegador.mapa[this.PosActual.n][this.PosActual.m] = -0;
}
// Función para ordenar los paquetes por orden de prioridad con Shake short
RobotEmbalizador.prototype.embalizar = function() {
  this.trayectoria = this.hillClimbing(this.suLugar);
    var direccion = "";
    var j = 1;
    while(j < this.trayectoria.length) {
      direccion = this.trayectoria[j].direccion;
      this.caminar(direccion);
      j++;
    }
}

