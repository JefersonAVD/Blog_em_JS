const EnviarComentario = (author_name,author_email,content,parent,page,statusMsg) =>{
    return fetch("../wordpress/wp-json/wp/v2/comments",{
        method:"POST",
        headers : {
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            post: page,
            author_name:author_name.value,
            author_email:author_email.value ,
            content: content.value ,
            parent:parent.value,
        })
    })
    .then(resposta=>{
        return resposta
    })
}

const requisicao = async (url)=>{
    const resposta = await fetch(url);
    return await resposta.json();
}

export const FetchFunctions = {
    requisicao,
    EnviarComentario
}