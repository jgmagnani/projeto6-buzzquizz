let seila = {};
const urlEnviarQuizz =
  'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function salvarQuizz() {
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
/*
function mostarQuizz() {
    console.log(localStorage.getItem("novoQuizz"));
    let test = document.querySelector('aaaa');
    test.classList.contains()
}*/

function mostrarPergunta(params) {
  const clicado = params;

  //pega o parentNode do clicado
  let paiClicado = params.parentNode.querySelector(':nth-child(1)');

  //busca a div de botao que não ta aparecendo
  const seila = document.querySelector('.pergutaEscondida.esconderUl');

  //Pega a div da pergunta que está aparecendo
  const mostrandoP = document.querySelector('.mostrando');

  //remove o mostrando e adiciona o esconder
  mostrandoP.classList.remove('mostrando');
  mostrandoP.classList.add('esconderUl');

  paiClicado.classList.add('mostrando');
  paiClicado.classList.remove('esconderUl');

  clicado.classList.add('esconderUl');
  seila.classList.remove('esconderUl');
  window.scrollTo(10, 0);
}

//tem que fazer um for pra quantidade de pergunta e niveis criados
function enviarQuizz() {
  
  //dados dos níveis está aqui localStorage.setItem("niveisCriados", niveisSerelizados)
  //dados do Quizz localStorage.setItem("novoQuizz", novoQuizzDes)
  //dados das perguntas localStorage.setItem('perguntaCriada', perguntasSerializados);  

  //tituloPergunta: , colorPergunta: , respostaCorreta: , imagemCorreta: , respostaErrada1:, imagemErrada1: imgErrada1.value,      respostaErrada2: errada2.value,
  const getPerguntasSerelizadas = localStorage.getItem('perguntaCriada');
  const perguntasDeserializadas = JSON.parse(getPerguntasSerelizadas);

  
  let array1 = [];
  //console.log(perguntasDeserializadas)
  let objectPerguntas = {};
  let objectRespostas = {};
  let respCorreta;
  let imgCorreta;
  let questions = [];

  for (let i = 0; i < perguntasDeserializadas.length; i++) {
    objectPerguntas = {};
    objectRespostas = {};
    respCorreta;
    imgCorreta;    
    
    //pega o titulo e cor de fundo da pergunta
    let titleP = perguntasDeserializadas[i].tituloPergunta;
    let colorP = perguntasDeserializadas[i].colorPergunta;

    respCorreta = perguntasDeserializadas[i].respostaCorreta;
    imgCorreta = perguntasDeserializadas[i].imagemCorreta;

    objectRespostas = {
      text: respCorreta,
      image: imgCorreta,
      isCorrectAnswer: true
    };
    array1.push(objectRespostas);

    objectRespostas = {};

    if (perguntasDeserializadas[i].respostaErrada1 !== '') {
      objectRespostas = {};

      objectRespostas = {
        text: perguntasDeserializadas[i].respostaErrada1,
        image: perguntasDeserializadas[i].imagemErrada1,
        isCorrectAnswer: false
      };
      array1.push(objectRespostas);
    }

    if (perguntasDeserializadas[i].respostaErrada2 !== '') {
      objectRespostas = {};
      
      objectRespostas = {
        text: perguntasDeserializadas[i].respostaErrada2,
        image: perguntasDeserializadas[i].imagemErrada2,
        isCorrectAnswer: false
      };
      array1.push(objectRespostas);
    }

    if (perguntasDeserializadas[i].respostaErrada3 !== '') {
      objectRespostas = {};
      
      objectRespostas = {
        text: perguntasDeserializadas[i].respostaErrada3,
        image: perguntasDeserializadas[i].imagemErrada3,
        isCorrectAnswer: false
      };
      array1.push(objectRespostas);
    }

    objectPerguntas = {
      title: titleP,
      color: colorP,
      answers: array1,
    };

    questions.push(objectPerguntas);
    array1 = [];
    objectPerguntas = {};
    
    
  }
  //console.log(questions)
  //tituloNivel: tituloNivel,  acertoNivel: acertoNivel,  urlNivel: urlNivel, decricaoNivel: descNivel,
  const getNiveisSerelizados = localStorage.getItem('niveisCriados');
  const niveisDeserializados = JSON.parse(getNiveisSerelizados);
  let levels = [];
  let objectNivel = {};
  
  for (let j = 0; j < niveisDeserializados.length; j++) {    
    objectNivel = {};
    let titleNivel = niveisDeserializados[j].tituloNivel;
    let imgNivel = niveisDeserializados[j].urlNivel;
    let descricaoNivel = niveisDeserializados[j].decricaoNivel;
    let valueDescricao = niveisDeserializados[j].acertoNivel;

    objectNivel = {
        title: titleNivel,
        image: imgNivel,
        text: descricaoNivel,
        minValue: Number(valueDescricao)
    }

    levels.push(objectNivel)
  }
  //console.log(levels)

  //let aloTeste = JSON.stringify(questions)
  //let aloTeste3 = JSON.stringify(levels)

  //titulo: tituloQuizz, urlImagem: urlQuizz, perguntas: qtddPerguntas, niveis: qttdNiveis
  const getQuizzSerelizados = localStorage.getItem('novoQuizz');
  const quizzDeserializados = JSON.parse(getQuizzSerelizados);

  let titleQuizz = quizzDeserializados.titulo;
  let imgQuizz = quizzDeserializados.urlImagem;
  
  
  //console.log(levels)
   const promiseEnvQuizz = axios.post(urlEnviarQuizz,
        {
            title: titleQuizz,
            image: imgQuizz,
            questions: questions,
            levels: levels
        })

        promiseEnvQuizz.then(enviouQuizz);
        promiseEnvQuizz.catch(erroEnviar);
    
}


function enviouQuizz(resposta){
    const idRecebido = resposta.data.id;
    console.log(idRecebido)
    //id.push(idRecebido)
    localStorage.setItem('idRecebido', idRecebido)
    
    setTimeout(quizzPronto, 500)
}

function quizzPronto(){
  window.location.href = "quizzPronto.html"
}



function erroEnviar(error){
    console.log(error.response.data)
}


function carregarImagemQuizz() {
    const getQuizzSerelizados = localStorage.getItem('novoQuizz');
    const quizzDeserializados = JSON.parse(getQuizzSerelizados);
  
    //let titleQuizz = quizzDeserializados.tituloQuizz;
    let imgQuizz = quizzDeserializados.urlImagem;
    
    let divQuizzPronto = document.querySelector('.imageQuizzPronto');

    divQuizzPronto.innerHTML = `
    <img src="${imgQuizz}">
    `;
    
}