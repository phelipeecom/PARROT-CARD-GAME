const imagens = [
    "projeto__parrots__imagens/assets/bobrossparrot.gif",
    "projeto__parrots__imagens/assets/explodyparrot.gif",
    "projeto__parrots__imagens/assets/fiestaparrot.gif",
    "projeto__parrots__imagens/assets/metalparrot.gif",
    "projeto__parrots__imagens/assets/revertitparrot.gif",
    "projeto__parrots__imagens/assets/tripletsparrot.gif",
    "projeto__parrots__imagens/assets/unicornparrot.gif"
];

let primeiraCarta = null;
let segundaCarta = null;
let bloquearClique = false;
let contagemjogadas = 0;

let maça = Number(prompt("Com quantas cartas você quer jogar?"));
function iniciar(){

    while(maça < 4 || maça > 14 || maça % 2 !== 0){
        alert("Você precisa inserir um número par de 4 a 14");
        maça = Number(prompt("Com quantas cartas você quer jogar?"));

    }
    
    alert("você pode jogar!");

    let pera = imagens.slice(0, maça / 2);
    let uva = pera.concat(pera);

    uva = embaralhar(uva);

    const manga = document.querySelector(".cartas");
    manga.innerHTML = '';

    uva.forEach(carta => {const cartaHTML = `<div class="carta">
                <div class="faces" onclick="virar(this)">
                    <div class="frente">
                        <img src="projeto__parrots__imagens/assets/back.png" alt="">
                    </div>
                    <div class="verso">
                        <img src="${carta}" alt="">
                    </div>
                </div>
            </div>`; manga.innerHTML += cartaHTML;});

}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    
}

iniciar();

function adaptarpagina (){
    if(maça === 6 || maça === 8 || maça === 10 || maça === 12 || maça === 14){
    const goiaba = document.querySelector(".cartas");
    goiaba.classList.remove("cartas");
    goiaba.classList.add(`cartas-${maça}`);
    }
}

adaptarpagina();

function virar(banana){
    if (bloquearClique || banana === primeiraCarta || banana.classList.contains("virar")) return;

    banana.classList.add("virar");
    contagemjogadas++;

    if (!primeiraCarta) {
        primeiraCarta = banana;
    } else {
        segundaCarta = banana;
        bloquearClique = true;

        const img1 = primeiraCarta.querySelector(".verso img").src;
        const img2 = segundaCarta.querySelector(".verso img").src;

        if (img1 === img2) {
            resetarCartas();
            verificarVitoria();
        } else {
            setTimeout(() => {
                primeiraCarta.classList.remove("virar");
                segundaCarta.classList.remove("virar");
                resetarCartas();
            }, 1000);
        }
    }

}

function resetarCartas() {
    [primeiraCarta, segundaCarta] = [null, null];
    bloquearClique = false;
}


function verificarVitoria() {
    const todasViradas = document.querySelectorAll(".faces.virar").length;
    const totalCartas = document.querySelectorAll(".carta").length;
    
    console.log("Cartas viradas:", todasViradas); 
    console.log("Total de cartas:", totalCartas);
    
    if (todasViradas === totalCartas) {
        setTimeout(() => alert(`Parabéns, você ganhou em ${contagemjogadas} jogadas!`), 500);
    }
}