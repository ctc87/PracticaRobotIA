function Robot_clasificador(PosSalida) {
  Robot.call(this, PosSalida);
  this.caja;
  this.trayectoriaMatriz = [];
  var ArrayDePaquetes = [];
  var nuevo_paquete;
};

// Creamos el objeto RobotDepositador.prototype que hereda desde Robot.prototype
// Nota: Un error común es utilizar "new Robot()" para crear RobotDepositador.prototype 
// Esto es incorrecto por varias razones, y no menos importante, nosotros no le estamos pasando nada
// a Robot desde el argumento "PosSalida". El lugar correcto para llamar a Robot
// es arriba, donde nosotros llamamos a RobotDepositador.
Robot_clasificador.prototype = Object.create(Robot.prototype);    // Vea
// Establecer la propiedad "constructor" para referencias  a RobotDepositador
Robot_clasificador.prototype.constructor = Robot_clasificador;

Robot_clasificador.prototype.GenerarObjeto = function(Paquete) {
  
  this.ArrayDePaquetes.push(Paquete);
 
};
///  FUNCION PARA ORDENAR LOS PAQUETES POR ORDEN DE PRIORIDAD CON EL ALGORITMO SHAKE SHORT!!
Robot_clasificador.prototype.ordenar_objetos = function (){
     
        var ini=0;
        var fin_=this.ArrayDePaquetes.length();
        var x;
        var cambio=this.ArrayDePaquetes.length();
        while (ini<fin_){
            for(var j=fin_;j>ini;j--){
                if(this.ArrayDePaquetes[j].obtener_prioridad()<this.ArrayDePaquetes[j-1].obtener_prioridad()){
                    x=this.ArrayDePaquetes[j];
                    this.ArrayDePaquetes[j]=this.ArrayDePaquetes[j-1];
                    this.ArrayDePaquetes[j-1]=x;
                    fin_--;
                }
            }
            for(var j=ini;j<fin_;j++){
                if(this.ArrayDePaquetes[j].obtener_prioridad()<this.ArrayDePaquetes[j+1].obtener_prioridad()){
                  x=this.ArrayDePaquetes[j];
                   this.ArrayDePaquetes[j]=this.ArrayDePaquetes[j-1];
                    this.ArrayDePaquetes[j-1]=x;
                    ini++;
                }
            }
        }
}
// funcion que detecta si hay un nuevo paquete y lo pone a 1 o a 0 dependiendo 
Robot_clasificador.prototype.set_nuevo_paquete = function(paquete_plus_plus){
        nuevo_paquete=paquete_plus_plus;
}

Robot_clasificador.prototype.hayQue_Ordenar =function(Paquete){
    

            if (nuevo_paquete==1){
                Robot_clasificador.GenerarObjeto(Paquete);
                Robot_clasificador.ordenar_objetos();
            }
    
}
 ///// Carlos aqui en donde se dejaria los paquetes para que los ordene , 
 /////le ponemos una mesa de trabajo o lo deja en una fila especifica del entorno para programarlo??
Robot_clasificador.prototype.mesa_de_trabajo =function(){
    
}
     
