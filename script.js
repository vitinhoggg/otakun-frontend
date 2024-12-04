const baseURL = 'http://localhost:8080';
const url = "https://kitsu.io/api/edge/anime?filter[text]=naruto"

function getDados(endpoint) {
    return fetch(`${baseURL}${endpoint}`)
        .then(response => response.json())
            .catch(error => {
                console.error('Erro ao acessar o endpoint /series/top5:', error);
            });
}

// Função para buscar animes da API
geraAnime();
function geraAnime() {
    getDados('/').then(
        (data) => {
            criarListaAnimes(data)
            console.log(data)
        }
    ).catch(erro => console.log(erro));
}
var animes = {};
function criarListaAnimes(dados) {
    animes = dados
    // Verifique se há um elemento <ul> dentro da seção
    renderHome(dados)
}

function renderHome(dados){
    const divRoot =  document.getElementById('root');

    const ul = document.createElement('ul');
    ul.className = 'lista';
    const listaHTML = dados.map((anime) => 
        `
        <li class="card">
            <a id="${anime.id}" onclick="detalhesAnime(this.id)">
                <img src="${anime.poster}" alt="${anime.titulo}">
            </a>
        </li>
    `).join('');

    ul.innerHTML = listaHTML;
    divRoot.innerHTML = "";
    divRoot.appendChild(ul);

}


function detalhesAnime(id){
    animeSelecionado = animes.find(item => item.id === parseInt(id));
    console.log(animeSelecionado);

    const divRoot =  document.querySelector('#root');

    const divAnime = document.createElement('div');
    divAnime.className = "detalhes";
    divAnime.innerHTML = 
    `
            <div id="poster">
                <img src="${animeSelecionado.poster}" alt="${animeSelecionado.titulo}" />
            </div>
            <div id="informacoes">
                <div id="titulo" class="textoDetalhe">TITULO: ${animeSelecionado.titulo}</div>
                <div id="totalEpisodios" class="textoDetalhe">Número total de episodios: ${animeSelecionado.totalEpisodios}</div>
                <div id="descricao" class="textoDetalhe">Sinopse: ${animeSelecionado.descricao}</div>
                
            </div>
    `
    divRoot.innerHTML = "";
    divRoot.appendChild(divAnime);
}

function listaDetalhada(){
    const divRoot =  document.querySelector('#root');

    const divAnime = document.createElement('div');
    divAnime.className = "anime-detalhes";

    // const ul = document.createElement('ul');
    // ul.className = 'lista';
    const listaHTML = animes.map((animeSelecionado) => 
        `<div class="anime-detalhe">
            <div class="class-poster">
                <img src="${animeSelecionado.poster}" alt="${animeSelecionado.titulo}" />
            </div>
            <div class="class.informacoes">
                <div class="textoDetalhe class-titulo">TITULO: ${animeSelecionado.titulo}</div>
                <div class="textoDetalhe class-total-episodios">Número total de episodios: ${animeSelecionado.totalEpisodios}</div>
                <div class="textoDetalhe class-descricao">Descricao: ${animeSelecionado.descricao}</div>
                
            </div>
        </div>
    `).join('');

    divRoot.innerHTML = listaHTML;
    divRoot.appendChild(divAnime);
}




function buscar(){
    const txtBuscar =  document.querySelector('#txtBuscar');
    console.log(txtBuscar.value.toLowerCase().trim());

    const animesFiltrados = animes.filter(anime => {
        return anime.titulo.toLowerCase().trim().includes(txtBuscar.value.toLowerCase().trim());
    });
    
    renderHome(animesFiltrados)
}

var txtBuscar = document.getElementById("txtBuscar");

// Execute a function when the user presses a key on the keyboard
txtBuscar.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});




