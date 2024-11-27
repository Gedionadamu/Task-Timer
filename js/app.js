const taskContainer = document.querySelector(".task-container");
const submitButton = document.querySelector(".sumbit-button");
const timeLeftContent = document.querySelector("#time-left");
const fillTimer = document.querySelector(".fill");

const startCount = 5;
let timeLeft = startCount;
let timerId;
//Task Seed
let tasks = [
  {
    name: "Practice CSS animations",
    priority: 0,
  },
  {
    name: "Dev community Work",
    priority: 2,
  },
  {
    name: "Algo work",
    priority: 1,
  },
];

// Sort by priority.
const descendingTasks = tasks.sort(
  (taskA, taskB) => taskA.priority - taskB.priority
);
//Convert seconds to minuites 
function convertToMin(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds - minutes * 60;
  return minutes + ":" + (sec < 10 ? "0" : "") + sec;
}
//Changes text based on status 
function handleClick(start) {
  switch (start.textContent) {
    case "Active":
      start.textContent = "Paused";
      clearInterval(timerId);
      break;
    case "Paused":
      start.textContent = "Active";
      countDown(start);
      break;
    default:
      const allButtons = document.querySelectorAll(".controller-button");
      allButtons.forEach((button) => {
        button.textContent = "Start";
        button.classList.remove("active-button");
        clearInterval(timerId);
        timeLeft = startCount;
        timeLeftContent.textContent = convertToMin(timeLeft);
      });
      start.textContent = "Active";
      start.classList.add("active-button");
      countDown(start);
      break;
  }
}
//starts and controls the timer
function countDown(start) {
  timerId = setInterval(() => {
    timeLeft--;
    timeLeftContent.textContent = convertToMin(timeLeft);
    fillTimer.style.width = (timeLeft / startCount) * 100 + "%";
    if (timeLeft <= 0) {
      clearInterval(timerId);
      console.log(start);
      delete descendingTasks[start.id];
      start.parentNode.parentNode.remove();
      timeLeft = startCount;
      timeLeftContent.textContent = convertToMin(timeLeft);
    }
  }, 1000);
}
//Places the tasks 
function render() {
  descendingTasks.forEach((task, index) => {
    let taskBlock = `<div class="task-block">
            <p class="delete-icon"><span class="material-symbols-outlined">
                delete
                </span></p>
            <p>${task.name}</p>
            <button id = ${index} class="controller-button">Start</button>
        </div>`;
    const filledBlock = document.createElement("div");
    filledBlock.innerHTML = taskBlock;

    taskContainer.append(filledBlock);
  });
  const deleteElement = document.querySelectorAll(".delete-icon");
  const controller = document.querySelectorAll(".controller-button");
  deleteElement.forEach((el) => {
    el.addEventListener("click", deleteTask);
  });
  controller.forEach((start) => {
    start.addEventListener("click", () => handleClick(start));
  });
}

render();
//delets tasks
function deleteTask(e) {
  console.log(e.target.parentNode.parentNode.lastElementChild.id);
  e.target.parentNode.parentNode.remove();
  delete descendingTasks[e.target.parentNode.parentNode.lastElementChild.id];
}
// creates tasks
function addTask() {
  const inputElemnent = document.querySelector(".text-input");
  const value = inputElemnent.value;

  if (value) {
    taskContainer.innerHTML = "";
    inputElemnent.value = "";
    tasks.push({
      name: value,
      priority: tasks.length,
    });
  }
  console.log(tasks);
  render();
}

submitButton.addEventListener("click", addTask);
