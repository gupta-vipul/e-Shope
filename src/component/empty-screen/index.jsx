import './emptyscreen.css';
const EmptyScreen = (props)=>{
    const {url, title, description, className} = props;
    return (
        <div className={className}>
            <img src={`${url ? url : "https://www.breathearomatherapy.com/assets/images/global/no-product.png"}`} alt="no product found" />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
};

export default EmptyScreen;