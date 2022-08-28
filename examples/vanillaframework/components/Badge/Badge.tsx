import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum BadgeColor {
    DEFAULT = Color.DEFAULT,
    NEGATIVE = Color.NEGATIVE
};

export class Badge extends Component {

  protected element: HTMLElement = (<span class="p-badge"></span>);

  constructor(props: Props<Badge>) {
    super();

    this.assignProps(props);
    
    this.element.append(<>{...props.children}</>)
  }

  set label(value: string)
  {
    this.element.setAttribute('aria-label', value)
  }

  set color(value: BadgeColor)
  {
    this.element.className = 'p-badge' + (value === BadgeColor.DEFAULT ? '' : '--' + value);
  }

}

