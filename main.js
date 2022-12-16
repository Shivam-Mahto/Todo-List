window.addEventListener('load', ()=> {

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    todos.forEach(todo => {
        newTask(todo)
    });

    form.addEventListener('submit', (e) => {

        e.preventDefault();
        const task = input.value;

        if(!task) {
            alert("Please fill out the task");
            return;
        }

        newTask(task);
        
        // For the local storage
        todos.push(task);
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos);

        input.value = "";

    });


    function newTask(task) {

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);
        
        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";


        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);      
        list_el.appendChild(task_el);

        task_edit_el.addEventListener('click', ()=>{

            if(task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";

            } else {

                const index = todos.indexOf(task);
                if(index > -1) {
                    todos[index] = task_input_el.value;
                }
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
                localStorage.setItem('todos', JSON.stringify(todos));
            }

        });

        task_delete_el.addEventListener('click', ()=> {

            const index = todos.indexOf(task);
            if (index > -1) { 
                todos.splice(index, 1); 
            }
            list_el.removeChild(task_el);
            localStorage.setItem('todos', JSON.stringify(todos));
        });
        
    }

});

