let listaQuizz;
let id = "";
let urlApi = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let url = window.location.href.toString();
let variavel;
let numTitulo = 0;
let tituloInput = "";
let urlInput = "";
let perguntaInput = 0;

//metodo para validar se a url
const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

function acessarTela2(elemento) {
  console.log("Elemento " + elemento.querySelector(".meuId").innerHTML);

  window.location.href = "/tela2.html";
  localStorage.setItem("idQuizz", elemento.querySelector(".meuId").innerHTML);
}

function pegarQuizzServidor() {
  console.log("entrou");
  const promessa = axios.get(`${urlApi}quizzes`);
  promessa.then(chegouQuizz);
}

function chegouQuizz(resposta) {
  console.log("chegou");
  console.log(resposta.data);
  listaQuizz = resposta.data;
  addQuizz();
}

function addQuizz() {
  let listaTodasQuizz = document.querySelector(".lista-todosQuizz");
  listaTodasQuizz.innerHTML = "";

  let lsitaSeusQuizz = document.querySelector(".lista-seusQuizz");
  //lsitaSeusQuizz.innerHTML = "";
  variavel = "";
  for (let i = 0; i < listaQuizz.length; i++) {
    let quizz = listaQuizz[i];

    if (quizz.id === id) {
      lsitaSeusQuizz.innerHTML += `
                <li class="quizz" onclick="acessarTela2(this)">
                    <img src=${quizz.image} alt="">
                    <div class="dregade"></div>
                    <p>${quizz.title}</p>
                    <p class="meuId">${quizz.id}</p>
                </li>
            `;
    }
    listaTodasQuizz.innerHTML += `
            <li class="quizz" onclick="acessarTela2(this)">
                <img src=${quizz.image} alt="">
                <div class="dregade"></div>
                <p>${quizz.title}</p>
                <p class="meuId">${quizz.id}</p>
            </li>
        `;
    //console.log("ID " + quizz.id)
  }

  if (lsitaSeusQuizz.innerHTML === "") {
    let containerSeusQuizz = document.querySelector(".container-seusQuizz");
    containerSeusQuizz.classList.add("esconder");
  } else {
    let criarQuizz = document.querySelector(".criarQuizz");
    criarQuizz.classList.add("esconder");
  }
}

function prosseguirPerguntas() {
  let validacao = 0;
  let quizInput = 0;

  tituloInput = document.querySelector("#tituloNewQuiz").value;
  numTitulo = tituloInput.length;

  urlInput = document.querySelector("#urlNewQuiz").value;

  perguntaInput = parseInt(document.querySelector("#perguntaNewQuiz").value);

  quizInput = parseInt(document.querySelector("#niveisNewQuiz").value);

  if (20 <= numTitulo && numTitulo <= 65) {
    validacao++;
  }

  if (isValidUrl(urlInput)) {
    validacao++;
  }

  if (3 <= perguntaInput && Number.isInteger(perguntaInput)) {
    validacao++;
  }

  if (2 <= quizInput && Number.isInteger(quizInput)) {
    validacao++;
  }

  if (validacao === 4) {
    location.href = "criarPerguntas.html";
    localStorage.setItem("numPergunta", perguntaInput);
  } else {
    alert("Dados incorretos, favor preencher corretamente!");
  }
}

function renderizarPerguntas() {
  let numPerguntas = localStorage.getItem("numPergunta");

  const listaPerguntas = document.querySelector(".ulPergunta");
  listaPerguntas.innerHTML = "";

  for (let i = 1; i <= numPerguntas; i++) {
    listaPerguntas.innerHTML += `
            <div class="ulPergunta">
                <ul>
                    <h2>Pergunta ${i}</h2>
                    <li><input type="text" placeholder="Texto da Pergunta" id="textoPerguntaInput${i}"/></li>
                    <li><input type="text" placeholder="Cor de fundo da pergunta" /></li>
                    <h2>Resposta correta</h2>
                    <li><input type="text" placeholder="Resposta correta" /></li>
                    <li><input type="text" placeholder="URL da imagem" /></li>
                    <h2>Respostas incorretas</h2>
                    <li><input type="text" placeholder="Resposta incorreta 1" /></li>
                    <li><input type="text" placeholder="URL da imagem 1" /></li>
                    <br />
                    <li><input type="text" placeholder="Resposta incorreta 2" /></li>
                    <li><input type="text" placeholder="URL da imagem 2" /></li>
                    <br />
                    <li><input type="text" placeholder="Resposta incorreta 3" /></li>
                    <li><input type="text" placeholder="URL da imagem 3" /></li>
                </ul>
            </div>
      `;
  }
}
