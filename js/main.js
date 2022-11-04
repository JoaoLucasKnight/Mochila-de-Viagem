const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

//verifica se tem itens para construir 
itens.forEach((elemento) => {
    criaItem(elemento)
});

// função de enviar elemento 
form.addEventListener("submit",(evento) => {
    evento.preventDefault()

    //pegar os dados
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // criação  de um objeto 
    const itemAtuais = { 
        "nome" : nome.value ,
        "quantidade" : quantidade.value
    }

    //enviar para a criação o item escrito agora 
    criaItem (itemAtuais)

    //enviar o iten para o array de itens 
    itens.push(itemAtuais)

    //Salvar o item na memoria 
    localStorage.setItem("itens", JSON.stringify(itens)) 

    nome.value = ""
    quantidade.value= ""
})



// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 

function criaItem (item){

    const novoItem = document.createElement('li') 
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem) // appendeChild serve para colocar um elemnto dentro do outro 
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
 
    /* local storage so recebe strings e, para armazenar objetos, arrays, e listas, é preciso convertê-los utilizando o método JSON.stringify(). 
    Já quando queremos acessar algum dado, podemos utilizar o método localStorage.getItem().*/
} 




