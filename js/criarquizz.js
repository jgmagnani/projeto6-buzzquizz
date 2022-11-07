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

  //titulo: tituloQuizz, urlImagem: urlQuizz, perguntas: qtddPerguntas, niveis: qttdNiveis
  const getQuizzSerelizados = localStorage.getItem('novoQuizz');
  const quizzDeserializados = JSON.parse(getQuizzSerelizados);

  let titleQuizz = quizzDeserializados.tituloQuizz;
  let imgQuizz = quizzDeserializados.urlImagem;

  //tituloPergunta: , colorPergunta: , respostaCorreta: , imagemCorreta: , respostaErrada1:, imagemErrada1: imgErrada1.value,      respostaErrada2: errada2.value,
  const getPerguntasSerelizadas = localStorage.getItem('perguntaCriada');
  const perguntasDeserializadas = JSON.parse(getPerguntasSerelizadas);

  const arrayPerguntas = [];
  const array1 = [];
  
  for (let i = 0; i < perguntasDeserializadas.length; i++) {
    let objectPerguntas = {};
    let objectRespostas = {};

    let titleP = perguntasDeserializadas[i].tituloPergunta;
    let colorP = perguntasDeserializadas[i].colorPergunta;

    let respCorreta = perguntasDeserializadas[i].respostaCorreta;
    let imgCorreta = perguntasDeserializadas[i].imagemCorreta;

    objectRespostas = {
      text: respCorreta,
      image: imgCorreta,
      isCorrectAnswer: true
    };
    array1.push(objectRespostas);

    if (perguntasDeserializadas[i].respostaErrada1 !== '') {
      objectRespostas = {};
      let respErrada1 = perguntasDeserializadas[i].respostaErrada1;
      let imgErrada1 = perguntasDeserializadas[i].imagemErrada1;

      objectRespostas = {
        text: respErrada1,
        image: imgErrada1,
        isCorrectAnswer: false
      };
      array1.push(objectRespostas);
    }

    if (perguntasDeserializadas[i].respostaErrada2 !== '') {
      objectRespostas = {};
      let respErrada2 = perguntasDeserializadas[i].respostaErrada2;
      let imgErrada2 = perguntasDeserializadas[i].imagemErrada2;
      objectRespostas = {
        text: respErrada2,
        image: imgErrada2,
        isCorrectAnswer: false
      };
      array1.push(objectRespostas);
    }

    if (perguntasDeserializadas[i].respostaErrada3 !== '') {
      objectRespostas = {};
      let respErrada3 = perguntasDeserializadas[i].respostaErrada3;
      let imgErrada3 = perguntasDeserializadas[i].imagemErrada3;
      objectRespostas = {
        text: respErrada3,
        image: imgErrada3,
        isCorrectAnswer: false
      };
      array1.push(objectRespostas);
    }

    objectPerguntas = {
      title: titleP,
      color: colorP,
      answers: array1,
    };
    arrayPerguntas.push(objectPerguntas);
  }

  //tituloNivel: tituloNivel,  acertoNivel: acertoNivel,  urlNivel: urlNivel, decricaoNivel: descNivel,
  const getNiveisSerelizados = localStorage.getItem('niveisCriados');
  const niveisDeserializados = JSON.parse(getNiveisSerelizados);
  const levels = [];
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
  


   const promiseEnvQuizz = axios.post(urlEnviarQuizz,
        {
            title: titleQuizz,
            image: imgQuizz,
            questions: arrayPerguntas,
            levels: levels
        })

        promiseEnvQuizz.then(enviouQuizz);
        promiseEnvQuizz.catch(erroEnviar);
    
}


function enviouQuizz(resposta){
    console.log('enviou ' + resposta.data)
    window.location.href = "quizzPronto.html"
}

function erroEnviar(error){
    console.log("ERROY" + error.data)
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