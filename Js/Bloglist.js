const blogList = (data, conteudo)=>{
    let i = 0
    const array = data.map(x=>{
        
        const card = document.createElement('article');
        card.setAttribute('class','card my-3')
        card.id = i; 
        i++
        const cardbd = document.createElement('div');
        cardbd.setAttribute('class','card-body')

        const titulo = document.createElement('h2');
        titulo.setAttribute('class','card-title')
        titulo.innerText = x.title.rendered

        const botao = document.createElement('a')
        botao.setAttribute('href','blog.html?post='+x.id)
        botao.setAttribute('class','btn btn-primary')

        botao.innerText = 'Acesse o post'

        
        card.appendChild(cardbd).appendChild(titulo)
        const texto = x.excerpt.rendered
        cardbd.innerHTML += texto
        cardbd.children[1].classList.add('card-text')
        cardbd.appendChild(botao)
        
        if( card.querySelector('.more-link') == null) return card;
        card.querySelector('.more-link').remove()
        
        return card
        
    })
    
    
    pagination(array,conteudo)

}


function pagination(array,conteudo){
    let numPosts = 10;
    let paginasTotal = Math.ceil(array.length/numPosts)
    let paginaAtual = 1;

    const nav = document.createElement('nav');
    nav.setAttribute('arial-label','Page navigation');
    const ul = document.createElement('ul');
    ul.setAttribute('class','pagination justify-content-center');

    for(i = 0; i < numPosts;i++){
        if(array[i]== null)continue;
        conteudo.appendChild(array[i])
    }
    let paginas = paginasTotal >4?3:paginasTotal;

    const [firstPG,lastPG]= NewPages(paginas,paginaAtual,paginasTotal)

    createBtn(firstPG,lastPG,paginas,paginasTotal,ul,numPosts,array,paginaAtual)
    
    conteudo.parentElement.appendChild(nav).appendChild(ul) 
}


const NewPages = (paginas,paginaAtual,paginasTotal) => {

    let minPages = paginaAtual - parseInt(paginas/2) 
    let maxPages = parseInt(paginaAtual) + parseInt(paginas/2)
    
    if(minPages <= 0){
        minPages = 1
        maxPages = paginas
    }

    if(maxPages >= paginasTotal ){
        maxPages = parseInt(paginasTotal);
        minPages = paginasTotal - (paginas-1);
    }  
    return [minPages,maxPages] 
}

function createBtn(minPages,maxPages,paginas,paginasTotal,ul,numPosts,array,paginaAtual){
    
    const preview = document.createElement('li');
    preview.setAttribute('class','page-item');
    const previewlink = document.createElement('a');
    previewlink.setAttribute('class','page-link');
    previewlink.setAttribute('rel',1);
    previewlink.innerText = "Primeira Página";
    previewlink.href = '#';
    ul.appendChild(preview).appendChild(previewlink);

    for(let b = minPages; b <= maxPages; b++){
        const linumber = document.createElement('li');
        linumber.setAttribute('class','page-item');
        const link = document.createElement('a');
        link.setAttribute('class','page-link page-number');
        link.id = 'link'+parseInt(b);
        link.setAttribute('rel',b);
        link.href= '#'
        link.innerText = link.rel;
        ul.appendChild(linumber).appendChild(link);
        if(link.rel == paginaAtual){
            linumber.classList.add('active')
        }
    }
    
    const next = document.createElement('li');
    next.setAttribute('class','page-item');
    const nextlink = document.createElement('a');
    nextlink.setAttribute('class','page-link');
    nextlink.setAttribute('rel',paginasTotal);
    nextlink.innerText = "Ultima página";
    nextlink.href = '#'

    ul.appendChild(next).appendChild(nextlink);
    const navBtn = ul.childNodes

    navBtn.forEach(x => {
        x.addEventListener('click',()=>{

            x.parentElement.innerHTML=''
            paginaAtual = parseInt(x.firstChild.rel)
    
            const [firstPG,lastPG]= NewPages(paginas,paginaAtual,paginasTotal)
            
            createBtn(firstPG,lastPG,paginas,paginasTotal,ul,numPosts,array,paginaAtual);
            
            ul.parentElement.parentElement.childNodes[1].innerHTML='';
        
            for(let i = 0; i < numPosts ;i++){
                if((i+(numPosts*(paginaAtual-1)))>=array.length) return;

                ul.parentElement.parentElement.childNodes[1].appendChild(array[i+(numPosts*(paginaAtual-1))])

            }
        })  
    }); 

    
}