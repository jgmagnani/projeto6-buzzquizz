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


function enviarQuizz() {
    alert('vai mandar')
    const promiseEnvQuizz = axios.post(urlEnviarQuizz,
        {
            title: "AEEEEEEEEE FERA",
            image: "https://http.cat/411.jpg",
            questions: [
                {
                    title: "PERGUNTA SECRETA 1",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
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
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
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
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                }
            ],
            levels: [
                {
                    title: "Título do nível 1",
                    image: "https://http.cat/411.jpg",
                    text: "Descrição do nível 1",
                    minValue: 0
                },
                {
                    title: "Título do nível 2",
                    image: "https://http.cat/412.jpg",
                    text: "Descrição do nível 2",
                    minValue: 50
                }
            ]
        }
    )
}