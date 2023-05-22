


const seleccionarAtaque = document.getElementById ("seleccionar-ataque")
const botonMokemonJugador = document.getElementById ("boton-mokemon")
const bontonReinicar = document.getElementById("boton-reiniciar")
const seleccionaPokemon = document.getElementById ("seleccionar-pokemon")

const spanPokemonJugador = document.getElementById("pokemon-jugador")

const  spanPokemonEnemigo = document.getElementById("pokemon-enemigo")
const spanVidasJugador = document.getElementById ("vidas-jugador")
const spanVidasvidasenemigo = document.getElementById ("vidas-enemigo")
const contenedorDeTarjetasMokepon = document.getElementById("contenedorDetarjetasMokepon")
const contenedorAtaques = document.getElementById("contenedorAtaques")

// pendiente 
const seleccionarMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-Jugador")
const ataqueDelEnemigo = document.getElementById("ataque-Enemigo")
const seleccionarReinicar = document.getElementById ("reinicar")

const seleccionarMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigo = null 
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputPayamon 
let inputMellomon
let inputHuevomon 
let pokemonJugador
let mokeponJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra
let bonotes = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasDelJugador = 3
let vidasDelEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaFondo = new Image()
mapaFondo.src = "https://static.platzi.com/media/user_upload/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.jpg" 

let AlturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 700

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
}

AlturaQueBuscamos = anchoDelMapa * 900 / 1100

mapa.width = anchoDelMapa
mapa.height = AlturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null ){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 140
        this.alto = 140
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon () {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}


let payamon = new Mokepon ("Payamon", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png", 5 ,  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png" )

let mellomon = new Mokepon ("Mellomon","https://assets.pokemon.com/assets/cms2/img/pokedex/full/103.png", 5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/103.png")

let huevomon = new Mokepon ("Huevomon", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/102.png", 5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/102.png")



const PAYAMON_ATAQUES = [
    {nombre: "💧", id: "boton-agua" }, 
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "🌱", id: "boton-tierra" },
]

payamon.ataques.push(...PAYAMON_ATAQUES)

const MELLOMON_ATAQUES = [
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "💧", id: "boton-agua"  },
    {nombre: "🔥", id: "boton-fuego" },
]

mellomon.ataques.push(...MELLOMON_ATAQUES)

const HUEVOMON_ATAQUES = [
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "🔥", id: "boton-fuego" },
    {nombre: "🌱", id: "boton-tierra" },
    {nombre: "💧", id: "boton-agua" }, 
]

huevomon.ataques.push(...HUEVOMON_ATAQUES)


mokepones.push(payamon,mellomon,huevomon) 

// Funtion iniciar juego - Escuchar evento 
function iniciarJuego (){
    
    seleccionarReinicar.style.display = "none"

    seleccionarMapa.style.display = "none"

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="pokemon" id=${mokepon.nombre}>
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
         contenedorDeTarjetasMokepon.innerHTML += opcionDeMokepones

         inputMellomon = document.getElementById("Mellomon")
         inputHuevomon = document.getElementById("Huevomon")
         inputPayamon = document.getElementById("Payamon")
    })

    seleccionarAtaque.style.display = "none"
    
    
    botonMokemonJugador.addEventListener ("click", seleccionarPokemonJugador)
    
    
   
    bontonReinicar.addEventListener ("click", reiniciarJuego) 

    unirseAlJuego()

}

function unirseAlJuego () {
    fetch("http://localhost:8080/unirse")
    .then (function (res) {
        if (res.ok) {
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

//Funcion de Selecionar Pokemon
function seleccionarPokemonJugador (){

    seleccionaPokemon.style.display = "none"

//Comprueba Seleccion y Cambia el DOM con el pokemon selecionado
    if ( inputPayamon.checked){
        spanPokemonJugador.innerHTML = inputPayamon.id
        pokemonJugador = inputPayamon.id
    }
    else if ( inputMellomon.checked){
        spanPokemonJugador.innerHTML = inputMellomon.id
        pokemonJugador = inputMellomon.id
    }
    else if ( inputHuevomon.checked){
        spanPokemonJugador.innerHTML = inputHuevomon.id
        pokemonJugador = inputHuevomon.id
    }
    else {
        alert ("Selecciona un pokemon")
    }
    
    seleccionarMokepon (pokemonJugador)

    extraerAtaques (pokemonJugador)
    seleccionarMapa.style.display = "flex"
    iniciarMapa()
    
}

function seleccionarMokepon (mokeponJugador) {
    fetch( `http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon:mokeponJugador
        })
    })
}
// funtion extraerAtaques

function extraerAtaques () {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (pokemonJugador === mokepones [i].nombre) {
            ataques = mokepones [i].ataques
        }  
    }
    mostrarAtaques(ataques)
}

// funtion mostrarAtaques

function mostrarAtaques (ataques) {
    ataques.forEach ((ataque)=>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque botonataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
     botonFuego = document.getElementById ("boton-fuego")
     botonAgua = document.getElementById ("boton-agua")
     botonTierra = document.getElementById ("boton-tierra")
     bonotes = document.querySelectorAll(".botonataque")

}

function secuenciaAtaque (){
    bonotes.forEach((boton)=>{
        boton.addEventListener ("click", (e)=>{
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }   
                if(ataqueJugador.length === 5) {
                    enviarAtaques
                }
                enviarAtaques()
        })
    })
}

function enviarAtaques () {
    fetch(`https://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
        
    })
    intervalo = setInterval (obtenerAtaques,50)
}

function obtenerAtaques () {
    fetch (`https://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res){
        if (res.ok) {
            res.json()
            .then(function({ataques}){
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}


//Funcion seleccion del pokemon del enemigo 
function seleccionarPokemonEnemigo (){
    let pokemonAleatorio = aleatorio (0,mokepones.length -1 )
   
    spanPokemonEnemigo.innerHTML = mokepones [pokemonAleatorio].nombre
    ataquesMokeponEnemigo = [pokemonAleatorio].ataques

    secuenciaAtaque()

}
// Funtion Ataque del jugador
//  ata que aleatorio
function ataqueAleatorioEnemigo () {
    console.log("ataque enemigo" , ataquesMokeponEnemigo)
        ataqueAleatorio = aleatorio (0,ataqueAleatorioEnemigo.length -1)

        if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
            ataqueEnemigo.push ("FUEGO") 
        } else if ( ataqueAleatorio == 3 || ataqueAleatorio == 4 ) {
            ataqueEnemigo.push ("AGUA") 
        } else {
            ataqueEnemigo.pus("TIERRA")
        }
        iniciarPelea ()      
}

// funtion iniciar pelea

function iniciarPelea (){
    if (ataqueJugador.length === 5 ) {
        combate ()
    }
}

// 

function indexAmbosOponentes (jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador [jugador]
    indexAtaqueEnemigo = ataqueEnemigo [enemigo]
}

// COMBATE 

function combate () {
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index]=== ataqueEnemigo[index]){
            indexAmbosOponentes (index, index)
            crearMensaje (" EMPATE ")
    }  else if((  ataqueJugador == " FUEGO" && ataqueEnemigo == "TIERRA" ) || ( ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"  ) || ( ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA" )) {
        crearMensaje  (" GANASTE !!! 🥳🥳🎉🎊 ")
        indexAmbosOponentes (index, index)
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    }  else {
        crearMensaje ("  PERDISTE  ")
        indexAmbosOponentes (index, index)
        victoriasEnemigo++
        spanVidasvidasenemigo.innerHTML = victoriasEnemigo
    
    }

}
    revisarVidas ()  
}

// Funtion revisar vidas

function revisarVidas () {
   if ( vidasDelEnemigo == 0 ) {
    crearMensajeFinal  ("Esto es un empate ") 
   } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal ( "HAS GANADO, ENHORABUENA 🏆 ")  
   } else {
    crearMensajeFinal ("GAME OVER...... SIGUE INTENTANDO")
   }
  }

  
  

// funtion para crear un parrafo nuevo

function crearMensaje (resultado) {
   //  let notificacion = document.createElement("p")
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    seleccionarMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    // seleccionarMensajes.appendChild(notificacion)
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal (resultadoFinal) {
    seleccionarReinicar.style.display = "block"
    seleccionarMensajes.innerHTML = resultadoFinal

  
}

function reiniciarJuego () {
    location.reload ()
}

  function pintarCanvas (){
    mokeponJugadorObjeto.x = mokeponJugadorObjeto.x + mokeponJugadorObjeto.velocidadX
    mokeponJugadorObjeto.y = mokeponJugadorObjeto.y + mokeponJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponJugadorObjeto.pintarMokepon()

    enviarPosicion(mokeponJugadorObjeto.x,mokeponJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

    // payamonEnemigo.pintarMokepon()
    //mellomonEnemigo.pintarMokepon()
   // huevomonEnemigo.pintarMokepon()
    
   //  if (mokeponJugadorObjeto.velocidadX !== 0 || mokeponJugadorObjeto.velocidadY !==0) {
   //    revisarColision(payamonEnemigo)
   //    revisarColision(mellomonEnemigo)
  //     revisarColision(huevomonEnemigo)
  //  }
}

function enviarPosicion (x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post" ,
        headers: {
            "Content-Type": "appication/json"
        },
        body:JSON.stringify({
            x,
            y
        })
    }) 
    .then(function (res){
        if (res.ok) {
            res.json()
                .then(function ({enemigos}){
                console.log(enemigos) 
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Payamon"){
                        mokeponEnemigo = new Mokepon ("Payamon", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png", 5 ,  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png", enemigo.id)
                    } else if (mokeponNombre === "Mellomon" ) {
                        mokeponEnemigo = new Mokepon ("Mellomon","https://assets.pokemon.com/assets/cms2/img/pokedex/full/103.png", 5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/103.png", enemigo.id )
                    } else if (mokeponNombre === "Huevomon") {
                        mokeponEnemigo = new Mokepon ("Huevomon", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/102.png", 5, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/102.png", enemigo.id)
                    }   
                    
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                // lo comente si se solucionar error error error error 
                    return mokeponEnemigo
                })      
            })
        }
    })
}

function moverDerecha () {
    mokeponJugadorObjeto.velocidadX = 5
}
function moverIzquierda () {
    mokeponJugadorObjeto.velocidadX= -5
}
function moverAbajo () {
    mokeponJugadorObjeto.velocidadY = 5
}
function moverArriba () {
    mokeponJugadorObjeto.velocidadY = -5
}

function detenerMovimiento () {
    
    mokeponJugadorObjeto.velocidadX = 0 
    mokeponJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa () {
  
    mokeponJugadorObjeto = obtenerObjetoMokepon (pokemonJugador)
    console.log(mokeponJugadorObjeto,pokemonJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener ("keydown", sePresionoUnaTecla)

    window.addEventListener ("keyup", detenerMovimiento)
}

function obtenerObjetoMokepon () {
    for (let i = 0; i < mokepones.length; i++) {
        if (pokemonJugador === mokepones [i].nombre) {
          return   mokepones [i]
        }  
    }
}

function revisarColision (enemigo) {
    const arribaEnemigo = 
        enemigo.y
    const abajoEnemigo = 
        enemigo.y + enemigo.alto
    const derechaEnemigo = 
        enemigo.x + enemigo.ancho
    const izquierdaEnemigo = 
        enemigo.x

    const arribaMokepon = mokeponJugadorObjeto.y
    const abajoMokepon = mokeponJugadorObjeto.y + mokeponJugadorObjeto.alto
    const derechaMokepon = mokeponJugadorObjeto.x + mokeponJugadorObjeto.ancho
    const izquierdaMokepon = mokeponJugadorObjeto.x

    if (
        abajoMokepon < arribaEnemigo || 
        arribaMokepon > abajoEnemigo || 
        derechaMokepon < izquierdaEnemigo || 
        izquierdaEnemigo > derechaEnemigo
    ) {
        return
    }
        detenerMovimiento()
        clearInterval(intervalo)
        console.log ("Se detecto una colision")

        enemigoId = enemigo.id


        seleccionarAtaque.style.display = "flex"
        seleccionarMapa.style.display = "none"
        seleccionarPokemonEnemigo (enemigo)
}

//Funcion numero aleatorio
function aleatorio (min,max){
    return Math.floor ( Math.random () * (max - min + 1) + min )
}

window.addEventListener ("load", iniciarJuego )















