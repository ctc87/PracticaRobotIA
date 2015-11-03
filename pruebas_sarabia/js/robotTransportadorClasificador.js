
// Esta es la calse del robot que transporta los paquetes y los clasifica por prioridad
function RobotTransportadorClasificador(PosMitadEntorno, arrayDePaquetes) {
  aux = new PosConDireccion(PosMitadEntorno.n, PosMitadEntorno.m)
  Robot.call(this, aux);
  Robot.call(this, PosMitadEntorno);
  // this.caja;
  this.arrayDePaquetes = arrayDePaquetes;

};
// Creamos el objeto RobotTransportadorClasificador.prototype que hereda desde Robot.prototype
// Nota: Un error común es utilizar "new Robot()" para crear RobotTransportadorClasificador.prototype 
// Esto es incorrecto por varias razones, y no menos importante, nosotros no le estamos pasando nada
// a Robot desde el argumento "PosSalida". El lugar correcto para llamar a Robot
// es arriba, donde nosotros llamamos a RobotTransportadorClasificador.
RobotTransportadorClasificador.prototype = Object.create(Robot.prototype);
// Establecer la propiedad "constructor" para referencias  a RobotTransportadorClasificador
RobotTransportadorClasificador.prototype.constructor = RobotTransportadorClasificador;

// función para recoger todos los paquetes 
RobotTransportadorClasificador.prototype.recogerCajas = function(it) {
    this.trayectoria = this.hillClimbing(this.arrayDePaquetes[it].posActual);
    var direccion = "";
      var j = 1;
      while(j < this.trayectoria.length) {
          direccion = this.trayectoria[j].direccion;
          this.caminar(direccion);
          j++
      }
    this.recogerUnaCaja(this.arrayDePaquetes[it]);
}

// metodo para recoger una caja
RobotTransportadorClasificador.prototype.recogerUnaCaja = function(caja) {
  this.Navegador.mapa[this.PosActual.n][this.PosActual.m] = -0;
  caja.cargar();
}
// Función para ordenar los paquetes por orden de prioridad con Shake short
RobotTransportadorClasificador.prototype.ordenarArrayCajasPorPrioridad = function() {
  // for (var i=0;i<this.arrayDePaquetes.length;i++){
      // console.log(this.arrayDePaquetes[i]);
  // }
this.arrayDePaquetes.sort(function (a, b) {
  if (a.priority > b.priority) {
    return -1;
  }
  if (a.priority < b.priority) {
    return 1;
  }
  // a must be equal to b
  return 0;
});
  // for (var i=0;i<this.arrayDePaquetes.length;i++){
      // console.log(this.arrayDePaquetes[i]);
  // }
}

RobotTransportadorClasificador.prototype.casillaFinalDescargas = function() {
  this.trayectoria = [this.PosActual];
  var posicionDestino = new PosConDireccion(0, this.Navegador.mapa[0].length - 4);
  while(this.Navegador.mapa[posicionDestino.n][posicionDestino.m] != 0) { 
      posicionDestino.n++;
  }
  return posicionDestino;
}


RobotTransportadorClasificador.prototype.depositarCajasOrdenadas = function() {
    var posicionDestino = this.casillaFinalDescargas();
    var auxPaquete = this.arrayDePaquetes.pop();
    this.trayectoria = this.hillClimbing(posicionDestino);
    var direccion = "";
    var j = 1;
    while(j < this.trayectoria.length) {
      direccion = this.trayectoria[j].direccion;
      this.caminar(direccion);
      j++
    }
    auxPaquete.descargar(this.PosActual);
    this.Navegador.mapa[this.PosActual.n][this.PosActual.m] = auxPaquete.priority + 1
}

