import Button from '../button';
import './header.css';

const Header = (props)=>{
    const {cartCount} = props;
    return (
        <div className='header'>
            <span className='logo'>eShope</span>
            <Button className="header-button">
                <img className="cartimg" src="/cart.png" alt="cart" />
                <span>My Cart</span>
                {
                    cartCount >=1 ? <span className='cartcountbadge'>{cartCount}</span> : null
                }
            </Button>
        </div>
    )
};

export default Header;
