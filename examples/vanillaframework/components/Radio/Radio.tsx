import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { BasicContainerComponent } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";
import { FormCompatibleComponent } from "../../FormCompatibleComponent";

export enum RadioStyle {
    DEFAULT = "default",
    INLINE = "inline",
    HEADING = "heading"
}

export class Radio extends Component implements FormCompatibleComponent {
  protected element: HTMLInputElement;

  protected input = (<input type="radio" class="p-radio__input" />);

  protected label_element = <span class="p-radio__label"></span>;

  constructor(props: Props<Radio>) {
    super();

    this.element = (
      <label class="p-radio">
        {this.input}
        {this.label_element}
      </label>
    );

    this.assignProps(props);

    this.override(this.element, "change", "onChange");
  }

  set children(nodes: AnyNode[]) {
    this.assignNodes(this.label_element, nodes)
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
