import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

/*
<label class="p-radio">
  <input type="radio" class="p-radio__input" name="radioPattern" aria-labelledby="radioExample1">
  <span class="p-radio__label" id="radioExample1">.p-radio</span>
</label>
 */

export enum RadioStyle {
    DEFAULT = "default",
    INLINE = "inline",
    HEADING = "heading"
}

export class Radio extends Component {
  protected element: HTMLInputElement;

  input = (<input type="radio" class="p-radio__input" />);

  constructor(props: Props<Radio>) {
    super();

    this.element = (
      <label class="p-radio">
        {this.input}
        <span class="p-radio__label">{...props.children}</span>
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
    this.element.checked = value;
  }

  get checked() {
    return this.element.checked;
  }

  set name(value: string) {
    this.input.name = value;
  }

  get name() {
    return this.input.name;
  }

  set style(value: RadioStyle)
  {
    this.element.className = value === RadioStyle.DEFAULT ? 'p-radio' : 'p-radio--'+value;
  }

  onChange(pursue) {
    const e = pursue();
    this.checked = this.input.checked;
  }
}
