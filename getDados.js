// URL base da API
const baseURL = 'http://localhost:8080';
const url = "https://kitsu.io/api/edge/anime?filter[text]=naruto"

export default function getDados(endpoint) {
    return fetch(`${baseURL}${endpoint}`)
        .then(response => response.json())
            .catch(error => {
                console.error('Erro ao acessar o endpoint /series/top5:', error);
            });
}


getDados('/').then(
    data => console.log(data[1])
).catch(erro => console.log(erro))