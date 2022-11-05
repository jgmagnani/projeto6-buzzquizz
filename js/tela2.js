let urlApiQuizz = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/";
let idResposta = 0;
let unicoQuizz;

function buscarUInicoQuizz(){
    console.log("Cheguei")  ;  
    idResposta = localStorage.getItem("idQuizz");    
    pegarUnicoQuizz();
}


function pegarUnicoQuizz(){
    const promiseUnic = axios.get(`${urlApiQuizz}${idResposta}`)
    console.log(idResposta);
    promiseUnic.then(renderizarQuizz);

}

function renderizarQuizz(resposta) {
    unicoQuizz = resposta.data
    console.log(unicoQuizz);
    //const adcQuizz = document.querySelector();
    banner()
}

function banner(){
    let banner = document.querySelector(".banner")
    banner.innerHTML  = ""
    banner.innerHTML += `
        <img src=${unicoQuizz.image} alt="">
        <h2>${unicoQuizz.title}</h2>
    `
    perguntas()
}

function perguntas(){
    let cxPerguntas = document.querySelector(".container-perguntas")
    cxPerguntas.innerHTML = ""

    let listaPerguntas = unicoQuizz.questions

    for (let i=0; i< listaPerguntas.length; i++){
        let pergunta = listaPerguntas[i]
        

            cxPerguntas.innerHTML += `
            <div class="cx-pergunta">
                <div class="pergunta">
                    <p>${pergunta.title}</p>
                </div>
                <div class="respostas">
                                     
                </div>
            </div> 
            ` 
        
           inserirRespostas(pergunta, i)
            
        
    }

}

function inserirRespostas(pergunta, i){
    //console.log(i)
    let cxRespostas = document.querySelectorAll(".respostas")
    //console.log(cxRespostas.length)
    
    let listaRespostas = pergunta.answers.sort(comparador)

    for (let x=0; x < listaRespostas.length; x++ ){
            let resposta = listaRespostas[x]

            cxRespostas[i].innerHTML += `
            <div class="opcao" onclick="comportamento(this)">
            <img src=${resposta.image} alt="">
            <p>${resposta.text}</p>
            <p class="meuId">${resposta.isCorrectAnswer}</p>
            </div> `
    }
        
        
    
}


function comparador() { 
	return Math.random() - 0.5; 
}


function comportamento(elemento){
    let x = elemento.parentNode
    let alternativas = x.querySelectorAll(".opcao")
    //console.log(alternativas[0].innerHTML)
    //console.log(elemento.innerHTML)
    
    
    for (i=0; i< alternativas.length; i++){
        if (alternativas[i].innerHTML !==  elemento.innerHTML){
            alternativas[i].classList.add("efeito")
        }
    }

    let corLetra = x.querySelectorAll(".meuId")
    
    for (let u=0; u< corLetra.length; u++){
        if(corLetra[u].innerHTML == "true"){
            corLetra[u].parentNode.classList.add("correto")
            //console.log("sim")
        } else{
            corLetra[u].parentNode.classList.add("errado")
        }
    }

}