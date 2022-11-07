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
let novoQuizz = {};
let salvarNiveis = [];

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
  var urlPattern = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', 'i');
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

  if (lsitaSeusQuizz.innerHTML === '') {
    let containerSeusQuizz = document.querySelector('.container-seusQuizz');
    containerSeusQuizz.classList.add('esconder');
  } else {
    let criarQuizz = document.querySelector('.criarQuizz');
    criarQuizz.classList.add('esconder');
  }
}

function salvarQuizz() {
  novoQuizz = {};
  let tituloQuizz = document.getElementById('tituloNewQuiz').value;
  let urlQuizz = document.getElementById('urlNewQuiz').value;
  let qtddPerguntas = document.getElementById('perguntaNewQuiz').value;
  let qttdNiveis = document.getElementById('niveisNewQuiz').value;

  novoQuizz = {
    titulo: tituloQuizz,
    urlImagem: urlQuizz,
    perguntas: qtddPerguntas,
    niveis: qttdNiveis,
  };
  let novoQuizzDes = JSON.stringify(novoQuizz);
  localStorage.setItem('novoQuizz', novoQuizzDes);
}

function prosseguirPerguntas() {
  salvarQuizz();
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
    salvarQuizz();
    window.location.href = '/criarPerguntas.html';
  } else {
    alert('Dados incorretos, favor preencher corretamente!');
  }
}

function expandirPergunta(num) {
  let classPerg = 'perguntaEscondida' + num;
  const perguntaIcone = document.querySelector('.pergunta' + CSS.escape(num));
  const pergunta = document.getElementById(classPerg);

  perguntaIcone.innerHTML = '';
  pergunta.classList.remove('esconderUl');
}

function renderizarPerguntas() {
  let numPerguntas = localStorage.getItem('numPergunta');
  const listaPerguntas = document.querySelector('.criar');
  listaPerguntas.innerHTML = '';

  for (let i = 1; i <= numPerguntas; i++) {
    if (i === 1) {
      listaPerguntas.innerHTML += `
        <div>
            <div class="ulPergunta txtPergunta${i} mostrando" id="Pergunta${i}">
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
            <div onclick="mostrarPergunta(this)" class="pergunta${i} pergutaEscondida esconderUl">
                <h3>Pergunta ${i}</h3>
            <button><img src="imagens/mostrarpergunta.svg" alt=""></button>
        </div>
    </div>`;
    } else {
      listaPerguntas.innerHTML += `        
        <br />
        <div>
        <div class="ulPergunta esconderUl txtPergunta${i}" id="Pergunta${i}">
            <ul>
                <h2>Pergunta ${i}</h2>
                <li><input type="text" placeholder="Texto da Pergunta"/></li>
                <li><input type="text" placeholder="Cor de fundo da pergunta" /></li>
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
        
        <div onclick="mostrarPergunta(this)" class="pergunta${i} pergutaEscondida">
            <h3>Pergunta ${i}</h3>
            <button><img src="imagens/mostrarpergunta.svg" alt=""></button>
        </div>
        </div>
      `;
    }
  }
}

function chamarNiveis() {
  guardarPerguntas = [];
  //Aqui eu faço uma função pra pergar as infos da pergunta que está sendo criada
  const respPerguntas = document.querySelectorAll('.ulPergunta');
  //console.log(respPerguntas);
  //um for para definir que campos eu quero
  for (let i = 0; i < respPerguntas.length; i++) {
    let titleP = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${2}) input`
    );
    let colorP = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${3}) input`
    );
    let corretaP = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${5}) input`
    );
    let imgCorretaP = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${6}) input`
    );
    //por váriavel true
    let errada1 = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${8}) input`
    );
    let imgErrada1 = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${9}) input`
    );
    //por váriavel false
    let errada2 = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${11}) input`
    );
    let imgErrada2 = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${12}) input`
    );
    //por váriavel false
    let errada3 = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${14}) input`
    );
    let imgErrada3 = document.querySelector(
      `.txtPergunta${i + 1} ul :nth-child(${15}) input`
    );
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
      imagemErrada3: imgErrada3.value,
    };
    //jogo o object em um array.
    guardarPerguntas.push(perguntas);
  }
  const perguntasSerializados = JSON.stringify(guardarPerguntas);
  //guardo as perguntas no storage para acessar mais tarde
  localStorage.setItem('perguntaCriada', perguntasSerializados);

  window.location.href = 'criarNiveis.html';
}

function prosseguirNiveis() {
  chamarNiveis();
  let numPerguntas = localStorage.getItem('numPergunta');
  let contRespInc = 0;
  let validacao = [];
  let validacaoRespInc = [];

  for (let i = 1; i <= numPerguntas; i++) {
    //variavell de controle para confirmar que tem ao menos uma resposta incorreta respondida
    contRespInc = [];
    //variaveis de controle dos ids das perguntas e respostas corretas
    let idPergunta = '#textoPerguntaInput' + i;
    let idHex = '#corPerguntaInput' + i;
    let idRespCorreta = '#textoRespCorreta' + i;
    let idUrlCorreta = '#textoUrlCorreta' + i;

    //variaveis de controle dos ids das perguntas e respostas incorretas
    let idRespIncA = '#textoRespIncA' + i;
    let idRespUrlIncA = '#textoUrlRespIncA' + i;
    let idRespIncB = '#textoRespIncB' + i;
    let idRespUrlIncB = '#textoUrlRespIncB' + i;
    let idRespIncC = '#textoRespIncC' + i;
    let idRespUrlIncC = '#textoUrlRespIncC' + i;

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

    if (
      20 <= textoPergunta.length &&
      isValidHex(textoHex) &&
      0 < textoRespCorreta.length &&
      isValidUrl(textoUrlCorreta)
    ) {
      validacao.push(true);
    } else {
      validacao.push(false);
    }
    //testes para validar os campos das respostas incorretas
    if (0 < textoRespIncA.length || 0 < textoUrlIncA.length) {
      if (0 < textoRespIncA.length && isValidUrl(textoUrlIncA)) {
        contRespInc.push(true);
      } else {
        contRespInc.push(false);
      }
    }

    if (0 < textoRespIncB.length || 0 < textoUrlIncB.length) {
      if (0 < textoRespIncB.length && isValidUrl(textoUrlIncB)) {
        contRespInc.push(true);
      } else {
        contRespInc.push(false);
      }
    }

    if (0 < textoRespIncC.length || 0 < textoUrlIncC.length) {
      if (0 < textoRespIncC.length && isValidUrl(textoUrlIncC)) {
        contRespInc.push(true);
      } else {
        contRespInc.push(false);
      }
    }

    //condicao para validar se ao menos uma pergunta foi respondida
    if (contRespInc.includes(false)) {
      validacaoRespInc.push(false);
    } else if (contRespInc.includes(true)) {
      validacaoRespInc.push(true);
    } else {
      validacaoRespInc.push(null);
    }
  }

  if (
    validacao.includes(false) ||
    validacaoRespInc.includes(false) ||
    validacaoRespInc.includes(null)
  ) {
    alert('Dados incorretos, favor preencher corretamente!');
  } else {
    location.href = 'criarNiveis.html';
    window.location.href = '/criarNiveis.html';
  }
}

function expandirNivel(num) {
  let classNivel = 'nivelEscondido' + num;
  const nivelIcone = document.querySelector('.nivel' + CSS.escape(num));
  const nivel = document.getElementById(classNivel);

  nivelIcone.innerHTML = '';
  nivel.classList.remove('esconderUl');
}

function renderizarNiveis() {
  let numNiveis = localStorage.getItem('numNiveis');
  const listaNiveis = document.querySelector('.criar');
  listaNiveis.innerHTML = '';

  for (let i = 1; i <= numNiveis; i++) {
    if (i === 1) {
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

function finalizarNiveis() {
  let numNiveis = localStorage.getItem('numNiveis');
  let validacao = [];
  let validacaoAcert = [];
  let dadosNiveis = {};
  salvarNiveis = [];

  for (let i = 1; i <= numNiveis; i++) {
    //variaveis de controle dos ids dos Niveis
    let idNivel = '#tituloNivelInput' + i;
    let idAcerto = '#acertoNivelInput' + i;
    let idUrl = '#urlNivelInput' + i;
    let idDescNivel = '#descNivelInput' + i;
    dadosNiveis = {};
    //variaveis para armazenar os valores para os Niveis
    let tituloNivel = document.querySelector(idNivel).value;
    let acertoNivel = Number.parseInt(document.querySelector(idAcerto).value);
    let urlNivel = document.querySelector(idUrl).value;
    let descNivel = document.querySelector(idDescNivel).value;

    if (
      tituloNivel.length >= 10 &&
      isValidUrl(urlNivel) &&
      descNivel.length <= 30
    ) {
      console.log('titulo entro no certo: ' + i);
      validacao.push(true);
    } else {
      validacao.push(false);
      console.log('titulo entro errado: ' + i);
    }
    //Converte a % de acerto de string pra Int e valida se o numero é inteiro

    if (
      Number.isInteger(acertoNivel) &&
      acertoNivel >= 0 &&
      acertoNivel <= 100
    ) {
      validacao.push(true);
      validacaoAcert.push(acertoNivel);
      console.log('numero entro no certo: ' + i);
    } else {
      validacao.push(false);
      console.log('numero entro errado: ' + i);
    }

    dadosNiveis = {
      tituloNivel: tituloNivel,
      acertoNivel: acertoNivel,
      urlNivel: urlNivel,
      decricaoNivel: descNivel,
    };

    salvarNiveis.push(dadosNiveis);
  }

  /*if (validacaoAcert.includes(0)){
        validacao.push(true);
    }else {
        validacao.push(false);
    }*/
  /*console.log('Array niveis ' + salvarNiveis);
  console.log(validacaoAcert);
  console.log(validacao);*/

  if (validacao.includes(false)) {
    alert('Dados incorretos, favor preencher corretamente!');
  } else {
    let niveisSerelizados = JSON.stringify(salvarNiveis)
    localStorage.setItem("niveisCriados", niveisSerelizados)
    enviarQuizz();
  }
}
