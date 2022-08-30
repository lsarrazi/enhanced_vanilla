import { Component } from "../../src";

export interface FormCompatibleComponent extends Component
{
    set disabled(value: boolean);
    get disabled();
    set name(value: string);
    get name();
}
