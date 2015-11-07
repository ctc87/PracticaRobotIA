// Definimos el constructor del Robot
function Robot(_posSalida) {
  this.memoriaColor = 'white';
  this.PosActual = _posSalida;
  this.Navegador
  this.med_eucliana=0;
  this.med_manhatan=0;
  // this.posSalidaConDireccion = new PosConDireccion(PosSalida.n,PosSalida.m);
  this.trayectoria = [_posSalida];
  this.memoriaDeEstados = [_posSalida];
}
//tengo que actualizar el mapa del Navegador cuando camino para dejar de hacer ser un obstaculo el punto de partida
Robot.prototype.actualizarNavegador = function() { 
  this.Navegador.cambiarPosActual(this.PosActual);
  this.Navegador.actualizarDatos();
};

Robot.prototype.leerTerrenoEnNavegadpor = function(n, m, mapa) { 
  this.Navegador = new SistemaDeNavegacion(this.PosActual, n, m ,mapa);
};


// funcion que perimte caminar al robot en una dirección si hay un obstaculo no vanza y devuelve false
Robot.prototype.caminar = function(direccion) {
  var puedoCaminar; // variable que se devuelve con resturn que indica si el robot ha caminado o no
  var pos = document.getElementById('div_'+ this.PosActual.n + '_' + this.PosActual.m); // div que equivale a la posicion actual en la interfaz
  var valorCelda = this.Navegador.mapa[this.PosActual.n][this.PosActual.m]; // valor almacenado en la celda de la matriz de la estructura de datos en la posción actual
  // Caminar hacia el norte
  if(direccion == 'norte') {
    if(this.Navegador.sn != 1 && this.Navegador.sn != 13) {
      this.PosActual.n --; 
      var bar = JSON.parse(JSON.stringify(this.PosActual));
      GlobalContador++;
      setTimeout(function() {
        pos.style.backgroundColor = ObtenerColor(valorCelda); // devolvemos el color a la casilla
        document.getElementById('div_'+ bar.n + '_' + bar.m).style.backgroundColor = 'red';
      }, GlobalContador * VENTANA_TIEMPO);
      this.Navegador.mapa[this.PosActual.n][this.PosActual.m] *= -1; // Ponemos el valor de la matriz negativo para indicar que hay un robot
      valorCelda *= -1;
      puedoCaminar = true;
    } else {
      console.log('hay un obstaculo no puedo caminar');
      puedoCaminar = false;
    }
  }
  
  
  if(direccion == 'este') {
    if(this.Navegador.se != 1 && this.Navegador.se != 13) {
      this.PosActual.m ++; 
      var bar = JSON.parse(JSON.stringify(this.PosActual));
      GlobalContador++;
      setTimeout(function() {
        pos.style.backgroundColor =  ObtenerColor(valorCelda); // devolvemos el color a la casilla
        document.getElementById('div_'+ bar.n + '_' + bar.m).style.backgroundColor = 'red';
      }, GlobalContador * VENTANA_TIEMPO);
      this.Navegador.mapa[this.PosActual.n][this.PosActual.m] *= -1; // Ponemos el valor de la matriz negativo para indicar que hay un robot
      valorCelda *= -1;
      puedoCaminar = true;
    } else {
      console.log('hay un obstaculo no puedo caminar');
      puedoCaminar = false;
    }
  } 
  if(direccion == 'sur') {
    if(this.Navegador.ss != 1 && this.Navegador.ss != 13) {
      this.PosActual.n ++;  
      var bar = JSON.parse(JSON.stringify(this.PosActual));
      GlobalContador++;
      setTimeout(function() {
        pos.style.backgroundColor =  ObtenerColor(valorCelda); // devolvemos el color a la casilla
        document.getElementById('div_'+ bar.n + '_' + bar.m).style.backgroundColor = 'red';
      }, GlobalContador * VENTANA_TIEMPO);
      this.Navegador.mapa[this.PosActual.n][this.PosActual.m] *= -1; // Ponemos el valor de la matriz negativo para indicar que hay un robot
      valorCelda *= -1;
      puedoCaminar = true;
    } else {
      console.log('hay un obstaculo no puedo caminar');
      puedoCaminar = false;
    }
  } 
  if(direccion == 'oeste') {
    if(this.Navegador.so != 1 && this.Navegador.so != 13) {
      this.PosActual.m --; 
      var bar = JSON.parse(JSON.stringify(this.PosActual));
      GlobalContador++;
      setTimeout(function() {
        pos.style.backgroundColor =  ObtenerColor(valorCelda); // devolvemos el color a la casilla
        document.getElementById('div_'+ bar.n + '_' + bar.m).style.backgroundColor = 'red';
      }, GlobalContador * VENTANA_TIEMPO);
      this.Navegador.mapa[this.PosActual.n][this.PosActual.m] *= -1; // Ponemos el valor de la matriz negativo para indicar que hay un robot
      valorCelda *= -1;
      puedoCaminar = true;
    } else {
      console.log('hay un obstaculo no puedo caminar');
      puedoCaminar = false;
    }
  }
  this.actualizarNavegador();
  // console.log(this.PosActual);
  return puedoCaminar;
};


Robot.prototype.hillClimbing = function(destino) {
  this.trayectoria = [this.PosActual];
  this.memoriaDeEstados = [this.PosActual];
  var nodoAux;
  var option = "euclidiana";
  // var k = 0; // debug
  var contadorPasoAtras = 1;
  var ultimoNodo = this.trayectoria[this.trayectoria.length - 1];
  while(!ultimoNodo.equal(destino) /*||  k < 50*/) {
    // med++
    var arrayDeNodos = [];
    
    
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n) - 1, parseInt(ultimoNodo.m));
    nodoAux.direccion = "norte";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n) + 1, parseInt(ultimoNodo.m));
    nodoAux.direccion = "sur";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }    
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n), parseInt(ultimoNodo.m) - 1);
    nodoAux.direccion = "oeste";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }    
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n), parseInt(ultimoNodo.m) + 1);
    nodoAux.direccion = "este";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }
    // parte para la función heuristica 
    var menorDistancia = Infinity;
    var mejorIndice;
    for(var i = 0; i < arrayDeNodos.length; i++) {
      if(this.FuncionHeuristica(arrayDeNodos[i], destino, option) < menorDistancia) {
        menorDistancia = this.FuncionHeuristica(arrayDeNodos[i], destino, option);
        mejorIndice = i;
      }
    }
    //console.log(arrayDeNodos.length);
    if(arrayDeNodos.length > 0) {
      // console.log(arrayDeNodos);
      this.trayectoria.push(arrayDeNodos[mejorIndice]);
      this.memoriaDeEstados.push(arrayDeNodos[mejorIndice]);
      ultimoNodo = this.trayectoria[this.trayectoria.length - 1];
      contadorPasoAtras = 1;
    } else {     
      this.trayectoria.pop();
      ultimoNodo = this.memoriaDeEstados[this.memoriaDeEstados.length - 1 - contadorPasoAtras];
      // console.log(contadorPasoAtras);
      contadorPasoAtras++;
    }
    // k++;
    // console.log(this.trayectoria)
  }
  
  return this.trayectoria; 
};

Robot.prototype.comprobarSiEstaLibre = function(nodoCandidato) {
  if(nodoCandidato.n > parseInt(this.Navegador.n) - 1 || nodoCandidato.n < 0 || nodoCandidato.m > parseInt(this.Navegador.m) - 1 || nodoCandidato.m < 0) {
    return false;
  } else {
    return this.Navegador.mapa[nodoCandidato.n][nodoCandidato.m] != 1;
  }
};

Robot.prototype.comprobarSiEstadoFueVisitado = function(nodo) {
  for(var i = 0; i < this.memoriaDeEstados.length; i++) {
    if(this.memoriaDeEstados[i].equal(nodo)) {
      return true;
    }
  }
  return false;
};

Robot.prototype.FuncionHeuristica  = function(posaEvaluar, destino, opcion) {
  switch(opcion) {
    case "euclidiana":
        
        return Math.sqrt(Math.pow(parseInt(posaEvaluar.m) - parseInt(destino.m), 2) + Math.pow(parseInt(posaEvaluar.n) - parseInt(destino.n), 2 ));
    break;
    case "manhatan":
          return (Math.abs(parseInt(posaEvaluar.m) - parseInt(destino.m)) + Math.abs(parseInt(posaEvaluar.n) - parseInt(destino.n)));
    break;
  }
};

Robot.prototype.hillClimbingEstadistico = function(destino, opcion) {
  this.trayectoria = [this.PosActual];
  this.memoriaDeEstados = [this.PosActual];
  var nodoAux;
  var option = "euclidiana";
  // var k = 0; // debug
  var contadorPasoAtras = 1;
  var ultimoNodo = this.trayectoria[this.trayectoria.length - 1];
  while(!ultimoNodo.equal(destino) /*||  k < 50*/) {
    if(opcion==="eucliana"){
       this.med_eucliana++
    }
    else{
      this.med_manhatan++;
    }
    var arrayDeNodos = [];
    
    
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n) - 1, parseInt(ultimoNodo.m));
    nodoAux.direccion = "norte";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n) + 1, parseInt(ultimoNodo.m));
    nodoAux.direccion = "sur";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }    
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n), parseInt(ultimoNodo.m) - 1);
    nodoAux.direccion = "oeste";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }    
    nodoAux = new PosConDireccion(parseInt(ultimoNodo.n), parseInt(ultimoNodo.m) + 1);
    nodoAux.direccion = "este";
    if(!this.comprobarSiEstadoFueVisitado(nodoAux)) {
      if(this.comprobarSiEstaLibre(nodoAux)) {
        arrayDeNodos.push(nodoAux);
      }
    }
    // parte para la función heuristica 
    var menorDistancia = Infinity;
    var mejorIndice;
    for(var i = 0; i < arrayDeNodos.length; i++) {
      if(this.FuncionHeuristica(arrayDeNodos[i], destino, option) < menorDistancia) {
        menorDistancia = this.FuncionHeuristica(arrayDeNodos[i], destino, option);
        mejorIndice = i;
      }
    }
    //console.log(arrayDeNodos.length);
    if(arrayDeNodos.length > 0) {
      // console.log(arrayDeNodos);
      this.trayectoria.push(arrayDeNodos[mejorIndice]);
      this.memoriaDeEstados.push(arrayDeNodos[mejorIndice]);
      ultimoNodo = this.trayectoria[this.trayectoria.length - 1];
      contadorPasoAtras = 1;
    } else {     
      this.trayectoria.pop();
      ultimoNodo = this.memoriaDeEstados[this.memoriaDeEstados.length - 1 - contadorPasoAtras];
      // console.log(contadorPasoAtras);
      contadorPasoAtras++;
    }
    // k++;
    // console.log(this.trayectoria)
  }
  
  return this.trayectoria; 
};
  
  
  
 /* Cogemos el nodo inicial y lo metemos en la lista abierta.
Cogemos de la lista abierta, el nodo con menor valor de F (coste total).
El elegido (nodo activo) lo pasamos a la lista cerrada.
Cogemos los nodos vecinos del nodo activo y con cada uno hacemos lo siguiente:
– Si no está en la lista abierta: Lo metemos, le ponemos como padre el nodo activo y le calculamos los valores de G, H y F.
– Si ya está en la lista abierta: Verificamos si el camino por el que acabamos de llegar es mejor que el camino por el que llegamos anteriormente. Para eso vemos si su G es mejor que la G que le correspondería ahora. Si su G es mayor que la nueva G, es que el camino actual es mejor, así que le ponemos como padre el nodo activo y le asignamos los nuevos valores de G, H y F.
Si alguno de los nodos del punto 4 era el nodo final, hemos terminado.
Si quedan nodos en la lista abierta, volvemos al punto 2
Si no quedan nodos en la lista abierta y no hemos llegado al final, el destino es inalcanzable. 
*/  

