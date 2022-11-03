let listaQuizz;
let id = "";
let urlApi = "https://mock-api.driven.com.br/api/v4/buzzquizz/";


//metodo para validar se a url
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

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
    
    if (lsitaSeusQuizz.innerHTML === ""){
        let containerSeusQuizz = document.querySelector(".container-seusQuizz")
        containerSeusQuizz.classList.add("esconder")
     } else{
        let criarQuizz = document.querySelector(".criarQuizz")
        criarQuizz.classList.add("esconder")
     }

}

function prosseguirPerguntas(){
    let numTitulo = 0;    
    let tituloInput = "";
    let urlInput = "";
    let perguntaInput = 0;
    let validacao = 0;
    let quizInput = 0;

    tituloInput = document.querySelector('#tituloNewQuiz').value;
    numTitulo = tituloInput.length;

    urlInput = document.querySelector('#urlNewQuiz').value;
    
    perguntaInput = parseInt(document.querySelector('#perguntaNewQuiz').value);

    quizInput = parseInt(document.querySelector('#niveisNewQuiz').value);
    
    
    if (20 <= numTitulo && numTitulo <= 65){
        validacao++;
    }

    if (isValidUrl(urlInput)){
        validacao++;
    }   

    if (3 <= perguntaInput && Number.isInteger(perguntaInput)){
        validacao++;
    }

    if (2 <= quizInput && Number.isInteger(quizInput)){
        validacao++;
    }

    if (validacao === 4){
        //place holder para realizar ação quando a validação está ok.
        console.log("Validação Ok!")

    } else{
        alert("Dados incorretos, favor preencher corretamente!")
    }
    

    
}