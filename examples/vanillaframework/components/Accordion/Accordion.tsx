import { AnyNode, Component, JSXFactory, Props } from "../../../../src";
import { BasicContainerComponent } from "../../../../src/ContainerComponent";

export class Accordion extends BasicContainerComponent<AccordionGroup> {

  protected list = (<ul class="p-accordion__list"></ul>);
  
  protected container_element = this.list;

  protected element = (<aside class="p-accordion">{this.list}</aside>);

  constructor(props: Props<Accordion>) {
    
    super();
    
    
  }

  set children(nodes: AccordionGroup[]) {
    this.initContainerComponentElement(this.list, nodes);
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
    this.override(this.button, "click", "onButtonClick");
    this.assignProps(props)
  }

  set children(nodes: AnyNode[]) {
    this.assignNodes(this.panel, nodes)
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
