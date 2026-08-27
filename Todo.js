const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

function createTask(task) {
  const Newtask = document.createElement("li");
  Newtask.className = "Newtask";
  const Span = document.createElement("span");
  Span.innerHTML = task.text;
  const Wrapper = document.createElement("div");
  Wrapper.className = "Wrapper";
  const btn1 = document.createElement("button");
  btn1.innerHTML = task.completed ? "UNDO" : "DONE";
  btn1.className = task.completed ? "Undo" : "done";
  const btn2 = document.createElement("button");
  btn2.innerHTML = "EDIT";
  btn2.className = "edit";
  const btn3 = document.createElement("button");
  btn3.innerHTML = "DEL";
  btn3.className = "delete";
  btn1.onclick = function() {
    const taskIndex = tasks.findIndex(function(item) {
      return item.id === task.id;
    });
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    Newtask.remove();
    createTask(tasks[taskIndex]);
    const completed = tasks.filter(function(item) {
      return item.completed === true;
    }).length;
    const pending = tasks.filter(function(item) {
      return item.completed === false;
    }).length;
    document.getElementById("completed").innerHTML = completed;
    document.getElementById("pending").innerHTML = pending;
    document.getElementById("total").innerHTML = tasks.length;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  btn2.onclick = function() {
    document.getElementById("taskInput").value = task.text;
    editingTaskId = task.id;
    document.getElementById("taskInput").focus();
  };
  btn3.onclick = function() {
    const taskIndex = tasks.findIndex(function(item) {
      return item.id === task.id;
    });
    tasks.splice(taskIndex, 1);
    Newtask.remove();
    const completed = tasks.filter(function(item) {
      return item.completed === true;
    }).length;
    const pending = tasks.filter(function(item) {
      return item.completed === false;
    }).length;
    document.getElementById("completed").innerHTML = completed;
    document.getElementById("pending").innerHTML = pending;
    document.getElementById("total").innerHTML = tasks.length;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (tasks.length === 0) {
      document.getElementById("Emptymessage").style.display = "block";
    }
  };
  Newtask.appendChild(Span);
  Newtask.appendChild(Wrapper);
  Wrapper.appendChild(btn1);
  if (!task.completed) {
    Wrapper.appendChild(btn2);
  }
  Wrapper.appendChild(btn3);
  document.getElementById("Emptymessage").style.display = "none";
  document.getElementById("taskList").appendChild(Newtask);
}
document.getElementById("addBtn").onclick = function() {
  const display = document.getElementById("taskInput").value.trim();
  const Null = document.getElementById("Null");
  if (display === "") {
    document.querySelector(".container").classList.add("shake");
    Null.innerHTML = "Task can't be empty";
    setTimeout(function() {
      document.querySelector(".container").classList.remove("shake");
    }, 300);
    return;
  }
  Null.innerHTML = "";
  if (editingTaskId !== null) {
    const taskIndex = tasks.findIndex(function(item) {
      return item.id === editingTaskId;
    });
    tasks[taskIndex].text = display;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    editingTaskId = null;
    document.getElementById("taskInput").value = "";
    location.reload();
    return;
  }
  tasks.push({
    id: Date.now(),
    text: display,
    completed: false
  });
  createTask(tasks[tasks.length - 1]);
  document.getElementById("taskInput").value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
tasks.forEach(function(task) {
  createTask(task);
});
const completedTasks = tasks.filter(function(task) {
  return task.completed === true;
}).length;
const pendingTasks = tasks.filter(function(task) {
  return task.completed === false;
}).length;

document.getElementById("completed").innerHTML = completedTasks;
document.getElementById("pending").innerHTML = pendingTasks;
document.getElementById("total").innerHTML = tasks.length;