let qntNoticias = 5;
let pageFinal = qntNoticias;
let pageInicial = 0;
let temaAtual = "tecnologia+inovação+informação";

let noticias = {
    "apiKey":"935d00cb78c44f8291159e6807972c57",
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
        if(pageInicial==0){
            document.querySelector(".container-noticias").textContent ="";
        }

        for(i=pageInicial;i<=pageFinal;i++){
            const {title} = data.articles[i];     
            let h2 = document.createElement("h2");
            h2.textContent = title;
    
            const {urlToImage} = data.articles[i];
            let img = document.createElement("img");
            img.setAttribute("src", urlToImage);

            let info_item = document.createElement("div");
            info_item.className = "info_item";
            const {publishedAt} = data.articles[i];
            let dia = document.createElement("span");
            let date = publishedAt;
            date=date.split("T")[0].split("-").reverse().join("-");
            dia.className = "dia";
            dia.textContent = date;

            const {name} = data.articles[i].source;
            let fonte = document.createElement("span");
            fonte.className = "fonte";
            fonte.textContent = name;

            info_item.appendChild(dia);
            info_item.appendChild(fonte);

            const {url} = data.articles[i];

            let item = document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info_item);
            item.setAttribute("onclick", "location.href='"+url+"'");
            document.querySelector(".container-noticias").appendChild(item);
        }

        let btnproximo = document.createElement("span");
        btnproximo.id = "btnproximo";
        btnproximo.textContent = "Mais...";
        btnproximo.setAttribute("onclick","proximo()");
        document.querySelector(".container-noticias").appendChild(btnproximo);
    }
}

function buscar(cat){
    pageInicial = 0;
    pageFinal = qntNoticias;
    temaAtual = cat;
    noticias.fetchNoticias(cat);
}

function buscarTema(){
    pageInicial = 0;
    pageFinal = qntNoticias;

    let tema = document.querySelector("#procurar").value;
    temaAtual = tema;
    noticias.fetchNoticias(temaAtual);
}

function proximo(){
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + qntNoticias + 1;
    document.querySelector("#btnproximo").remove();
    noticias.fetchNoticias(temaAtual);

}

noticias.fetchNoticias(temaAtual);