import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    additem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {

    static instance: FullList = new FullList();
   
    private constructor(private _list: ListItem[]=[]){}

    // getter for the list
    get list(): ListItem[]{
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if(typeof storedList !== "string") return

        const parsedlist: { _id: string, _item: string, _checked: boolean }[]=
        JSON.parse(storedList)

        parsedlist.forEach(itemObj => {
            const newList = new ListItem(itemObj._id, itemObj._item, itemObj._checked)

            FullList.instance.additem(newList)
        })
    }


// saving the list item to a local storage
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }
// clear the list items
    clearList(): void {
        this._list = []
        this.save()
    }

    additem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    //removing an item
    removeItem(id: string): void {
        this._list=this._list.filter(item=>item.id !==id)
        this.save()
    }
}