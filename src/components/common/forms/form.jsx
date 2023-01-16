import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

/* How to use the component

    - extends Form
    - set the states:
        state = {
            data: {@field: ""},
            errors:{}
        }
    - set the schema for validation errors:
        -import the Joi API
        schema = {
            @field: Joi.string().(...)
            ...
        }
    - add and set the doSubmit() function to control the data after submiting
*/

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    };
    
    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if(!result.error) return null;

        const errors = {};

        for (let item of result.error.details)
            errors[item.path[0]] = item.message;

        return errors;
    };

    validateProperty = (input) => {
        const obj = {[input.name]: input.value};
        const schema = { [input.name]: this.schema[input.name] };
        const {error} = Joi.validate(obj, schema);
        return error? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({currentTarget : input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);

        if(errorMessage)
            errors[input.name] = errorMessage;
        else
            delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors})
    };

    renderInput(name,label,type="text", placeholder=""){

        const {data, errors} = this.state;

        return (
            <Input 
                name = {name}
                value = {data[name]} 
                onChange = {this.handleChange} 
                error = {errors}
                label = {label}
                type = {type} 
                placeholder = {placeholder}
            />
        );
    };

    renderSelect(name,label,options){

        const {data, errors} = this.state;
        return (
            <Select 
                name = {name}
                value = {data} 
                options = {options}
                onChange = {this.handleChange} 
                error = {errors[name]}
                label = {label}
            />
        );
    };

    renderButton(label){
        return (
            <button 
            disabled={this.validate()}
            className="btn btn-primary">
                {label}
            </button>
        );
    };
}
 
export default Form;