import { Component, JSXFactory } from ".";

export abstract class ContainerComponent<Item> extends Component {
  /**
   * @description Retrieve the position before a given item
   */
  abstract indexOf(item: Item): number;

  /**
   * @description Retrieve an item after a given position
   */
  abstract at(index: number): Item | undefined;

  /**
   * @description Count the number of items in the container
   */
  abstract size(): number;

  /**
   * @description Remove an item from the container
   */
  abstract remove(item: Item);

  /**
   * @description Insert an item at a position in the container
   */
  abstract insert(position: number, item: Item);

  /**
   * @description Insert an item after another
   */
  insertAfter(at: Item, to_insert: Item) {
    return this.insert(this.indexOf(at) + 1, to_insert);
  }

  /**
   * @description Insert an item before another
   */
  insertBefore(at: Item, to_insert: Item) {
    return this.insert(this.indexOf(at), to_insert);
  }

  /**
   * @description Retrieve the first item of the container
   */
  first(): Item | undefined {
    return this.at(0);
  }

  /**
   * @description Retrieve the last item of the container
   */
  last(): Item | undefined {
    return this.at(this.size() - 1);
  }

  /**
   * @description Retrieve the first position an item can be placed
   */
  begin(): number {
    return 0;
  }

  /**
   * @description Retrieve the last position an item can be placed
   */
  end(): number {
    return this.size();
  }

  /**
   * @description Append new items at the end of the container
   */
  append(...items: Item[]) {
    for (const item of items) this.insert(this.end(), item);
  }

  /**
   * @description Prepend new items at the beginning of the container
   */
  prepend(...items: Item[]) {
    for (const item of items) this.insert(this.begin(), item);
  }

  /**
   * @description Iterate through items
   */
  *items() {
    for (let i = 0; i < this.size(); i++) yield this.at(i);
  }

  /**
   * @description Replace an item by another
   */
  replace(at: Item, item: Item) {
    this.insert(this.indexOf(at), item);
    this.remove(at);
  }

  /**
   * @description Swap two items
   */
  swap(a: Item, b: Item) {
    const tmp = this.indexOf(a);
    const b_index = this.indexOf(b);
    this.insert(b_index, a);
    this.insert(tmp + Number(b_index < tmp), b);
  }
}

export abstract class ContainerComponentElement<
  Item extends Component
> extends ContainerComponent<Item> {
  protected attached_containers = new WeakMap<Element, Item>();

  protected initContainerComponentElement(
    container_element: HTMLElement,
    childrens: Item[]
  ) {
    this.container_element = container_element;

    for (const children of childrens) this.append(children);
  }

  protected retrieveElementItem(element: Element)
  {
    return this.attached_containers.get(element);
  }

  protected container_element: HTMLElement = (<></>);

  indexOf(item: Item): number {
    return Array.prototype.indexOf.call(
      this.container_element.children,
      item.getElement()
    ); // this code is O(1) ! (thanks to chrome optimizations)
  }

  at(index: number): Item | undefined {
    // @ts-ignore
    return this.attached_containers.get(
      this.container_element.children.item(index)
    );
  }

  size(): number {
    return this.container_element.children.length;
  }

  remove(item: Item) {
    this.attached_containers.delete(item.getElement())
    this.container_element.removeChild(item.getElement());
  }

  insert(position: number, item: Item) {
    this.attached_containers.set(item.getElement(), item);
    if (position === this.size()) {
      this.container_element.appendChild(item.getElement());
      // @ts-ignore
    } else {
      const ref_item = this.at(position);
      // @ts-ignore
      this.container_element.insertBefore(
        item.getElement(),
        ref_item.getElement()
      );
    }
  }
}
