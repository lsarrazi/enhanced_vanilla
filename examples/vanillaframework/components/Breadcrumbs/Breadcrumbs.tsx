import { AnyNode, Component, JSXFactory, Props, Pursue } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum BadgeColor {
  DEFAULT = Color.DEFAULT,
  NEGATIVE = Color.NEGATIVE,
}

export class Breadcrumbs extends ContainerComponentElement<BreadcrumbsItem> {
  protected items_element = (<ol class="p-breadcrumbs__items"></ol>);

  constructor(props: Props<Breadcrumbs>) {
    super();

    this.assignProps(props);

    this.initContainerComponentElement(this.items_element, props.children as BreadcrumbsItem[]);
    this.element = (
      <nav class="p-breadcrumbs" aria-label="Breadcrumbs">
        {this.items_element}
      </nav>
    );
  }

  insert(position: number, item: BreadcrumbsItem)
  {
    this.override(item, 'onClick', 'onItemClick')
    super.insert(position, item);
  }

  remove(item: BreadcrumbsItem)
  {
    this.unoverride(item, 'onClick');
    super.remove(item);
  }

  onItemClick(pursue: Pursue<BreadcrumbsItem, 'onClick'> )
  {
    return pursue();
  }


}

export class BreadcrumbsItem extends Component {
  constructor(props: Props<BreadcrumbsItem>) {
    super();
    this.assignProps(props);

    this.element = <li class="p-breadcrumbs__item">{...props.children}</li>;

    this.override(this.element, 'click', 'onClick')
  }

  onClick(pursue)
  {
    pursue();

    return this;
  }
}
