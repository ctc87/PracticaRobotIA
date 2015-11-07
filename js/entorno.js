//El entorno es nuestra interfaz todo lo que veremos
var pintado = false;
var GlobalContador;
const VENTANA_TIEMPO = 20;
var contadorGlobalParaPasos = 0;
PASOS_QUE_SE_RESTAN1 = 30; // 100
PASOS_QUE_SE_RESTAN2 = 150; // 100
PASOS_QUE_SE_SUMAN = 30; // 100

function crearEntorno() {
    GlobalContador = 100;
    //Recogemos los valores con los que se va a inicializar
    this.n = document.getElementById('N').value;
    this.m = document.getElementById('M').value;
    this.numeroRemesas = document.getElementById('rem').value;
    this.numeroPaquetesPorRemesa = document.getElementById('paq').value;
    this.obs = document.getElementById('Obs').value;
    this.am = document.getElementById("Autom").checked
    
    //Instanciamos un objeto de tipo POsactual para cada robot
    this.posSalidaRobotDepositador = new PosConDireccion(Math.abs(this.m/2),0);
    this.posSalidaRobotTransportadorClasificador  = new PosConDireccion(Math.abs(this.m/2), Math.abs(this.n/2));
    this.posSalidaRobotEmbalizador = new PosConDireccion(Math.abs(this.m/2),this.n-1);
    //Comprobamos si ya hay una matriz pintada en nuestra interfaz gráfica
    if(pintado == true) {
      this.entorno.desPintarEntorno(); //si la hay la borramos
    }
    //Intanciamos un objeto entorno que es el entorno virtual del problema
    this.entorno = new Entorno(this.m, this.n, this.obs, this.am);
    // Pintamos el entorno en nuestra interfaz gráficas 
    this.entorno.pintarEntorno();
    pintado = true;
    
    // Comprobamos sí la disposición de obstaculos se va hacer de forma manual
    if(this.entorno.manual) { 
        this.entorno.ObstaculosRandom(); // Disponemos los obstaculos de manera aleatoria 
    } else {
      /* 
        Si se va hacer de manera manual tenemos que agregar a cada casilla de la interfaz gráfica,
        que se corresponde con un cuadrado de la matriz del entorno, una serie de eventos para
        interactuar con el ratón sobre ellos:
          -Evento que resalte la casilla actual
          -Evento que devuelva la casilla resaltada a su estado normal
          -Evento que coloca un obstaculo sobre la casilla pulsada
      */
      
      var arrayBox = document.getElementsByClassName('box'); // array que contiene todos los elementos que pertenecen a la matriz en la interfaz gráfica
      var ventanaTemporal = document.getElementById('divObs'); // ventana temporal que permite terminar los eventos de poner obstaculos manualmente.
      var i; 
      for (i = 0; i < arrayBox.length; i++) { // añadimos los obstaculos
          arrayBox[i].onclick = EventoObstaculosManual;
          arrayBox[i].onmouseover = EventoObstaculosManual;
          arrayBox[i].onmouseout = EventoObstaculosManual;
      }
      ventanaTemporal.style.display = 'inline'; // hacemos visible la ventana temporal declarada en html
    }
    // instanciamos los robots con la posiciones de salida
    this.robotDepositador = new RobotDepositador(this.posSalidaRobotDepositador, this.entorno.arrayDePaquetes); 
    this.robotTransportadorClasificador = new RobotTransportadorClasificador(this.posSalidaRobotTransportadorClasificador, this.entorno.arrayDePaquetes); 
    this.robotEmbalizador = new RobotEmbalizador(this.posSalidaRobotEmbalizador); 
    
    // insertamos la matriz de entorno en el objeto navegador, que es un atributo del robot, a traves del metodo leerTerrenoEnNavegadpor()
    this.robotDepositador.leerTerrenoEnNavegadpor(this.m, this.n, this.entorno.matrizEntorno);
    this.robotTransportadorClasificador.leerTerrenoEnNavegadpor(this.m, this.n, this.entorno.matrizEntorno);
    this.robotEmbalizador.leerTerrenoEnNavegadpor(this.m, this.n, this.entorno.matrizEntorno);
    
    // actualizamos el navegador para que compruebe los obstaculos en las direcciónes en las que puede moverse el robot
    this.robotDepositador.actualizarNavegador();
    this.robotTransportadorClasificador.actualizarNavegador();
    this.robotEmbalizador.actualizarNavegador();
    // activamos el evnto que permirte mover el robot con las teclas w,a,s,d pertenece a la parte de desarrollo
    document.onkeypress = manejador;
    
    if(this.entorno.manual) {
      ejecucionRobot();
    }
}


function ejecucionRobot() {
  for(var i = 0; i < this.numeroRemesas; i++) {
    while(this.entorno.arrayDePaquetes.length != 0)
      this.entorno.arrayDePaquetes.pop();
    for(var j = 0; j < this.numeroPaquetesPorRemesa; j++) {
      this.robotDepositador.casillaInicioDescarga();
      this.robotDepositador.buscarCasillaParaDepositar();
      GlobalContador += PASOS_QUE_SE_SUMAN;
    }
    GlobalContador -= PASOS_QUE_SE_RESTAN1;
    this.robotTransportadorClasificador.ordenarArrayCajasPorPrioridad();
    for(var j = 0; j < this.entorno.arrayDePaquetes.length; j++) {
      this.robotTransportadorClasificador.recogerCajas(j);
      this.robotTransportadorClasificador.depositarCajasOrdenadas(j);
    }
    this.robotTransportadorClasificador.volverASuPuesto();
    GlobalContador -= PASOS_QUE_SE_RESTAN2
    for(var j = 0; j < this.numeroPaquetesPorRemesa; j++) {
    this.robotEmbalizador.recogerUnaCaja();  
    this.robotEmbalizador.embalizar();

    }
    GlobalContador -= PASOS_QUE_SE_RESTAN2 * 3;
  
  }
  
  
  
  
  // GlobalContador -= PASOS_QUE_SE_RESTAN;
  // GlobalContador -= PASOS_QUE_SE_RESTAN
 
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
  // this.robotEmbalizador.recogerUnaCaja();
  // this.robotEmbalizador.embalizar();
}

//Esta función permite mostrar o esconder un elmento html a traves de su id
function mostrarEsconder(cual) {
  // en una variable, guardo la etiqueta
  var micontenedor = document.getElementById(cual);
  // uso una condición; le pregunto ¿esa etiqueta es visible?
  if (micontenedor.style.display == "inline") {
    // si la respuesta es SI (true) le cambio la propiedad y la oculto
    micontenedor.style.display = "none";
  } else {
    // en caso contrario, como la respuesta es NO (false) le cambio la propiedad y la hago visible
    micontenedor.style.display = "inline";
  }
}

//Manejador de eventos para mover el robot manualmente
//este manejador pertenece a la parte de desarrollo
function manejador(elEvento) {
  GlobalContador = 1;
  var evento = elEvento || window.event;
  var caracter = evento.charCode || evento.keyCode;
  if(String.fromCharCode(caracter) == 'a') {
      robotDepositador.caminar('oeste');
  }
  if(String.fromCharCode(caracter) == 's') {
      robotDepositador.caminar('sur');
  }
  if(String.fromCharCode(caracter) == 'd') {
      robotDepositador.caminar('este');
  }
  if(String.fromCharCode(caracter) == 'w') {
      robotDepositador.caminar('norte');
  }
  if(String.fromCharCode(caracter) == 'e') {
      robotDepositador.
      robotDepositador.caminar(direccion);
  }
}

/*
  Esta función contiene las instrucciones para la insercción de obstaculos manualmente
  maneja lo que hacer con los eventos añadidos en la función crearEntorno(), los eventos 
  y lo que hacemos con ellos es:
    -mouseover: cambia el colos del borde al pasar el puntero del ratón por encima.
    -mouseout: vuelve a poner el borde en su color origínal al dejar de estar enciam el puntero del ratón
    -onclick: cambia el color de fondo por azul, para indicar que hay un obstaculo, pone esa pocición en 
              la matriz del entorno del sistema a 1.
*/  
function EventoObstaculosManual(elEvento) {
  var evento = elEvento || window.event;
  var id = this.id.split('_');
  switch(evento.type) {
    case 'mouseover':
      if(entorno.matrizEntorno[id[1]][id[2]] != 1)
        this.style.borderColor = 'silver';
      break;
    case 'mouseout':
      if(this.style.borderColor != 'blue')
          this.style.borderColor = 'black';
      break;
    case 'click':
      if(entorno.matrizEntorno[id[1]][id[2]] == 0) {
        this.style.borderColor = 'blue';
        this.style.backgroundColor = 'blue';
        entorno.matrizEntorno[id[1]][id[2]] = 1;
        // asignamos obstaculo en la matriz de la estruuctura de datos
      } else if(entorno.matrizEntorno[id[1]][id[2]] == 1){
        this.style.borderColor = 'black';
        this.style.backgroundColor = 'white';
        entorno.matrizEntorno[id[1]][id[2]] = 0;
      }
      break;
  }
}

/*
  Esta función termina los eventos de la inserrción manual y deja de mostrar la ventana
  temporal que tiene el boton que activa esta función, con esto queda terminada la fase de
  colocación de obstaculos manualmente.
*/



function TerminarEventoManual() {
    var arrayBox = document.getElementsByClassName('box');
      var ventanaTemporal = document.getElementById('divObs');
      var i;
      for (i = 0; i < arrayBox.length; i++) {
          arrayBox[i].onclick = null;
          arrayBox[i].onmouseover = null;
          arrayBox[i].onmouseout = null;
      }
      ventanaTemporal.style.display = 'none';
          ejecucionRobot();

      // document.getElementById("divEmpezar").style.display = "inline";
}

// Función que decódifica un numero por un color
function ObtenerColor(seleccion)  {
        var color;
        switch(Math.abs(seleccion)) {
                case 0:
                        color = "#FFFFFF";
                break;
                case 1:
                        color = "#blue";
                break;
                case 2:
                        color = "#00FF00";
                break;
                case 3:
                        color = "#00FF99";
                break;
                case 4:
                        color = "#CC66FF";  
                break;
                case 5:
                        color = "#FF6666";
                break;
                case 6:
                        color = "#FF6600";
                break;
                case 7:
                        color = "#CCCC00";
                break;
                case 8:
                        color = "#663300";
                break;
                case 9:
                        color = "#003300";
                break;
                case 10:
                        color = "#999966";
                break;
                case 11:
                        color = "#99CCFF";
                break;
                case 111:
                        color = "black"
                break;
        }
        return color;
};


$('document').ready(function() {
  
  $('#mostrarInicio').click(function(env) {
    
    $('#inicio').hide(2000);
  });  
  
  $("#botonEmpezar").on( "click", function() {	 
    $('#divDatosMatriz').show(1000);
    $('#divExplicacion').hide(1000);
    $('#divObs').hide(1000);
    $('#entorno').hide(1000);
    $('#divInicio').hide(1000);
    $('#prioridades').hide(1000);
    
  });  
  
  $("#botonInstruciones").on( "click", function() {	 
    $('#divDatosMatriz').hide(1000);
    $('#divExplicacion').hide(1000);
    $('#divObs').hide(1000);
    $('#entorno').hide(1000);
    $('#divInicio').hide(1000);
    $('#prioridades').hide(1000);
    
  });  
  
  $("#botonInicio").on( "click", function() {	 
    $('#divDatosMatriz').hide(1000);
    $('#divExplicacion').hide(1000);
    $('#divObs').hide(1000);
    $('#entorno').hide(1000);
    $('#divInicio').show(1000);  
    $('#prioridades').hide(1000);     
  });
  
  
  $("#botonCrearEntorno").on( "click", function() {	 
    $('#divDatosMatriz').hide(1000);
    $('#entorno').show(1000);
    $('#divInicio').hide(1000);
    $('footer').hide(1000);
    $('#prioridades').show(1000);

  }); 
  




  
});
