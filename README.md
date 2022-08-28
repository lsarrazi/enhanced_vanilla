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



## Types

Might be useful for the typing of the components:

`Component` base component

`Props<ComponentType>` a subset of your component with only setters and public properties

`PursueElement<'click'>` a pursue function with the return type of the event, here `() => MouseEvent`

`Pursue<ComponentType, 'onClick'>` a pursue function with the type of the `onClick` event of the `ComponentType`

