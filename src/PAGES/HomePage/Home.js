import React, { useEffect } from 'react'
import BannerSlider from '../../COMPONENTS/Banners/BannerSlider'
import HomeCategories from '../../COMPONENTS/Category/HomeCategories'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import Product_Sidebar from '../../COMPONENTS/Product/Product_Sidebar'
import img1 from '../../ASSETS/Images/1.png'
import img2 from '../../ASSETS/Images/2.png'
import img3 from '../../ASSETS/Images/3.png'
import img4 from '../../ASSETS/Images/4.png'
import ProductsSlider from '../../COMPONENTS/Product/ProductsSlider'
import AuthPopup from '../../COMPONENTS/Auth/AuthPopup'
import { useRecoilState } from 'recoil'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'
import { productPopupProvider } from '../../Providers/ProductpopupProvider'
import { productPopupIdProvider } from '../../Providers/ProductPopupIdProvider'
import ProductPopup from '../../COMPONENTS/Product/ProductPopup'
import SlidingTopText from '../../COMPONENTS/SlidingTopText/SlidingTopText'


const Home = ({ route }) => {
  // const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [pagenumber, setpagenumber] = React.useState(1)


  // const getProducts = (page) => {
  //   fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImage?OrganizationId=3&pageNo='+ page, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data)
  //       setProducts([
  //         ...products,
  //         ...data.Result
  //       ])
  //     })
  // }

  const getCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/Category/GetAllWithSubcategory?OrganizationId=3`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const categoriesData = await response.json();
      let alldata = [];
      // console.log('cartegpriesdata ',categoriesData.Data)

      for (const category of categoriesData.Data) {

        let obj = {
          category: category,
          subcategories: category.SubCategoryDetail
        };

        alldata.push(obj);
      }

      setCategories(alldata);
    } catch (error) {
      console.log('Error:', error);
    }
  };




  useEffect(() => {
    getCategories()
  }, [])

 

  const [productpopup, setproductpopup] = useRecoilState(productPopupProvider)
  const [productpopupid, setproductpopupid] = useRecoilState(productPopupIdProvider)

  return (
    <div>
      {
        productpopup && productpopupid && <ProductPopup prodid={productpopupid}
        />
      }
      <SlidingTopText text={`${process.env.REACT_APP_SLIDERTOPTEXT}`}/>
      <Navbar />
      <BannerSlider />
      <HomeCategories />
      <Product_Sidebar categories={categories} categoryname={'All Products'} />
      <Footer1 />

      {/* <div className='slidercont'>
        <ProductsSlider products={products} categoryname='Latest Products' />
      </div>
      <div className='slidercont'>
        <ProductsSlider products={products} categoryname='Explore More' />
      </div> */}
      <Footer2 />
    </div>
  )
}

export default Home