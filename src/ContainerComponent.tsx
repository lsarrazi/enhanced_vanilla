import { Component, JSXFactory } from ".";


export abstract class ContainerComponent<Item> extends Component
{
    abstract indexOf(item: Item): number;

    abstract at(index: number): Item | undefined;
  
    abstract size(): number;
    
    abstract remove(item: Item);
    
    abstract insert(position: number, item: Item);

    insertAfter(at: Item, to_insert: Item)
    {
        return this.insert(this.indexOf(at) + 1, to_insert);
    }

    insertBefore(at: Item, to_insert: Item)
    {
        return this.insert(this.indexOf(at), to_insert);
    }
  
    first(): Item | undefined { return this.at(0) }
  
    last(): Item | undefined { return this.at(this.size() - 1) }

    begin(): number { return 0; }
  
    end(): number { return this.size(); } 
  
    append(item: Item) { return this.insert(this.end(), item) };

    prepend(item: Item) { return this.insert(this.begin(), item) };

    *items()
    {
        for (let i = 0; i < this.size(); i++)
            yield this.at(i);
    }
  
    replace(at: Item, item: Item)
    {
        this.insert(this.indexOf(at), item);
        this.remove(at);
    }

    swap(a: Item, b: Item)
    {
        const tmp = this.indexOf(a);
        const b_index = this.indexOf(b)
        this.insert(b_index, a);
        this.insert(tmp + Number(b_index < tmp), b);
    }
}

export abstract class ContainerComponentElement<Item extends Component> extends ContainerComponent<Item>
{
    static attached_containers = new Map();


    protected initContainerComponentElement(container_element: HTMLElement, childrens: Item[])
    {
        this.container_element = container_element;

        for (const children of childrens)
           this.append(children)
    }


    protected container_element: HTMLElement = <></>;

    indexOf(item: Item): number {
        return Array.prototype.indexOf.call(this.container_element.children, item.getElement()); // this code is O(1) ! (thanks to chrome optimizations)
    }

    at(index: number): Item | undefined
    {
        // @ts-ignore
        return ContainerComponentElement.attached_containers.get(this.container_element.children.item(index));
    }
  
    size(): number
    {
        return this.container_element.children.length;
    }
    
    remove(item: Item)
    {
        this.container_element.removeChild(item.getElement())
    }
    
    insert(position: number, item: Item)
    {
        ContainerComponentElement.attached_containers.set(item.getElement(), item);
        if (position === this.size())
        {

            this.container_element.appendChild(item.getElement())
            // @ts-ignore
        }
        else{
            const ref_item = this.at(position)
            // @ts-ignore
            this.container_element.insertBefore( item.getElement(), ref_item.getElement())
        } 
    }
}
