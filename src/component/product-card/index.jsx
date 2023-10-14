import Button from '../button';
import Tag from '../tag';
import './card.css'
const ProductCard = (props)=>{
    const {id, thumbnail, title, price, discountPercentage, quantity} = props.product;
    const {increment, decrement, product} = props;
    return(
        <div className="product-card" id={id}>
            {discountPercentage && <Tag value={`${discountPercentage}%`}/>}
            <img className="product-image" src={thumbnail} alt={`${title}`} />
            <div className="product-title">{title}</div>
            <div className="product-footer">
                <span>${price}</span>
                <Button className = {!quantity ? "addBtn" : "qty-button"} 
                    buttonText = 'Add'
                    increment={()=>{increment(id)}}
                    decrement={()=>{decrement(product)}}
                    quantity={quantity}
                />
            </div>
        </div>
    )
}

export default ProductCard;