// Captura os elementos principais
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const radios = document.querySelectorAll("input[name='escolhaComida']");
const adicionais = document.getElementById("adicionais");
const precoTotalEl = document.getElementById("preco-total");
const pagarBtn = document.getElementById("pagar");
const opcoesTapioca = document.getElementById("opcoes-tapioca");
const opcoesSanduiche = document.getElementById("opcoes-Sanduiche");
const opcoesCuscuz = document.getElementById("opcoes-cuscuz");
const imageContainer = document.getElementById("image-container");

// Variáveis
let total = 0;

// Lista de imagens para recheios
const imagensRecheios = {
    "Manteiga": "imagens/manteiga.png",
    "Queijo": "imagens/queijo.png",
    "Presunto": "imagens/presunto.png",
    "Carne": "imagens/carne.png",
    "Ovo Frito": "imagens/ovofrito.png",
    "Frango": "imagens/frango.png",
    "Bacon": "imagens/bacon.png",
    "Chocolate": "imagens/chocolate.png",
// Recheio do sanduiche
    "Presunto": "imagens/Presunto.jfif",
    "Queijo Parmesão": "imagens/parmesao.png",
    "Carne Moída Extra": "imagens/carne-moida.png",
    "Frango Desfiado": "imagens/frango.png",
    "Ovo Frito": "imagens/ovofrito.png",
    "Maionese": "imagens/maionese.jfif",
    "Ketchup": "imagens/ketchup.jfif",
    "Temperada": "imagens/temperada.jfif",
//Recheio do cuscuz
    "Manteiga": "imagens/manteiga.png",
    "Ovo Cozido": "imagens/ovoscozidos.png",
    "Carne de Sol": "imagens/carnesol.png",
    "Coco Ralado": "imagens/cocoralado.png",
    "Calabresa": "imagens/calabresa.jfif",
};

// Atualiza Preço, Adicionais e Imagens
function atualizarResumo() {
    let selecionados = [];
    total = 0;
    imageContainer.innerHTML = ''; // Limpa as imagens de recheios

    // Percorre os checkboxes visíveis
    document.querySelectorAll("input[type='checkbox']:checked").forEach(checkbox => {
        selecionados.push(checkbox.value);
        total += parseFloat(checkbox.getAttribute("data-preco"));

        // Adiciona a imagem correspondente ao container
        const img = document.createElement("img");
        img.src = imagensRecheios[checkbox.value];
        img.alt = checkbox.value;
        imageContainer.appendChild(img);
    });

    // Adiciona o valor do prato principal selecionado
    radios.forEach(radio => {
        if (radio.checked) {
            selecionados.push(radio.value);
            total += parseFloat(radio.getAttribute("data-preco"));
        }
    });

    // Atualiza o texto de adicionais e o preço total
    adicionais.textContent = selecionados.length > 0 ? selecionados.join(", ") : "Sem adicionais";
    precoTotalEl.textContent = total.toFixed(2);
}

// Alterna entre opções de Tapioca, Sanduiche e Cuscuz
function alternarOpcoes() {
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            // Desmarcar todos os checkboxes
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            if (radio.value === "Sanduiche") {
                opcoesTapioca.style.display = 'none';
                opcoesCuscuz.style.display = 'none';
                opcoesSanduiche.style.display = 'block';
                imageContainer.innerHTML = '<img src="imagens/sanduiche.jfif" alt="Sanduiche" />';
            } else if (radio.value === "Tapioca") {
                opcoesSanduiche.style.display = 'none';
                opcoesCuscuz.style.display = 'none';
                opcoesTapioca.style.display = 'block';
                imageContainer.innerHTML = '<img src="imagens/tapioca.png" alt="Tapioca" />';
            } else if (radio.value === "Cuscuz") {
                opcoesSanduiche.style.display = 'none';
                opcoesTapioca.style.display = 'none';
                opcoesCuscuz.style.display = 'block';
                imageContainer.innerHTML = '<img src="imagens/cuscuz.png" alt="Cuscuz" />';
            }
            atualizarResumo(); // Atualiza os adicionais e o preço total
        });
    });
}

// Executa as funções
alternarOpcoes();
atualizarResumo();

// Atualiza o resumo ao selecionar ou desmarcar qualquer checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", atualizarResumo);
});

// Ação do botão de pagamento
pagarBtn.addEventListener("click", () => {
    alert(`Pedido finalizado!\nTotal: R$ ${total.toFixed(2)}`);
});

// Elementos do DOM
const pagar= document.getElementById("pagar");
const historicoBtn = document.getElementById("historico-compras");

// Array para armazenar o histórico de compras
let historicoDeCompras = [];

// Função para adicionar um pedido ao histórico
function adicionarAoHistorico(pedido, total) {
    historicoDeCompras.push({ pedido, total });
}

// Ação do botão "Pagar"
pagarBtn.addEventListener("click", () => {
    const pedido = document.getElementById("adicionais").textContent;
    const total = parseFloat(document.getElementById("preco-total").textContent.replace(",", "."));
    
    // Adiciona ao histórico
    adicionarAoHistorico(pedido, total);

    alert(`Pedido finalizado!\nTotal: R$ ${total.toFixed(2)}`);
});

// Ação do botão "Histórico de compras"
historicoBtn.addEventListener("click", () => {
    if (historicoDeCompras.length === 0) {
        alert("Nenhuma compra realizada ainda!");
    } else {
        let historicoTexto = "Histórico de Compras:\n";
        historicoDeCompras.forEach((compra, index) => {
            historicoTexto += `Pedido ${index + 1}: ${compra.pedido}\nTotal: R$ ${compra.total.toFixed(2)}\n\n`;
        });
        alert(historicoTexto);
    }
});

//########################################################################
async function pegarTapioca()
{
    var response = await fetch("http://localhost:8080/food?id=1");
    var dados = await response.json();

   console.log(dados)

//    <label><input type="checkbox" value="Queijo" data-preco="3"> Queijo</label>

    var coluna = document.querySelector(".coluna");
    coluna.innerHTML = ""

   for(recheios of dados.filings){
    console.log(recheios.name)

    var labelRecheios = document.createElement("label")
    labelRecheios.innerHTML = `
    <input type="checkbox" value="${recheios.name}" data-preco="${recheios.value}"> ${recheios.name}`

    coluna.appendChild(labelRecheios);
   }
}

async function pegarSanduiche()
{
    var response = await fetch("http://localhost:8080/food?id=3");
    var dados = await response.json();

   console.log(dados)

   

//    <label><input type="checkbox" value="Queijo" data-preco="3"> Queijo</label>

    var coluna = document.querySelector(".coluna3");
    coluna.innerHTML = ""

   for(recheios of dados.filings){
    console.log(recheios.name)

    var labelRecheios = document.createElement("label")
    labelRecheios.innerHTML = `
    <input type="checkbox" value="${recheios.name}" data-preco="${recheios.value}"> ${recheios.name}`

    coluna.appendChild(labelRecheios);
   }
}

async function pegarCuzcuz()
{
    var response = await fetch("http://localhost:8080/food?id=2");
    var dados = await response.json();

   console.log(dados)

   

//    <label><input type="checkbox" value="Queijo" data-preco="3"> Queijo</label>

    var coluna = document.querySelector(".coluna2");
    coluna.innerHTML = ""

   for(recheios of dados.filings){
    console.log(recheios.name)

    var labelRecheios = document.createElement("label")
    labelRecheios.innerHTML = `
    <input type="checkbox" value="${recheios.name}" data-preco="${recheios.value}"> ${recheios.name}`

    coluna.appendChild(labelRecheios);
   }
}

//pegarCuzcuz();
//pegarTapioca();

async function precoTotal()
{
    
     var response = await fetch("http://localhost:8080/food?id=4");
     var dados = await response.json();

  console.log(log)

  //<label><input type="checkbox" value="preco" data-preco="4"> Preco</label>

     var coluna = document.querySelector("resumo box");
     coluna.innerHTML=""

     for (recheios of dados.filings){
        console.log(recheios.name)

        var labelRecheios=document.createElement("preco-total")
        labelRecheios.innerHTML =`
        <input type="checkbox" value="${recheios.name}" data-preco="${recheios.value}"> ${recheios.name}`

        coluna.appendChild(labelRecheios);
     }
}
pegarPreco()