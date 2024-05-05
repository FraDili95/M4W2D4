
params = new URLSearchParams(location.search); //url riportato in precedenza
const URL = "https://striveschool-api.herokuapp.com/books/";//indirizzo url chiamata api
const id = params.get("id");//id estratto da params con get
const workStation = document.getElementById("dettaglio")//puntatore al tavolo di lavoro;

 fetch(`${URL}${id}`)
.then( response => response.json() )
.then( data => {
    console.log(data);
    return data;
})
.then( data => renderingDom(data, workStation))
.catch( error => console.error("Si è verificato un errore: ", error) );

 function renderingDom( dataArray, punct ){
    const libro = dataArray;
    console.log("Libro:  ",libro);
        punct.innerHTML += 
        `
            <div class="card card_custum" style="width: 15rem; height: 28rem; background-color:#CB2478;">
                <img style="height: 18rem;" src="${libro.img}" class="card-img-top" alt="${libro.title}">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text mb-1">ID carta:${libro.asin}</p>
                    <p class="card-text mb-1 ">Prezzo:${libro.price}€</p>
                    <p class="card-text">Genere:${libro.category}</p>
                </div>
            </div>
        `;
       
}