import {Component, JSXFactory, Props} from "../../src/index";

class G extends Component {
  constructor(props) {
    super();
    console.log("props", props);
    this.element = <p>THe top G {props.children}</p>;
  }
}

class App extends Component {
  private g_component = (<G element="pipi">Hola The GIGACHAD</G>);

  private message_text = new Text();

  constructor(props: Props<App>) {
    super();

    this.assignProps(props);

    this.element = (
      <div className="popo">
        Hello guys
        <p>{this.message_text}</p>
        {this.g_component}
      </div>
    );
  }

  set message(v: string) {
    this.message_text.data = v;
  }

  get message() {
    return this.message_text.data;
  }
}

const app = (window["app"] = <App message="La v2"></App>);

document.body.append(window["app"].element);
