import { AnyNode, Component, JSXFactory, Props } from "../../../../src";
import { ContainerComponentElement } from "../../../../src/ContainerComponent";

export class Accordion extends ContainerComponentElement<AccordionGroup> {

  protected list = (<ul class="p-accordion__list"></ul>);
  
  protected container_element = this.list;

  protected element = (<aside class="p-accordion">{this.list}</aside>);

  constructor(props: Props<Accordion, AccordionGroup>) {
    
    super();
    
    this.initContainerComponentElement(this.list, props.children as AccordionGroup[]);
  }
}

export class AccordionGroup extends Component {

  protected expanded_value = false;

  protected button: HTMLButtonElement = (
    <button
      type="button"
      class="p-accordion__tab"
      aria-expanded="false"
    ></button>
  );

  protected heading = (
    <div role="heading" aria-level="3" class="p-accordion__heading">
      {this.button}
    </div>
  );

  protected panel: HTMLElement = (
    <section
      class="p-accordion__panel"
      aria-hidden="true"
    ></section>
  );

  protected element = (
    <li class="p-accordion__group">
      {this.heading}
      {this.panel}
    </li>
  );

  constructor(props: Props<AccordionGroup>) {
    super();
    this.assignProps(props)
    this.panel.append(<>{...props.children}</>);
    this.override(this.button, "click", "onButtonClick");
  }

  onButtonClick(pursue) {
    this.expanded = !this.expanded_value;
    pursue();
  }

  set expanded(value: boolean) {
    this.expanded_value = value;
    this.button.setAttribute("aria-expanded", value.toString());
    this.panel.setAttribute("aria-hidden", (!value).toString());
  }

  get expanded() {
    return this.expanded_value;
  }

  set title(value: AnyNode)
  {
    this.button.replaceChildren(value instanceof Component ? value.getElement() : value)
  }

  set withTickElements (value: boolean)
  {
    this.panel.classList.toggle('has-tick-elements', value)
  }

  
}
