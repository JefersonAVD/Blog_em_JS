import { Header } from "./Create-Header.js";
import {blogList} from './Bloglists.js';
import { blogBody } from './BodyBlog.js'
import { FetchFunctions } from "./Requisicoes.js";

const params = new URLSearchParams(window.location.search);
const postList = params.get('post') == null ? " ": params.get('post') ;
const posts = 'http://localhost/wordpress/wp-json/wp/v2/posts/'+postList;


const conteudo = document.querySelector('#conteudo')
Header(conteudo);
FetchFunctions.requisicao(posts)
.then( data =>{
    if(!Array.isArray(data)){
        blogBody(data,conteudo);
    }else if(Array.isArray(data)){
        blogList(data,conteudo);  
    }
})

