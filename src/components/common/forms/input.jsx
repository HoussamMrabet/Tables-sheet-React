import React from 'react';

const Input = (props) => {
    return ( 
        <div className="form-group">
            <label htmlFor={props.name}>{ props.label }</label>
            <input 
                name={props.name}
                value={props.value} 
                onChange={props.onChange} 
                id={props.name} 
                type={props.type}
                placeholder={props.placeholder}
                className="form-control" 
            />
            {props.error[props.name] && <small className="form-text text-danger">{ ("*" + props.error[props.name]) }</small>}
        </div>
    );
}
 
export default Input;