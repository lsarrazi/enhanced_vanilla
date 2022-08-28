import { Component, JSXFactory, Pursue, PursueElement } from "../../src/index";

class Button extends Component {
  public t: string;
  public button: HTMLElement;
  constructor(props) {
    super();
    this.element = <div>{(this.button = <button>Im the button</button>)}</div>;

    this.override(this.element, "click", "onClick");
    this.override(this.button, "click", "onClick2");

    this.button.addEventListener("click", () =>
      console.log("Hola", Date.now())
    );

    setTimeout(() => {this.dispatch('onClick2', () => console.log('THEN!'))}, 100)
  }

  onClick(pursue: PursueElement<"click">, god: boolean) {
    console.log("before im clicked");

    const event = pursue();

    console.log("im clicked !", event, Date.now());

    return false;
  }

  onClick2(pursue: PursueElement<"click">, god: boolean) {
    console.log("2before im clicked");

    const event = pursue();

    console.log("2im clicked !", event, Date.now());

    return false;
  }
}

class App extends Component {
  button: Button = (<Button></Button>);

  constructor(props: { message?: string }) {
    super();

    this.assignProps(props);

    this.element = (
      <div className="popo">
        The Button:
        {this.button}
      </div>
    );

    this.override(this.button, "onClick", "onButtonClick");

    this.override(this.button, 'onClick', 'onButtonClick2')
  }

  onButtonClick(pursue: Pursue<Button, "onClick">) {
    console.log("button clicked throught app");
    
    pursue(true);

    console.log("after shit");
  }

  onButtonClick2(pursue: Pursue<Button, "onClick">) {
    console.log("APP2 start");
    pursue(true);

    console.log("APP2 stop");
  }
}



const app = (window["app"] = <App message="La kéké"></App>);

document.body.append(window["app"].element);
