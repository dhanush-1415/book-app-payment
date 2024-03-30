

import React, { useEffect,useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import Search_Product_Sidebar from '../../COMPONENTS/Product/Search_Product_Sidebar';
import ProductCard from '../../COMPONENTS/Product/ProductCard';
import './Search.css';
import loaderGif from '../../ASSETS/loaderGif.gif';
const SearchPage = () => {
  const { searchvalue } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isGettingProducts, setIsGettingProducts] = useState(true);

  const fetchProducts = (page) => {
    
    const pageSize = 50;
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/Product/GetAllWithImageV2?OrganizationId=${process.env.REACT_APP_BACKEND_ORGANIZATION}&ProductName=${searchvalue}&pageNo=${page}&pageSize=${pageSize}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        const filtered = data.Result.filter((product) =>
          product.Name.toLowerCase().includes(searchvalue.toLowerCase())
        );

        setLoading(false);
        if (page === 1) {
          setProducts(filtered);
        } else {
          setProducts((prevProducts) => [...new Set([...prevProducts, ...filtered])]);
        }
        console.log("filteredProd",products,page,pageNumber);
        if (data.PageSize === pageSize) {
          setPageNumber(page + 1);
          setIsGettingProducts(true);
        } 
        console.log("filteredProd",products,page,pageNumber);
        return data;
      })

      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    // Reset page number to 1 when a new search is performed
    setPageNumber(1);
    setLoading(true);
    setProducts([]); // Reset the products when a new search is performed
    fetchProducts(1);
  }, [searchvalue]);
  
 
  useEffect(() => {
    if (pageNumber === 1) {
      fetchProducts(pageNumber);
    }
  }, [
    pageNumber,
  ]);
  let count=0;
  const listInnerRef = useRef();
  const scrollEvent = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log("Scroll Event", scrollTop + clientHeight, scrollHeight);

      // Check if the user has scrolled to the bottom of the container
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // Load new products if the user is at the bottom
        if (!loading && isGettingProducts) {
          setLoading(true);
          await fetchProducts(pageNumber);
          setLoading(false);
        }
      }
    }
  };
  useEffect(() => {
    if (listInnerRef.current) {
      listInnerRef.current.addEventListener("scroll", scrollEvent);
    }

    // Cleanup the event listener when component is unmounted or dependencies change
    return () => {
      if (listInnerRef.current) {
        listInnerRef.current.removeEventListener("scroll", scrollEvent);
      }
    };
  }, [scrollEvent]);
  return (
    <div className="search-page">
      <Navbar />
      <div className="sidebar-products-container">
        {loading ? (
          <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={loaderGif} alt="Loading..." style={{ width: '200px', height: '200px' }} />
          </div>
        ) : (
        
          <div className="product-cards">
              <div className="product_scroll_box">
          <div
            className="product-scroll-box"
            style={{
              height: "600px",
              overflowY: "scroll",
              display: "flex",
              flexWrap: "wrap",
              paddingLeft: "0px",
              paddingRight: "10px",
            }}
            onScroll={(e) => scrollEvent(e)}
            ref={listInnerRef}
          >
            {products.map((product) => (
              <ProductCard key={product.id} data={product} wishlist={false} />
            ))}
          </div>
          </div>
</div>

        )}

      </div>
    </div>
  );
};

export default SearchPage;
