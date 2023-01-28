import { AnyNode, Component, JSXFactory, Props } from "../../src"

export enum ValidationStyle
{
    DEFAULT = 'default',
    SUCCESS = 'success',
    ERROR = 'error',
    CAUTION = 'caution'
}

export interface ValidableComponent
{
    set validationMessage(value: AnyNode);
    set validationStyle(value: ValidationStyle);
}

export class BasicValidableComponent implements ValidableComponent
{
    constructor(private form_group_element: HTMLElement, private validation_element: HTMLElement, public input_element: HTMLElement)
    {
    }

    set validationMessage(value: AnyNode)
    { 
        this.validation_element.replaceChildren(<>{value}</>); 
    }

    set validationStyle(value: ValidationStyle)
    {
        const isDefault = value === ValidationStyle.DEFAULT;
        this.form_group_element.className = isDefault ? 'p-form__group' : 'p-form__group p-form-validation is-' + value.toString();
        this.input_element.classList.toggle('p-form-validation__input', !isDefault);
    }
}

