let urlApiQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";
let idResposta = 0;
let unicoQuizz;

function buscarUInicoQuizz() {
  //console.log("Cheguei");
  idResposta = localStorage.getItem("idQuizz");
  pegarUnicoQuizz();
}

function pegarUnicoQuizz() {
  const promiseUnic = axios.get(`${urlApiQuizz}${idResposta}`);
  //console.log(idResposta);
  promiseUnic.then(renderizarQuizz);
}

function renderizarQuizz(resposta) {
  unicoQuizz = resposta.data;
  //console.log(unicoQuizz);
  //const adcQuizz = document.querySelector();
  banner();
}

function banner() {
  let banner = document.querySelector(".banner");
  banner.innerHTML = "";
  banner.innerHTML += `
        <img src=${unicoQuizz.image} alt="">
        <h2>${unicoQuizz.title}</h2>
    `;
  perguntas();
}

function perguntas() {
  let cxPerguntas = document.querySelector(".container-perguntas");
  cxPerguntas.innerHTML = "";

  let listaPerguntas = unicoQuizz.questions;

  for (let i = 0; i < listaPerguntas.length; i++) {
    let pergunta = listaPerguntas[i];

    cxPerguntas.innerHTML += `
            <div class="cx-pergunta">
                <div class="pergunta">
                    <p>${pergunta.title}</p>
                </div>
                <div class="respostas">
                                     
                </div>
            </div> 
            `;

    inserirRespostas(pergunta, i);
  }
}

function inserirRespostas(pergunta, i) {
  //console.log(i)
  let cxRespostas = document.querySelectorAll(".respostas");
  //console.log(cxRespostas.length)

  let listaRespostas = pergunta.answers.sort(comparador);

  for (let x = 0; x < listaRespostas.length; x++) {
    let resposta = listaRespostas[x];

    cxRespostas[i].innerHTML += `
            <div class="opcao" onclick="comportamento(this)">
            <img src=${resposta.image} alt="">
            <p>${resposta.text}</p>
            <p class="meuId">${resposta.isCorrectAnswer}</p>
            </div> `;
  }
}

function comparador() {
  return Math.random() - 0.5;
}

function comportamento(elemento) {
  let x = elemento.parentNode;
  let y = x.parentNode;

  let alternativas = x.querySelectorAll(".opcao");

  if (
    elemento.classList.contains("respostaSelecionada") ||
    elemento.classList.contains("efeito")
  ) {
    return;
  }

  elemento.classList.add("respostaSelecionada");
  y.classList.add("respondida");
  //console.log(y);

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].classList.contains("respostaSelecionada") == false) {
      alternativas[i].classList.add("efeito");
    }
  }

  let corLetra = x.querySelectorAll(".meuId");

  for (let u = 0; u < corLetra.length; u++) {
    if (corLetra[u].innerHTML == "true") {
      corLetra[u].parentNode.classList.add("correto");
      //console.log("sim")
    } else {
      corLetra[u].parentNode.classList.add("errado");
    }
  }

  let resposta = elemento.querySelector(".meuId")
  cxDasRespSelecionadas.push(resposta.innerHTML)

  setTimeout(proximaPergunta, 2000);
}

let cxDasRespSelecionadas = [];
function proximaPergunta() {
  let listaPerguntas = document.querySelectorAll(".cx-pergunta");
  for (let i = 0; i < listaPerguntas.length; i++) {
    if (listaPerguntas[i].classList.contains("respondida") == false) {
      listaPerguntas[i].scrollIntoView();
      break
    }
  }

  let listaRespostas = document.querySelectorAll(".respondida");
  if (listaPerguntas.length === listaRespostas.length) {
    setTimeout(mostrarResultado,2000)
  }
}

function mostrarResultado(){
  let cxResultado = document.querySelector(".container-resultado");
    cxResultado.classList.remove("esconder");
    cxResultado.scrollIntoView()

    mostrarNivel()
}

function mostrarNivel(){
  let pontucao = 0;
  //console.log(cxDasRespSelecionadas)

  for(let i=0; i<cxDasRespSelecionadas.length; i++){
    if(cxDasRespSelecionadas[i] == "true"){
      pontucao += 1;
    }
  }

  let pontuacaoFinal = Math.round((pontucao/cxDasRespSelecionadas.length)*100) // mostra a % de acerto
  //console.log(pontuacaoFinal)

  let niveis = unicoQuizz.levels // mostra a lista de niveis 
  //console.log(niveis)

  let cxResultado = document.querySelector(".cx-resultado")
  cxResultado.innerHTML = "";

  let minValues = [] // lista para verificar os valores dos niveis
  for (let n=0; n<niveis.length; n++){
    minValues.push(niveis[n].minValue)

  } 
  minValues.sort((a,b) => a - b) // coloca a lista dos valores dos niveis em ordem crescente 
  //console.log(minValues)
  

  let posi = 0
  for (let z= 0; z<minValues.length; z++){ 
    if(pontuacaoFinal >= minValues[z] ){
      posi = minValues[z]
    }
  }

 // console.log(posi)

  for (let c= 0; c<niveis.length; c++){
      
        if(niveis[c].minValue == posi){
          cxResultado.innerHTML += `  
              <div class="titulo">
                  <p>${niveis[c].title}</p>
              </div>
              <div class="conteudo">
                  <img src=${niveis[c].image} alt="">
                  <div class="texto">
                      <p>${niveis[c].text}</p>
                  </div>
              </div>`
      }

  }
  



}

function reiniciar() {
  location.reload();
  let topo = document.querySelector(".banner");
  topo.scrollIntoView();
}
