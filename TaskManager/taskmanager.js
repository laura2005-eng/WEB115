// Array that stores all task objects
let tasks = [];

// Stores the ID of the task currently being edited
let editingTaskId = null;

// Get elements from the HTML
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskPriorityInput = document.getElementById("taskPriority");
const importantTaskInput = document.getElementById("importantTask");
const completedTaskInput = document.getElementById("completedTask");
const taskManager = document.getElementById("taskmanager");
const submitButton = taskForm.querySelector('button[type="submit"]');

// Add or update a task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskNameInput.value.trim();

    // Prevent empty task names
    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    if (editingTaskId === null) {
        // Create a new task object
        const newTask = {
            id: Date.now(),
            name: taskName,
            priority: taskPriorityInput.value,
            isImportant: importantTaskInput.checked,
            isCompleted: completedTaskInput.checked,
            date: new Date().toLocaleDateString()
        };

        tasks.push(newTask);
    } else {
        // Find the task being edited
        const taskToUpdate = tasks.find(function (task) {
            return task.id === editingTaskId;
        });

        // Only update if the task still exists
        if (taskToUpdate) {
            taskToUpdate.name = taskName;
            taskToUpdate.priority = taskPriorityInput.value;
            taskToUpdate.isImportant = importantTaskInput.checked;
            taskToUpdate.isCompleted = completedTaskInput.checked;
        }

        editingTaskId = null;
        submitButton.textContent = "Add Task";
    }

    displayTasks();
    console.log(JSON.stringify(tasks));

    resetForm();
});

// Display all tasks
function displayTasks() {
    if (tasks.length === 0) {
        taskManager.innerHTML = "<p>No tasks have been added yet.</p>";
        return;
    }

    taskManager.innerHTML = "";

    tasks.forEach(function (task) {
        taskManager.innerHTML += `
            <div class="task" id="task-${task.id}">
                <h3>${task.name}</h3>

                <p>
                    <strong>Priority:</strong> ${task.priority}
                </p>

                <p>
                    <strong>Important:</strong>
                    ${task.isImportant ? "Yes" : "No"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${task.isCompleted ? "Completed" : "Not completed"}
                </p>

                <p>
                    <strong>Date added:</strong> ${task.date}
                </p>

                <button onclick="toggleImportant(${task.id})">
                    ${task.isImportant ? "Remove Important" : "Mark Important"}
                </button>

                <button onclick="toggleCompleted(${task.id})">
                    ${task.isCompleted ? "Mark Incomplete" : "Mark Completed"}
                </button>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;
    });

    applyTaskStyles();
}

// Apply styles using JavaScript .style
function applyTaskStyles() {
    tasks.forEach(function (task) {
        const taskElement = document.getElementById(`task-${task.id}`);
        const taskTitle = taskElement.querySelector("h3");

        // Priority colors
        if (task.priority === "High") {
            taskElement.style.borderLeftColor = "red";
        } else if (task.priority === "Medium") {
            taskElement.style.borderLeftColor = "orange";
        } else {
            taskElement.style.borderLeftColor = "green";
        }

        // Important task styling
        if (task.isImportant) {
            taskElement.style.backgroundColor = "#ffd6d6";
            taskTitle.style.color = "red";
        } else {
            taskElement.style.backgroundColor = "#f8f8f8";
            taskTitle.style.color = "";
        }

        // Completed task styling
        if (task.isCompleted) {
            taskTitle.style.textDecoration = "line-through";
            taskElement.style.opacity = "0.7";
        } else {
            taskTitle.style.textDecoration = "none";
            taskElement.style.opacity = "1";
        }
    });
}

// Toggle important status
function toggleImportant(taskId) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!task) {
        return;
    }

    task.isImportant = !task.isImportant;

    displayTasks();
    console.log(JSON.stringify(tasks));
}

// Toggle completed status
function toggleCompleted(taskId) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!task) {
        return;
    }

    task.isCompleted = !task.isCompleted;

    displayTasks();
    console.log(JSON.stringify(tasks));
}

// Load a task into the form for editing
function editTask(taskId) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!task) {
        return;
    }

    taskNameInput.value = task.name;
    taskPriorityInput.value = task.priority;
    importantTaskInput.checked = task.isImportant;
    completedTaskInput.checked = task.isCompleted;

    editingTaskId = task.id;
    submitButton.textContent = "Update Task";

    taskNameInput.focus();
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    // Stop edit mode if the deleted task was being edited
    if (editingTaskId === taskId) {
        editingTaskId = null;
        submitButton.textContent = "Add Task";
        resetForm();
    }

    displayTasks();
    console.log(JSON.stringify(tasks));
}

// Clear the form
function resetForm() {
    taskForm.reset();
    taskPriorityInput.value = "Medium";
}