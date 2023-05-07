 import FullList from "../models/FullList";

 interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
 }

 export default class ListTemplate implements DOMList{

    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()

    private constructor(){
        this.ul = document.getElementById("listItems") as HTMLUListElement

    }

    //clear method

    clear(): void {
        this.ul.innerHTML = ''
    }

    //render method

    render(fullList: FullList): void {
        
        this.clear()

        fullList.list.forEach(item =>{
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked  = item.checked
            li.append(check)

            //adding event listener
            check.addEventListener('change', ()=>{
                item.checked = !item.checked
                fullList.save()
            })

            //creating a label

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            //creating delete button
            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)   
            
            //adding event listener to button
            button.addEventListener('click', ()=>{
                fullList.removeItem(item.id)
                this.render(fullList )
            })

            this.ul.append(li)
        })
    }
 }