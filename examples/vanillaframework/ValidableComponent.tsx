import { AnyNode, Component, JSXFactory, Props } from "../../src"

export enum ValidationStyle
{
    DEFAULT = 'default',
    SUCCESS = 'success',
    ERROR = 'error',
    CAUTION = 'caution'
}

export interface ValidableComponent extends Component
{
    set validationMessage(value: AnyNode);
    set validationStyle(value: ValidationStyle);
}

export class ValidableComponentElement extends Component implements ValidableComponent
{
    constructor(private form_group_element, private validation_element, public input_element)
    {
        super();
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