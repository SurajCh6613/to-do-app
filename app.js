const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const button = document.querySelector("button");
button.addEventListener("click", () => {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert("You must write something");
    } else {
        const li = document.createElement("li");
        li.innerHTML = taskText;
        listContainer.appendChild(li);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for multiplication sign (close button)
        li.appendChild(span);

        saveData(); // Save after adding a new task
    }

    inputBox.value = ""; // Clear input box after adding
});

listContainer.addEventListener("click", function (e) {
    const target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    } else if (target.tagName === "SPAN") {
        target.parentElement.remove(); 
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML); // Save list data to localStorage
}

function showTasks() {
    const savedData = localStorage.getItem("tasks");
    if (savedData) {
        listContainer.innerHTML = savedData; // Load list from storage
    }
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => {
    listContainer.innerHTML = "";
    saveData(); // Save empty list after clearing all tasks
});

showTasks(); // Load tasks on page load
