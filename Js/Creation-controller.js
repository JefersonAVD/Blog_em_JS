import { FormFunction } from "./Form-control.js";

export const CriarConteudo = (data) =>{
    const post = document.createElement('article');
    post.setAttribute('class','row m-2');
    const listComments = document.createElement('article');
    listComments.setAttribute('class','row justify-content-center my-2');
    const titulo = document.createElement('h2');
    titulo.innerText = data.title.rendered;
    post.appendChild(titulo);
    post.innerHTML += data.content.rendered;

    return [post, listComments];
}

export const CriarComentarios = (params) =>{
    const cardComments = document.createElement('ul')
    cardComments.setAttribute('id',"id"+params.id)
    cardComments.setAttribute('class', params.parent+" list-group ps-3 my-2")

    const cardContent = document.createElement('li');
    cardContent.setAttribute('class','list-group-item border border-0')

    const tituloCard = document.createElement('h2')
    tituloCard.setAttribute('class','')
    tituloCard.innerText = params.author_name;
    
    const texto = params.content.rendered;
    const btn = btnReply(params);
    cardComments.appendChild(cardContent).appendChild(tituloCard);
    cardContent.innerHTML += texto;
    cardContent.appendChild(btn)
    cardComments.querySelector('p').setAttribute('class','card-text');
    return cardComments;

}

export const btnReply = (params)=>{
    const btn = document.createElement('a');
    btn.setAttribute('Class','reply');
    btn.innerHTML = "Responder comentário"
    btn.setAttribute("rel",params.id);
    return btn
}

export function btnCancel(params,x){
    x.parentElement.lastChild.childNodes[1].innerHTML += ' <small><a rel="nofollow" id="linkCancel" class="">Cancelar Resposta</a></small>'
    const btncancel = document.querySelector('small');
     
    btncancel.addEventListener('click',()=>{
        if(btncancel.parentElement.parentElement.parentElement !== conteudo) {
            document.querySelector(".response").parentElement.removeChild(document.querySelector(".response"));
            conteudo.appendChild(params);
            if(btncancel.parentElement.parentElement.parentElement == conteudo){
                btncancel.parentElement.removeChild(btncancel);
            }
        }
        x.parentElement.lastChild.classList.remove('hidden')
        params.firstElementChild.innerText = "Responda à postagem"
        FormFunction()
    })  
}