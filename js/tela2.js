let urlApiQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";
let testes = 0;
let unicoQuizz;

function buscarUInicoQuizz(){
    console.log("Cheguei")  ;  
    testes = localStorage.getItem("idQuizz");    
    pegarUnicoQuizz();
}


function pegarUnicoQuizz(){
    const promiseUnic = axios.get(`${urlApiQuizz}${testes}`)
    console.log(testes);
    promiseUnic.then(renderizarQuizz);

}

function renderizarQuizz(resposta) {
    unicoQuizz = resposta.data
    console.log(unicoQuizz);
    //const adcQuizz = document.querySelector();
}