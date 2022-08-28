import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum ButtonStyle {
  DEFAULT = "default",
  BASE = "base",
  NEGATIVE = "negative",
  POSITIVE = "positive",
  BRAND = "brand",
  LINK = "link",
}

export class Button extends Component {

  protected element: HTMLButtonElement;

  constructor(props: Props<Button>) {
    super();

    this.assignProps(props);

    this.element = <button class="p-button">{...props.children}</button>;

    this.override(this.element, 'click', 'onClick')
  }

  set style(value: ButtonStyle) {
    this.element.className =
      "p-badge" + (value === ButtonStyle.DEFAULT ? "" : "--" + value);
  }

  set disabled (value: boolean)
  {
    this.element.disabled = value;
  }

  get disabled(){
    return this.element.disabled;
  }

  onClick(pursue)
  {
    pursue();
  }
}
