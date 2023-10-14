import { useEffect, useState } from "react";
import "./home.css";
import ProductCard from "../component/product-card";
import { debounce } from "../utils";
import Input from "../component/input";
import {
    GET_CATEGORY_LIST,
    GET_PRODUCT_BY_CATEGORY,
    GET_PRODUCT_LIST,
    SEARCH_PRODUCT_LIST,
} from "../constants/restAPIEndPoints";
import Loader from "../component/loader";
import EmptyScreen from "../component/empty-screen";
import Dropdown from "../component/dropdown";
import Header from "../component/header";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState("");
  const [Categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

// Getting all product
  async function getAllProducts(url) {
    setLoader(true);
    try {
      const res = await fetch(url ? url : GET_PRODUCT_LIST);

      const data = await res.json();
      // console.log(data.products);
      setProducts(data?.products);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoader(false);
    }
  }

// Getting all Categories
async function getAllCategories() {
    const res = await fetch(GET_CATEGORY_LIST);
    const categoryList = await res.json();
    const updatedCategoryList = categoryList?.map((category)=>{
        return {
            id: category,
            label: category
        };
    });
    setCategories(updatedCategoryList);
}


// Getting products by category
  async function getProductsByCategory(category) {
    setLoader(true);
    try{
        const res = await fetch(GET_PRODUCT_BY_CATEGORY(category));
        const data = await res.json();
        setProducts(data.products);
    }
    catch(error) {
        console.error("error: ", error);
    }
    finally {
        setLoader(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  useEffect(()=>{
    if(selectedCategory) {
      getProductsByCategory(selectedCategory);
    }
  },[selectedCategory]);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
    const url = event.target.value
      ? SEARCH_PRODUCT_LIST(event.target.value)
      : "";
    getAllProducts(url);
  };
  const debounceChange = debounce(handleChange, 500);

  const handleDropdownChange = (event)=>{
    // console.log(event.target.value);
    if(!event.target.value) {
      // console.log("Nothing",event.target.value);
      getAllProducts("");
    }
    setSelectedCategory(event.target.value);
    // getProductsByCategory(event.target.value);
  };

  function increment(id) {
    setCartCount(cartCount + 1);
    const Nproducts = products?.map((product)=>{
      if(product.id === id) {
        product.quantity = product.quantity ? product.quantity + 1 : 1;
        return product;
      }
      else {
        return product;
      }
    });
    const updatedProductList = Nproducts;
    setProducts(updatedProductList);
  }

  function decrement(productObj) {
    if(productObj.quantity >= 1) {
      setCartCount(cartCount - 1);
      const Nproducts = products?.map((product)=>{
        if(product.id === productObj.id) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
          // product.quantity = product.quantity - 1;
          // return product;
        }
        else {
          return product;
        }
      });
      const updatedProductList = Nproducts;
      setProducts(updatedProductList);
    }
  }
  return (
    <div>
      <Header cartCount={cartCount}/>
      <Input placeholder="Search product" onChange={debounceChange} />
      <Dropdown 
        className="dropdown"
        value={selectedCategory}
        onChange={handleDropdownChange}
        options={Categories}
        labelKey="label"
        idKey="id"
      />
      <div className="home">
        {!loader &&
        products &&
        products.length >= 1 &&
        Array.isArray(products) ? (
          products?.map((product) => {
            // console.log(product)
            return (
            <ProductCard 
              product={product} 
              increment={increment}
              decrement={decrement}
              quantity={count}
            />);
          })
        ) : loader ? (
          <Loader />
        ) : (
          <EmptyScreen
            className="empty"
            title="No Product Found"
            description="Your search did not match any product, Please try again!!"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
