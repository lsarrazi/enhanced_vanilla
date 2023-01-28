import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

export enum ChipStyle {
  DEFAULT = "default",
  NEGATIVE = "negative",
  POSITIVE = "positive",
  CAUTION = "caution",
  INFORMATION = "information",
}

export class Chip extends Component {
  protected element: HTMLInputElement = (
    <button class="p-chip">
    </button>
  );

  constructor(props: Props<Chip>) {
    super();

    this.override(this.element, "click", "onClick");

    this.assignProps(props);
  }

  set children(nodes: (ChipLead | ChipValue | ChipDismiss)[]) {
    this.element.replaceChildren(<>{...nodes}</>);
  }

  set disabled(value: boolean) {
    this.element.disabled = value;
  }

  set dense(value: boolean)
  {
    this.element.classList.toggle('is-dense',value);
  }

  get dense(): boolean {
    return this.element.classList.contains('is-dense');
  }

  set inline(value: boolean)
  {
    this.element.classList.toggle('is-inline',value);
  }

  get inline(): boolean {
    return this.element.classList.contains('is-inline');
  }

  get disabled() {
    return this.element.disabled;
  }

  set pressed(value: boolean) {
    this.element.toggleAttribute('aria-pressed', value);
  }

  set style(value: ChipStyle) {
    this.element.className =
      value === ChipStyle.DEFAULT ? "p-chip" : "p-chip--" + value;
  }

  onClick(pursue) {
    const e = pursue();
  }
}
 
export class ChipLead extends Component {
  protected element: HTMLInputElement = (
    <span class="p-chip__lead"></span>
  );

  set children(nodes: AnyNode[]) {
    this.element.replaceChildren(<>{...nodes}</>);
  }

  constructor(props: Props<Chip>) {
    super();

    this.assignProps(props);
  }
}

export class ChipValue extends Component {
  protected element: HTMLInputElement = (
    <span class="p-chip__value"></span>
  );

  set children(nodes: AnyNode[]) {
    this.element.replaceChildren(<>{...nodes}</>);
  }

  constructor(props: Props<ChipValue>) {
    super();

    this.assignProps(props);
  }
}


export class ChipDismiss extends Component {
  protected element: HTMLInputElement = (
    <button class="p-chip__dismiss"></button>
  );

  set children(nodes: AnyNode[]) {
    this.element.replaceChildren(<>{...nodes}</>);
  }

  constructor(props: Props<ChipDismiss>) {
    super();

    this.assignProps(props);
  }
}
