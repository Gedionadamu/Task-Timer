const taskContainer = document.querySelector(".task-container");
const submitButton = document.querySelector(".sumbit-button")
let tasks = [
  {
    name: "Practice CSS animations",
    priority: 1,
  },
  {
    name: "Dev community Work",
    priority: 4,
  },
  {
    name: "Algo work",
    priority: 3,
  },
];

// Sort by priority.
const descendingTasks = tasks.sort(
  (taskA, taskB) => taskA.priority - taskB.priority
);
console.log(descendingTasks);
function render() {
  
  descendingTasks.forEach((task) => {
    let taskBlock = `<div class="task-block">
            <p class="delete-icon"><span class="material-symbols-outlined">
                delete
                </span></p>
            <p>${task.name}</p>
            <button class="controller-button">Start</button>
        </div>`;
    const filledBlock = document.createElement("div");
    filledBlock.innerHTML = taskBlock;
    
    
    taskContainer.append(filledBlock);
  });
  const deleteElement = document.querySelectorAll(".delete-icon")
  console.log(deleteElement)
  deleteElement.forEach((el)=>{el.addEventListener('click', deleteTask )})
  
}

render();
 function deleteTask(e){
    console.log(e.target.parentNode.parentNode)
    e.target.parentNode.parentNode.remove()
 }

 function addTask(){
    const inputElemnent = document.querySelector(".text-input")
    const value = inputElemnent.value
    console.log(value)
 }

 submitButton.addEventListener("click", addTask)