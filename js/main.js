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

    const existe = itens.find(elemento => elemento.nome === nome.value ) // find enontra o primeiro elemento 
                                                                        //que satifaz a condição 

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

        //atualizar no LocalStorage                  //No localStorage nn atualizamos escrevemos por cima 
        //Refatoração da condicional if else, atualizando um id para cada item
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtuais
                          
    }else {                                              //Não existe 
        
        //incremento de ID verificar se a primeiro item
        itemAtuais.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

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
    novoItem.innerHTML += item.nome// ??? nn entendi o motivo de usar o '+='

    //Chammando função de criação de botão 
    novoItem.appendChild(botaDelete(item.id))

    lista.appendChild(novoItem)
 
    /* local storage so recebe strings e, para armazenar objetos, arrays, e listas, é preciso convertê-los utilizando o método JSON.stringify(). 
    Já quando queremos acessar algum dado, podemos utilizar o método localStorage.getItem().*/
} 

//Função para mudar no html
function atualizarItem (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}

//Função de criação de botaão delete 
function botaDelete (id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento (tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    //O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.

    localStorage.setItem("itens", JSON.stringify(itens))
}


/*splice (onde começa, quantos elemento deve ser removido, que elemento colocar no lugar (separando por
    virgula ex = 'joao', 'mario'))
    
    > Array ["Jan", "Feb", "March", "April", "June"] antes
    array.splice (0,5, 'joao', 'mario')
    > Array ["joao", "mario"]depois
*/