let listaQuizz;
let id = '';
let urlApi = 'https://mock-api.driven.com.br/api/v4/buzzquizz/';
let url = window.location.href.toString();
let variavel;
let numTitulo = 0;
let tituloInput = '';
let urlInput = '';
let perguntaInput = 0;

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

//metodo para validar se a url
const isValidHex = (urlString) => {
    var urlPattern = new RegExp(        
      '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', 'i'
    ); 
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
    localStorage.setItem('numNiveis', quizInput);
    window.location.href = '/criarPerguntas.html';
  } else {
    alert('Dados incorretos, favor preencher corretamente!');
  }
}

function expandirPergunta(num){    
    let classPerg = 'perguntaEscondida' + num
    const perguntaIcone = document.querySelector('.pergunta' + CSS.escape(num));            
    const pergunta = document.getElementById(classPerg);
    
    perguntaIcone.innerHTML = '';
    pergunta.classList.remove("esconderUl");
    
}

function renderizarPerguntas() {
  let numPerguntas = localStorage.getItem('numPergunta');  
  const listaPerguntas = document.querySelector('.criar');
  listaPerguntas.innerHTML = '';

  for (let i = 1; i <= numPerguntas; i++) {
    if (i === 1){
        listaPerguntas.innerHTML += `
        <div class="ulPergunta">
            <ul>
            <h2>Pergunta ${i}</h2>
            <li><input type="text" placeholder="Texto da Pergunta" id="textoPerguntaInput${i}"/></li>
            <li><input type="text" placeholder="Cor de fundo da pergunta" id="corPerguntaInput${i}"/></li>
            <h2>Resposta correta</h2>
            <li><input type="text" placeholder="Resposta correta" id="textoRespCorreta${i}"/></li>
            <li><input type="text" placeholder="URL da imagem" id="textoUrlCorreta${i}"/></li>
            <h2>Respostas incorretas</h2>
            <li><input type="text" placeholder="Resposta incorreta 1" id="textoRespIncA${i}"/></li>
            <li><input type="text" placeholder="URL da imagem 1" id="textoUrlRespIncA${i}"/></li>
            <br />
            <li><input type="text" placeholder="Resposta incorreta 2" id="textoRespIncB${i}"/></li>
            <li><input type="text" placeholder="URL da imagem 2" id="textoUrlRespIncB${i}"/></li>
            <br />
            <li><input type="text" placeholder="Resposta incorreta 3" id="textoRespIncC${i}"/></li>
            <li><input type="text" placeholder="URL da imagem 3" id="textoUrlRespIncC${i}"/></li>
            </ul>
      </div>`;      
    } else {
    listaPerguntas.innerHTML += `        
        <br />
        <div class="ulPergunta esconderUl" id="perguntaEscondida${i}">
            <ul>
                <h2>Pergunta ${i}</h2>
                <li><input type="text" placeholder="Texto da Pergunta" id="textoPerguntaInput${i}"/></li>
                <li><input type="text" placeholder="Cor de fundo da pergunta" id="corPerguntaInput${i}"/></li>
                <h2>Resposta correta</h2>
                <li><input type="text" placeholder="Resposta correta" id="textoRespCorreta${i}"/></li>
                <li><input type="text" placeholder="URL da imagem" id="textoUrlCorreta${i}"/></li>
                <h2>Respostas incorretas</h2>
                <li><input type="text" placeholder="Resposta incorreta 1" id="textoRespIncA${i}"/></li>
                <li><input type="text" placeholder="URL da imagem 1" id="textoUrlRespIncA${i}"/></li>
                <br />
                <li><input type="text" placeholder="Resposta incorreta 2" id="textoRespIncB${i}"/></li>
                <li><input type="text" placeholder="URL da imagem 2" id="textoUrlRespIncB${i}"/></li>
                <br />
                <li><input type="text" placeholder="Resposta incorreta 3" id="textoRespIncC${i}"/></li>
                <li><input type="text" placeholder="URL da imagem 3" id="textoUrlRespIncC${i}"/></li>
            </ul>
        </div>
        
        <div class="pergunta${i} pergutaEscondida">
            <h3>Pergunta ${i}</h3>
            <button onclick="expandirPergunta(${i})"><img src="imagens/mostrarpergunta.svg" alt=""> </button>
        </div>
      `;
  }}
}

function prosseguirNiveis(){
    let numPerguntas = localStorage.getItem('numPergunta');
    let contRespInc = 0;
    let validacao = [];
    let validacaoRespInc = [];
    
    for (let i = 1; i <= numPerguntas; i++){
        //variavell de controle para confirmar que tem ao menos uma resposta incorreta respondida
        contRespInc = []
        //variaveis de controle dos ids das perguntas e respostas corretas
        let idPergunta = "#textoPerguntaInput" + i;
        let idHex = "#corPerguntaInput" + i; 
        let idRespCorreta = "#textoRespCorreta" + i;
        let idUrlCorreta = "#textoUrlCorreta" + i;
        
        //variaveis de controle dos ids das perguntas e respostas incorretas
        let idRespIncA = "#textoRespIncA" + i;
        let idRespUrlIncA = "#textoUrlRespIncA" + i; 
        let idRespIncB = "#textoRespIncB" + i;
        let idRespUrlIncB = "#textoUrlRespIncB" + i;
        let idRespIncC = "#textoRespIncC" + i;
        let idRespUrlIncC = "#textoUrlRespIncC" + i;
        
        //variaveis para armazenar os valores para as perguntas e respostas corretas
        let textoPergunta = document.querySelector(idPergunta).value;
        let textoHex = document.querySelector(idHex).value;
        let textoRespCorreta = document.querySelector(idRespCorreta).value;
        let textoUrlCorreta = document.querySelector(idUrlCorreta).value;

        //variaveis para armazenar os valores para as perguntas e respostas incorretas
        let textoRespIncA = document.querySelector(idRespIncA).value;
        let textoUrlIncA = document.querySelector(idRespUrlIncA).value;
        let textoRespIncB = document.querySelector(idRespIncB).value;
        let textoUrlIncB = document.querySelector(idRespUrlIncB).value;
        let textoRespIncC = document.querySelector(idRespIncC).value;
        let textoUrlIncC = document.querySelector(idRespUrlIncC).value;

        if (20 <= textoPergunta.length && isValidHex(textoHex) && 0 < textoRespCorreta.length && isValidUrl(textoUrlCorreta)) {
            validacao.push(true);
          }else {
            validacao.push(false);
          }
        //testes para validar os campos das respostas incorretas        
        if (0 < textoRespIncA.length || 0 < textoUrlIncA.length){
            if (0 < textoRespIncA.length && isValidUrl(textoUrlIncA)){
                contRespInc.push(true);
            } else{
                contRespInc.push(false);
            }
            
        }

        if (0 < textoRespIncB.length || 0 < textoUrlIncB.length){
            if (0 < textoRespIncB.length && isValidUrl(textoUrlIncB)){
                contRespInc.push(true);
            } else{
                contRespInc.push(false);
            }
            
        }

        if (0 < textoRespIncC.length || 0 < textoUrlIncC.length){
            if (0 < textoRespIncC.length && isValidUrl(textoUrlIncC)){
                contRespInc.push(true);
            } else{
                contRespInc.push(false);
            }
            
        }
        
        //condicao para validar se ao menos uma pergunta foi respondida
        if (contRespInc.includes(false)){
            validacaoRespInc.push(false);
        } else if (contRespInc.includes(true)){
            validacaoRespInc.push(true);
        } else {
            validacaoRespInc.push(null);
        }        
    
    }  

    
    if (validacao.includes(false) || validacaoRespInc.includes(false) || validacaoRespInc.includes(null)){
        alert('Dados incorretos, favor preencher corretamente!');

    } else {
        location.href = 'criarNiveis.html';
        window.location.href = '/criarNiveis.html';

    }    
}


function expandirNivel(num){    
    let classNivel = 'nivelEscondido' + num
    const nivelIcone = document.querySelector('.nivel' + CSS.escape(num));            
    const nivel = document.getElementById(classNivel);
    
    nivelIcone.innerHTML = '';
    nivel.classList.remove("esconderUl");
    
}

function renderizarNiveis(){
    let numNiveis = localStorage.getItem('numNiveis');    
    const listaNiveis = document.querySelector('.criar');
    listaNiveis.innerHTML = '';

  for (let i = 1; i <= numNiveis; i++) {
    if (i === 1){
        listaNiveis.innerHTML += `
        <div class="ulNiveis">
            <ul>
                <h2>Nível ${i}</h2>
                <li>
                <input type="text" name="" placeholder="Título do nível" id="tituloNivelInput${i}"/>
                </li>
                <li>
                <input type="text" name="" placeholder="% de acerto mínima" id="acertoNivelInput${i}"/>
                </li>
                <li>
                <input type="text" name="" placeholder="URL da imagem do nível" id="urlNivelInput${i}"/>
                </li>
                <li>
                <input type="text" name="" placeholder="Descrição do nível" id="descNivelInput${i}"/>
                </li>
            </ul>
        </div>
        `;      
    } else {
        listaNiveis.innerHTML += `
        <br />
        <div class="ulNiveis esconderUl" id="nivelEscondido${i}">
            <ul>
                <h2>Nível ${i}</h2>
                <li>
                <input type="text" name="" placeholder="Título do nível" id="tituloNivelInput${i}"/>
                </li>                
                <li>
                <input type="text" name="" placeholder="% de acerto mínima" id="acertoNivelInput${i}"/>
                </li>
                <li>
                <input type="text" name="" placeholder="URL da imagem do nível" id="urlNivelInput${i}"/>
                </li>
                <li>
                <input type="text" name="" placeholder="Descrição do nível" id="descNivelInput${i}"/>
                </li>
            </ul>
        </div>
        
        <div class="nivel${i} pergutaEscondida">
            <h3>Nível ${i}</h3>
            <button onclick="expandirNivel(${i})"><img src="imagens/mostrarpergunta.svg" alt="" /> </button>            
        </div>
        `;
    }
}

}

function finalizarNiveis(){    
    let numNiveis = localStorage.getItem('numNiveis');
    let validacao = [];
    let validacaoAcert = [];

    for (let i = 1; i <= numNiveis; i++){
        //variaveis de controle dos ids dos Niveis
        let idNivel = "#tituloNivelInput" + i;
        let idAcerto ="#acertoNivelInput" + i;
        let idUrl = "#urlNivelInput" + i;
        let idDescNivel ="#descNivelInput" + i;
        
        //variaveis para armazenar os valores para os Niveis
        let tituloNivel = document.querySelector(idNivel).value;
        let acertoNivel = Number.parseInt(document.querySelector(idAcerto).value);
        let urlNivel = document.querySelector(idUrl).value;
        let descNivel = document.querySelector(idDescNivel).value;

        
        if (10 <= tituloNivel.length && isValidUrl(urlNivel) && 30 <= descNivel.length ) {
            validacao.push(true);
          }else {
            validacao.push(false);
          }
        //Converte a % de acerto de string pra Int e valida se o numero é inteiro
        if (Number.isInteger(acertoNivel) && 0 <= acertoNivel && acertoNivel <= 100){            
            validacao.push(true);
            validacaoAcert.push(acertoNivel);
          }else {
            validacao.push(false);
          }        
        
        }
        
    if (validacaoAcert.includes(0)){
        validacao.push(true);
    }else {
        validacao.push(false);
    }
    
    console.log(validacaoAcert);    
    console.log(validacao);

    if (validacao.includes(false)){
        alert('Dados incorretos, favor preencher corretamente!');
    } else {
        enviarQuizz();

    }    

}
