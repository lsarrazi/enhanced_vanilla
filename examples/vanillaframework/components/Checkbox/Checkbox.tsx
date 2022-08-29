import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum CheckboxStyle {
    DEFAULT = "default",
    INLINE = "inline",
    HEADING = "heading"
}

export class Checkbox extends Component {
  protected element: HTMLInputElement;

  input = (<input type="checkbox" class="p-checkbox__input" />);

  constructor(props: Props<Checkbox>) {
    super();

    this.element = (
      <label class="p-checkbox">
        {this.input}
        <span class="p-checkbox__label">{...props.children}</span>
      </label>
    );

    this.assignProps(props);

    this.override(this.element, "change", "onChange");
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

  set style(value: CheckboxStyle)
  {
    this.element.className = value === CheckboxStyle.DEFAULT ? 'p-checkbox' : 'p-checkbox--'+value;
  }

  onChange(pursue) {
    const e = pursue();
    this.checked = this.input.checked;
  }
}
