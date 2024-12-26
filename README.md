# Site de Notícias com API NewsAPI

Este é um projeto de um site de notícias simples que exibe artigos de acordo com temas e categorias. Ele utiliza a API [NewsAPI](https://newsapi.org/) para buscar e exibir notícias atualizadas em tempo real.

## Funcionalidades

- Busca de notícias com base em palavras-chave ou categorias.
- Paginação com botão "Mais..." para exibir mais notícias.
- Formatação automática de data e exibição da fonte da notícia.
- Redirecionamento ao clicar na notícia para acessar o link completo.

## Pré-requisitos

Para executar o projeto, você precisará de:
- Um navegador atualizado.
- Chave de API da [NewsAPI](https://newsapi.org/) substituindo a `apiKey` no código.

## Estrutura do Código

- `qntNoticias`: Número de notícias exibidas por página.
- `fetchNoticias`: Função que busca as notícias na API.
- `displayNoticias`: Exibe as notícias no DOM com título, imagem, data e fonte.
- `buscar`: Realiza busca por categorias.
- `buscarTema`: Permite busca por palavra-chave.
- `proximo`: Exibe mais notícias com base na paginação.

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Abra o arquivo `index.html` no navegador.

## Uso

1. Escolha uma categoria ou digite uma palavra-chave no campo de busca.
2. Clique em "Mais..." para carregar mais notícias.

## Exemplo de Código

```javascript
let qntNoticias = 5; // número de noticias exibidas por páginas 
let pageFinal = qntNoticias; // índice
let pageInicial = 0;
let temaAtual = "tecnologia+inovação+informação"; // tema inicial

let noticias = {
    "apiKey":"SUA_API_KEY",
    fetchNoticias:function(categoria){
        fetch(
            "https://newsapi.org/v2/everything?q=" 
            +categoria+
            "&pais=br&apiKey="+this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayNoticias(data));
    },
    displayNoticias: function(data){
        // Código de exibição omitido para brevidade.
    }
};

// Funções para busca e paginação
function buscar(cat) {
    // Código omitido para brevidade.
}

function buscarTema() {
    // Código omitido para brevidade.
}

function proximo() {
    // Código omitido para brevidade.
}

noticias.fetchNoticias(temaAtual);
```

## Estilo CSS (Opcional)

Você pode personalizar o estilo adicionando classes para o layout do site. Exemplos:
- `.container-noticias`: Contêiner principal das notícias.
- `.item`: Cada notícia exibida.
- `.info_item`: Informações adicionais como data e fonte.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
```
