import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import Search_Product_Sidebar from '../../COMPONENTS/Product/Search_Product_Sidebar'
import Footer2 from '../../COMPONENTS/Footer/Footer2'

const SearchPage1 = () => {
    const { categoryid, categoryname,subcategory} = useParams()
    const [products, setProducts] = React.useState([])
    const [productsfiltered, setProductsfiltered] = React.useState([])
    const [categories, setCategories] = React.useState([])



    const getProducts = () => {
      if (categoryid && categoryid !== 'all') {
        if(subcategory == 'all'){
          fetch(process.env.REACT_APP_BACKEND_URL + `/Product/GetAllWithImageV2?OrganizationId=3&Category=${categoryid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response => response.json())
            .then(data => {
              // console.log(data)
              setProducts(data.Result)
            })
        }
        else{
          fetch(process.env.REACT_APP_BACKEND_URL + `/Product/GetAllWithImageV2?OrganizationId=3&Category=${categoryid}&SubCategory=${subcategory}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response => response.json())
            .then(data => {
              setProducts(data.Result)
            })
        }
      }
  
      else {
        fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setProducts(data.Result)
          })
      }
    }
  

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
            console.log('cartegpriesdata ',categoriesData.Data)

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
        getProducts()
        getCategories()
    }, [ categoryid, categoryname,subcategory])


    return (
        <div>
            <Navbar />
            <div style={{
                height: '20px',
            }}></div>
            <Search_Product_Sidebar products={products?products:[]} categories={categories} categoryname={categoryname}/>

            <Footer2/>
        </div>
    )
}

export default SearchPage1