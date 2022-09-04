import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { BasicContainerComponent } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";
import { Icon } from "../Icon/Icon";

export enum ButtonStyle {
  DEFAULT = "default",
  BASE = "base",
  NEGATIVE = "negative",
  POSITIVE = "positive",
  BRAND = "brand",
  LINK = "link",
}

export class Button extends Component {

  protected inner_element = (<span></span>);

  protected element: HTMLButtonElement = (
    <button class="p-button">{this.inner_element}</button>
  );

  constructor(props: Props<Button>) {
    super();

    this.override(this.element, "click", "onClick");

    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.assignNodes(this.inner_element, nodes)
  }

  set style(value: ButtonStyle) {
    this.element.className =
      "p-button" + (value === ButtonStyle.DEFAULT ? "" : "--" + value);
  }

  set dense(value: boolean) {
    this.element.classList.toggle("is-dense", value);
  }

  get dense() {
    return this.element.classList.contains("is-dense");
  }

  set inline(value: boolean) {
    this.element.classList.toggle("is-inline", value);
  }

  get inline() {
    return this.element.classList.contains("is-inline");
  }

  set small(value: boolean) {
    this.element.classList.toggle("is-small", value);
  }

  get small() {
    return this.element.classList.contains("is-small");
  }

  set icon(value: Icon | null) {
    this.element.classList.toggle("has-icon", value !== null);
    this.element.replaceChildren(value.getElement(), this.inner_element);
  }

  set disabled(value: boolean) {
    this.element.disabled = value;
  }

  get disabled() {
    return this.element.disabled;
  }

  onClick(pursue) {
    pursue();
  }
}
