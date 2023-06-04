$(document).ready(function() {
    $('[id^="deleteIcon"]').on('click', function() {
        var deleteIconId = $(this).attr('id');
        var cardId = deleteIconId.substring(deleteIconId.indexOf('-') + 1);
        var confirmModalId = '#confirmModal-' + cardId;

        $(confirmModalId).modal('show');
        $(confirmModalId).data('cardSelector', $(this).closest('.card'));
    });

    $('[id^="confirmDelete"]').on('click', function() {
        var cardSelector = $(this).closest('.modal').data('cardSelector');
        var confirmModalId = '#' + $(this).closest('.modal').attr('id');

        $(cardSelector).remove();
        $(confirmModalId).modal('hide');
    });

    $('[id^="cancelDelete"]').on('click', function() {
        var confirmModalId = '#' + $(this).closest('.modal').attr('id');

        $(confirmModalId).modal('hide');
    });



    $('[id^="moveLeftIcon"]').on('click', function() {
        var currentCard = $(this).closest('.card');
        var prevCard = currentCard.prev('.card');

        if (prevCard.length > 0) {
            currentCard.insertBefore(prevCard);
        }
    });

    $('[id^="moveRightIcon"]').on('click', function() {
        var currentCard = $(this).closest('.card');
        var nextCard = currentCard.next('.card');

        if (nextCard.length > 0) {
            currentCard.insertAfter(nextCard);
        }
    });
});