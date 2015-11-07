// Definimos el constructor Entorno
function Entorno(m, n, numObstaculos, manual) {
  this.n = n; //largo
  this.m = m; //ancho
  this.pintada = false;
  this.manual = manual;
  this.PosRobot = [];
  this.arrayDePaquetes = [];
  if(numObstaculos > (this.n * this.m) - 1) {
    console.log('Error en la creación del entorno demasiados obstaculos');
  } else {
    this.numObstaculos = numObstaculos;
  }
  this.matrizEntorno = new Array();
  for (var i = 0; i < m; i++) {
    this.matrizEntorno[i] = new Array(n);
  }
  for(var i = 0; i < this.m; i++) {
     for(var j = 0; j < this.n; j++) {
        this.matrizEntorno[i][j] = 0;
    }
  }
  this.PosEntradaEntorno = new PosConDireccion(Math.floor(this.m/2), 0);
  this.PosSalidaEntorno = new PosConDireccion(Math.floor(this.m/2), this.n-1);
  this.posCentroEntorno = new PosConDireccion(Math.floor(this.m/2), Math.floor(this.n/2));
  this.PosRobot[0] = this.PosEntradaEntorno;
  this.PosRobot[1] = this.PosSalidaEntorno;
  this.PosRobot[2] = this.posCentroEntorno;
    
}


Entorno.prototype.pintarEntorno = function() {
   var scrW = screen.width > screen.height ? screen.width : screen.height;
   if(this.n <= 10) {
    var scrW50 = scrW / 100 * 20;
   } else if(this.n >= 11 && this.n <= 40 ) {
    var scrW50 = scrW / 100 * 25;     
   } else if(this.n >= 41 && this.n <= 80 ) {
    var scrW50 = scrW / 100 * 30;     
   } else if(this.n >= 81) {
    var scrW50 = scrW / 100 * 40;     
   }
   var boxSize = (scrW50 / this.n) - 2.02;
   document.getElementById('entorno').style.width = scrW50 + 'px';
   var entornoHeigth = (boxSize * this.m) + (this.m * 2);
//   document.getElementById('entorno').style.height = entornoHeigth + 'px';
   for(var i = 0; i < this.m; i++) {
        
    for(var j = 0; j < this.n; j++) {
        var aux = document.createElement('div');
        if(i == this.PosEntradaEntorno.n && j == this.PosEntradaEntorno.m) {
            aux.setAttribute('style', 'width:' + boxSize + 'px; height:' + boxSize + 'px ; background-Color:black');
            this.matrizEntorno[i][j] = 111;
        } 
        
        else if(i == this.PosSalidaEntorno.n && j == this.PosSalidaEntorno.m) {
            aux.setAttribute('style', 'width:' + boxSize + 'px; height:' + boxSize + 'px ; background-Color:black');
            this.matrizEntorno[i][j] = 111;
        } 
        
        else {
            aux.setAttribute('style', 'width:' + boxSize + 'px; height:' + boxSize + 'px ; background-Color:white');
        }
        if(i == this.PosRobot[0].n && j == this.PosRobot[0].m) {
            aux.setAttribute('style', 'width:' + boxSize + 'px; height:' + boxSize + 'px ; background-Color:red');
            this.matrizEntorno[i][j] *= -1;
            // tengo que poner valores negátivos si el robot esta en este sitio. Por lo tanto si es negativo se guarda el color.
            // cuando el robot abandona la casilla se se hace de nuevo positivo
        } 
        else if(i == this.PosRobot[1].n && j == this.PosRobot[1].m) {
            aux.setAttribute('style', 'width:' + boxSize + 'px; height:' + boxSize + 'px ; background-Color:red');
            this.matrizEntorno[i][j] *= -1;
        } 
        else if(i == this.PosRobot[2].n && j == this.PosRobot[2].m) {
            aux.setAttribute('style', 'width:' + boxSize + 'px; height:' + boxSize + 'px ; background-Color:red');
            this.matrizEntorno[i][j] *= -1;
        } 
        aux.setAttribute('class','box');
        aux.setAttribute('id','div_'+ i + '_' + j);
        document.getElementById('entorno').appendChild(aux);
     } 
   }
 };
 
Entorno.prototype.desPintarEntorno = function(){
    for(var i = 0; i < this.m; i++) {
     for(var j = 0; j < this.n; j++) {
        var aux = document.getElementById('div_'+ i + '_' + j);
        aux.parentNode.removeChild(aux);
     } 
   }
};

Entorno.prototype.ObstaculosRandom = function(){
    var aux = this.numObstaculos;
    while(aux > 0) {
        var i = Math.floor((Math.random() * this.m) + 1) - 1;
        var j = Math.floor((Math.random() * this.n) + 1) - 1;
        // console.log('div_'+ i + '_' + j);
        var randElement = document.getElementById('div_'+ i + '_' + j);
        // console.log(this.matrizEntorno[i][j]);
        if(randElement.style.backgroundColor == 'white' && this.matrizEntorno[i][j] == 0){
            this.matrizEntorno[i][j] = 1;
            randElement.style.backgroundColor = 'blue';
            randElement.style.borderColor = 'blue';
            aux--;
        }
    }
};


Entorno.prototype.ObstaculosRandomEstadistica = function(){
    var aux = this.numObstaculos;
    while(aux > 0) {
        var i = Math.floor((Math.random() * this.m) + 1) - 1;
        var j = Math.floor((Math.random() * this.n) + 1) - 1;
        if(this.matrizEntorno[i][j] == 0){
            this.matrizEntorno[i][j] = 1;
            aux--;
        }
    }
};

