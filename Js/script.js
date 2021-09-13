const params = new URLSearchParams(window.location.search);
const postList = params.get('post') == null ? " ": params.get('post') ;
const posts = 'http://localhost/wordpress/wp-json/wp/v2/posts/'+postList;

const requisitar = (type,url) =>{
    const req = new XMLHttpRequest();
    req.open(type,url);
    req.send();
    return req

}
const post = requisitar("get",posts)


const conteudo = document.querySelector('#conteudo')
Header(conteudo);
post.onload = () =>{
    const data = JSON.parse(post.responseText);
    if(!Array.isArray(data)){
        blogBody(data,conteudo);
    }else if(Array.isArray(data)){
        blogList(data,conteudo);
        
    }
    
};

