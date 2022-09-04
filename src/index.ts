/*export default * as TOTO from './EnhancedVanilla';*/

import { JsxElement } from "typescript";

/**
 * A helper function that ensures we won't work with null values
 */
function nonNull(val, fallback) {
  return Boolean(val) ? val : fallback;
}

/**
 * How do we handle children. Children can either be:
 * 1. Calls to DOMcreateElement, returns a Node
 * 2. Text content, returns a Text
 *
 * Both can be appended to other nodes.
 */
function DOMparseChildren(children) {
  return children.map((child) => {
    if (child instanceof Node) return child;
    else if (child instanceof Array) {
      return child;
    } else if (typeof child === "string") {
      return document.createTextNode(child);
    } else return child.element;
  });
}

function AddChilds(childs, element) {
  const childs_ = DOMparseChildren(childs);
  for (const child of childs_) {
    if (child instanceof Array) AddChilds(child, element);
    else element.appendChild(child);
  }
}

/**
 * How do we handle regular nodes.
 * 1. We create an element
 * 2. We apply all properties from JSX to this DOM node
 * 3. If available, we append all children.
 */
function DOMparseNode(element, properties, children) {
  const el = element;
  Object.keys(nonNull(properties, {})).forEach((key) => {
    el.setAttribute(key, properties[key]);
  });

  AddChilds(children, el);

  return el;
}

/**
 * Our entry function.
 * 1. Is the element a function, than it's a functional component.
 *		We call this function (pass props and children of course)
 *		and return the result. We expect a return value of type Node
 * 2. If the element is a string, we parse a regular node
 */
function DOMcreateElement(element, properties, ...children) {
  if (typeof element === "function") {
    return element({
      ...nonNull(properties, {}),
      children,
    });
  }
  return DOMparseNode(element, properties, children);
}

export abstract class JSXFactory {
  static createComponent(element, properties, ...children: AnyNode[]) {
    if (typeof element === "function") {
      if (element === this.createFragment) {
		return element({
			...nonNull(properties, {}),
			children,
		  });
      } else {
        return new element({
          ...nonNull(properties, {}),
          children,
        });
      }
    }
    return DOMparseNode(document.createElement(element), properties, children);
  }

  static createFragment(properties): HTMLElement {
    const children = properties.children;
    delete properties.children;
    return DOMparseNode(
      document.createDocumentFragment(),
      properties,
      children
    );
  }
}

export type AnyNode = HTMLElement | Component | string | null;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type EventMap<T extends EventTarget> = T extends MediaQueryList
  ? MediaQueryListEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends Window
  ? WindowEventMap
  : HTMLElementEventMap;

type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any;
};

type EventType = (pursue: Function, ...args: any[]) => any;

class Pursue__ {}

type EventTypes<T> = T extends HTMLElement
  ? keyof EventMap<T> & string
  : KeyOfType<T, EventType>;

export type Pursue<
  F extends Component,
  Event extends KeyOfType<F, EventType>
> = F[Event] extends (arg0: any, ...rest: infer R) => infer J
  ? Pursue__ & ((...args: R) => J)
  : never;

export type PursueElement<Event extends keyof HTMLElementEventMap> =
  () => HTMLElementEventMap[Event];

type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

type WritableKeysOf<T> = {
  [P in keyof T]: T[P] extends Function
    ? never
    : IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>;
}[keyof T];

type WritablePart<T> = Pick<T, WritableKeysOf<T>> ;

export type Props<T, U=string> = Partial<WritablePart<T>>;

export abstract class Component {
  static events = new Map();
  protected element: HTMLElement;
  protected parent: Component;

  protected assignProps(propsToBeAssigned) {
    Object.assign(this, propsToBeAssigned);
  }

  protected assignNodes(element: HTMLElement, nodes: AnyNode[])
  {
    element.replaceChildren(JSXFactory.createFragment({children: nodes}));
  }

  /*override<T extends (Node)>(child: T, child_event: EventTypes<T>, new_name: keyof this, handler: EventType = this[new_name] as any)
		{
				if (child instanceof HTMLElement)
						child['on'+child_event] = ( this.dispatchDom.bind(this, child_event))
				const listeners = Component.getListeners(child_event);
				// @ts-ignore
				child.parent = this;
				listeners.set(child, {name: new_name, handler:handler});
		}*/

  override<T extends HTMLElement | Component>(
    child: T,
    child_event: EventTypes<T>,
    new_name: keyof this,
    handler: EventType = this[new_name] as any,
    ...extra_args: any
  ) {
    if (child instanceof HTMLElement)
      child.addEventListener(
        child_event,
        this.dispatchDom.bind(this, child_event, child),
        true
      );
    const listeners = Component.getListeners(child_event);
    // @ts-ignore
    listeners.set(child, { name: new_name, parent: this, handler: handler });
  }

  unoverride<T extends HTMLElement | Component>(
    child: T,
    child_event: EventTypes<T>
  ) {
    const listeners = Component.getListeners(child_event);
    listeners.delete(child);
  }

  static getListeners(event) {
    let listeners = this.events.get(event);
    if (!listeners) this.events.set(event, (listeners = new Map()));
    return listeners;
  }

  async dispatch(event: keyof this, callback) {
    let listeners = Component.getListeners(event);
    let override = listeners.get(this);
    if (!override) throw new Error("object cannot dispatch event");
    let pursue = callback;
    let parent: Component = this,
      listener;
    while (listeners && (listener = listeners.get(parent))) {
      pursue = listener.handler.bind(parent, pursue);
      parent = listener.parent;
      listeners = Component.getListeners(listener.name);
    }
    await pursue();
  }

  async dispatchDom(event: keyof this, element: Element, dom_event) {
    let listeners = Component.getListeners(event);
    for (const element_n of dom_event.path) {
      if (element_n === element && listeners.has(element_n)) {
        let first_pursued = false;
        let pursue = () => {
          first_pursued = true;
          return dom_event;
        };
        let parent = element_n,
          listener;
        while (listeners && (listener = listeners.get(parent))) {
          pursue = listener.handler.bind(listener.parent, pursue);
          parent = listener.parent;
          listeners = Component.getListeners(listener.name);
        }
        await pursue();
        if (!first_pursued) {
          dom_event.stopPropagation();
          dom_event.stopImmediatePropagation();
          dom_event.preventDefault();
        }
      }
    }
  }

  getElement() {
    return this.element;
  }
}

window["Component"] = Component;
