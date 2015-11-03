//El entorno es nuestra interfaz todo lo que veremos

function crearEntorno() {
     var min=Infinity;
     var max=0
     var med;
    //Instanciamos un objeto de tipo POsactual para cada robot
    
    this.Robot(Math.abs(this.m/2),0);
    this.entorno = new Entorno(this.m, this.n, this.obs,'ramdon');
    this.entorno.ObstaculosRandomEstadistica(); // Disponemos los obstaculos de manera aleatoria 
      
     
}

