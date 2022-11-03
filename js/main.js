const form = document.getElementById("novoItem")
console.log(form)

form.addEventListener("submit",(evento) => {
    evento.preventDefault()

    criaitem (evento.target.elements['nome'].value, evento.target.elements['quantidade'].value)
})

const lista = document.getElementById("lista")

function criaitem (nome, quantidade){

    const novoItem = document.createElement('li') 
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += nome

    lista.appendChild(novoItem)
}