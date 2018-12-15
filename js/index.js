var task = document.querySelector('.input-field');
var taskList = document.querySelector('.task-list');
var btn = document.querySelector('.btn');
var search = document.querySelector('.search-field');

btn.addEventListener('click', addItem);
taskList.addEventListener('click', handleItem);
search.addEventListener('keyup', filterItems);
document.addEventListener('input', changeHeight);


function addItem (e) {
    e.preventDefault();

    if (task.value === '') return;

    var li = document.createElement('li');
    var textArea = document.createElement('textarea');
    var xButton = document.createElement('span');
    var eButton = document.createElement('span');

    textArea.value = task.value;
    textArea.className = 'task-text';
    textArea.readOnly = true;
    textArea.rows = "1";
    li.className = 'task';

    xButton.innerHTML = '&times';
    xButton.className = 'delete';
    xButton.setAttribute('title','Delete task');

    eButton.innerHTML = '&#9998';
    eButton.className = 'edit';
    eButton.setAttribute('title','Edit task');

    li.appendChild(textArea);
    li.appendChild(xButton);
    li.appendChild(eButton);
    taskList.appendChild(li);

    textArea.style.height = textArea.scrollHeight + 'px';

    task.value = '';
    task.focus();
}

function handleItem (e) {

    if (e.target.classList.contains('delete')) {
        this.removeChild(e.target.parentElement);
    }

    if (e.target.classList.contains('edit')) {
        var taskText = e.target.parentElement.firstElementChild;

        if (taskText.readOnly) {
            taskText.removeAttribute('readonly');
            taskText.focus();
            e.target.parentElement.classList.toggle('task-edit');
            var length = taskText.value.length;
            taskText.setSelectionRange(length, length);

            e.target.innerHTML = '&#10004';
            e.target.setAttribute('title','Save task');
        } else {
            taskText.readOnly = true;
            e.target.innerHTML = '&#9998';
            e.target.setAttribute('title','Edit task');
            e.target.parentElement.classList.toggle('task-edit');
        }
    }
}

function filterItems (e) {
    var text = e.target.value.toLowerCase();
    var items = taskList.querySelectorAll('.task');
    Array.from(items).forEach(function (item) {
        var itemName = item.firstElementChild.value;
        if (itemName.toLowerCase().indexOf(text) !== -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function changeHeight (e) {
    if (e.target.tagName.toLowerCase() !== 'textarea') return;
    e.target.style.height = e.target.scrollHeight + 'px';
}



