/* Necesitamos una clase paquete con los atributos:
    -transportado: booleano si es true el objeto esta siendo transportado 
        si es false el objeto esta depoistado dentro o fuera del entorno
    -prioridad: el objeto tiene una prioridad de tipo entero donde 0 sera 
        la mayor prioridad
   Con los métodos:
    -EL constructor recibe una prioridad e inicializa transportado a false.
    -Un metodo transportando que cambia trasportado a true.
    -Un metodo descargado que cambia transportado a false.
*/
    
    
function Paquete() {
        this.posActual =  new PosConDireccion(-1,-1);
        this.transportado = 1;
        this.priority = Math.floor((Math.random() * 10) + 1);  // Método para dar aleatoriedad a la prioridad
};


Paquete.prototype.cargar = function( ) {
        this.transportado = 1;
        this.posActual.n = -1;
        this.posActual.m = -1;
};

Paquete.prototype.descargar = function(posDescarga) {
        this.posActual = posDescarga;
        this.transportado = 0;
};


Paquete.prototype.obtenerPrioridad = function(){ // Funcion que devuelve la prioridad del paquete para ordenarlo con el robot;
        return this.priority;
}
