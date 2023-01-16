import React from 'react';

const Select = ({ name, label, options, error, value, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select 
                name={name}
                id={name}
                {...rest}
                className="form-control"
            >
                <option value="" />
                {options.map(option =>(
                    <option key={option._id} value={option._id} selected={(value.genre === option._id)? true: false} >
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <small className="form-text text-danger">{ ("*" + error) }</small>}
        </div>
    );
}
 
export default Select;