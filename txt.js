

const input = document.getElementById('input');
const btn = document.querySelector('.btn');

const div = document.querySelector('.added');

const tasks = [];
btn.addEventListener('click', () => {
    if(input.value === ''){
        alert("No task is added!");
    }else{
        div.classList.add("active");

        const task  = input.value.toLowerCase();
        
        if (tasks.includes(task)) {
            alert(`Task "${task}" already exists!`);
            return;
        }else{
            tasks.push(task);
        }
    
        div.innerHTML = '';

        let completedTasksCount = 0;

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.innerHTML = `
                <li class="list-item">
                    <p class="item">${task}</p>
                    <div class="btns">
                        <button class="done">
                        <lord-icon class="ok"
                            src="https://cdn.lordicon.com/lomfljuq.json"
                            trigger="hover"
                            colors="primary:#16c72e"></lord-icon>
                        </button>
                        <button class="del"><lord-icon class="trash"
                        src="https://cdn.lordicon.com/skkahier.json" trigger="hover" colors="primary:#e83a30"></lord-icon> </button>
                    </div>
                </li> `;
            div.appendChild(taskElement);

        
          // Add event listener for delete button
          taskElement.querySelector('.del').addEventListener('click', function(){
            taskElement.remove();

            if(completedTasksCount === 0){
                completedTasksCount = 0;
            }else{
                completedTasksCount--;

                const complete = document.querySelector(".completed");
                complete.textContent = `${completedTasksCount} completed tasks`;
            }
           
        });
            // Add event listener for done button
            taskElement.querySelector('.done').addEventListener('click', function(){

               const item = taskElement.querySelector('.item');
                if (item.style.textDecoration !== 'line-through') {
                    item.style.textDecoration = 'line-through';
            
                    completedTasksCount++;
            
                    // Update the counter
                    const complete = document.querySelector(".completed");
                    complete.textContent = `${completedTasksCount} completed tasks`;
                }
            });
        });
        
        input.value = '';
    }

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  
    // Assert
    expect(window.localStorage.getItem('tasks')).toEqual(JSON.stringify(tasks));
});
