
window.onload = function() {
    let mensageStart = document.createElement("div");
    mensageStart.id = "mensageStart";
    mensageStart.innerHTML = "Start";
    body.append(mensageStart);
    mensageStart.addEventListener('click', init);
};

let positionX = 8;
let positionY = 3;
let bolas = 0;
let nivel = 1;

let fan1;
let fan2;
let fan3;
let fan4;

let acomerfantasmas = false;

function init() {

    if (typeof mensageStart !== 'undefined') {
        mensageStart.remove();
    }
    var bolasGrid = [
        [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1],
        [1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1],
        [1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1],
        [1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1],
        [0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0],
        [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0],
        [1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1],
        [1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1],
        [1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1],
        [1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1]
    ];
    var grid = [
        [14,13,13,1,13,13,13,12,0,14,13,13,13,1,13,13,12],
        [24,0,0,24,0,0,0,24,0,24,0,0,0,24,0,0,24],
        [24,0,0,24,0,0,0,24,0,24,0,0,0,24,0,0,24],
        [4,13,13,0,13,1,13,3,13,3,13,1,13,0,13,13,2],
        [24,0,0,24,0,24,0,0,0,0,0,24,0,24,0,0,24],
        [4,123,0,24,0,34,13,12,0,14,13,23,0,24,0,134,2],
        [24,0,0,24,0,0,0,24,0,24,0,0,0,24,0,0,24],
        [34,13,13,2,0,14,13,3,13,3,13,12,0,4,13,13,23],
        [0,0,0,24,0,24,0,0,234,0,0,24,0,24,0,0,0],
        [13,136,13,0,13,2,0,134,234,123,0,4,13,0,13,135,13],
        [0,0,0,24,0,24,0,0,234,0,0,24,0,24,0,0,0],
        [14,13,13,2,0,34,13,1,13,1,13,23,0,4,13,13,12],
        [24,0,0,24,0,0,0,24,0,24,0,0,0,24,0,0,24],
        [24,0,134,2,0,14,13,23,0,34,13,12,0,4,123,0,24],
        [24,0,0,24,0,24,0,0,0,0,0,24,0,24,0,0,24],
        [24,0,134,3,13,3,13,12,0,14,13,3,13,3,123,0,24],
        [24,0,0,0,0,0,0,24,0,24,0,0,0,0,0,0,24],
        [4,13,13,1,13,13,13,0,13,0,13,13,13,1,13,13,2],
        [24,0,0,24,0,0,0,24,0,24,0,0,0,24,0,0,24],
        [34,13,13,3,13,13,13,23,0,34,13,13,13,3,13,13,23]
    ];
  
    var game = document.createElement('div');
    game.id = 'game';
    document.body.appendChild(game);

    var tablero = document.createElement('div');
    tablero.id = 'tablero'

    panelPrincipal = document.createElement('div');
    panelPrincipal.id = 'panelPrincipal'
    game.appendChild(panelPrincipal);

    panelLifes = document.createElement('div');
    panelLifes.id = 'panelLifes'
    panelPrincipal.appendChild(panelLifes);

    var vidasPacman = [];

    for(x=0; x<5; x++) {
        vidasPacman[x] = document.createElement('img');
        vidasPacman[x].src = "img/pac-man.png"; 
        vidasPacman[x].id = 'pacmanImage'+x;
        panelLifes.appendChild(vidasPacman[x]);
    }

    panelTime = document.createElement('div');
    panelTime.id = 'panelTime'
    panelPrincipal.appendChild(panelTime);

    panelScores = document.createElement('div');
    panelScores.id = 'panelScores'
    panelPrincipal.appendChild(panelScores);

    var createdBolas = 0;
    var createdBolaGrande = 0;

    function generarArrayOrdenado() {
        var array = [];
      
        for (var i = 0; i < 10; i++) {
          array.push(Math.floor(Math.random() * 100)); // Genera números aleatorios entre 0 y 99
        }
      
        array.sort(function(a, b) {
          return a - b;
        });
      
        return array;
      }
      
      // Llama a la función y almacena el resultado en una variable
      var miArray = generarArrayOrdenado();
      
      //console.log(miArray);

    for (var i = 0; i < grid.length; i++) {
        for (var x = 0; x < grid[i].length; x++) {
            var div = document.createElement('div');
            div.id = 'x'+x+'y'+i;
            div.className = 'myDiv path'+grid[i][x];
            div.setAttribute("path", +grid[i][x]);

            // Bola normal
            if (createdBolas !==  miArray[createdBolaGrande]){
                if(bolasGrid[i][x] == 1) {
                    var bolaImage = document.createElement("img");
                    bolaImage.src = "img/bola.png"; 
                    bolaImage.id = 'bola'+i;
                    div.appendChild(bolaImage);
                    createdBolas++;
                }
            // bola grande    
            } else {
                if(bolasGrid[i][x] == 1) {
                    var bolaImage = document.createElement("img");
                    bolaImage.src = "img/bola_grande.png"; 
                    bolaImage.id = 'bolaGrande'+i;
                    div.appendChild(bolaImage);
                    createdBolas++;
                    createdBolaGrande++;
                }
            }  

            tablero.append(div);
        }
    }

    game.appendChild(tablero);

    background = document.createElement('div');
    background.id = 'background';
    tablero.append(background);

    for (var x = 0; x < 45; x++) {
        var div = document.createElement('div');
        div.id = 'bg'+x;
        div.className = 'bg';
        background.append(div);
    }

    let pacman = document.createElement('div');
    pacman.id = 'pacman';
    pacman.setAttribute('acomerfantasmas', false);
    pacman.style.top = "90px";
    pacman.style.left = "240px";
    
    let pacmanImage = document.createElement("img");
    pacmanImage.src = "img/pac-man.png"; 
    pacmanImage.id = 'pacmanImage';
    pacman.appendChild(pacmanImage);

    pacman.vidas = 5;
    document.getElementById("tablero").append(pacman); 
    document.getElementById('panelScores').innerHTML = "<span class='title'>SCORES: </span> <span class='data'>"+0+"</span>";

    // Asignar la función al evento keydown del documento
    document.addEventListener('keydown', manejarTeclaPresionada);

    // Iniciar la cuenta regresiva
    actualizarYMostrarTiempoRestante();
   
    fan1 = new Fantasma(1,8,8, 1200);
    fan2 = new Fantasma(2,8,9, 800);
    fan3 = new Fantasma(3,7,9, 500);
    fan4 = new Fantasma(4,9,9, 100);
 
} 

function movePacman(position, pacmanElement, currentTop, currentLeft) {

    if(bolas<193) {
        var elementoPath = document.getElementById("x"+positionX+"y"+positionY).getAttribute("path");
        switch(position){
            case "DOWN": 
                if(!elementoPath.includes('3')) {
                    pacmanElement.style.top = (currentTop + 30) + 'px'; 
                    positionY++;
                } 
                break;
            case "UP":
                if(!elementoPath.includes('1')) {
                    pacmanElement.style.top = (currentTop - 30) + 'px';
                    positionY--;
                }
                break;
            case "LEFT": 
                if (elementoPath.includes('6')) {
                   // console.log("ENTRO");   
                    pacmanElement.style.left = '480px';
                    positionX = 16;
                    //console.log(positionX);
                } else if(!elementoPath.includes('4')) {
                    pacmanElement.style.left = (currentLeft - 30) + 'px';
                    positionX--;
                } 
                break;
            case "RIGHT": 
                if (elementoPath.includes('5')) {
                    pacmanElement.style.left = '0px';
                    positionX = 0;
                    //console.log(positionX);
                }  else if(!elementoPath.includes('2')) {
                    pacmanElement.style.left = (currentLeft + 30) + 'px';
                    positionX++;
                }
                break;
        }
         
        var elemento = document.getElementById("x" + positionX + "y" + positionY);

        if (elemento.hasChildNodes()) {
            if (elemento.firstChild) {
                //console.log(elemento.firstChild);
                if(elemento.firstElementChild.id.startsWith('bolaGrande')){
                    aComerFantasmas();
                    acomerfantasmas = true;
                }
                elemento.removeChild(elemento.firstChild);  
            }
            bolas++;
        } else if(!elemento.hasChildNodes()){
            //alert("NO");
        }

        document.getElementById('panelScores').innerHTML = "<span class='title'>SCORES: </span> <span class='data'>"+bolas+"</span>";

        if(acomerfantasmas===true) {
            if( (document.querySelector('#fantasma1').offsetLeft===pacmanElement.offsetLeft) && 
                (document.querySelector('#fantasma1').offsetTop===pacmanElement.offsetTop ) ){
                    fan1.parar();
                    //console.log(document.querySelector('#fantasma1').offsetLeft, pacmanElement.offsetLeft, document.querySelector('#fantasma1').offsetTop, pacmanElement.offsetTop)     
            } else if( (document.querySelector('#fantasma2').offsetLeft===pacmanElement.offsetLeft) && 
                        (document.querySelector('#fantasma2').offsetTop===pacmanElement.offsetTop ) ){
                            fan2.parar();
                            /*fan2.style.display="none"; */ 
            } else if( (document.querySelector('#fantasma3').offsetLeft===pacmanElement.offsetLeft) && 
                       (document.querySelector('#fantasma3').offsetTop===pacmanElement.offsetTop ) ){
                            fan3.parar();
                            /*fan3.style.display="none"; */
            } else if( (document.querySelector('#fantasma4').offsetLeft===pacmanElement.offsetLeft) && 
                       (document.querySelector('#fantasma4').offsetTop===pacmanElement.offsetTop ) ){
                            fan4.parar();
                            /*fan4.style.display="none"; */
            }
            
        }
    } else if(bolas==193) {
        stopIntervals();
        let mensageWin = document.createElement("div");
        mensageWin.id = "mensageWin";
        mensageWin.innerHTML = "You Win! Play again";
        tablero.append(mensageWin);
        mensageWin.addEventListener('click', restart);
    }
}

function restart() {

    game.remove();
    positionX = 8;
    positionY = 3;
    bolas = 0;
    nivel = 1;
    tiempoRestante = 5;
    segundosRestantes = 0;
    tiempoEnSegundos = tiempoRestante * 60 + segundosRestantes;

    // Obtener referencia al div donde se mostrará la cuenta regresiva
    cuentaRegresivaDiv = document.getElementById("panelTime");
    acomerfantasmas = false;
    init();
}

// Función que maneja el evento de tecla presionada
function manejarTeclaPresionada(event) {

    var pacmanElement = document.getElementById('pacman');
    var divContainerElement = document.getElementById('tablero');
    var divContainerElementRight = divContainerElement.offsetWidth - 30;
    var divContainerElementBotton = divContainerElement.offsetHeight - 30;
    
    var currentTop = parseInt(pacmanElement.style.top, 10) || 0; // Obtener el valor actual o usar 0 si no existe
    var currentLeft = parseInt(pacmanElement.style.left, 10) || 0; // Obtener el valor actual o usar 0 si no existe

    if (event.keyCode === 40 && currentTop<divContainerElementBotton) {  // DOWN
        movePacman('DOWN', pacmanElement, currentTop, currentLeft);
    } else if (event.keyCode === 38 && currentTop>0) {  // UP
        movePacman('UP', pacmanElement, currentTop, currentLeft);
    } else if (event.keyCode === 37 && currentLeft>0) {  // LEFT   
        movePacman('LEFT', pacmanElement, currentTop, currentLeft);
    } else if (event.keyCode === 39 && currentLeft<divContainerElementRight) {  // RIGHT
        movePacman('RIGHT', pacmanElement, currentTop, currentLeft);
    } 
}

var intervalIds = []

function Fantasma(_number, _fantasmaX, _fantasmaY, _velocidad) {

    this.number = _number;
    this.fantasmaX = _fantasmaX;
    this.fantasmaY = _fantasmaY;
    this.fantasmaXpx = (this.fantasmaX*30)+"px";
    this.fantasmaYpx = (this.fantasmaY*30)+"px";
    this.velocidad = _velocidad;
    this.dentroDelTablero = true;
    this.puedeComerAPacman = true;
    this.fantasma = document.createElement('div');
    this.fantasma.id = 'fantasma'+this.number;
    this.fantasma.className = 'fantasma';
    this.fantasma.style.top = this.fantasmaYpx; 
    this.fantasma.style.left = this.fantasmaXpx;
    this.fantasmaImage = document.createElement("img");
    this.fantasmaImage.src = "img/fantasma"+this.number+".png"; 
    this.fantasmaImage.id = 'fantasmaImage'+this.number;
    this.fantasma.appendChild(this.fantasmaImage);
    document.getElementById("tablero").append(this.fantasma);
    this.direccionFantasma;
    this.direccionFantasmaUltimos = 0;
    this.direccionFantasmaEje = "UPDOWN";
 
    this.deshabilitarComerAPacman = () => {
        this.puedeComerAPacman = false;
    } 

    this.habilitarComerAPacman = () => {
        this.puedeComerAPacman = true; 
    } 
    
    this.sacarDelTablero = () => {
        this.dentroDelTablero = false;
    }

    this.meterEnElTablero = () => {
        this.dentroDelTablero = true;
    }

    this.parar = () => {
        clearTimeout(this.interval1);
        this.fantasma.style.display = "none";   
    }

    this.comerPacman = () => {

        if(this.puedeComerAPacman && this.dentroDelTablero) {

                this.pacmanPosition = document.querySelector('#pacman');
                this.pacmanXPosition = this.pacmanPosition.offsetLeft;
                this.pacmanYPosition = this.pacmanPosition.offsetTop;
                this.fantasmaXPosition = this.fantasma.offsetLeft;
                this.fantasmaYPosition = this.fantasma.offsetTop;
                if(this.pacmanXPosition===this.fantasmaXPosition && this.pacmanYPosition===this.fantasmaYPosition && pacman.vidas>0) {
                    pacman.vidas--;
                    document.getElementById("pacmanImage"+pacman.vidas).style.opacity = 0.2;
                    parpadear('pacman', 2000);

                } else if(pacman.vidas==0) {

                    document.getElementById("pacmanImage"+pacman.vidas).style.opacity = 0.2;
                    stopIntervals();
                    let mensajeLose = document.createElement("div");
                    mensajeLose.id = "mensageLose";
                    mensajeLose.innerHTML = "GAME OVER Play again";
                    game.append(mensajeLose);
                    mensajeLose.addEventListener('click', restart);

                    document.getElementById("panelPrincipal").style.filter = "grayscale(1)";
                    document.getElementById("tablero").style.filter = "grayscale(1)";
                
                }   

        }
    }

    this.aCorrer = () => {
 
        this.elementoPath = document.getElementById("x"+this.fantasmaX+"y"+this.fantasmaY).getAttribute("path");
        this.numeroAleatorio;
        this.miString = [1,2,3,4];
        // Dividir los números en un array, considerando cada dígito como un elemento del array
        this.arrayDeNumeros = this.elementoPath.split('').map(Number);;
        this.miStringFiltrado = this.miString.filter(valor => {
            // Devuelve true si el valor no está presente en miString
            return this.arrayDeNumeros.indexOf(valor) === -1;
        });

        if(this.miStringFiltrado.includes(this.direccionFantasma) && this.direccionFantasmaUltimos<3) {
            this.numeroAleatorio = this.direccionFantasma;
            this.direccionFantasmaUltimos++;
        } else {
            
            if(this.direccionFantasmaEje=="UPDOWN") {
                this.arrayDireccion = [1,3];
                if(this.miStringFiltrado.includes(1) || this.miStringFiltrado.includes(3)) {
                    this.direccionFiltrada = this.miStringFiltrado.filter(valor => {
                        // Devuelve true si el valor no está presente en miString
                        return this.arrayDireccion.indexOf(valor) === -1;
                    });
                }
                this.miStringFiltrado = this.miStringFiltrado;

            } else if(this.direccionFantasmaEje=="LEFTRIGHT") {
                this.arrayDireccion = [2,4];
                if(this.miStringFiltrado.includes(2) || this.miStringFiltrado.includes(4)) {
                    this.direccionFiltrada = this.miStringFiltrado.filter(valor => {
                        // Devuelve true si el valor no está presente en miString
                        return this.arrayDireccion.indexOf(valor) === -1;
                    });
                }
                this.miStringFiltrado = this.miStringFiltrado;
            }
            this.numeroAleatorio = this.miStringFiltrado[Math.floor(Math.random() * this.miStringFiltrado.length)];
            this.direccionFantasmaUltimos=0;
        }
        this.direccionFantasma = this.numeroAleatorio;

        if(this.numeroAleatorio === 1 || this.numeroAleatorio === 3) {
            this.direccionFantasmaEje = "UPDOWN";
        } else if(this.numeroAleatorio === 2 || this.numeroAleatorio === 4) {
            this.direccionFantasmaEje = "LEFTRIGHT";
        }
        
        if (this.numeroAleatorio === 1) {
            document.getElementById(this.fantasma.id).style.top = parseFloat(window.getComputedStyle(document.getElementById(this.fantasma.id)).top)-30 + "px";
            this.fantasmaY--;
        } else if (this.numeroAleatorio === 2) {
            document.getElementById(this.fantasma.id).style.left = parseFloat(window.getComputedStyle(document.getElementById(this.fantasma.id)).left)+30 + "px";
            this.fantasmaX++;
        } else if (this.numeroAleatorio === 3) {
            document.getElementById(this.fantasma.id).style.top = parseFloat(window.getComputedStyle(document.getElementById(this.fantasma.id)).top)+30 + "px";
            this.fantasmaY++;
        } else if (this.numeroAleatorio === 4) {
            document.getElementById(this.fantasma.id).style.left = parseFloat(window.getComputedStyle(document.getElementById(this.fantasma.id)).left)-30 + "px";
            this.fantasmaX--;
        } else if (this.numeroAleatorio === 0) {
            document.getElementById(this.fantasma.id).style.top = parseFloat(window.getComputedStyle(document.getElementById(this.fantasma.id)).top)-30 + "px";
            
        }
        this.comerPacman();
    }

    this.interval1 = setInterval(() => {
        this.aCorrer();
      }, _velocidad);
      intervalIds.push(this.interval1); 
}

function stopIntervals() {
    for (var i = 0; i < intervalIds.length; i++) {
      clearInterval(intervalIds[i]);
    }
    intervalIds = []; 
    clearTimeout(temporizador);
}

// Establecer el tiempo inicial en minutos
var tiempoRestante = 5;
var segundosRestantes = 0;

// Convertir minutos a segundos
var tiempoEnSegundos = tiempoRestante * 60 + segundosRestantes;

// Obtener referencia al div donde se mostrará la cuenta regresiva
var cuentaRegresivaDiv = document.getElementById("panelTime");

var temporizador;

function actualizarYMostrarTiempoRestante() {
    // Calcular minutos y segundos restantes
    var minutos = Math.floor(tiempoEnSegundos / 60);
    var segundos = tiempoEnSegundos % 60;

    // Convertir minutos y segundos a cadenas y aplicar la función padStart
    var minutosStr = minutos.toString();
    var segundosStr = segundos.toString().padStart(2, '0');

    // Mostrar minutos y segundos en el div
    document.getElementById("panelTime").innerHTML = "<span class='title'>TIME</span><span class='data'>" + minutosStr + ":" + segundosStr + "</span>";

    // Verificar si el tiempo ha llegado a cero
    if (tiempoEnSegundos <= 0) {
        cuentaRegresivaDiv.innerHTML = "¡Tiempo terminado!";
        clearTimeout(temporizador);
    } else {
        // Disminuir el tiempo restante en 1 segundo
        tiempoEnSegundos--;

        // Establecer un temporizador para llamar a la función nuevamente después de 1 segundo
        temporizador = setTimeout(actualizarYMostrarTiempoRestante, 1000); // 1000 milisegundos = 1 segundo
    }
}


function parpadear(_item, _tiempo) {
    var obj = document.getElementById(_item); 
    var intervalo = setInterval(function() {
      if (obj.style.opacity === '1') {
        obj.style.opacity = '0';
      } else {
        obj.style.opacity = '1';
      }
    }, 50); 
  
    // Detener el parpadeo después de cierto tiempo (aquí, después de 5 segundos)
    setTimeout(function() {
      clearInterval(intervalo);
      obj.style.opacity = '1'; // Restaurar la opacidad al valor original
    }, _tiempo);
  }

  function aComerFantasmas() {
    //console.log("a comer fantasmas!!");

    fan1.deshabilitarComerAPacman();
    fan2.deshabilitarComerAPacman();
    fan3.deshabilitarComerAPacman();
    fan4.deshabilitarComerAPacman();
    
    parpadear("fantasma1", 10000);
    parpadear("fantasma2", 10000);
    parpadear("fantasma3", 10000);
    parpadear("fantasma4", 10000);  

    volverAComer = setInterval(() => {
        fan1.habilitarComerAPacman();
        fan2.habilitarComerAPacman();
        fan3.habilitarComerAPacman();
        fan4.habilitarComerAPacman();
    
      }, 10000);
  }


