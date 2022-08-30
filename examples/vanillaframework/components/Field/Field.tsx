import { AnyNode, Component, JSXFactory, Props } from "../../../../src";

import { ContainerComponentElement } from "../../../../src/ContainerComponent";
import { Color } from "../../Common";
import { FormCompatibleComponent } from "../../FormCompatibleComponent";

/*
<label class="p-radio">
  <input type="radio" class="p-radio__input" name="radioPattern" aria-labelledby="radioExample1">
  <span class="p-radio__label" id="radioExample1">.p-radio</span>
</label>
 */

export enum FieldType {
  PASSWORD = "password",
  DATETIME = "datetime",
  DATETIME_LOCAL = "datetime-local",
  DATE = "date",
  MONTH = "month",
  TIME = "time",
  WEEK = "week",
  NUMBER = "number",
  EMAIL = "email",
  URL = "url",
  SEARCH = "search",
  TEL = "tel",
  TEXT = "text",
}

export class Field extends Component implements FormCompatibleComponent {
  protected element: HTMLInputElement;

  protected input = (<input type="text" />);

  protected validation_element = (
    <p class="p-form-validation__message" id="8kBkTCElub6LBPIg7Vsb_">
      <strong>Error:</strong> This field is required.
    </p>
  );

  constructor(props: Props<Field>) {
    super();
    /*<div class="p-form__group p-form-validation is-error">
    <label class="p-form__label" for="exampleTextInput5">Email address</label>
    <div class="p-form__control u-clearfix">
        <input class="p-form-validation__input" type="text" aria-errormessage="8kBkTCElub6LBPIg7Vsb_" aria-invalid="true" id="exampleTextInput5" label="Email address" placeholder="example@canonical.com">
            <p class="p-form-validation__message" id="8kBkTCElub6LBPIg7Vsb_">
            <strong>Error:</strong> This field is required.
            </p>
        </div>
    </div>*/

    this.element = (
      <div class="p-form__group p-form-validation is-error">
        <label class="p-form__label">{...props.children}</label>
        <div class="p-form__control u-clearfix">{this.input}</div>
      </div>
    );

    this.assignProps(props);

    this.override(this.element, "change", "onChange");
    this.override(this.element, "keypress", "onKeyPress");
    this.override(this.element, "keyup", "onKeyUp");
    this.override(this.element, "keydown", "onKeyDown");
  }

  set disabled(value: boolean) {
    this.input.disabled = value;
  }

  get disabled() {
    return this.input.disabled;
  }

  set name(value: string) {
    this.input.name = value;
  }

  get name() {
    return this.input.name;
  }

  set value(value: string) {
    this.input.name = value;
  }

  get value() {
    return this.input.value;
  }

  set placeholder(value: string) {
    this.input.placeholder = value;
  }

  get placeholder() {
    return this.input.placeholder;
  }

  set autocomplete(value: string) {
    this.input.autocomplete = value;
  }

  get autocomplete() {
    return this.input.autocomplete;
  }

  set type(value: FieldType) {
    this.input.type = value.toString();
  }

  get type() {
    return this.input.type;
  }

  onKeyPress(pursue) {
    return pursue();
  }

  onKeyUp(pursue) {
    return pursue();
  }

  onKeyDown(pursue) {
    return pursue();
  }

  onChange(pursue) {
    return pursue();
  }
}
