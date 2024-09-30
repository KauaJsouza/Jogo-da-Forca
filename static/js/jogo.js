let palavraAtual;
let dicaAtual;
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes;

function normalizeString(str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function limparBoneco(){
    const forca = document.getElementById("forca");
    forca.innerHTML = "";
}

function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;
    atualizarDisplayDoJogo();
    limparBoneco();
}

function atualizarDisplayDoJogo() {
    let palavraExibida = "";
    for (let i = 0; i < palavraAtual.length; i++) {
        const letra = normalizeString(palavraAtual[i]);
        if (letrasAdivinhadas.indexOf(letra) !== -1 || palavraAtual[i] === " ") {
            palavraExibida += palavraAtual[i];
        } else {
            palavraExibida += "_";
        }
    }
    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;
}

function adivinharLetra() {
    const entradaAdvinhacao = document.getElementById("guess");
    const letraAdivinhada = normalizeString(entradaAdvinhacao.value);

    if (
        letraAdivinhada.length === 1 &&
        /^[a-záéíóúãõç\s]+$/.test(letraAdivinhada)
    ) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);

            let letraNaoEncontrada = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (normalizeString(palavraAtual[i]) === letraAdivinhada) {
                    letraNaoEncontrada = false;
                    break;
                }
            }
            if (letraNaoEncontrada) {
                tentativasRestantes--;
            }

            atualizarDisplayDoJogo();
            desenharBoneco();

            let palavraCompleta = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (letrasAdivinhadas.indexOf(normalizeString(palavraAtual[i])) === -1 && palavraAtual[i] !== " ") {
                    palavraCompleta = false;
                    break;
                }
            }
            if (palavraCompleta) {
                document.getElementById("status").textContent = "Você venceu!";
            } else if (tentativasRestantes <= 0) {
                document.getElementById("status").textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
            }
        }
    }

    entradaAdvinhacao.value = "";
}

document.addEventListener("DOMContentLoaded", iniciarJogo);