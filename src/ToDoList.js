class ToDoList {
    #tasksList = [];
    #titleTask;
    #descriptTask;
    #task = {
        title: '',
        description: '',
    };


    constructor(){
        this.#createUIApp();
    }

    #createUIApp(data){
        let rootElem = document.querySelector('#root');
        if(!rootElem) return;

        let toDoApp = document.createElement('div');
        toDoApp.classList.add('toDoApp');
        rootElem.append(toDoApp);

        // Create 2 main fields: input and output

        let inputTask = document.createElement('div');
        inputTask.classList.add('toDoApp__input');
        let outputTask = document.createElement('div');
        outputTask.classList.add('toDoApp__output');
        toDoApp.append(inputTask, outputTask);


        // headtitle

        let headTitle = document.createElement('h2');
        headTitle.classList.add('toDoApp__input__headTitle');
        headTitle.innerHTML = 'ToDo Application';

        // inputfields

        let inputField = document.createElement('div');
        inputField.classList.add('toDoApp__input__inputField');

        // create input of task title

        let inputFieldTitle = document.createElement('div');
        inputFieldTitle.classList.add('inputFieldTitle');

        let nameFieldTitleTask = document.createElement('h4');
        nameFieldTitleTask.classList.add('inputField__nameInputTitle');
        nameFieldTitleTask.innerHTML = 'Taskname:';
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
        let nameFieldAboutTask = document.createElement('h4');
        Object.assign(nameFieldAboutTask, {
            className: "inputField__nameInputAbout",
        });
        nameFieldAboutTask.innerHTML = 'Details:';
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
        inputButton.innerHTML = 'Add task';

        let removeButton = document.createElement('button');
        removeButton.classList.add('button__removeList');
        removeButton.innerHTML = 'Clear all';

        inputButtons.append(inputButton, removeButton);

        inputField.append(inputFieldTitle, inputFieldAbout, inputButtons);


        inputTask.append(headTitle, inputField);

    }
}

export default new ToDoList();