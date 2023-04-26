class ToDoList {
    #tasksList = [];
    #titleTask;
    #descriptTask;
    #task = {
        // title: '',
        // description: '',
    };
    #toDoApp;
    #inputTask;
    #outputTask;

    #done = [];

    constructor(){
        this.#createUIApp();
    }

    // create list of tasks

    #getTasks(){

        let tasks = this.#getData();
        if(tasks.length === 0) return;

        this.#outputTask.innerHTML = '';
        
        
        tasks.forEach((elem, index) => {
            let showContent = false;

            let elemTask = document.createElement('li');
            elemTask.classList.add(`task__elem`);
            elemTask.classList.add(`elem${index+1}`);

            let label = document.createElement('div');
            label.classList.add(`task__elem_content`);
            label.classList.add(`elem_content${index+1}`);
            
            if (elem.title) label.innerHTML = `<h6 class='task__title title${index+1}'>${elem.title}</h6>`;
            if(elem.description) {
                label.innerHTML += `<p class='task__description description${index+1}'>${elem.description}</p>`;
            } else {
                label.innerHTML += `<p class='task__description description${index+1}'>No content</p>`;
            }

            let elemButtons = document.createElement('div');
            elemButtons.classList.add('task__elem_buttons');

            let spreadButton = document.createElement('button');
            spreadButton.classList.add('task__elem_button');
            spreadButton.classList.add(`button_spreadButton`);
            spreadButton.classList.add(`spreadButton${index+1}`);

            let editButton = document.createElement('button');
            editButton.classList.add('task__elem_button');
            editButton.classList.add('editButton');
            editButton.innerHTML = '';

            let delButton = document.createElement('button');
            delButton.classList.add('task__elem_button');
            delButton.classList.add('delbutton');
            delButton.innerHTML = '';

            spreadButton.addEventListener('click', () => {
                let alterBut = document.querySelector(`.spreadButton${index+1}`)

                alterBut.classList.toggle('buttonOn');
                showContent = !showContent;
                this.#detailTask(index+1, showContent);

            });

            editButton.addEventListener('click', () => {
                let findEditElem = document.querySelectorAll('.editElem');

                if(findEditElem.length === 0) {
                    this.#onEdit(index);

                } else if(findEditElem.lengt > 1){
                    return;
                }
                
            });

            delButton.addEventListener('click', () => {
                this.#removeTask(index);
            });

            elemButtons.append(spreadButton, editButton, delButton);

            elemTask.append(label, elemButtons);
            this.#outputTask.append(elemTask);

            let elemFull = document.querySelector(`.description${index+1}`)
            elemFull.style.display = 'none';
            
            
            label.addEventListener('click', (event)=>{
                
                if(event.currentTarget.closest('li').matches('.taskDone')) {
                    event.currentTarget.closest('li').classList = `task__elem elem${index+1}`
                    let newArr = this.#done.filter((elem)=>{
                        return elem !== index;
                    });
                    this.#done = newArr;
                } else {
                    event.currentTarget.closest('li').classList +=' taskDone';
                    this.#done.push(index);
                }
            })
            
        })
        
        this.Storage = tasks;

    }

    // store data on localstorage
    set Storage(data) {
        if(data.length === 0) return;

        let dataJson = JSON.stringify(data);

        if(!dataJson || dataJson.length === 0) return;

        localStorage.setItem('todoapp', dataJson);

        if(dataJson || dataJson !== []) this.#setCookie('todoappcookie', 'listToDos', {secure: true, 'max-age': 86400});
        
    }

    // get data out of localstorage
    get Storage(){
        let getDataStorage = localStorage.getItem('todoapp');
        if(!getDataStorage) return;
        getDataStorage = JSON.parse(getDataStorage);
        getDataStorage.forEach(elem => {
            this.#addTask(elem);
        })
    }

    // cookies

    #getCookie = (name) => { let matches = document.cookie.match(new RegExp( "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)" )); return matches ? decodeURIComponent(matches[1]) : undefined; };

    #setCookie(name, value, options = {}) { options = { path: '/', ...options }; if (options.expires instanceof Date) { options.expires = options.expires.toUTCString(); } let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value); for (let optionKey in options) { updatedCookie += "; " + optionKey; let optionValue = options[optionKey]; if (optionValue !== true) { updatedCookie += "=" + optionValue; } } document.cookie = updatedCookie; };

    // show details of  one task

   #detailTask(id, show){
        if(!id) return;
        let elemFull = document.querySelector(`.description${id}`)
        if(elemFull) {
        if(show) {
            elemFull.style.display = 'block';
        } else {
            elemFull.style.display = 'none';
        }}
    }

    // edit one task

    #editTask(id, newData){
        if(!newData) return;

        this.#tasksList.splice(id, 1, newData);
       
        this.#getTasks();
    }


    // editting
    
    #onEdit(id){
        let elemForEdit = this.#getData(id);

        if(!elemForEdit) return;
        
        // Create edit element

        let editElem = document.createElement('div');
        editElem.classList.add('editElem');

        // headtitle

        let headEdit = document.createElement('h4');
        headEdit.classList.add('editElem__header');
        headEdit.innerHTML = 'Edit task';

        // inputfields

        let inputEditField = document.createElement('div');
        inputEditField.classList.add('editElem__inputEditField');

        // create input of task title

        let editFieldTitle = document.createElement('div');
        editFieldTitle.classList.add('editFieldTitle');

        let nameFieldTitleTask = document.createElement('h6');
        nameFieldTitleTask.classList.add('editField__nameInputTitle');
        nameFieldTitleTask.innerHTML = 'Task:';

        let editTitleTask = document.createElement('input');
        editTitleTask.classList.add("editField__InputTitle");
        editTitleTask.type = 'text';        
        editTitleTask.name = 'titleEdit';
        editTitleTask.placeholder = 'Enter task';
        editTitleTask.value = elemForEdit.title;
    
        editFieldTitle.append(nameFieldTitleTask, editTitleTask);

        // create input of task details

        let editFieldAbout = document.createElement('div');
        editFieldAbout.classList.add('editFieldAbout');
        let nameFieldAboutTask = document.createElement('h6');
        Object.assign(nameFieldAboutTask, {
            className: "editField__nameInputAbout",
        });
        nameFieldAboutTask.innerHTML = 'Content:';

        let editDescriptTask = document.createElement('textarea');
        Object.assign(editDescriptTask, {
            className: "inputField__InputAbout",
            name: 'descriptionEdit',
            placeholder: 'Enter details',
            value: elemForEdit.description,
        });

        editFieldAbout.append(nameFieldAboutTask, editDescriptTask);

        // create buttons

        let editButtons = document.createElement('div');
        editButtons.className = 'editField__buttons';

        let editButton = document.createElement('button');
        editButton.classList.add('button__edit');
        editButton.innerHTML = 'Edit';

        let quitButton = document.createElement('button');
        quitButton.classList.add('button__quit');
        quitButton.innerHTML = 'Quit';

        editButtons.append(editButton, quitButton);

        editElem.append(editFieldTitle, editFieldAbout, editButtons);
        
        this.#toDoApp.after(editElem);
    
        
        editButton.addEventListener('click', ()=> {
            let title = (editTitleTask.value !== '') ? editTitleTask.value : elemForEdit.title;
            
            let description = editDescriptTask.value;

            let newData = {
                title: title,
                description: description,
            }
            this.#editTask(id, newData);
            
            editElem.remove();
        })

        quitButton.addEventListener('click', (e) => {

            editElem.remove();

        });
       
        this.#getTasks();
    }

    // remove one task

    #removeTask(id){

        let newList = this.#tasksList.filter((elem, index) => {
            return index !== id;
        })

        this.#tasksList = newList;
        this.#getTasks();
    }

    // create task

    #addTask(data){
        if(data) {

            this.#task = {
                title: data.title,
                description: data.description,
            }
            
            this.#tasksList.push(this.#task);
            this.#getTasks();
            

        } else {

            let title = this.#titleTask.value;
            let description = this.#descriptTask.value;
    
                this.#task = {
                    title: title,
                    description: description,
                }
                
            this.#tasksList.push(this.#task);
            this.#getTasks();
    
            this.#titleTask.value = '';
            this.#descriptTask.value = '';
        }
        
    }

    #noteNoTitle(){
        let noteNoTitle = document.createElement('div');
        noteNoTitle.classList.add('noTaskTitle');

        let noteNoTitleContent = document.createElement('span');
        noteNoTitleContent.classList.add('noTaskTitle_content');
        noteNoTitleContent.innerHTML = 'Enter task';

        noteNoTitle.append(noteNoTitleContent);

        if(this.#titleTask.value === '') {
            noteNoTitle.style.display = 'block';
            this.#titleTask.after(noteNoTitle);
            this.#titleTask.style.outline = '1px solid #d71737';
        }
        this.#titleTask.addEventListener('input', (event) => {
         
         if (event.target.value !=='') {
             noteNoTitle.style.display = 'none';
             this.#titleTask.style.outline = '';
             noteNoTitle.remove();
         }
     })
    };

    #getData(id){
        if(!this.#tasksList || this.#tasksList.length === 0) return []; 
        if(id >= 0) return this.#tasksList.at(id);
        return this.#tasksList;
    }

    // Delete chosen

    #deldone(data){
        localStorage.removeItem('todoapp');
        let newList = this.#tasksList.filter((elem, index) => {
            return data.includes(index) !== true;
        })

        this.#tasksList = newList;
        this.#getTasks();

    }


    // Create introductory interface

    #createUIApp(){

        let getCookieApp = this.#getCookie('todoappcookie');
        
        if(!getCookieApp) localStorage.removeItem('todoapp');

        let rootElem = document.querySelector('#root');
        if(!rootElem) return;

        this.#toDoApp = document.createElement('div');
        this.#toDoApp.classList.add('toDoApp');
        rootElem.append(this.#toDoApp);

        // Create 2 main fields: input and output

        this.#inputTask = document.createElement('div');
        this.#inputTask.classList.add('toDoApp__input');
        this.#outputTask = document.createElement('ul');
        this.#outputTask.classList.add('toDoApp__output');
        this.#toDoApp.append(this.#inputTask, this.#outputTask);


        // headtitle

        let headTitle = document.createElement('h3');
        headTitle.classList.add('toDoApp__input__headTitle');
        headTitle.innerHTML = 'ToDo Application';

        // inputfields

        let inputField = document.createElement('div');
        inputField.classList.add('toDoApp__input__inputField');

        // create input of task title

        let inputFieldTitle = document.createElement('div');
        inputFieldTitle.classList.add('inputFieldTitle');

        let nameFieldTitleTask = document.createElement('h6');
        nameFieldTitleTask.classList.add('inputField__nameInputTitle');
        nameFieldTitleTask.innerHTML = 'Task:';
        this.#titleTask = document.createElement('input');
        Object.assign(this.#titleTask, {
            className: "inputField__InputTitle",
            type: 'text',
            name: 'title',
            placeholder: 'Enter task',
            autocomplete: 'on',
        });
        
        inputFieldTitle.append(nameFieldTitleTask, this. #titleTask);

        // create input of task details

        let inputFieldAbout = document.createElement('div');
        inputFieldAbout.classList.add('inputFieldAbout');
        let nameFieldAboutTask = document.createElement('h6');
        Object.assign(nameFieldAboutTask, {
            className: "inputField__nameInputAbout",
        });
        nameFieldAboutTask.innerHTML = 'Content:';
        this.#descriptTask = document.createElement('textarea');
        Object.assign(this.#descriptTask, {
            className: "inputField__InputAbout",
            name: 'description',
            placeholder: 'Enter details',
        });
        inputFieldAbout.append(nameFieldAboutTask, this.#descriptTask);

        // create buttons

        let inputButtons = document.createElement('div');
        inputButtons.className = 'inputField__buttons';

        let inputButton = document.createElement('button');
        inputButton.classList.add('button__add');
        inputButton.innerHTML = 'Add';

        let removeButton = document.createElement('button');
        removeButton.classList.add('button__removeList');
        removeButton.innerHTML = 'Del all';

        let delChosenButton = document.createElement('button');
        delChosenButton.classList.add('button__delChosen');
        delChosenButton.innerHTML = 'Del sel';

        inputButtons.append(inputButton, removeButton, delChosenButton);

        inputField.append(inputFieldTitle, inputFieldAbout, inputButtons);
        
        this.#inputTask.append(headTitle, inputField);

        inputButton.addEventListener('click', () => {

            
            let title = this.#titleTask.value;
            let description = this.#descriptTask.value;

            if(!title && !description) return; 
  
            
            if(title !== '') {
                this.#addTask();
            } else {
                this.#noteNoTitle();
            }
        });

        removeButton.addEventListener('click', () => {
            this.#outputTask.innerHTML = '';
            this.#tasksList.length = 0;

            this.#getTasks();
            localStorage.removeItem('todoapp');
        })
        
        delChosenButton.addEventListener('click', () => {
            this.#deldone(this.#done);
            this.#getTasks();
        })

        this.Storage;
    }

}

export default new ToDoList();