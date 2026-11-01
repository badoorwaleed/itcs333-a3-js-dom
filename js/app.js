// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.
// TODO: your code here
// Trigger autograde after enabling GitHub Actions

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const errorMsg = document.getElementById("error-msg");
  const counter = document.getElementById("counter");

  const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterDone = document.getElementById("filter-done");

let currentFilter = "all";

  function updateCounter() {
    const activeTasks = list.querySelectorAll("li:not(.completed)");
    counter.textContent = activeTasks.length + " item(s) left";
  }
function applyFilter() {
  const tasks = list.querySelectorAll("li");

  tasks.forEach(function (li) {
    const isCompleted = li.classList.contains("completed");

    if (currentFilter === "all") {
      li.style.display = "";
    } else if (currentFilter === "active") {
      li.style.display = isCompleted ? "none" : "";
    } else if (currentFilter === "done") {
      li.style.display = isCompleted ? "" : "none";
    }
  });
}

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
      errorMsg.classList.remove("hidden");
      return;
    }

    errorMsg.classList.add("hidden");

    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("delete-btn");
li.appendChild(deleteBtn);

    list.appendChild(li);
    updateCounter();
    applyFilter();

    input.value = "";
  });

list.addEventListener("click", function (event) {
    const deleteBtn = event.target.closest(".delete-btn");

    if (deleteBtn) {
      deleteBtn.closest("li").remove();
      updateCounter();
      applyFilter();
      return;
    }

    const li = event.target.closest("li");

    if (li && list.contains(li)) {
      li.classList.toggle("completed");
      updateCounter();
      applyFilter();
    }
  });
filterAll.addEventListener("click", function () {
  currentFilter = "all";
  applyFilter();
});

filterActive.addEventListener("click", function () {
  currentFilter = "active";
  applyFilter();
});

filterDone.addEventListener("click", function () {
  currentFilter = "done";
  applyFilter();
});
});
