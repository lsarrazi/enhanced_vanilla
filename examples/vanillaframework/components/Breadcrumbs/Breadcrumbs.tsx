import { AnyNode, Component, JSXFactory, Props, Pursue } from "../../../../src";

import { BasicContainerComponent } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum BadgeColor {
  DEFAULT = Color.DEFAULT,
  NEGATIVE = Color.NEGATIVE,
}

export class Breadcrumbs extends BasicContainerComponent<BreadcrumbsItem> {
  protected items_element = (<ol class="p-breadcrumbs__items"></ol>);

  protected element = (
    <nav class="p-breadcrumbs" aria-label="Breadcrumbs">
      {this.items_element}
    </nav>
  );

  constructor(props: Props<Breadcrumbs>) {
    super();

    this.assignProps(props);
  }

  set children(nodes: BreadcrumbsItem[]) {
    this.initContainerComponentElement(this.items_element, nodes);
  }

  insert(position: number, item: BreadcrumbsItem) {
    this.override(item, "onClick", "onItemClick");
    super.insert(position, item);
  }

  remove(item: BreadcrumbsItem) {
    this.unoverride(item, "onClick");
    super.remove(item);
  }

  onItemClick(pursue: Pursue<BreadcrumbsItem, "onClick">) {
    return pursue();
  }
}

export class BreadcrumbsItem extends Component {
  protected element = (<li class="p-breadcrumbs__item"></li>);

  constructor(props: Props<BreadcrumbsItem>) {
    super();

    this.override(this.element, "click", "onClick");

    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.assignNodes(this.element, nodes);
  }

  onClick(pursue) {
    pursue();

    return this;
  }
}
