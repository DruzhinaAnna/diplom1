var taskId = 1;
document.getElementById('addColumnButton').addEventListener('click', function() {
    var columnName = document.getElementById('columnName').value;
    var columnPosition = document.getElementById('columnPosition').value;

    var cardElement = document.createElement('div');
    cardElement.className = 'card';

    var cardHeaderElement = document.createElement('div');
    cardHeaderElement.className = 'card-header';
    cardHeaderElement.style.backgroundColor = 'teal';
    cardHeaderElement.style.textAlign = 'center';
    cardHeaderElement.textContent = columnName;

    var cardBodyElement = document.createElement('div');
    cardBodyElement.className = 'card-body';
    cardBodyElement.style.minHeight = '50vh';

    var cardFooterElement = document.createElement('div');
    cardFooterElement.className = 'card-footer';

    var svgContainer = document.createElement('div');
    svgContainer.className = 'svg-container';

    var moveLeftIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    moveLeftIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    moveLeftIcon.setAttribute('width', '30');
    moveLeftIcon.setAttribute('height', '30');
    moveLeftIcon.setAttribute('fill', 'currentColor');
    moveLeftIcon.setAttribute('class', 'bi bi-arrow-left-circle');
    moveLeftIcon.setAttribute('viewBox', '0 0 16 16');
    moveLeftIcon.setAttribute('id', 'moveLeftIcon-' + taskId);
    moveLeftIcon.innerHTML = '<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>';

    var deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    deleteIcon.setAttribute('width', '30');
    deleteIcon.setAttribute('height', '30');
    deleteIcon.setAttribute('fill', 'currentColor');
    deleteIcon.setAttribute('class', 'bi bi-x-circle');
    deleteIcon.setAttribute('viewBox', '0 0 16 16');
    deleteIcon.setAttribute('id', 'deleteIcon-' + taskId);
    deleteIcon.innerHTML = '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>';

    var moveRightIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    moveRightIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    moveRightIcon.setAttribute('width', '30');
    moveRightIcon.setAttribute('height', '30');
    moveRightIcon.setAttribute('fill', 'currentColor');
    moveRightIcon.setAttribute('class', 'bi bi-arrow-right-circle');
    moveRightIcon.setAttribute('viewBox', '0 0 16 16');
    moveRightIcon.setAttribute('id', 'moveRightIcon-' + taskId);
    moveRightIcon.innerHTML = '<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>';

    svgContainer.appendChild(moveLeftIcon);
    svgContainer.appendChild(deleteIcon);
    svgContainer.appendChild(moveRightIcon);

    cardFooterElement.appendChild(svgContainer);
    cardElement.appendChild(cardHeaderElement);
    cardElement.appendChild(cardBodyElement);
    cardElement.appendChild(cardFooterElement);

    var columnsContainer = document.querySelector('.container-fluid .cbox:nth-of-type(2)');
    var existingColumns = columnsContainer.getElementsByClassName('card');

    if (columnPosition <= existingColumns.length) {
        columnsContainer.insertBefore(cardElement, existingColumns[columnPosition - 1]);
    } else {
        columnsContainer.appendChild(cardElement);
    }

    document.getElementById('columnName').value = '';
    document.getElementById('columnPosition').value = '';

    // Создание модального окна для подтверждения удаления
    var confirmModalElement = document.createElement('div');
    confirmModalElement.id = 'confirmModal-' + taskId;
    confirmModalElement.className = 'modal';
    confirmModalElement.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Подтверждение удаления</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Вы уверены, что хотите удалить эту колонку?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="cancelDelete-${taskId}" data-bs-dismiss="modal">Отмена</button>
        <button type="button" class="btn btn-danger" id="confirmDelete-${taskId}">Удалить</button>
      </div>
    </div>
  </div>
`;

    document.body.appendChild(confirmModalElement);

    // Удаление колонки
    deleteIcon.addEventListener('click', function() {
        var confirmModal = document.getElementById('confirmModal-' + taskId);
        var modal = new bootstrap.Modal(confirmModal);
        modal.show();

        var confirmDeleteBtn = document.getElementById('confirmDelete-' + taskId);
        confirmDeleteBtn.addEventListener('click', function() {
            cardElement.remove();
            modal.hide();
        });

        var cancelDeleteBtn = document.getElementById('cancelDelete-' + taskId);
        cancelDeleteBtn.addEventListener('click', function() {
            modal.hide();
        });
    });


    // Перемещение колонки влево
    moveLeftIcon.addEventListener('click', function() {
        var prevCard = cardElement.previousElementSibling;
        if (prevCard) {
            columnsContainer.insertBefore(cardElement, prevCard);
        }
    });

    // Перемещение колонки вправо
    moveRightIcon.addEventListener('click', function() {
        var nextCard = cardElement.nextElementSibling;
        if (nextCard) {
            columnsContainer.insertBefore(nextCard, cardElement);
        }
    });

    taskId++;
});


document.getElementById('addTaskButton').addEventListener('click', function() {
    var taskName = document.getElementById('taskName').value;
    var taskDescription = document.getElementById('taskDescription').value;
    var taskDate = document.getElementById('taskDate').value;
    var currentDate = new Date().toISOString().slice(0, 10);
    var taskAssignee = "John Doe"; // Измените на нужного исполнителя


    var taskElement = document.createElement('div');
    taskElement.className = 'card mb-2';


    var taskCardBody = document.createElement('div');
    taskCardBody.className = 'card-task-body';

    var taskTitleLabel = document.createElement('label');
    taskTitleLabel.textContent = 'Название задачи: ';

    var taskTitle = document.createElement('h6');
    taskTitle.className = 'card-title';
    taskTitle.textContent = taskName;

    var taskDescLabel = document.createElement('label');
    taskDescLabel.textContent = 'Описание задачи: ';

    var taskDesc = document.createElement('p');
    taskDesc.className = 'card-text';
    taskDesc.textContent = taskDescription;

    var taskDueDateLabel = document.createElement('label');
    taskDueDateLabel.textContent = 'Срок выполнения: ';

    var taskDueDate = document.createElement('p');
    taskDueDate.className = 'card-text';
    taskDueDate.textContent = taskDate;

    var taskCreatedDateLabel = document.createElement('label');
    taskCreatedDateLabel.textContent = 'Дата создания: ';

    var taskCreatedDate = document.createElement('p');
    taskCreatedDate.className = 'card-text';
    taskCreatedDate.textContent = currentDate;

    var taskAssigneeLabel = document.createElement('label');
    taskAssigneeLabel.textContent = 'Исполнитель: ';

    var taskAssigneeElement = document.createElement('p');
    taskAssigneeElement.className = 'card-text';
    taskAssigneeElement.textContent = taskAssignee;


    var taskStatusLabel = document.createElement('label');
    taskStatusLabel.textContent = 'Статус задачи: ';

    var taskStatusSelect = document.createElement('select');
    taskStatusSelect.id = 'taskStatus';
    taskStatusSelect.style.marginLeft = '10px';

    var notCompletedOption = document.createElement('option');
    notCompletedOption.value = 'notCompleted';
    notCompletedOption.textContent = 'Не завершена';

    var inProgressOption = document.createElement('option');
    inProgressOption.value = 'inProgress';
    inProgressOption.textContent = 'В процессе';

    var completedOption = document.createElement('option');
    completedOption.value = 'completed';
    completedOption.textContent = 'Готово';

    taskStatusSelect.appendChild(notCompletedOption);
    taskStatusSelect.appendChild(inProgressOption);
    taskStatusSelect.appendChild(completedOption);




    taskCardBody.appendChild(taskTitleLabel);
    taskCardBody.appendChild(taskTitle);

    taskCardBody.appendChild(taskDescLabel);
    taskCardBody.appendChild(taskDesc);



    taskCardBody.appendChild(taskStatusLabel);
    taskCardBody.appendChild(taskStatusSelect);


    taskCardBody.appendChild(document.createElement('br'));

    taskCardBody.appendChild(taskDueDateLabel);
    taskCardBody.appendChild(taskDueDate);

    taskCardBody.appendChild(taskCreatedDateLabel);
    taskCardBody.appendChild(taskCreatedDate);

    taskCardBody.appendChild(taskAssigneeLabel);
    taskCardBody.appendChild(taskAssigneeElement);

    taskElement.appendChild(taskCardBody);
    var taskCardFooter = document.createElement('div');
    taskCardFooter.className = 'card-footer';

    taskElement.appendChild(taskCardBody);
    taskElement.appendChild(taskCardFooter);

    var svgSmallContainer = document.createElement('div');
    svgSmallContainer.className = 'svg-small-container';



    var svg4 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg4.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg4.setAttribute('width', '22');
    svg4.setAttribute('height', '22');
    svg4.setAttribute('fill', 'currentColor');
    svg4.setAttribute('class', 'bi bi-box-arrow-in-left');
    svg4.setAttribute('viewBox', '0 0 16 16');
    var path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path7.setAttribute('fill-rule', 'evenodd');
    path7.setAttribute('d', 'M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z');
    var path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path8.setAttribute('fill-rule', 'evenodd');
    path8.setAttribute('d', 'M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z');

    svg4.appendChild(path7);
    svg4.appendChild(path8);

    var svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg1.setAttribute('width', '22');
    svg1.setAttribute('height', '22');
    svg1.setAttribute('fill', 'currentColor');
    svg1.setAttribute('class', 'bi bi-clipboard-plus');
    svg1.setAttribute('viewBox', '0 0 16 16');
    var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('d', 'M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z');
    var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z');
    var path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z');

    svg1.appendChild(path1);
    svg1.appendChild(path2);
    svg1.appendChild(path3);

    var svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg2.setAttribute('width', '22');
    svg2.setAttribute('height', '22');
    svg2.setAttribute('fill', 'currentColor');
    svg2.setAttribute('class', 'bi bi-trash3');
    svg2.setAttribute('viewBox', '0 0 16 16');
    var path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path4.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');

    svg2.appendChild(path4);

    var svg3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg3.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg3.setAttribute('width', '22');
    svg3.setAttribute('height', '22');
    svg3.setAttribute('fill', 'currentColor');
    svg3.setAttribute('class', 'bi bi-box-arrow-in-right');
    svg3.setAttribute('viewBox', '0 0 16 16');
    var path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path5.setAttribute('fill-rule', 'evenodd');
    path5.setAttribute('d', 'M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 6 3.5v2a.5.5 0 0 0 1 0v-2z');
    var path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path6.setAttribute('fill-rule', 'evenodd');
    path6.setAttribute('d', 'M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z');

    svg3.appendChild(path5);
    svg3.appendChild(path6);

    svgSmallContainer.appendChild(svg4);
    svgSmallContainer.appendChild(svg1);
    svgSmallContainer.appendChild(svg2);
    svgSmallContainer.appendChild(svg3);
    // Создание обработчика события для svg2 (удаление задачи)
    svg2.addEventListener('click', function() {
        taskElement.remove();
    });

    // Создание обработчика события для svg3 (переход задачи в другую колонку)
    svg3.addEventListener('click', function() {
        var currentCardBody = svg3.closest('.card-body');
        var nextCardBody = currentCardBody.parentElement.nextElementSibling.querySelector('.card-body');

        if (nextCardBody) {
            nextCardBody.appendChild(taskElement);
        }
    });
    svg4.addEventListener('click', function() {
        var currentCardBody = svg3.closest('.card-body');
        var prevCardBody = currentCardBody.parentElement.previousElementSibling.querySelector('.card-body');

        if (prevCardBody) {
            prevCardBody.appendChild(taskElement);
        }
    });
    taskCardFooter.appendChild(svgSmallContainer);

    var todoColumn = document.getElementById('todoColumn');
    todoColumn.appendChild(taskElement);

    // Очистить поля ввода после добавления задачи
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDate').value = '';

   // Создаем элемент для отображения файла
var fileElement = document.createElement('div');
fileElement.className = 'file-element';

// Создаем элемент для отображения имени файла
var fileName = document.createElement('p');
fileName.textContent = 'Файл не выбран';

// Создаем ссылку для открытия окна выбора файла
var chooseLink = document.createElement('a');
chooseLink.href = '#';
// chooseLink.textContent = 'Обзор';

// Создаем элемент input для выбора файла
var fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.jpg, .png, .docx';
fileInput.style.display = 'none';

// Функция для отображения информации о файле
function showFileInfo(file) {
  // Очищаем предыдущее содержимое
  fileElement.innerHTML = '';

  // Отображаем имя файла
  fileName.textContent = file.name;

  // Проверяем тип файла
  if (file.type.includes('image')) {
    // Если файл является изображением, создаем элемент <img> размером 40x40 и посередине
    var fileImage = document.createElement('img');
    fileImage.src = URL.createObjectURL(file);
    fileImage.alt = 'Изображение';
    fileImage.style.width = '40px';
    fileImage.style.height = '40px';
    fileImage.style.display = 'block';


    // Добавляем изображение в файловый элемент
    fileElement.appendChild(fileImage);

    // Добавляем ссылку для скачивания изображения
    var imageLink = document.createElement('a');
    imageLink.href = URL.createObjectURL(file);
    imageLink.download = file.name;
    imageLink.textContent = 'Скачать изображение';

    // Добавляем ссылку в файловый элемент
    fileElement.appendChild(imageLink);
  } else {
    // Если файл не является изображением, создаем ссылку для скачивания
    var fileLink = document.createElement('a');
    fileLink.href = URL.createObjectURL(file);
    fileLink.download = file.name;
    fileLink.textContent = 'Скачать файл';

    // Добавляем ссылку в файловый элемент
    fileElement.appendChild(fileLink);
  }

  // Добавляем название файла
  fileElement.appendChild(fileName);

  // Добавляем кнопку удаления файла
  var deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger btn-sm';
  deleteButton.textContent = 'Удалить';
  deleteButton.addEventListener('click', function() {
    // Очищаем содержимое fileInput
    fileInput.value = '';

    // Очищаем информацию о файле
    fileName.textContent = 'Файл не выбран';

    // Удаляем файловый элемент
    fileElement.innerHTML = '';
  });

  // Добавляем кнопку удаления в файловый элемент
  fileElement.appendChild(deleteButton);
}

// Обработчик нажатия на svg1
svg1.addEventListener('click', function() {
  fileInput.click();
});

// Обработчик изменения значения input
fileInput.addEventListener('change', function(event) {
  var file = event.target.files[0];
  if (file) {
    showFileInfo(file);
  }
});

// Добавляем элементы в card-body-task
taskCardBody.appendChild(chooseLink);
taskCardBody.appendChild(fileInput);
taskCardBody.appendChild(fileElement);
});

