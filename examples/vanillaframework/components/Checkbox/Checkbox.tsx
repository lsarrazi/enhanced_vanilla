import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { BasicContainerComponent } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum CheckboxStyle {
  DEFAULT = "default",
  INLINE = "inline",
  HEADING = "heading",
}

export class Checkbox extends Component {
  
  protected input = (<input type="checkbox" class="p-checkbox__input" />);

  protected label_element = (<span class="p-checkbox__label"></span>);

  protected element: HTMLInputElement = (
    <label class="p-checkbox">
      {this.input}
      {this.label_element}
    </label>
  );

  constructor(props: Props<Checkbox>) {
    super();

    this.override(this.element, "change", "onChange");

    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.label_element.replaceChildren(<>{...nodes}</>);
  }

  set disabled(value: boolean) {
    this.element.disabled = value;
  }

  get disabled() {
    return this.element.disabled;
  }

  set checked(value: boolean) {
    this.indeterminate = false;
    this.element.checked = value;
  }

  get checked() {
    return this.element.checked;
  }

  set indeterminate(value: boolean) {
    if (value) this.input.setAttribute("aria-checked", "mixed");
    else this.input.removeAttribute("aria-checked");
    this.element.indeterminate = value;
  }

  get indeterminate() {
    return this.element.indeterminate;
  }

  set style(value: CheckboxStyle) {
    this.element.className =
      value === CheckboxStyle.DEFAULT ? "p-checkbox" : "p-checkbox--" + value;
  }

  onChange(pursue) {
    const e = pursue();
    this.checked = this.input.checked;
  }
}
