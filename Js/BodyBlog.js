const number = new URLSearchParams(window.location.search);
const page = number.get('post')
let pageref = "";

const blogBody = (data, conteudo)=>{
    const [post, postlist] = CriarConteudo(data);
    conteudo.appendChild(post)
    const comit = requisitar("get",data._links.replies[0].href);
    comit.onload=()=>{
        let Comentario;
        let reply;
        const comments =  JSON.parse(comit.response);
        conteudo.appendChild(postlist)
        const lista = comments.map(x=>{
            Comentario = CriarComentarios(x);
            return Comentario;
            
        })
        
        lista.forEach(x=>{
            for(let y = lista.length-1;y>=0;y--){
                reply = lista[y];
                const pick = document.querySelector('#id'+reply.classList[0])
                
                if(x.classList[0]=="0"){
                    postlist.appendChild(x)
                    
                    if(reply.classList[1]!=="0"){
                        
                        if(pick!==null && "id"+reply.classList[0] == pick.id ){
                            
                            pick.appendChild(reply);
                            
                        }
                    }
                }     
            }    
        })
        
        
        const btnreply = document.querySelectorAll('.reply');
        btnreply.forEach(x=>{
            x.addEventListener('click',()=>{
                if(document.querySelector('.hidden')!== null){
                    const invisible = document.querySelector('.hidden');
                    invisible.classList.toggle('hidden')
                }
                x.classList.add('hidden')
                document.querySelector(".response").parentElement.removeChild(document.querySelector(".response"));
                value = x.rel;
                x.parentElement.appendChild(Form(value));
                x.parentElement.lastChild.childNodes[1].innerHTML = "Responda o comentário de "+ x.parentElement.firstElementChild.innerText
                btnCancel(Form(),x)
                FormFunction()
            })
        })

        conteudo.appendChild(Form())
        FormFunction()

    }
}

const CriarConteudo = (data) =>{
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

const CriarComentarios = (params) =>{
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

const btnReply = (params)=>{
    const btn = document.createElement('a');
    btn.setAttribute('Class','reply');
    btn.innerHTML = "Responder comentário"
    btn.setAttribute("rel",params.id);
    return btn
}

function FormFunction (){
    
    document.querySelector('.response').querySelector('form').addEventListener('submit',evt=>{
        const statusMsg = document.querySelector('#statusMsg')
        statusMsg.parentElement.classList.remove('hidden') 

        
        evt.preventDefault();
        const send = new XMLHttpRequest();
        send.open('POST',"../wordpress/wp-json/wp/v2/comments")
        send.setRequestHeader('content-type','application/json;charset=UTF-8')
    
        const [author_name, author_email, content, parent ] = document.querySelector('.response').querySelector('form');
    
        const data = JSON.stringify({
        post: page,
        author_name:author_name.value,
        author_email:author_email.value ,
        content: content.value ,
        parent:parent.value,

        });
        
        send.onload = ()=>{
            
            if(send.status == 201){
                document.querySelectorAll('.form-control').forEach(x=>x.value="")
                statusMsg.parentElement.classList.toggle('spinner-border')
                statusMsg.innerHTML = "Seu comentário foi enviado. Aguarde a aprovação"
                setTimeout(()=>{statusMsg.innerHTML="";
                statusMsg.parentElement.classList.add("hidden")
                statusMsg.parentElement.classList.toggle("spinner-border")
            },5000)
            }else if(send.status == 400){
                statusMsg.parentElement.classList.toggle('spinner-border')
                statusMsg.innerHTML = "Houve um erro no email informado."
                setTimeout(()=>{
                    statusMsg.innerHTML="";
                    statusMsg.parentElement.classList.add("hidden")
                    statusMsg.parentElement.classList.toggle("spinner-border")
                },5000)
            }
            
        }
        send.send(data);
        
        
        
    })
}

function btnCancel(params,x){
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

function Form (value = 0){
    const formReply = `<div class='response'>
                                <h3 class="d-flex justify-content-between text-title"></h3>
                                <form id="form">
                                    <div>
                                        <label for='author_name' class='form-label'>Nome</label>
                                        <input type="text" name="author_name" id="author_name" required class='form-control'>
                                    </div>
                                    <div>
                                        <label for='author_email' class='form-label'>Email</label>
                                        <input type="email" name="author_email" id="author_email" required class='form-control'>
                                    </div>
                                    <div>
                                        <label for="content" class="form-label">Deixe sua mensagem</label>
                                        <textarea name="content" id="content" cols="30" rows="10" class="form-control" required></textarea>
                                    </div>
                                    <input type="hidden" value="${value}" id="parent">
                                    <div class="row justify-content-start px-3">
                                        <input type="submit" value="Enviar" class="btn btn-primary col-4 col-md-2">
                                        <div class="spinner-border hidden col-8 col-md-10" role="status">
                                            <span id="statusMsg"></span>
                                        </div>
                                    </div>
                                </form>
                            </div>`
                            
        const form = document.createRange().createContextualFragment(formReply).firstChild
        form.childNodes[1].innerHTML += "Responda à postagem"
    return form

}
