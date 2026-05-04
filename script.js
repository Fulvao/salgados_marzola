let produtos = [
{nome:"Coxinha Frango", c:80, f:95, img:"imagens/coxinha.png"},
{nome:"Coxinha Carne Seca/Catupiry", c:90, f:105, img:"imagens/coxinha_cs_catu.png"},
{nome:"Kibe", c:120, f:135, img:"imagens/kibe.png"},
{nome:"Bolinha de Queijo", c:80, f:95, img:"imagens/bolinha_queijo.png"},
{nome:"Bolinho de Bacalhau", c:130, f:145, img:"imagens/bolinho_bacalhau.png"},
{nome:"Croquete", c:100, f:115, img:"imagens/croquete.png"},
{nome:"Risoles Carne", c:80, f:95, img:"imagens/risoles_carne.png"},
{nome:"Risoles Calabresa", c:80, f:95, img:"imagens/risoles_calabresa.png"},
{nome:"Risoles Palmito/Catupiry", c:80, f:95, img:"imagens/risoles_pal_catu.png"},
{nome:"Risoles Presunto/Queijo", c:80, f:95, img:"imagens/risoles_carne.png"},
{nome:"Empada Frango", c:100, f:110, img:"imagens/empada_frango.png"},
{nome:"Empada Palmito", c:120, f:130, img:"imagens/empada_palmito.png"},

{nome:"Esfiha de Carne", c:100, f:110, img:"imagens/esfiha_carne.png"},
{nome:"Esfiha de Frango", c:100, f:110, img:"imagens/esfiha_frango.png"},

// 🔥 TORTAS
{nome:"Torta de Frango", p:50, g:100, tipoEspecial:true, img:"imagens/torta_frango.png"},
{nome:"Torta de Palmito", p:60, g:120, tipoEspecial:true, img:"imagens/torta_palmito.png"},
{nome:"Torta de Calabresa", p:50, g:100, tipoEspecial:true, img:"imagens/torta_calabresa.png"},
{nome:"Torta de Carne Seca/Catupiry", p:50, g:100, tipoEspecial:true, img:"imagens/torta_cs_catu.png"},
{nome:"Torta de Bacalhau", p:140, g:270, tipoEspecial:true, img:"imagens/torta_bacalhau.png"},
];

let carrinho = [];
let tipoSelecionado = [];

function carregar(){

let html = "";

produtos.forEach((p,i)=>{

let opcoesHTML = "";

// TORTAS
if(p.tipoEspecial){
opcoesHTML = `
<div class="d-flex gap-2 mb-2">
<button class="btn btn-outline-primary btn-opcao flex-fill" onclick="setTipo(${i}, 'p', this)">Pequena<br>R$${p.p}</button>
<button class="btn btn-outline-primary btn-opcao flex-fill" onclick="setTipo(${i}, 'g', this)">Grande<br>R$${p.g}</button>
</div>
`;
}else{
opcoesHTML = `
<div class="d-flex gap-2 mb-2">
<button class="btn btn-outline-primary btn-opcao flex-fill" onclick="setTipo(${i}, 'c', this)">Congelado<br>R$${p.c}</button>
<button class="btn btn-outline-primary btn-opcao flex-fill" onclick="setTipo(${i}, 'f', this)">Frito<br>R$${p.f}</button>
</div>
`;
}

html += `
<div class="col-md-4">
<div class="card">

<img src="${p.img}" onclick="abrirImagem('${p.img}', '${p.nome}')">

<div class="card-body">
<h5>${p.nome}</h5>

${opcoesHTML}

<div class="d-flex justify-content-between">
<button class="btn btn-danger" onclick="add(${i}, -1)">-</button>
<span id="q${i}">0</span>
<button class="btn btn-success" onclick="add(${i}, 1)">+</button>
</div>

</div>
</div>
</div>
`;

if(p.tipoEspecial){
carrinho[i] = {p:0, g:0};
}else{
carrinho[i] = {c:0, f:0};
}

});

document.getElementById("produtos").innerHTML = html;
}

function setTipo(i, tipo, el){

tipoSelecionado[i] = tipo;

// remove seleção
el.parentNode.querySelectorAll("button").forEach(btn=>{
btn.classList.remove("btn-primary");
});

// adiciona seleção
el.classList.add("btn-primary");
}

function add(i, v){

let tipo = tipoSelecionado[i];

if(!tipo){
alert("Selecione uma opção!");
return;
}

carrinho[i][tipo] += v;

if(carrinho[i][tipo] < 0){
carrinho[i][tipo] = 0;
}

let totalQtd = 0;

for(let t in carrinho[i]){
totalQtd += carrinho[i][t];
}

document.getElementById("q"+i).innerText = totalQtd;

calcular();
}

function calcular(){

let total = 0;

produtos.forEach((p,i)=>{

for(let tipo in carrinho[i]){

let preco = p[tipo];
total += carrinho[i][tipo] * preco;

}

});

document.getElementById("total").innerText = total.toFixed(2);
}

function enviarPedido(){

let nome = document.getElementById("nomeCliente").value;
let telefone = document.getElementById("telefoneCliente").value;
let endereco = document.getElementById("enderecoCliente").value;

if(!nome || !telefone || !endereco){
alert("Preencha tudo!");
return;
}

let msg="🧾 *SALGADOS MARZOLA*%0A%0A";

produtos.forEach((p,i)=>{

for(let tipo in carrinho[i]){

if(carrinho[i][tipo] > 0){

let nomeTipo = {
c:"Congelado",
f:"Frito",
p:"Pequena",
g:"Grande"
}[tipo];

msg+=`${p.nome} (${nomeTipo}): ${carrinho[i][tipo]}%0A`;

}

}

});

msg+=`%0A👤 ${nome}%0A📞 ${telefone}%0A📍 ${endereco}`;
msg+=`%0ATotal: R$ ${document.getElementById("total").innerText}`;

window.open("https://wa.me/5511985798474?text="+msg);
}

function abrirImagem(src, nome){

let img = document.getElementById("imgAmpliada");
img.src = src;

document.getElementById("tituloImagem").innerText = nome;

let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalImagem'));
modal.show();
}

carregar();
