var searchContainer = document.createElement('div');
searchContainer.className = 'search-container';

var searchInput = document.createElement('input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', 'Введите название');
searchInput.addEventListener('input', handleSearch);

var searchResult = document.createElement('div');
searchResult.className = 'search-result';

searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchResult);

document.body.insertBefore(searchContainer, document.querySelector('.container-fluid'));

// Изначальный порядок card до поиска
var initialCardOrder = Array.from(document.querySelectorAll('.card'));

function handleSearch() {
    var searchTerm = searchInput.value.trim().toLowerCase();
    var cards = Array.from(document.querySelectorAll('.card'));
    var matchedCards = [];
    var parent = cards[0].parentElement;

    // Сбросить порядок card перед каждым поиском
    resetCardOrder();

    if (searchTerm === '') {
        searchResult.textContent = '';
        return;
    }

    matchedCards = cards.filter(function(card) {
        var cardHeader = card.querySelector('.card-header').textContent.toLowerCase();
        return cardHeader.includes(searchTerm);
    });

    if (matchedCards.length > 0) {
        var firstCardIndex = cards.indexOf(matchedCards[0]);

        matchedCards.forEach(function(matchedCard) {
            parent.insertBefore(matchedCard, parent.children[firstCardIndex]);
        });

        searchResult.textContent = 'Результат: ' + matchedCards[0].querySelector('.card-header').textContent;
    } else {
        searchResult.textContent = 'Результат: Нет соответствий';
    }
}

function resetCardOrder() {
    var cards = Array.from(document.querySelectorAll('.card'));
    var parent = cards[0].parentElement;

    // Вернуть карты в исходный порядок
    initialCardOrder.forEach(function(card) {
        parent.appendChild(card);
    });
}