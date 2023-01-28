import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { BasicContainerComponent } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";

export enum CardStyle 
{
    DEFAULT = 'default',
    HIGHLIGHTED = 'highlighted',
    OVERLAY = 'overlay'
}

export class Card extends Component {
  protected input = (<input type="checkbox" class="p-checkbox__input" />);

  protected element: HTMLElement = (<div class="p-card"></div>);

  protected style_value: CardStyle = CardStyle.DEFAULT;
  protected nopadding_value: boolean = false;

  constructor(props: Props<Card>) {
    super();

    this.override(this.element, "click", "onClick");

    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.assignNodes(this.element, nodes)
  }

  set nopadding(value: boolean)
  {
    this.nopadding_value = value;
    this.updateClassName();
  }

  get nopadding()
  {
    return this.nopadding_value;
  }

  set style(value: CardStyle)
  {
    this.style_value = value;
    this.updateClassName();
  }

  get style()
  {
    return this.style_value;
  }

  protected updateClassName()
  {
    this.element.classList.add('p-card' + (this.style === CardStyle.DEFAULT ? '' : '--' + this.style));
    this.element.classList.toggle('u-no-padding', this.nopadding)
  }

  onClick(pursue) {
    const e = pursue();
  }
}

export class CardHr extends Component {
  protected element = (<hr class="u-no-margin--bottom" />);

  constructor(props: Props<CardHr>){
    super();
    this.assignProps(props);
  }
}

export class CardInner extends Component {
  protected element = (<div class="p-card__inner"></div>);

  constructor(props: Props<CardInner>){
    super();
    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.element.replaceChildren(<>{...nodes}</>);
  }
}

export class CardContent extends Component {
  protected element = (<div class="p-card__content"></div>);

  constructor(props: Props<CardContent>){
    super();
    this.assignProps(props);
  }

  set children(nodes: AnyNode[]) {
    this.element.replaceChildren(<>{...nodes}</>);
  }
}

export class CardImage extends Component {
  protected element = (<img class="p-card__image" />);

  constructor(props: Props<CardImage>){
    super();
    this.assignProps(props);
  }

  set src(value: string) {
    this.element.src = value;
  }
}
