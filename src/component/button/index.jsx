import './button.css';
const Button = (props)=>{
    let {className, buttonText, children, decrement, increment, quantity} = props;
    if(!quantity) {
        return (
            <button className={className} onClick={increment}>
                {buttonText || children}
            </button>
        )
    }
    else {
        return (
            <div className={className}>
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
            </div>
        )
    }
}

export default Button;