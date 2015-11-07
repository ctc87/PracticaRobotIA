
function estadistica(med_eucliana,med_manhatan){
    this.med_eucliana=med_eucliana;
    this.med_manhatan=med_manhatan;
}


function crearEntorno() {
    var robot;
    var entorno_estadistico;
    var ArrayEstadistica=new Array();
    var min_eucliana =Infinity;
    var min_manhatan=Infinity;
    var max_eucliana = 0;
    var max_manhatan =0;
    var med_eucliana=new Array();
    var med_manhatan=new Array();
    
     for (var j=0;j<3;j++){
       for(var i = 0; i < 3; i++){
          ArrayEstadistica[j]= new Array(estadisticaAux);
       }
     }  
     
    for (var j=1;j<=3;j++){
       for(var i = 1; i <= 3; i++){
           var dimension=Math.pow(10,i);
            var pos_destino = new PosConDireccion(dimension/2,dimension - 1);
            var posicion = new PosConDireccion(Math.abs(dimension/2),0);
            robot=new Robot(posicion);
                 entorno_estadistico = new Entorno(dimension,dimension, dimension * dimension * 0.05 ,true); 
                 entorno_estadistico.ObstaculosRandomEstadistica();
                 robot.leerTerrenoEnNavegadpor(entorno_estadistico.n,entorno_estadistico.m,entorno_estadistico.matrizEntorno);
            
            //entorno_estadistico.ObstaculosRandomEstadistica(1); // Disponemos los obstaculos de manera aleatoria 
            robot.hillClimbingEstadistico(pos_destino,"manhatan");
            robot.hillClimbingEstadistico(pos_destino,"eucliana");
            // console.log(robot.hillClimbingEstadistico(pos_destino,"manhatan"));
            // console.log(robot.hillClimbingEstadistico(pos_destino,"eucliana"));
            var med_manhatan_unitaria = JSON.parse(JSON.stringify(robot.med_manhatan));
            var med_eucliana_unitaria = JSON.parse(JSON.stringify(robot.med_eucliana));
            var estadisticaAux = new estadistica(med_eucliana_unitaria,med_manhatan_unitaria);
            ArrayEstadistica[j-1][i-1]=estadisticaAux;
            delete this.entorno_estadistico;
            delete this.robot; 
       }
       }
        
  
    
    for(var i=0;i<ArrayEstadistica.length;i++){
        for(var j=0;j<ArrayEstadistica[i].length;j++){
            console.log("prueba de matriz" + ArrayEstadistica.length)
            if(min_eucliana>ArrayEstadistica[j][i].med_eucliana){
                // console.log(ArrayEstadistica[j][i].med_eucliana);
                min_eucliana=ArrayEstadistica[j][i].med_eucliana;
                console.log("minima_e" + min_eucliana);
            }
            if(max_eucliana<ArrayEstadistica[j][i].med_eucliana){
                // console.log(ArrayEstadistica[j][i].med_eucliana);
                max_eucliana=ArrayEstadistica[j][i].med_eucliana;
                console.log("maxima_e" + max_eucliana);
            }
            if(min_manhatan>ArrayEstadistica[j][i].med_manhatan){
                // console.log(ArrayEstadistica[j][i].med_manhatan);
                min_manhatan=ArrayEstadistica[j][i].med_manhatan;
                console.log("minima_m" + min_manhatan);
            }
            if(max_manhatan<ArrayEstadistica[j][i].med_manhatan){
                // console.log(ArrayEstadistica[j][i].med_manhatan);
                max_manhatan=ArrayEstadistica[j][i].med_manhatan;
                console.log("maxima_m" + max_manhatan);
            }
            med_eucliana[j]+=ArrayEstadistica[j][i].med_eucliana;
            med_manhatan[j]+=ArrayEstadistica[j][i].med_manhatan;
        }
    }
    
}

