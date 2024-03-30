import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import img1 from '../../ASSETS/Products/1.png'
import img2 from '../../ASSETS/Products/2.png'
import img3 from '../../ASSETS/Products/3.png'
import img4 from '../../ASSETS/Products/4.png'
import './AllProduct.css'
import CategoryTopbar from './CategoryTopbar';
import { Grid, Paper, Typography, Button } from '@mui/material';



const AllProduct = ({categoryname, categories, data }) => {
    // const { categoryid, categoryname,subcategory } = useParams()
    const [products, setProducts] = useState([])
    const [sortby, setSortby] = useState('lowtohigh')
    const [pagenumber, setpagenumber] = useState(1)
    const { categoryid, subcategory  } = data ||{};
    //alert(`${categoryname}, ${categories }`)

    // const getProducts = (page) => {
    //     fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImage?OrganizationId=3&pageNo=' + page, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // console.log(data)
    //             let oldprod = products
    //             let updatedprod = [...oldprod, ...data.Result]
    //             setProducts(updatedprod)
    //         })
    // }
    
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
              // console.log(data)
              setProducts(data.Result)
            })
        }
      }
    


    useEffect(() => {
        setpagenumber(pagenumber + 1)
        // getProducts(pagenumber)
    }, [products])
    const checkifinwhishlist = (code) => {}

    // const sortProducts = () => {
    //     // console.log(products)
    //     if (sortby == 'lowtohigh') {
    //         products.sort((a, b) => b.SellingCost - a.SellingCost
    //         )
    //         return products

    //     }
    //     else if (sortby == 'hightolow') {
    //         products.sort((a, b) => a.SellingCost - b.SellingCost
    //         )
    //         return products

    //     }
    //     else if (sortby == 'newestfirst') {
    //         products.sort((a, b) => new Date(b.ChangedOn) - new Date(a.ChangedOn))
    //         return products

    //     }
    //     else {
    //         products.sort((a, b) => a.SellingCost - b.SellingCost
    //         )
    //         return products
    //     }



    // }

    // useEffect(() => {
    //     sortProducts(sortby)
    // }, [sortby, products])


    // const [whishlist, setwhishlist] = useState([])
    // const getwhishlist = () => {
    //     let user = localStorage.getItem('token')
    //     user = JSON.parse(user)

    //     if (user) {
    //         fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerWishList/GetByCustomer?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 // console.log(data)
    //                 setwhishlist(data.Data)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }

    // useEffect(() => {
    //     getwhishlist()
    // }, [products])

    // const checkifinwhishlist = (code) => {
    //     let flag = false
    //     whishlist && whishlist.map((item) => {
    //         if (item.ProductCode == code) {
    //             flag = true
    //         }
    //     })
    //     return flag
    // }

    // // console.log(products)
    // // console.log(categories)
    return (
        <div className='allproducts'>
            <div className='header'>
                {
                    products && products.length > 0 && categoryname ?
                        <h1>{categoryname}</h1>
                        :
                        <h1>{
                            products.length != 1 ? `${products?.length || 0} Products Found`
                                :
                                `${products?.length || 0} Product Found For`
                        }</h1>
                }
                <Grid container direction='row'>
                  <Grid item >
                    <div className='sortby d-f'>
                        <span>Sort by : </span>
                        <select

                            value={sortby}
                            onChange={(e) => setSortby(e.target.value)}

                        >
                            <option value='lowtohigh'>Low to High</option>
                            <option value='hightolow'>High to Low</option>
                            <option value='newestfirst'>Newest First</option>
                        </select>
                    </div>
                  </Grid>
                  <Grid item>
                    <CategoryTopbar categories={categories}/>
                  </Grid>
                </Grid>


            </div>
            {     products && products.length > 0 ?  
             <div className='products'>
             {
                products 
                 .map((item) => {
                     return (
                         <ProductCard data={item} key={item.Code} wishlist={
                             checkifinwhishlist(item.Code)
                         } />
                         // <p>{JSON.stringify(item)}</p>
                     )
                 })
                     
                     
             }
         </div>
             : 
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                width: '100%',
            }}
        >

            <h1 >No Products Found</h1>
        </div>
            }
           
        </div>
    )
}

export default AllProduct
