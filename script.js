// PUNTATORI GENERALI E URL
const URL = "https://striveschool-api.herokuapp.com/books";
const workStation = document.querySelector("body main div.row.row-cols-lg-8");
const jsonLibri = [];//contenitore copia jason
var libriPreferiti = [];//futuro array di oggetti
var totalTrolley = [];
//FINE DATI GENERALI...............
//funzione richiesta fetch..................................................
async function requestFetch(URL_FETCH) {
    try {
        const response = await fetch(URL_FETCH);
        if (!response.ok) {
            throw new Error("Errore di rete: " + response.statusText);
        }
        
        const data = await response.json();
        console.log("Dati ricevuti: ", data);
        return data;
    } catch (error) {
        console.error("Errore:", error);
        return [];
    }
}
///////////////////////////////////////////////////////////////////////////
//funzione rendeiring Dom...................................................
function renderingDom( dataArray, punct ){
    dataArray.forEach( libro => {
        punct.innerHTML += 
        `
            <div class="card card_custum position-relative" style="width: 15rem; height: 28rem">
                <img style="height: 18rem;" src="${libro.img}" class="card-img-top" alt="${libro.title}">
                <a href="#" class="btn btn-primary add_carrello">Aggiungi al carrello</a>
                <a href="#" class="btn btn-primary preferiti"><i class="bi bi-heart-fill"></i></a>
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text">Prezzo:${libro.price}€</p>
                </div>
            </div>
        `;
    });   
}
//////////////////////////////////////////////////////////////////////////
// funzione per convertire num da stringa.....
function estraiNumeriDaStringa(str) {  
    const numeri = str.match(/\d+(\.\d+)?/g);//per trovare numeri interi e decimali
    return numeri ? numeri.map(Number) : [];//numeri effettivi o stringa vuota
}
//////////////////////////////////////////////////////////////////////////
// funzione per attivare effetto quando punto card.....
function startHover(event) {
    //titolo
    const title = event.currentTarget.querySelector('.card-title');
    if (title) {
        title.classList.add('hoverClass');
    }
    //bottone aggiungi al carrello
    const favor = event.currentTarget.querySelector('.preferiti');
    if (favor) {
        favor.classList.add('hoverClass');
    }
    //bottone aggiungi al carrello
    const addToShops = event.currentTarget.querySelector('.add_carrello');
    if (addToShops) {
        addToShops.classList.add('hoverClass');
    }
}
//////////////////////////////////////////////////////////////////////////
// Funzione per finire effetto quando esco dalla card....
function stopHover(event) {
    const title = event.currentTarget.querySelector('.card-title');
    // console.log(title);
    if (title) {
        title.classList.remove('hoverClass');
    }
    //rimuovi bottone aggiungi al carrello
    const favor = event.currentTarget.querySelector('.preferiti');
    if (favor) {
        favor.classList.remove('hoverClass');
    }
    //rimuovi bottone aggiungi al carrello
    const addToShops = event.currentTarget.querySelector('.add_carrello');
    if (addToShops) {
        addToShops.classList.remove('hoverClass');
    }
}
//////////////////////////////////////////////////////////////////////////
// Funzione per funzionalità aggiungi a preferiti e contatore....
function addFavour(addressPunct) {
    const punct = addressPunct;
    punct.classList.add("d-none");//1)nascondo la carta
    libriPreferiti.push(punct);//2)pusho nella variabile globale i preferiti
    const punctCounterFavour = document.getElementById("contatore_articoli_preferiti");
    punctCounterFavour.textContent = `${libriPreferiti.length}`;//imposto il numero di preferiti come lunghe
     console.log(punctCounterFavour);
}
//////////////////////////////////////////////////////////////////////////
// Funzione per funzionalità aggiungi al carrello e contatore....
function addToTrolley(punctCard) {
    const price = estraiNumeriDaStringa(punctCard.lastElementChild.lastElementChild.textContent);//prendo il prezzo del libro
    totalTrolley.push( parseFloat(price));
    let totalCost = totalTrolley.reduce((accumulator, currentValor)=> accumulator + currentValor );
    // div=>div(last)=>p(last)
    const punctTrolley = document.getElementById("contatore_articoli_carrello");//punto il contatore di articoli
    punctTrolley.textContent = `${totalTrolley.length}`;
    const textTotal = punctTrolley.parentElement.parentElement.lastChild;//puntatole costo totale
    textTotal.textContent = `${totalCost.toFixed(2)}€`;
     console.log(price);
}
//........................................................................................................................................................
document.addEventListener("DOMContentLoaded", async function() {
    try {
            const data = await requestFetch(URL);
            jsonLibri.push(...data);
            await renderingDom(jsonLibri, workStation);
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', startHover);
                card.addEventListener('mouseleave', stopHover);
                card.childNodes[5].addEventListener('click', function(){
                    addFavour(card.childNodes[5].parentElement)//se non la mettevo dentro una funzione anonima non funzionava
                })//aggiungo l'ascoltatore al bottone e nella funzione come parametro l'indirizzo del padre (cioè la carta)
                card.childNodes[3].addEventListener('click', function(){
                    addToTrolley(card.childNodes[3].parentElement);
                })
            // console.log(card.childNodes[5].parentElement);
            });
            
    } 
    catch (error) {
        console.error("Errore:", error);
    } 
    
});

