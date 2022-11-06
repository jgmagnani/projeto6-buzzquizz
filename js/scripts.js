let listaQuizz;
let id = '';
let urlApi = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
let url = window.location.href.toString();
let variavel;
let numTitulo = 0;
let tituloInput = '';
let urlInput = '';
let perguntaInput = 0;
let guardarPerguntas = [];
let perguntas = {};

//metodo para validar se a url
const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

function acessarTela2(elemento) {
  console.log('Elemento ' + elemento.querySelector('.meuId').innerHTML);

  window.location.href = '/tela2.html';
  localStorage.setItem('idQuizz', elemento.querySelector('.meuId').innerHTML);
}

function pegarQuizzServidor() {
  console.log('entrou');
  const promessa = axios.get(`${urlApi}quizzes`);
  promessa.then(chegouQuizz);
}

function chegouQuizz(resposta) {
  console.log('chegou');
  console.log(resposta.data);
  listaQuizz = resposta.data;
  addQuizz();
}

function addQuizz() {
  let listaTodasQuizz = document.querySelector('.lista-todosQuizz');
  listaTodasQuizz.innerHTML = '';

  let lsitaSeusQuizz = document.querySelector('.lista-seusQuizz');
  //lsitaSeusQuizz.innerHTML = "";
  variavel = '';
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

  /*if (lsitaSeusQuizz.innerHTML === ""){
        let containerSeusQuizz = document.querySelector(".container-seusQuizz")
        containerSeusQuizz.classList.add("esconder")
     } else{
        let criarQuizz = document.querySelector(".criarQuizz")
        criarQuizz.classList.add("esconder")
     }*/
}

function prosseguirPerguntas() {
  let validacao = 0;
  let quizInput = 0;  

  tituloInput = document.querySelector('#tituloNewQuiz').value;
  numTitulo = tituloInput.length;

  urlInput = document.querySelector('#urlNewQuiz').value;

  perguntaInput = parseInt(document.querySelector('#perguntaNewQuiz').value);

  quizInput = parseInt(document.querySelector('#niveisNewQuiz').value);

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
    location.href = 'criarPerguntas.html';
    localStorage.setItem('numPergunta', perguntaInput);
    window.location.href = '/criarPerguntas.html';
  } else {
    alert('Dados incorretos, favor preencher corretamente!');
  }
}

function renderizarPerguntas() {
  let numPerguntas = localStorage.getItem('numPergunta');
  console.log(numPerguntas);
  const listaPerguntas = document.querySelector('.criar');
  listaPerguntas.innerHTML = '';

  for (let i = 0; i < numPerguntas; i++) {
    if (i === 0){
        listaPerguntas.innerHTML += `
        <div>
            <div class="ulPergunta txtPergunta${i+1} mostrando" id="Pergunta${i+1}">
                <ul>
                    <h2>Pergunta 1</h2>
                    <li><input type="text" placeholder="Texto da Pergunta"/></li>
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
            <div onclick="mostrarPergunta(this)" class="pergunta${i+1} pergutaEscondida esconderUl">
                <h3>Pergunta ${i + 1}</h3>
            <button><img src="imagens/mostrarpergunta.svg" alt=""></button>
        </div>
    </div>`;      
    } else {
    listaPerguntas.innerHTML += `        
        <br />
        <div>
        <div class="ulPergunta esconderUl txtPergunta${i+1}" id="Pergunta${i+1}">
            <ul>
                <h2>Pergunta ${i + 1}</h2>
                <li><input type="text" placeholder="Texto da Pergunta"/></li>
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
        
        <div onclick="mostrarPergunta(this)" class="pergunta${i + 1} pergutaEscondida">
            <h3>Pergunta ${i + 1}</h3>
            <button><img src="imagens/mostrarpergunta.svg" alt=""></button>
        </div>
        </div>
      `;
     }
    }
}

function chamarNiveis(){
    guardarPerguntas = [];
    //Aqui eu faço uma função pra pergar as infos da pergunta que está sendo criada    
    const respPerguntas = document.querySelectorAll('.ulPergunta')
    //console.log(respPerguntas);
    //um for para definir que campos eu quero
    for (let i = 0; i < respPerguntas.length; i++) {
        let titleP = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${2}) input`);        
        let colorP = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${3}) input`);
        let corretaP = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${5}) input`);
        let imgCorretaP = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${6}) input`);
        //por váriavel true   
        let errada1 = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${8}) input`);
        let imgErrada1 = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${9}) input`);
        //por váriavel false
        let errada2 = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${11}) input`);
        let imgErrada2 = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${12}) input`);
        //por váriavel false
        let errada3 = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${14}) input`);
        let imgErrada3 = document.querySelector(`.txtPergunta${i + 1} ul :nth-child(${15}) input`);
        //salvos as informações que eu preciso em um object
        perguntas = {
            tituloPergunta: titleP.value,
            colorPergunta: colorP.value,
            respostaCorreta: corretaP.value,
            imagemCorreta: imgCorretaP.value,
            respostaErrada1: errada1.value,
            imagemErrada1: imgErrada1.value,
            respostaErrada2: errada2.value,
            imagemErrada2: imgErrada2.value,
            respostaErrada3: errada3.value,
            imagemErrada3: imgErrada3.value
        };
        //jogo o object em um array.        
        guardarPerguntas.push(perguntas);
    }
    const perguntasSerializados = JSON.stringify(guardarPerguntas);
    //guardo as perguntas no storage para acessar mais tarde
    localStorage.setItem("perguntaCriada", perguntasSerializados);    
    console.log(guardarPerguntas);
    window.location.href = 'criarNiveis.html'
}

