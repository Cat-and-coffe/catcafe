const TIMEOUT_DURATION = 5000;
async function fetchData() {
    showLoadingIndicator();
    try {
        const response = await Promise.race([
            axios.get('https://api.sampleapis.com/coffee/hot'),
            new Promise((resolve, reject) =>
                setTimeout(() => reject(new Error('Tiempo de espera agotado')), TIMEOUT_DURATION)
            )
        ]);
        if (response) {
            const filteredData = response.data.filter(item => item.id >= 3 && item.id <= 8);
            generateCoffeeCards(filteredData);
        }
    } catch (error) {
        if (error.message === 'Tiempo de espera agotado') {
            messageError('Tiempo de espera agotado. Inténtalo de nuevo más tarde.');
        } else {
            messageError('Error al obtener los datos de la API');
            console.error('Error al obtener los datos de la API:', error);
        }
    }
    hideLoadingIndicator();
}

fetchData();

function generateCoffeeCards(coffees) {
    const container = document.querySelector('.row-cols-1');
    container.innerHTML = '';

    const cards = coffees.map(coffee => createCoffeeCard(coffee));
    container.append(...cards);
}

function createCoffeeCard(coffee) {
    const card = document.createElement('div');
    card.classList.add('col', 'mt-4', 'mb-4');
    card.innerHTML = `
        <div class="card individual mx-auto">
            <img src="${coffee.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${coffee.title}</h5>
            </div>
        </div>
    `;
    return card;
}

function messageError(message) {
    const divError = document.getElementById('divError');
    const alert = `
        <div class="alert alert-danger" role="alert">
            <strong>${message}</strong>
        </div> 
    `;
    divError.innerHTML = alert;
}

function showLoadingIndicator() {
    var loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'flex';
}

function hideLoadingIndicator() {
    var loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'none';
}