import { Component, JSXFactory, Pursue } from "../../src";
import { Accordion, AccordionGroup } from "./components/Accordion/Accordion";
import { Badge, BadgeColor } from "./components/Badge/Badge";
import {
  Breadcrumbs,
  BreadcrumbsItem,
} from "./components/Breadcrumbs/Breadcrumbs";
import { Button, ButtonStyle } from "./components/Button/Button";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { Field, FieldType } from "./components/Field/Field";
import { AdditionnalIcons, Icon, StandardIcons } from "./components/Icon/Icon";
import { Radio } from "./components/Radio/Radio";
import { Select, SelectOption } from "./components/Select/Select";

import './style.scss';

class App extends Component {
  accordion: Accordion = (
    <Accordion>
      <AccordionGroup expanded={false} title={"Popo"}>
        <p>{"Hola"}</p>
      </AccordionGroup>
    </Accordion>
  );

  badge = (<Badge color={BadgeColor.NEGATIVE}>Punta Cana !</Badge>);

  breadcrumbs: Breadcrumbs = (
    <Breadcrumbs>
      {...["Overview", "Features", "Managed", "Install", "Overview"].map(
        (text) => (
          <BreadcrumbsItem>
            <a href="#">{text}</a>
          </BreadcrumbsItem>
        )
      )}
      <BreadcrumbsItem>Docs</BreadcrumbsItem>
    </Breadcrumbs>
  );

  checkbox = (
    <Checkbox indeterminate={true}>Hola, do you want to check me ?</Checkbox>
  );

  radio = (<Radio name="thename">Radio 1</Radio>);

  radio2 = (<Radio name="thename">Radio 2</Radio>);

  select: Select<string> = <Select>
    <SelectOption value="1">Paris</SelectOption>
    <SelectOption value="2">Manhatan</SelectOption>
    <SelectOption value="3">Dubaï</SelectOption>
  </Select>;

  field: Field = <Field type={FieldType.TEL}>The input we want</Field>

  button: Button = 
  <Button style={ButtonStyle.BRAND} icon={<Icon name={AdditionnalIcons.ADD_CANVAS}/>}>
    Hola
  </Button>;

  element = (
    <>
      {this.accordion}
      {this.badge}
      {this.breadcrumbs}
      {this.checkbox}
      {this.radio}
      {this.radio2}
      {this.select}
      {this.field}
      {this.button}
    </>
  );

  constructor() {
    super();
    const data = [
      {
        title: "What is MAAS?",
        content: `MAAS expands to “Metal As A Service” – it converts bare-metal
        servers into cloud instances of virtual machines. There is no need
        to manage individual units. You can quickly provision or destroy
        machines, as if they were instances hosted in a public cloud like
        Amazon AWS, Google GCE, or Microsoft Azure.`,
      },
      {
        title: "What MAAS offers",
        content: `MAAS can manage a large number of physical machines by merging them
        into user-defined resource pools. MAAS automatically provisions
        participating machines and makes them available for use. You can
        return unused machines to the assigned pool at any time.`,
      },
      {
        title: "How MAAS works",
        content: `When you add a new machine to MAAS, or elect to add a machine that
        MAAS has enlisted, MAAS commissions it for service and adds it to
        the pool. At that point, the machine is ready for use. MAAS keeps
        things simple, marking machines as “New,” “Commissioning,” “Ready,”
        and so on.`,
      },
      ...new Array(4)
        .fill(0)
        .map((e, i) => ({ title: i.toString(), content: crypto.randomUUID() })),
    ];

    for (const entry of data) {
      const group = (
        <AccordionGroup
          withTickElements={true}
          expanded={false}
          title={entry.title}
        >
          <p>{entry.content}</p>
        </AccordionGroup>
      );

      this.accordion.append(group);
      console.log("the index", this.accordion.indexOf(group));
    }

    console.log(this.select)

    this.override(this.breadcrumbs, "onItemClick", "onBreadcumbsItemClick");
  }

  onBreadcumbsItemClick(pursue: Pursue<Breadcrumbs, "onItemClick">) {
    console.log("breadcump item click", pursue());
  }
}

const app = (window["app"] = new App());

document.body.append(app.getElement());
