export function FormFunction (){
    document.querySelector('.response').querySelector('form').addEventListener('submit', async evt=>{
        evt.preventDefault()
        const statusMsg = document.querySelector('#statusMsg')
        statusMsg.parentElement.classList.remove('hidden') 

        const [author_name, author_email, content, parent ] = evt.target;

        const resposta = await FetchFunctions.EnviarComentario(author_name, author_email, content, parent ,page)

        if(resposta.status >= 400){
            statusMsg.parentElement.classList.toggle('spinner-border')
            statusMsg.innerHTML = "Houve um erro no email informado."
            setTimeout(()=>{
                statusMsg.innerHTML="";
                statusMsg.parentElement.classList.add("hidden")
                statusMsg.parentElement.classList.toggle("spinner-border")
            },5000)
        }else{
            document.querySelectorAll('.form-control').forEach(x=>x.value="")
            statusMsg.parentElement.classList.toggle('spinner-border')
            statusMsg.innerHTML = "Seu comentário foi enviado. Aguarde a aprovação"

            setTimeout(()=>{
                statusMsg.innerHTML="";
                statusMsg.parentElement.classList.add("hidden")
                statusMsg.parentElement.classList.toggle("spinner-border")
            },5000)
        }   
    })
}



export function Form (value = 0){
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