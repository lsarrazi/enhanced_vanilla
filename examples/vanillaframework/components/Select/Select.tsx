import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";
import { FormCompatibleComponent } from "../../FormCompatibleComponent";

/*
<label for="exampleSelect">Ubuntu releases</label>
  <select name="exampleSelect" id="exampleSelect">
    <option value="" disabled="disabled" selected="">Select an option</option>
    <option value="1">Cosmic Cuttlefish</option>
    <option value="2">Bionic Beaver</option>
    <option value="3">Xenial Xerus</option>
  </select>
*/

export class Select<ValueType> extends ContainerComponentElement<SelectOption<ValueType>> implements FormCompatibleComponent {
  protected element: HTMLInputElement;

  protected label_element = <span class="p-select__label"></span>;
  protected input: HTMLSelectElement = (<select/>);

  constructor(props: Props<Select<ValueType>, SelectOption<ValueType>>) {
    super();

    this.element = (
      <label>
        {this.label_element}
        {this.input}
      </label>
    );

    this.initContainerComponentElement(this.input, props.children);

    this.override(this.element, "change", "onChange");
    
    this.assignProps(props);
  }

  set disabled(value: boolean) {
    this.input.disabled = value;
  }

  get disabled() {
    return this.input.disabled;
  }

  set multiple(value: boolean) {
    this.input.multiple = value;
  }

  get multiple() {
    return this.input.multiple;
  }

  set name(value: string) {
    this.input.name = value;
  }

  get name() {
    return this.input.name;
  }

  set label(node: AnyNode)
  {
    this.label_element.innerHTML = '';
    this.label_element.append(<>{node}</>)
  }



  set selectedOptions(options: IterableIterator<SelectOption<ValueType>>)
  {
    for (const option of options)
    {
      option.selected = true;
    }
  }

  get selectedOptions()
  {
    const self = this;
    return function*()
    {
      for (const opt of self.input.selectedOptions)
        yield self.retrieveElementItem(opt);
    }();
  }

  onChange(pursue) {
    const e = pursue();
  }

}


export class SelectOption<ValueType> extends Component
{
  public value: ValueType;

  protected element: HTMLOptionElement;

  constructor(props: Props<SelectOption<ValueType>>) {
    super();

    this.element = (
      <option>{...props.children}</option>
    );

    this.assignProps(props);
  }

  set selected(value: boolean)
  {
    this.element.selected = value;
  }

  get selected () {
    return this.element.selected;
  }
}