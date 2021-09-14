import { FetchFunctions } from "./Requisicoes.js";
import { Form,FormFunction } from "./Form-control.js";
import { CriarComentarios, CriarConteudo , btnCancel } from "./Creation-controller.js";

const number = new URLSearchParams(window.location.search);
const page = number.get('post')


export const blogBody = async (data, conteudo)=>{
    const [post, postlist] = CriarConteudo(data);
    conteudo.appendChild(post)
    
    const comments = await FetchFunctions.requisicao(data._links.replies[0].href)
    
    let Comentario;
    let reply;
    console.log(comments)
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
            let value = x.rel;
            x.parentElement.appendChild(Form(value));
            x.parentElement.lastChild.childNodes[1].innerHTML = "Responda o comentário de "+ x.parentElement.firstElementChild.innerText
            btnCancel(Form(),x)
            FormFunction()
        })
    })

    conteudo.appendChild(Form())
    FormFunction()
}




