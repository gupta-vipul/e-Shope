import './dropdown.css';

const Dropdown = (props)=>{
    const {className, value, onChange, options, idKey, labelKey} = props;
    return (
        <select className={className} value={value} onChange={onChange}>
            <option value="">Select Category</option>
            {
                options?.map((option)=>{
                    return <option value={option[idKey]}>{option[labelKey]}</option>
                })
            }
        </select>
    )
};

export default Dropdown;