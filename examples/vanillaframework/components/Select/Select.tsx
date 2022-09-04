import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { BasicContainerComponent } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";
import { FormCompatibleComponent } from "../../FormCompatibleComponent";
import {
  ValidableComponent,
  BasicValidableComponent,
  ValidationStyle,
} from "../../ValidableComponent";

/*
<label for="exampleSelect">Ubuntu releases</label>
  <select name="exampleSelect" id="exampleSelect">
    <option value="" disabled="disabled" selected="">Select an option</option>
    <option value="1">Cosmic Cuttlefish</option>
    <option value="2">Bionic Beaver</option>
    <option value="3">Xenial Xerus</option>
  </select>
*/

export class Select<ValueType>
  extends BasicContainerComponent<SelectOption<ValueType>>
  implements FormCompatibleComponent, ValidableComponent
{
  protected element: HTMLInputElement;

  protected label_element = (<label></label>);
  protected input: HTMLSelectElement = (<select />);

  protected validator: BasicValidableComponent;

  protected validation_element: HTMLElement = (
    <p class="p-form-validation__message"></p>
  );

  constructor(props: Props<Select<ValueType>, SelectOption<ValueType>>) {
    super();

    this.element = (
      <div class="p-form__group p-form-validation">
        {this.label_element}
        <div class="p-form__control u-clearfix">
          {this.input}
          {this.validation_element}
        </div>
      </div>
    );

    this.validator = new BasicValidableComponent(
      this.element,
      this.validation_element,
      this.input
    );

    this.override(this.element, "change", "onChange");

    this.assignProps(props);
  }

  set children(nodes: SelectOption<ValueType>[]) {
    this.initContainerComponentElement(this.input, nodes);
  }

  set validationMessage(value: AnyNode) {
    this.validator.validationMessage = value;
  }

  set validationStyle(value: ValidationStyle) {
    this.validator.validationStyle = value;
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

  set label(node: AnyNode) {
    this.label_element.innerHTML = "";
    this.label_element.append(<>{node}</>);
  }

  set selectedOptions(options: IterableIterator<SelectOption<ValueType>>) {
    for (const option of options) {
      option.selected = true;
    }
  }

  get selectedOptions() {
    const self = this;
    return (function* () {
      for (const opt of self.input.selectedOptions)
        yield self.retrieveElementItem(opt);
    })();
  }

  onChange(pursue) {
    const e = pursue();
  }
}

export class SelectOption<ValueType> extends Component {
  public value: ValueType;

  protected element: HTMLOptionElement = <option></option>;

  constructor(props: Props<SelectOption<ValueType>>) {
    super();

    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.assignNodes(this.element, nodes)
  }

  set selected(value: boolean) {
    this.element.selected = value;
  }

  get selected() {
    return this.element.selected;
  }
}
