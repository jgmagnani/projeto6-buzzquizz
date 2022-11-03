let listaQuizz;
let id = "";
let urlApi = "https://mock-api.driven.com.br/api/v4/buzzquizz/";



function acessarTela2(){
    window.location.href = "./tela2.html" ;
}

pegarQuizzServidor()
function pegarQuizzServidor(){
    const promessa = axios.get(`${urlApi}quizzes`);
    promessa.then(chegouQuizz);
}

function chegouQuizz(resposta){
    console.log("chegou");
    console.log(resposta.data);
    listaQuizz = resposta.data;
    addQuizz()
}

function addQuizz(){
    let listaTodasQuizz = document.querySelector(".lista-todosQuizz");
    listaTodasQuizz.innerHTML = "" ;

    let lsitaSeusQuizz = document.querySelector(".lista-seusQuizz");
    lsitaSeusQuizz.innerHTML = "";

    for (let i=0; i< listaQuizz.length; i++ ){
        let quizz = listaQuizz[i];

        if (quizz.id === id){
            lsitaSeusQuizz.innerHTML +=`
                <li class="quizz" onclick="acessarTela2()">
                    <img src=${quizz.image} alt="">
                    <div class="dregade"></div>
                    <p>${quizz.title}</p>
                </li>
            `
        }  
            listaTodasQuizz.innerHTML += `
            <li class="quizz" onclick="acessarTela2()">
                <img src=${quizz.image} alt="">
                <div class="dregade"></div>
                <p>${quizz.title}</p>
            </li>
        `
    } 
    


}