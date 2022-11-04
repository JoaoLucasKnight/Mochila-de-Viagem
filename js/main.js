const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

//verifica se tem itens para construir 
itens.forEach((elemento) => {
    criaItem(elemento)
});

// função de enviar 
form.addEventListener("submit",(evento) => {
    evento.preventDefault()

    //pegar os dados
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome ===nome.value )

    // criação  de um objeto 
    const itemAtuais = { 
        "nome" : nome.value ,
        "quantidade" : quantidade.value
    }

    //Condional
    
    if(existe){                                          //existe
        itemAtuais.id = existe.id

        //atualizar no html
        atualizarItem(itemAtuais)

        //atualizar no LocalStorage   //No localStorage nn atualizamos escrevemos por cima 
        itens[existe.id] = itemAtuais
    }else {                                              //Não existe 
        
        //incremento de ID
        itemAtuais.id = itens.length

        //enviar para a criação o item escrito agora 
        criaItem (itemAtuais)

        //enviar o iten para o array de itens 
        itens.push(itemAtuais)
    }

    //Salvar o item na memoria 
    localStorage.setItem("itens", JSON.stringify(itens)) 

    //limpando o valor do
    nome.value = ""
    quantidade.value= ""
})



// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 

function criaItem (item){

    const novoItem = document.createElement('li') 
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id =item.id

    novoItem.appendChild(numeroItem) // appendeChild serve para colocar um elemnto dentro do outro 
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
 
    /* local storage so recebe strings e, para armazenar objetos, arrays, e listas, é preciso convertê-los utilizando o método JSON.stringify(). 
    Já quando queremos acessar algum dado, podemos utilizar o método localStorage.getItem().*/
} 

//Função para mudar no html
function atualizarItem (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}



