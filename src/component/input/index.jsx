import './input.css';

const Input = (props)=>{
    const {placeholder,value,onChange} = props;
    return (
        <input className="input" type="text" value={value} placeholder={placeholder} onChange={onChange}/>
    )
};

export default Input;