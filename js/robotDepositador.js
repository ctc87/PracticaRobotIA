function RobotDepositador(posSalidaEntorno, arrayDePaquetes) {
  aux = new PosConDireccion(posSalidaEntorno.n, posSalidaEntorno.m)
  Robot.call(this, aux);
  this.caja;
  this.posSalidaEntorno = posSalidaEntorno;
  console.log(this.posSalidaEntorno)
  this.arrayDePaquetes = arrayDePaquetes;

};

// Creamos el objeto RobotDepositador.prototype que hereda desde Robot.prototype
// Nota: Un error común es utilizar "new Robot()" para crear RobotDepositador.prototype 
// Esto es incorrecto por varias razones, y no menos importante, nosotros no le estamos pasando nada
// a Robot desde el argumento "PosSalida". El lugar correcto para llamar a Robot
// es arriba, donde nosotros llamamos a RobotDepositador.
RobotDepositador.prototype = Object.create(Robot.prototype);    // Vea
// Establecer la propiedad "constructor" para referencias  a RobotDepositador
RobotDepositador.prototype.constructor = RobotDepositador;

RobotDepositador.prototype.GenerarObjeto = function() {
  this.caja = new Paquete();
 
};

// Esta función busca una casilla libre en la fila 3 para depositar los paquetes
RobotDepositador.prototype.casillaInicioDescarga = function() {
  this.trayectoria = [this.PosActual];
  var posicionDestino = new PosConDireccion(Math.floor(this.Navegador.mapa.length/2), 3);
  var alcanzadoMaximoHaciaAbajo = false;
  while(this.Navegador.mapa[posicionDestino.n][posicionDestino.m] != 0 && !alcanzadoMaximoHaciaAbajo) { 
    if(posicionDestino.n == (this.Navegador.mapa.length - 1)) {
      alcanzadoMaximoHaciaAbajo = true;
      posicionDestino.n = this.Navegador.mapa.length/2;
    }
    else  
      posicionDestino.n++;
  }
  while(this.Navegador.mapa[posicionDestino.n][posicionDestino.m] != 0) { 
      if(posicionDestino.n == 0) {
        console.log("error problema sin solución");
        break;
      }
      posicionDestino.n--;
  }
  return posicionDestino;


}
RobotDepositador.prototype.buscarCasillaParaDepositar = function() {
    var posicionDestino = this.casillaInicioDescarga(); 

    this.GenerarObjeto();
    this.trayectoria = this.hillClimbing(posicionDestino);
    // console.log(this.trayectoria);
    var direccion = "";
      var i = 1;
      while(i < this.trayectoria.length) {
          direccion = this.trayectoria[i].direccion;
          this.caminar(direccion);
          i++
      }
        this.depositar();
        this.PosActual = this.trayectoria[this.trayectoria.length - 1];
        this.trayectoria = [this.PosActual];
        this.trayectoria = this.hillClimbing(this.posSalidaEntorno);
      
      var j = 1;
      while(j < this.trayectoria.length) {
          direccion = this.trayectoria[j].direccion;
          this.caminar(direccion);
          j++;
      }
};

RobotDepositador.prototype.salirEntorno = function(posSalidaEntorno) {
  // Se puede hacer una ocpion caminar en el switch que se afuera que haga desparacer por unos segundos al robot
};

RobotDepositador.prototype.depositar = function()  {
  this.caja.descargar(this.PosActual);
  this.Navegador.mapa[this.PosActual.n][this.PosActual.m] = this.caja.priority + 1
  this.arrayDePaquetes.push(this.caja);
};

