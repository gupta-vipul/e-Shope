import './tag.css'

const Tag = ({value, className})=>{
    return <div className={`tag ${className}`}>{value}</div>
};

export default Tag;