const addListButton = document.getElementById("add-list");
var containerList = document.querySelector('.container-list');
var taskUser = document.getElementById('task');
var searchList = document.querySelector('#search');
var todo = document.querySelectorAll('.todo');
var listHeader = document.querySelector('.list');
var editContainer = document.querySelector('.edit-container');
var cancelEdit = document.querySelector('#cancel-edit');
var buttonEdit = document.getElementById("button-edit");

var editContainerInput = document.querySelector('#edit-list');

let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

window.addEventListener('load', () => {
    banco = getBanco();
    banco.forEach(element => {
   
        var todo = document.createElement('div');
        todo.classList.add('todo');
        if (element.status === 'done')
            todo.classList.add('done');

        const listContent = document.createElement('div');
        listContent.classList.add('list-content');
        const textContent = document.createElement('span');
        textContent.innerText = element.tarefa;
    
        listContent.appendChild(textContent);
        
        todo.appendChild(listContent);

        const buttonAdd = document.createElement('button');
        buttonAdd.classList.add('finished-list');
        buttonAdd.innerHTML = '<i class="fa-solid fa-check" style="color: #2b879e;"></i>';
        todo.appendChild(buttonAdd);

        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('edit-list');
        buttonEdit.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: #2b879e;"></i>';
        todo.appendChild(buttonEdit);

        const buttonRemove = document.createElement('button');
        buttonRemove.classList.add('remove-list');
        buttonRemove.innerHTML = '<i class="fa-regular fa-trash" style="color: #2b879e;"></i>';
        todo.appendChild(buttonRemove);


        containerList.appendChild(todo);
        })
})

const addList = () => {
    var texto = taskUser.value;
    
    if (!texto) return

    addListContainer(texto);
    taskUser.value = "";
    taskUser.focus();
}

const addListContainer = (text, status) => {

    var todo = document.createElement('div');
    todo.classList.add('todo');
    if (status === 'done')
        todo.classList.add('done');

    const listContent = document.createElement('div');
    listContent.classList.add('list-content');
    const textContent = document.createElement('span');
    textContent.innerText = text;


    banco.push ({'tarefa': text, 'status': 'no-done'});
    setBanco(banco);
   
    listContent.appendChild(textContent);
    
    todo.appendChild(listContent);

    const buttonAdd = document.createElement('button');
    buttonAdd.classList.add('finished-list');
    buttonAdd.innerHTML = '<i class="fa-solid fa-check" style="color: #2b879e;"></i>';
    todo.appendChild(buttonAdd);

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit-list');
    buttonEdit.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: #2b879e;"></i>';
    todo.appendChild(buttonEdit);

    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('remove-list');
    buttonRemove.innerHTML = '<i class="fa-regular fa-trash" style="color: #2b879e;"></i>';
    todo.appendChild(buttonRemove);


    containerList.appendChild(todo);
}

const togleForm = () => {
    listHeader.classList.toggle('hide');
    containerList.classList.toggle('hide');
    editContainer.classList.toggle('hide');
    
}

//funções para o localStoreage
const doneTask = (text) => {
    banco.forEach((element,index) => {
   
        if (element.tarefa == text.innerText && element.status === 'no-done'){
            banco[index].status = 'done';
            setBanco(banco);
        }else{
            banco[index].status = 'no-done';
            setBanco(banco);
        }
    })
}

const removeTask = (text) => {
    banco.forEach((element,index) => {
        if (element.tarefa == text.innerText){
            banco.splice(index, 1);
            setBanco(banco)
        }
    })
}

const editTask = (text) => {
    banco.forEach((element,index) => {
        if (element.tarefa == text.innerText){
            banco[index].tarefa = editContainerInput.value;
            setBanco(banco)
        }
    })
}

//pegar texto da lista
let textParent;

const handelButtons = (e) => {
    const target = e.target; //pegar o elemento que esta sendo clicado
    const parent = target.closest("div"); //pegar o elemento pai

    textParent = parent.querySelector('span');
    if (target.classList.contains("finished-list") || target.classList.contains("fa-check")){
        parent.classList.toggle('done')
        doneTask(textParent);
    }

    if (target.classList.contains("remove-list") || target.classList.contains("fa-trash")){
        parent.remove();
        removeTask(textParent);
    }
     

    if (target.classList.contains("edit-list") || target.classList.contains("fa-pen-to-square")){
        editContainerInput.value = textParent.innerText;
        togleForm();
    }
}

const handleSearch = () => {
    var text = searchList.value.toUpperCase();

    todo.forEach(element => {
        var list = element.getElementsByClassName('list-content');
    
        for (let index in list){

            if(isNaN(index)) continue

            let conteudo = list[index].innerText.toUpperCase();
            
            if (conteudo.includes(text))
                element.style.display = '';
            else
                element.style.display = 'none';
        }
    
    })
    
}

containerList.addEventListener('click', handelButtons)

addListButton.addEventListener('click', addList);

searchList.addEventListener('input', handleSearch);

cancelEdit.addEventListener('click', () => {
    togleForm()
});

buttonEdit.addEventListener('click', () => {
    const task = document.querySelectorAll('.todo');
    task.forEach(element => {

        let text = element.querySelector('span');
        
        if(text.innerText === textParent.innerText){
            editTask(text);
            text.innerText = editContainerInput.value;
            togleForm();
        }
    })
})