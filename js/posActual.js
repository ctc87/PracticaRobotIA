// clase posicion actual contiene un par de cordenadas
function PosActual(m, n) {
  this.n = n;
  this.m = m;
};

PosActual.prototype.equal = function(objeto) {
  //console.log(this.n + "=" + objeto.n + "   " + this.m + "=" + objeto.m )
  return this.n == objeto.n && this.m == objeto.m;
};

// clase hija que contiene una dierección para seguir la trayectoria

function PosConDireccion(n, m) {
      PosActual.call(this, m ,n);
      this.direccion = "";
};
PosConDireccion.prototype = Object.create(PosActual.prototype); 
PosConDireccion.prototype.constructor = PosConDireccion;


PosConDireccion.prototype.equal = function(objeto) {
  //console.log(this.n + "=" + objeto.n + "   " + this.m + "=" + objeto.m )
  return this.n == objeto.n && this.m == objeto.m;
};