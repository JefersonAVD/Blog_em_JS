const blogList = (data, conteudo)=>{
    data.forEach(x=>{
        const card = document.createElement('article');
        card.setAttribute('class','card my-3')

        const cardbd = document.createElement('div')
        cardbd.setAttribute('class','card-body')

        const titulo = document.createElement('h2');
        titulo.setAttribute('class','card-title')
        titulo.innerText = x.title.rendered

        const botao = document.createElement('a')
        botao.setAttribute('href','blog.html?post='+x.id)
        botao.setAttribute('class','btn btn-primary')

        botao.innerText = 'Acesse o post'

        conteudo.appendChild(card).appendChild(cardbd).appendChild(titulo)
       
        const texto = x.excerpt.rendered
        cardbd.innerHTML += texto
        document.querySelector('p').setAttribute('class','card-text')
        cardbd.appendChild(botao)
    
        if( card.querySelector('.more-link') == null) return;
        card.querySelector('.more-link').remove()
    
    })

}