function loadContent(page) {
  var taskContent = document.getElementById("task-content");
  taskContent.innerHTML = "";

  if (page === "list") {
    var addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.onclick = function() {
      console.log("Добавление задачи");
    };
    var plusImage = document.createElement("img");
    plusImage.src = "/static/vendor/js/plus_lg.jpg";
    plusImage.className = "plus-image";
    plusImage.style.width = "20px";
    plusImage.style.backgroundColor = "inherit";
    var addButtonLabel = document.createTextNode("Добавить");
    addButton.appendChild(plusImage);
    addButton.appendChild(addButtonLabel);

    var sortButton = document.createElement("button");
    sortButton.className = "sort-button";
    sortButton.onclick = function() {
      var sortMenu = document.getElementById("sort-menu");
      sortMenu.classList.toggle("show");
    };
    var arrowImage = document.createElement("img");
    arrowImage.src = "/static/vendor/js/arrow-down-up.jpg";
    arrowImage.className = "arrow-image";
    arrowImage.style.width = "20px";
    arrowImage.style.backgroundColor = "inherit";
    var sortButtonLabel = document.createTextNode("Сортировка");
    sortButton.appendChild(arrowImage);
    sortButton.appendChild(sortButtonLabel);

    var sortMenu = document.createElement("div");
    sortMenu.id = "sort-menu";
    sortMenu.className = "sort-menu";

    var noneOption = document.createElement("div");
    noneOption.className = "sort-option";
    noneOption.innerText = "Нет";
    noneOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка";
      var sortMenu = document.getElementById("sort-menu");
      sortMenu.classList.remove("show");
    };

    var creationDateOption = document.createElement("div");
    creationDateOption.className = "sort-option";
    creationDateOption.innerText = "Дата создания";
    creationDateOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка: Дата создания";
      var sortMenu = document.getElementById("sort-menu");
      sortMenu.classList.remove("show");
    };
 sortButton.style.float = "right";

    var deadlineOption = document.createElement("div");
    deadlineOption.className = "sort-option";
    deadlineOption.innerText = "Срок выполнения";
    deadlineOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка: Срок выполнения";
      var sortMenu = document.getElementById("sort-menu");
      sortMenu.classList.remove("show");
    };

    var alphabeticalOption = document.createElement("div");
    alphabeticalOption.className = "sort-option";
    alphabeticalOption.innerText = "По алфавиту";
    alphabeticalOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка: По алфавиту";
      var sortMenu = document.getElementById("sort-menu");
      sortMenu.classList.remove("show");
    };

    sortMenu.appendChild(noneOption);
    sortMenu.appendChild(creationDateOption);
    sortMenu.appendChild(deadlineOption);
    sortMenu.appendChild(alphabeticalOption);

    taskContent.appendChild(addButton);
    taskContent.appendChild(sortButton);
    sortButton.appendChild(arrowImage);
    sortButton.appendChild(sortButtonLabel);
    sortButton.appendChild(sortMenu);

    document.addEventListener("click", function(event) {
      var sortMenu = document.getElementById("sort-menu");
      if (event.target !== sortButton && !sortMenu.contains(event.target)) {
        sortMenu.classList.remove("show");
      }
    });
  }  else if (page === "board") {
    var boardContent = document.createElement("div");

    var sortContainer = document.createElement("div");
    sortContainer.className = "sort-container";

  var addSectionButton = document.createElement("button");
addSectionButton.className = "add-section-button";


addSectionButton.style.position = "relative";
addSectionButton.style.top = "0"; // Пример отступа сверху
addSectionButton.style.left= "719px"; // Пример отступа справа







var addSectionIcon = document.createElement("img");
addSectionIcon.src = "/static/vendor/js/plus_lg.jpg";
addSectionIcon.className = "add-section-icon";
addSectionIcon.style.width = "20px";
addSectionIcon.style.backgroundColor = "inherit";

var addSectionLabel = document.createTextNode("Добавить раздел");
addSectionButton.appendChild(addSectionIcon);
addSectionButton.appendChild(addSectionLabel);
function createNewForm(title, position) {
    var newForm = document.createElement("div");
    newForm.className = "small-form";

    var formContainer = document.createElement("div");
    formContainer.className = "form-container";

    var formTitle = document.createElement("h3");
    formTitle.className = "form-title";
    formTitle.innerText = title;
    formTitle.onclick = function () {
      formTitle.contentEditable = true;
      formTitle.focus();
    };
    formContainer.appendChild(formTitle);

    var plusBtn = document.createElement("img");
    plusBtn.src = "/static/vendor/js/plus_lg.jpg";
    plusBtn.className = "form-button";
    plusBtn.addEventListener("click", function () {
  createTask(newForm);
});
var taskDeleteImage= document.createElement("img");
  taskDeleteImage.src = "/static/vendor/js/trash.jpg";
  taskDeleteImage.style.width = "30px";
  taskDeleteImage.style.marginLeft = "5px";
  taskDeleteImage.addEventListener("click", function() {
    form.remove();
  });
  formContainer.appendChild(taskDeleteImage);
    formContainer.appendChild(plusBtn);

    newForm.appendChild(formContainer);

    var smallForms = document.querySelectorAll(".small-form");
    var targetForm = null;

    if (position === "1") {
      targetForm = smallForms[0];
    } else if (position === "2") {
      targetForm = smallForms[1];
    } else if (position === "3") {
      targetForm = smallForms[2];
    }else if (position === "4") {
      targetForm = smallForms[3];
    }else if (position === "5") {
      targetForm = smallForms[4];
    }else if (position === "6") {
      targetForm = smallForms[5];
    }else if (position === "7") {
      targetForm = smallForms[6];
    }else if (position === "8") {
      targetForm = smallForms[7];
    }else if (position === "9") {
      targetForm = smallForms[8];
    }else if (position === "10") {
      targetForm = smallForms[9];
    }else if (position === "11") {
      targetForm = smallForms[10];
    }else if (position === "12") {
      targetForm = smallForms[11];
    }else if (position === "13") {
      targetForm = smallForms[12];
    }else if (position === "14") {
      targetForm = smallForms[13];
    }else if (position === "15") {
      targetForm = smallForms[14];
    }else if (position === "16") {
      targetForm = smallForms[15];
    }else if (position === "17") {
      targetForm = smallForms[16];
    }else if (position === "18") {
      targetForm = smallForms[17];
    }else if (position === "19") {
      targetForm = smallForms[18];
    }else if (position === "20") {
      targetForm = smallForms[19];
    }

    if (targetForm) {
      targetForm.parentNode.insertBefore(newForm, targetForm);
    } else {
      var lastForm = smallForms[smallForms.length - 1];
      if (lastForm) {
        lastForm.parentNode.appendChild(newForm);
      } else {
        document.body.appendChild(newForm);

    }
  }}

  // Обработчик нажатия на кнопку "Добавить раздел"
  addSectionButton.addEventListener("click", function () {
    var title = prompt("Введите название формы:");
    var position = prompt("Введите позицию формы");
    createNewForm(title, position);
  });



    var sortButton = document.createElement("button");
    sortButton.className = "sort-button";
    sortButton.style.position = "relative";
    sortButton.onclick = function() {
      var sortMenu = document.getElementById("sort-menu1");
      sortMenu.classList.toggle("show");
    };

    var arrowImage = document.createElement("img");
    arrowImage.src = "/static/vendor/js/arrow-down-up.jpg";
    arrowImage.className = "arrow-image";
    arrowImage.style.width = "20px";
    arrowImage.style.backgroundColor = "inherit";

    var sortButtonLabel = document.createTextNode("Сортировать");
    sortButton.appendChild(arrowImage);
    sortButton.appendChild(sortButtonLabel);



    var sortMenu = document.createElement("div");
    sortMenu.id = "sort-menu1";
    sortMenu.className = "sort-menu1";

    var noneOption = document.createElement("div");
    noneOption.className = "sort-option1";
    noneOption.innerText = "Нет";
    noneOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировать";
      var sortMenu = document.getElementById("sort-menu1");
      sortMenu.classList.remove("show");
    };

    var creationDateOption = document.createElement("div");
    creationDateOption.className = "sort-option1";
    creationDateOption.innerText = "Дата создания";
    creationDateOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка: Дата создания";
      var sortMenu = document.getElementById("sort-menu1");
      sortMenu.classList.remove("show");
    };

    var deadlineOption = document.createElement("div");
    deadlineOption.className = "sort-option1";
    deadlineOption.innerText = "Срок выполнения";
    deadlineOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка: Срок выполнения";
      var sortMenu = document.getElementById("sort-menu1");
      sortMenu.classList.remove("show");
    };

    var alphabeticalOption = document.createElement("div");
    alphabeticalOption.className = "sort-option1";
    alphabeticalOption.innerText = "По алфавиту";
    alphabeticalOption.onclick = function() {
      sortButtonLabel.nodeValue = "Сортировка: По алфавиту";
      var sortMenu = document.getElementById("sort-menu1");
      sortMenu.classList.remove("show");
    };

    sortMenu.appendChild(noneOption);
    sortMenu.appendChild(creationDateOption);
    sortMenu.appendChild(deadlineOption);
    sortMenu.appendChild(alphabeticalOption);

    sortContainer.appendChild(sortButton);
    sortContainer.appendChild(addSectionButton);
    sortContainer.appendChild(sortMenu);

    boardContent.appendChild(sortContainer);

    var form = document.createElement("form");
    form.className = "board-form";

    // Создание формы "Сделать сегодня"
    var form1 = document.createElement("div");
    form1.className = "small-form";
    var formContainer1 = document.createElement("div");
    formContainer1.className = "form-container";
    var formTitle1 = document.createElement("h3");
    formTitle1.className = "form-title";
    formTitle1.innerText = "Сделать сегодня";
    formTitle1.onclick = function() {
      formTitle1.contentEditable = true;
      formTitle1.focus();
    };
    formContainer1.appendChild(formTitle1);
    var plusBtn1 = document.createElement("img");
    plusBtn1.src = "/static/vendor/js/plus_lg.jpg";
    plusBtn1.className = "form-button";
    plusBtn1.addEventListener("click", function () {
  createTask(form1);
});
var taskDeleteImage1= document.createElement("img");
  taskDeleteImage1.src = "/static/vendor/js/trash.jpg";
  taskDeleteImage1.style.width = "30px";
  taskDeleteImage1.style.marginLeft = "5px";
  taskDeleteImage1.addEventListener("click", function() {
    form1.remove();
  });
  formContainer1.appendChild(taskDeleteImage1);
    formContainer1.appendChild(plusBtn1);
    form1.appendChild(formContainer1);

    // Создание формы "Сделать позже"
    var form2 = document.createElement("div");
    form2.className = "small-form";
    var formContainer2 = document.createElement("div");
    formContainer2.className = "form-container";
    var formTitle2 = document.createElement("h3");
    formTitle2.className = "form-title";
    formTitle2.innerText = "Сделать позже";
    formTitle2.onclick = function() {
      formTitle2.contentEditable = true;
      formTitle2.focus();
    };
    formContainer2.appendChild(formTitle2);
    var plusBtn2 = document.createElement("img");
    plusBtn2.src = "/static/vendor/js/plus_lg.jpg";
    plusBtn2.className = "form-button";
    plusBtn2.addEventListener("click", function () {
  createTask(form2);
});

var taskDeleteImage2= document.createElement("img");
  taskDeleteImage2.src = "/static/vendor/js/trash.jpg";
  taskDeleteImage2.style.width = "30px";
  taskDeleteImage2.style.marginLeft = "5px";
  taskDeleteImage2.addEventListener("click", function() {
    form2.remove();
  });
  formContainer2.appendChild(taskDeleteImage2);
    formContainer2.appendChild(plusBtn2);
    form2.appendChild(formContainer2);

    // Создание формы "Сделать на следующей неделе"
    var form3 = document.createElement("div");
    form3.className = "small-form";
    var formContainer3 = document.createElement("div");
    formContainer3.className = "form-container";
    var formTitle3 = document.createElement("h3");
    formTitle3.className = "form-title";
    formTitle3.innerText = "Сделать на следующей неделе";
    formTitle3.onclick = function() {
      formTitle3.contentEditable = true;
      formTitle3.focus();
    };
    formContainer3.appendChild(formTitle3);
    var plusBtn3 = document.createElement("img");
    plusBtn3.src = "/static/vendor/js/plus_lg.jpg";
    plusBtn3.className = "form-button";
    plusBtn3.addEventListener("click", function () {
  createTask(form3);
});
var taskDeleteImage3= document.createElement("img");
  taskDeleteImage3.src = "/static/vendor/js/trash.jpg";
  taskDeleteImage3.style.width = "30px";
  taskDeleteImage3.style.marginLeft = "5px";
  taskDeleteImage3.addEventListener("click", function() {
    form3.remove();
  });
  formContainer3.appendChild(taskDeleteImage3);

    formContainer3.appendChild(plusBtn3);
    form3.appendChild(formContainer3);

    // Добавление форм на основную форму
    form.appendChild(form1);
    form.appendChild(form2);
    form.appendChild(form3);

    boardContent.appendChild(form);

    taskContent.appendChild(boardContent);
    function createTask(form) {
  var taskContainer = document.createElement("div");
  taskContainer.className = "task-container";
  taskContainer.style.border = "1px solid black";
  taskContainer.style.padding = "10px";

  taskContainer.style.marginBottom = "10px";

  var taskTitleLabel = document.createElement("label");
  taskTitleLabel.innerText = "Название задачи: ";
  taskContainer.appendChild(taskTitleLabel);

  var taskTitleInput = document.createElement("input");
  taskTitleInput.type = "text";
  taskTitleInput.style.marginLeft = "5px";
  taskTitleLabel.appendChild(taskTitleInput);

  var taskCreationDate = document.createElement("p");
  taskCreationDate.innerText = "Дата создания: " + new Date().toLocaleDateString();
  taskContainer.appendChild(taskCreationDate);

  var taskEndDateLabel = document.createElement("label");
  taskEndDateLabel.innerText = "Дата окончания задачи: ";
  taskContainer.appendChild(taskEndDateLabel);

  var taskEndDateInput = document.createElement("input");
  taskEndDateInput.type = "date";
  taskEndDateLabel.appendChild(taskEndDateInput);

  var taskStatusLabel = document.createElement("label");
  taskStatusLabel.innerText = "Статус задачи: ";
  taskContainer.appendChild(taskStatusLabel);

  var taskStatusSelect = document.createElement("select");
  taskStatusSelect.innerHTML = `
    <option value="notCompleted">Не завершено</option>
    <option value="inProgress">В процессе</option>
    <option value="completed">Готово</option>
  `;
  taskStatusLabel.appendChild(taskStatusSelect);

  var taskDescriptionLabel = document.createElement("label");
  taskDescriptionLabel.innerText = "Описание задачи: ";
  taskContainer.appendChild(taskDescriptionLabel);

  var taskDescriptionInput = document.createElement("textarea");
  taskDescriptionInput.rows = 4;
  taskDescriptionInput.style.width = "100%";
  taskDescriptionLabel.appendChild(taskDescriptionInput);

  var taskExecutorLabel = document.createElement("label");
  taskExecutorLabel.innerText = "Исполнитель: ";
  taskContainer.appendChild(taskExecutorLabel);

  var taskExecutorInput = document.createElement("input");
  taskExecutorInput.type = "text";
  taskExecutorLabel.appendChild(taskExecutorInput);

  var taskAttachmentImage = document.createElement("img");
  taskAttachmentImage.src = "/static/vendor/js/paperclip.jpg";
  taskAttachmentImage.style.width = "30px";
  taskAttachmentImage.style.marginLeft = "5px";
  taskContainer.appendChild(taskAttachmentImage);

  var taskDeleteImage4 = document.createElement("img");
  taskDeleteImage4.src = "/static/vendor/js/trash.jpg";
  taskDeleteImage4.style.width = "30px";
  taskDeleteImage4.style.marginLeft = "5px";
  taskDeleteImage4.addEventListener("click", function() {
    taskContainer.remove();
  });
  taskContainer.appendChild(taskDeleteImage4);


  form.appendChild(taskContainer);
}

   var dragSrcEl = null;

    function handleDragStart(e) {
      dragSrcEl = this;
      this.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = "move";
      return false;
    }

    function handleDragEnter() {
      this.classList.add("over");
    }

    function handleDragLeave() {
      this.classList.remove("over");
    }

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (dragSrcEl !== this) {
        var temp = this.innerHTML;
        this.innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = temp;
      }
      return false;
    }

    function handleDragEnd() {
      this.classList.remove("dragging");
      var smallForms = document.querySelectorAll(".small-form");
      smallForms.forEach(function(form) {
        form.classList.remove("over");
      });
    }

    var smallForms = document.querySelectorAll(".small-form");
    smallForms.forEach(function(form) {
      form.draggable = true;
      form.addEventListener("dragstart", handleDragStart, false);
      form.addEventListener("dragenter", handleDragEnter, false);
      form.addEventListener("dragover", handleDragOver, false);
      form.addEventListener("dragleave", handleDragLeave, false);
      form.addEventListener("drop", handleDrop, false);
      form.addEventListener("dragend", handleDragEnd, false);
    });
    }else if (page === "calendar") {
    // Контент для страницы "Календарь"
  } else if (page === "files") {
    // Контент для страницы "Файлы"
  }
}

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