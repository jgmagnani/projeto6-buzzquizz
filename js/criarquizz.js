let novoQuizz = {};
let seila = {};
const urlEnviarQuizz = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function salvarQuizz() {

    
    let tituloQuizz = document.getElementById('tituloNewQuiz').value;
    let urlQuizz = document.getElementById('urlNewQuiz').value;
    let qtddPerguntas = document.getElementById('perguntaNewQuiz').value;
    let qttdNiveis = document.getElementById('niveisNewQuiz').value;

    novoQuizz = {
        titulo: tituloQuizz,
        urlImagem: urlQuizz,
        perguntas: qtddPerguntas,
        niveis: qttdNiveis
    };    
    let novoQuizzDes = JSON.stringify(novoQuizz);
    localStorage.setItem("novoQuizz", novoQuizzDes)    
}
/*
function mostarQuizz() {
    console.log(localStorage.getItem("novoQuizz"));
    let test = document.querySelector('aaaa');
    test.classList.contains()
}*/

function mostrarPergunta(params) {
    const clicado = params   

    //pega o parentNode do clicado
    let paiClicado = params.parentNode.querySelector(':nth-child(1)');
    
    
    //busca a div de botao que não ta aparecendo
    const seila = document.querySelector('.pergutaEscondida.esconderUl');    
    
    //Pega a div da pergunta que está aparecendo
    const mostrandoP = document.querySelector('.mostrando');

    //remove o mostrando e adiciona o esconder
    mostrandoP.classList.remove('mostrando')
    mostrandoP.classList.add('esconderUl')


    paiClicado.classList.add('mostrando')
    paiClicado.classList.remove('esconderUl')
   

    clicado.classList.add('esconderUl')
    seila.classList.remove('esconderUl');    
    window.scrollTo(10,0)

}


//tem que fazer um for pra quantidade de pergunta e niveis criados
function enviarQuizz() {
    alert('vai mandar')
    const promiseEnvQuizz = axios.post(urlEnviarQuizz,
        {
            title: "teste pergunta knd222",
            image: "https://http.cat/411.jpg",
            questions: [
                {
                    title: "PERGUNTA SECRETA 1",
                    color: "#123456",
                    answers: [
                        {
                            text: "resposta correta",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "resposta errada",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                },
                {
                    title: "PERGUNTA SECRETA 2",
                    color: "#123456",
                    answers: [
                        {
                            text: "resposta correta",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "resposta errada",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                },
                {
                    title: "PERGUNTA SECRETA 3",
                    color: "#123456",
                    answers: [
                        {
                            text: "resposta correta",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "resposta errada",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                }
            ],
            levels: [
                {
                    title: "nível 1",
                    image: "https://http.cat/411.jpg",
                    text: "Descrição do nível 1",
                    minValue: 0
                },
                {
                    title: "nível 2",
                    image: "https://http.cat/412.jpg",
                    text: "Descrição do nível 2",
                    minValue: 50
                },
                {
                    title: "nível 3",
                    image: "https://http.cat/412.jpg",
                    text: "Descrição do nível 3",
                    minValue: 80
                },
                {
                    title: "nível 4",
                    image: "https://http.cat/412.jpg",
                    text: "Descrição do nível 4",
                    minValue: 100
                }
            ]
        }
    )
}

function salvarRespostas() {
    const perguntasCriadas = document.querySelector('.ulPergunta');
    console.log(perguntasCriadas);
    }