// Функция для отображения/скрытия выпадающего меню у кнопки "Создать"
function toggleCreateDropdown() {
      var createDropdownContent = document.getElementById("create-dropdown-content");
      createDropdownContent.style.display = createDropdownContent.style.display === "block" ? "none" : "block";
    }

    // Функция для скрытия выпадающего меню при нажатии на пустое место
    window.onclick = function(event) {
      if (!event.target.matches('.create-btn')) {
        var createDropdowns = document.getElementsByClassName("create-dropdown-content");
        for (var i = 0; i < createDropdowns.length; i++) {
          var openCreateDropdown = createDropdowns[i];
          if (openCreateDropdown.style.display === "block") {
            openCreateDropdown.style.display = "none";
          }
        }
      }
    }

    // Функция для скрытия/отображения SideBar
    function toggleSidebar() {
      var sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("hide");
    }


  var draggedFormId;

  // Функция для сохранения идентификатора формы при начале перетаскивания
  function dragStart(event, formId) {
    event.dataTransfer.setData("text/plain", formId);
    draggedFormId = formId;
  }
  function toggleFormDropdown(event) {
  var formDropdownContent = event.target.nextElementSibling;
  formDropdownContent.style.display = formDropdownContent.style.display === "block" ? "none" : "block";
  // Функция для скрытия выпадающего меню при нажатии на пустое место
window.onclick = function(event) {
  if (!event.target.matches('.actions-button img')) {
    var formDropdowns = document.getElementsByClassName("form-dropdown-content");
    for (var i = 0; i < formDropdowns.length; i++) {
      var openFormDropdown = formDropdowns[i];
      if (openFormDropdown.style.display === "block") {
        openFormDropdown.style.display = "none";
      }
    }
  }
}
}
// Переменная для хранения исходных размеров формы
var originalFormSize;
var originalForm2Size;
var originalForm2Margin;
var originalImageMargin;

// Функция для обработки выбора опции в выпадающем списке первой формы
function handleFormDropdownSelection(option) {
  var form1 = document.getElementById("form1");
  var form2 = document.getElementById("form2");
  var plusCircleButton = '<img src="plus-circle.jpg" onclick="removeImage()" alt="Plus Circle" width="65" height="65" style="position: absolute; left: calc(50% + 20px); top: 50%; transform: translate(-50%, -50%); margin-left: 240px;" />';

  // Сохраняем исходные размеры формы и смещение картинки, если они еще не сохранены
  if (!originalFormSize) {
    originalFormSize = form1.style.width;
    originalForm2Size = form2.style.width;
    originalForm2Margin = form2.style.marginLeft;
    var plusCircleElement = document.querySelector("#form1 + div img");
    if (plusCircleElement) {
      originalImageMargin = plusCircleElement.style.marginLeft;
    }
  }

  switch (option) {
    case "fullscreen":
      form2.style.display = "none";
      form1.style.width = "100%";
      form2.style.width = "100%";
      break;
    case "view-tasks":
      window.location.href = "my-tasks.html";
      break;
    case "delete-widget":
      form1.style.display = "none";
      form2.style.position = "static";
      form2.style.display = "inline-block";
      form2.style.verticalAlign = "top";
      form2.style.marginLeft = "530px"; // Смещение второй формы на 100px вправо
      var container = document.createElement("div");
      container.style.position = "relative";
      container.style.display = "inline-block";
      container.style.textAlign = "center";
      container.style.marginRight = "10px";
      container.style.marginBottom = "10px";
      container.innerHTML = plusCircleButton;
      form1.insertAdjacentElement("afterend", container);
      break;
    case "half":
      if (originalFormSize) {
        form1.style.width = originalFormSize;
        form2.style.display = "block";
        form2.style.width = originalForm2Size;
        var plusCircleElement = document.querySelector("#form1 + div img");
        if (plusCircleElement) {
          plusCircleElement.parentElement.remove();
        }
        // Сбрасываем сохраненные размеры формы и смещение картинки
        originalFormSize = null;
        originalForm2Size = null;
        originalForm2Margin = null;
        originalImageMargin = null;
      }
      break;
    default:
      break;
  }

  // Устанавливаем чуть меньший размер для обеих форм при возврате
  if (!originalFormSize && option !== "fullscreen") {
    form1.style.width = "32%";
    form2.style.width = "32%";
  }
}

// Функция для удаления картинки и возврата первой формы
function removeImage() {
  var form1 = document.getElementById("form1");
  var plusCircleElement = document.querySelector("img[alt='Plus Circle']");
  if (plusCircleElement) {
    plusCircleElement.remove();
  }
  form1.style.display = "block";

  // Восстанавливаем исходные размеры формы и смещение второй формы
  if (originalFormSize) {
    form1.style.width = originalFormSize;
    form2.style.marginLeft = originalForm2Margin;
    originalFormSize = null;
    originalForm2Size = null;
    originalForm2Margin = null;
    originalImageMargin = null;
  }
}






  // Функция для предотвращения перетаскивания форм за пределы секции Content
  function allowDrop(event) {
    event.preventDefault();
  }

  // Функция для обработки события сброса формы в секции Content
  function drop(event) {
    event.preventDefault();
    var droppedFormId = event.dataTransfer.getData("text/plain");
    var droppedForm = document.getElementById(droppedFormId);
    var targetForm = event.target.closest('.form');

    if (targetForm && targetForm.id !== droppedFormId) {
      if (draggedFormId === droppedFormId) {
        // Перемещение формы внутри себя
        var parentContainer = targetForm.parentNode;
        parentContainer.insertBefore(droppedForm, targetForm);
      } else {
        // Обмен местами двух форм
        var nextSibling = targetForm.nextSibling;
        var parentContainer = targetForm.parentNode;

        if (nextSibling === droppedForm) {
          parentContainer.insertBefore(droppedForm, targetForm);
        } else {
          parentContainer.insertBefore(targetForm, droppedForm);
        }
      }
    }
  }

// Функция для получения текущей даты
  function getCurrentDate() {
    var date = new Date();
    var options = { weekday: 'long', day: 'numeric', month: 'long' };
    var formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate;
  }

  // Обновление текста с текущей датой
  document.getElementById('current-date').innerText = getCurrentDate();