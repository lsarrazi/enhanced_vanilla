import { Component, JSXFactory, Props } from "../../../../src"

export enum ValidationStyle
{
    DEFAULT = 'default',
    SUCCESS = 'success',
    ERROR = 'error',
    CAUTION = 'caution'
}

export class Validation extends Component
{
    element = <div class="p-form-validation is-success"></div>;

    constructor(props: Props<Validation>)
    {
        super();
        this.assignProps(props)
    }

    set style(value: ValidationStyle)
    {
        this.element.className = value === ValidationStyle.DEFAULT ? value.toString() : 'p-form-validation is-' + value.toString();
    }
}