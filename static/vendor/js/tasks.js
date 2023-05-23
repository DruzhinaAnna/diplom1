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
    plusImage.src = "plus-lg.jpg";
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
    arrowImage.src = "arrow-down-up.jpg";
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
  } else if (page === "board") {
    // Контент для страницы "Доска"
  } else if (page === "calendar") {
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