class ToDoList {

    constructor(){
        this.#createUIApp();
    }

    #createUIApp(data){
        let rootElem = document.querySelector('#root');
        console.log(rootElem);
        console.log(10);
    }
}

export default new ToDoList();