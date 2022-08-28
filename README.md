# Enhanced Vanilla
Enhanced vanilla micro documentation

## Component
```tsx
export class Badge extends Component {

  constructor(props: Props<Badge>) {
    super();

    this.assignProps(props); // assign properties using setters
    
    this.element = (<span class="p-badge">{...props.children}</span>);
  }

  set label(value: string)
  {
    this.element.setAttribute('title', value)
  }
  
}

// Usage

let badge = <Badge label="the label">the text</Badge>

badge.label = 'The Label!';
```

## Events

Lets use `Component.override()` to override events of elements uniquely in a parent-call-child way

```tsx
export class Button extends Component {

  constructor() {
    super();

    this.element = <button class="p-button"></button>;
    
    this.override(this.element, 'click', 'onClick') 
    // override the 'click' event of the element to the 'onClick' event of the Button component
  }

  onClick(pursue: PursueElement<'click'>)
  {
    // before event happen
    const event: MouseEvent = pursue(); // not calling pursue cancel the event
    // after the event
    return 'Hello Parent Component' // the value returned to the parent pursue() call
  }
  
}

class App extends Component 
{
  button = <Button></Button>;
  element = <div>{this.button}</div>;
  
  constructor(){
     super();
     this.override(this.button, 'onClick', 'onButtonClick') 
     // override the 'onClick' event of the Button Component to the 'onButtonClick' event of the App component
  }
  
  onButtonClick(pursue: Pursue<Button, 'onClick'>)
  {
     const str = pursue(); // = 'Hello Parent Component'
  }
}
```

## Container Components

```tsx
export class MyContainer extends ContainerComponentElement<MyItem> {


  protected element = (<aside class="p-accordion"></aside>);

  constructor(props: Props<MyContainer, MyItem>) {
    
    super();
    
    this.initContainerComponentElement(this.element, props.children as MyItem[]);
    // init the container element (here this.element) with the childrens given in the props
  }
}

// usage:

let cont = <MyContainer/>;
let a = <Item/>;
let b = <Item/>;
let c = <Item/>;

cont.prepend(a);
cont.append(b);
cont.append(c);

cont.swap(a, c);

cont.insert(0, <Item/>);

let last = cont.last(); 
let first = cont.first();

cont.remove(last);

let second_item = cont.at(1);

let whichIndexIsA = cont.indexOf(a); // no worry this guy is O(1)

for (const item of cont.items())
  console.log('iteration', item.name);
 
```
And much more, see [ContainerComponent.tsx](./src/ContainerComponent.tsx)  for complete list
## Types

Might be useful for the typing of the components:

`Component` base component

`Props<ComponentType>` a subset of your component with only setters and public properties

`PursueElement<'click'>` a pursue function with the return type of the event, here `() => MouseEvent`

`Pursue<ComponentType, 'onClick'>` a pursue function with the type of the `onClick` event of the `ComponentType`

