function Header(){
    const corpo = document.querySelector("body")
    console.log(corpo)

    const header = document.createElement('header')
    header.className = 'navbar navbar-dark navbar-expand bg-primary'
    corpo.insertAdjacentElement('afterbegin',header);

    const navegacao = document.createElement('nav')
    navegacao.setAttribute('class','navbar')
    navegacao.className = "container"

    const ul = document.createElement('ul')
    ul.setAttribute('class','navbar-nav')

    const ul2 = document.createElement('ul')
    ul2.setAttribute('class','navbar-nav')

    const li = document.createElement('li')
    li.setAttribute('class','nav-item')

    const li2 = document.createElement('li')
    li2.setAttribute('class','nav-item')

    const a = document.createElement('a')
    a.setAttribute('class','nav-link')
    a.innerText = "Voltar para a página inicial"
    a.href = "http://127.0.0.1:5500/Blog_em_JS/blog.html"
    a.style.color = "white"

    const a2 = document.createElement('a')
    a2.setAttribute('class','nav-link')
    a2.innerText = "Ir para o refriar"
    a2.href="https://www.google.com.br/"
    a2.style.color = 'white'

    header.appendChild(navegacao)
    navegacao.appendChild(ul)
    navegacao.appendChild(ul2)
    ul.appendChild(li)
    ul2.appendChild(li2)
    li.appendChild(a)
    li2.appendChild(a2)
}