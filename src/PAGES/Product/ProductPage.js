import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import img1 from '../../ASSETS/Images/1.png'
import img2 from '../../ASSETS/Images/2.png'
import img3 from '../../ASSETS/Images/3.png'
import img4 from '../../ASSETS/Images/4.png'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import ProductsSlider from '../../COMPONENTS/Product/ProductsSlider'
import './ProductPage.css'
import { useRecoilState } from 'recoil'
import { cartQuantity } from '../../Providers/CartQuantity'
import noimage from '../../ASSETS/noimage.png'
import { productPopupProvider } from '../../Providers/ProductpopupProvider'
import { productPopupIdProvider } from '../../Providers/ProductPopupIdProvider'
import ProductPopup from '../../COMPONENTS/Product/ProductPopup'

const ProductPage = () => {
    // const noimage = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'

    const { prodid } = useParams()
    const [imageset, setimageset] = React.useState(null)
    const [productdata, setproductdata] = React.useState([])
    const [activeimg, setactiveimg] = React.useState({})
    const [count, setcount] = React.useState(1)
    const [showreview, setshowreview] = React.useState(false)
    const descriptionFromAPI = productdata?.EcommerceDetail && productdata.EcommerceDetail[0]?.Desciption;

    // Function to strip HTML tags and decode HTML entities
    const stripHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    };
  
    // Extract the text from the API description
    const formattedDescription = stripHtmlTags(descriptionFromAPI);
    const getproductdatabyid = async () => {
        // let temp = {
        //     "Code": 200,
        //     "Message": "Success",
        //     "Data": [
        //         {
        //             "ProductId": 1,
        //             "ProductName": "Product 1",
        //             "ProductDescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        //             "ProductImage": [
        //                 {
        //                     id: 1,
        //                     image: img1
        //                 },
        //                 {
        //                     id: 2,
        //                     image: img2
        //                 },
        //                 {
        //                     id: 3,
        //                     image: img3
        //                 }
        //             ],
        //             "ProductCode": "P1",
        //             "ProductCategory": "Category 1",
        //             "ProductSubCategory": "Sub Category 1",
        //             "ProductBrand": "Brand 1",
        //             "ProductColor": "Color 1",
        //             "ProductSize": "Size 1",
        //             "ProductWeight": "Weight 1",
        //             "ProductMaterial": "Material 1",
        //             "ProductQuantity": 10,
        //             "ProductUnit": "Unit 1",
        //             "ProductPrice": 100,
        //             "SalesPrice": 80,
        //             "ProductDiscount": 20,
        //             "ProductDiscountType": "Percentage",
        //             "ProductTax": 20,
        //             "ProductTaxType": "Percentage",
        //             "ProductShippingCharge": 20,
        //             "ProductShippingChargeType": "Percentage",
        //             "ProductShippingTime": "1-2 days",
        //             "ProductShippingTimeType": "Days",
        //             "ProductShippingLocation": "Location 1",
        //             "ProductShippingLocationType": "Country",
        //             "ProductShippingReturnPolicy": "Return Policy 1",
        //             "ProductShippingReturnPolicyType": "Days",
        //             "ProductShippingReturnPolicyDescription": "Return Policy Description 1",
        //             "ProductShippingReturnPolicyDescriptionType": "Days",
        //             "ProductReviews": [
        //                 {
        //                     "ReviewId": 1,
        //                     "Name": "Harshal Jain",
        //                     "Email": "",
        //                     "Rating": 5,
        //                     "Date": "2021-08-01",
        //                     "Review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        //                 },
        //                 {
        //                     "ReviewId": 2,
        //                     "Name": "Viraj",
        //                     "Email": "",
        //                     "Rating": 1,
        //                     "Date": "2021-08-01",
        //                     "Review": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        //                 },
        //                 {
        //                     "ReviewId": 3,
        //                     "Name": "Harshal Jain",
        //                     "Email": "",
        //                     "Rating": 4,
        //                     "Date": "2021-08-01",
        //                     "Review": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        //                 }
        //             ]
        //         }
        //     ]
        // }

        // if (temp.Code == 200) {
        //     setimageset(temp.Data[0].ProductImage)
        //     setproductdata(temp.Data[0])
        //     setactiveimg(temp.Data[0].ProductImage[0])
        // }
      //  url = `${process.env.REACT_APP_BACKEND_URL}/Product/GetAllWithImage?OrganizationId=3&pageNo=${number}&pageSize=${pageSize}`;
      const produrl = prodid.replace(/&/g, "%26");
        fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId=3&ProductShortURL='+produrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("data==>", data)
                console.log(data.Result);
                console.log("productid",prodid)
                console.log(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId=3&ProductShortURL=_MAMAEARTH_GLOW_OIL_CONTROL_WITH_VITAMIN_C_&_TURMERIC_COMPACT_03_9G');
                if (data.Code == 200) {
                    let myimgset = []
                    myimgset.push({ id: 1, image: data.Result[0].ProductImagePath })
                    setimageset(myimgset)
                    setproductdata(data.Result[0])
                    setactiveimg(myimgset[0])
                    setProductName( data?.Result?.[0]?.Name || "" )
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    // useEffect(() => {
    //     // Code to run when the component mounts
    //     let cart = JSON.parse(localStorage.getItem('cart'));
    //     console.log(cart);
    //     if (cart) {
    //       cart.forEach((item) => {
    //         if (item.data.ProductCode === prodid) {
    //          // setshow(true);
    //           console.log(item.quantity);
    //           setcount(item.quantity);
    //         }
    //       });
    //     }
    //   }, []);


      useEffect(() => {
        // Code to run when the component mounts
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                userCart.CartItems.forEach((item) => {
                    if (item.data.ProductCode === prodid) {
                        console.log(item.quantity);
                        setcount(item.quantity);
                    }
                });
            }
        }
    }, [prodid]);
    

    const [rating, setrating] = React.useState(0)


    const [products, setproducts] = React.useState([])
    const [productName, setProductName] = React.useState("")

    const getProducts = () => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setproducts(data.Result)
            })
    }

    useEffect(() => {
        getproductdatabyid()
        getProducts()
        window.scroll(0, 0)
    }, [])
    const [show, setshow] = useState(false)
    const [reloadnavbar, setreloadnavbar] = React.useState(false)
    // const addtocart = () => {
    //     // Get the cart from localStorage
    //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
    //     // Check if the product is already in the cart
    //     const itemInCartIndex = cart.findIndex(item => item.productdata.ProductId === productdata.ProductId);
      
    //     if (itemInCartIndex !== -1) {
    //       // If the product is already in the cart, update its quantity
    //       cart[itemInCartIndex].quantity += count;
    //     } else {
    //       // If the product is not in the cart, add it
    //       cart.push({
    //         productdata,
    //         quantity: count
    //       });
    //     }
      
    //     // Update the cart in localStorage
    //     localStorage.setItem('cart', JSON.stringify(cart));
      
    //     // Update the navbar or perform any other necessary actions
    //     setreloadnavbar(!reloadnavbar);
        
    //     // Show the success toast
    //     toast.success('Item added to cart', {
    //       position: "bottom-right",
    //       autoClose: 500,
    //     });
      
    //     // Update the cart items
    //     getcartitems();
    //   }
    // const addtocart = () => {
    //     let cart = JSON.parse(localStorage.getItem('cart'));
      
    //     if (!cart) {
    //       cart = [];
      
    //       cart.push({ data: productdata, quantity: count });
    //       localStorage.setItem('cart', JSON.stringify(cart));
    //       toast.success('Product added to cart', {
    //         position: "bottom-right",
    //         autoClose: 1000,
    //       });
    //       getcartitems();
    //     } else {
    //       let flag = 0;
      
    //       cart.forEach(item => {
    //         if (item.data.ProductCode === productdata.ProductCode) {
    //           flag = 1;
    //           item.quantity += count;
    //           setshow(true);
    //         }
    //       });
      
    //       if (flag === 0) {
    //         cart.push({ data: productdata, quantity: count });
    //       }
      
    //       localStorage.setItem('cart', JSON.stringify(cart));
    //       getcartitems();
    //     }
    //   }
      
    // const addtocart = () => {
    //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    //     // Check if the product is already in the cart
    //     const itemInCart = cart.find(item => item.data.ProductCode === productdata.ProductCode);
    
    //     if (itemInCart) {
    //         // If the product is already in the cart, update its quantity
    //         itemInCart.quantity += count;
    //     } else {
    //         // If the product is not in the cart, add it
    //         cart.push({ data: productdata, quantity: count });
    //     }
    
    //     // Update the cart in localStorage
    //     localStorage.setItem('cart', JSON.stringify(cart));
    
    //     // Show a toast indicating the product was added to the cart
    //     toast.success('Product added to cart', {
    //         position: "bottom-right",
    //         autoClose: 1000,
    //     });
    
    //     // Update the cart items
    //     getcartitems();
    // }



    const addtocart = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                // Check if the product is already in the user's cart
                const itemInCart = userCart.CartItems.find(item => item.data.ProductCode === productdata.ProductCode);
    
                if (itemInCart) {
                    // If the product is already in the cart, update its quantity
                    itemInCart.quantity += count;
                } else {
                    // If the product is not in the cart, add it
                    userCart.CartItems.push({ data: productdata, quantity: count });
                }
            } else {
                // If the user has no cart, create a new entry for the user
                cartArray.push({ UserId: userId, CartItems: [{ data: productdata, quantity: count }] });
            }
    
            // Update the 'cartArray' in localStorage
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
    
            // Show a toast indicating the product was added to the cart
            toast.success('Product added to cart', {
                position: "bottom-right",
                autoClose: 1000,
            });
    
            // Update the cart items
            getcartitems();
        } else {
            // Handle the case where the user is not logged in
            // You may want to show a message or redirect the user to the login page
            console.log('User not logged in');
        }
    };

    
    
//     const addtocart = () => {
//         let cart = JSON.parse(localStorage.getItem('cart'))
// console.log(productdata,cart);
//         if (cart) {
//             // alert('1 item is already added to cart')
//             let itemincart = cart.find(item => item.data.ProductId === productdata.ProductId)
//             if (itemincart) {
//                 cart = cart.map(item => {
//                     if (item.data.ProductId === productdata.ProductId) {
                        
//                         return {
//                             ...item,
//                             quantity:  count
                          
//                         }
//                     }
//                     else {
//                         return item
//                     }
//                 })
//                 localStorage.setItem('cart', JSON.stringify(cart))
//             }
//             else {
//                 cart = [
//                     ...cart,
//                     {
//                         productdata,
//                         quantity: count
//                     }
//                 ]
//                 localStorage.setItem('cart', JSON.stringify(cart))
//             }
//         }
//         else {
//             cart = [{
//                 productdata,
//                 quantity: count
//             }]

//             // console.log(cart)
//             localStorage.setItem('cart', JSON.stringify(cart))
//         }
//         setreloadnavbar(!reloadnavbar)
//         // window.location.reload()
//         toast.success('Item added to cart', {
//             position: "bottom-right",
//             autoClose: 500,
//         })
//         getcartitems()
//     }

    const [cartdataquantity, setcartdataquantity] = useRecoilState(cartQuantity)

    // const getcartitems = () => {
    //     let cart = JSON.parse(localStorage.getItem('cart'))
    //     if (cart !== null) {
    //         let qty = 0;
    //         cart.forEach((item) => {
    //             qty += item.quantity
    //         })
    //         setcartdataquantity(qty)
    //     }
    //     else {
    //         setcartdataquantity(0)
    //     }
    // }

    const getcartitems = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                let qty = 0;
                userCart.CartItems.forEach((item) => {
                    qty += item.quantity;
                });
                setcartdataquantity(qty);
            } else {
                // User has no items in the cart
                setcartdataquantity(0);
            }
        } else {
            // User is not logged in or has invalid data
            setcartdataquantity(0);
        }
    };
    


    const [productpopup, setproductpopup] = useRecoilState(productPopupProvider)
    const [productpopupid, setproductpopupid] = useRecoilState(productPopupIdProvider)




    return (
        <div className='productpage'>
           
            {/* <h1>Product id is - {prodid}</h1>
            <p>
                {JSON.stringify(productdata)}
            </p> */}

            {
                productpopup && prodid && <ProductPopup prodid={productpopupid}
                />
            }

            <Navbar reloadnavbar={reloadnavbar} />

            <div className='pc1'>

                <div className='c11'>
                    <div className='imgset'>
                        
                        {
                            imageset && imageset?.map((item, index) => {
                                return (
                                    <div className='imgsmall'
                                        onClick={() => {
                                            setactiveimg(item)
                                        }}
                                    >
                                        {
                                            item.image && item.image != '/Content/images/NoImage.jpg' ?
                                                <img src={item.image} alt=""
                                                    className={
                                                        activeimg.id == item.id ? 'active' : ''
                                                    }
                                                />
                                                :
                                                <img src={noimage} alt=""
                                                    className={
                                                        activeimg.id == item.id ? 'active' : ''
                                                    }
                                                />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        activeimg.image && activeimg.image != '/Content/images/NoImage.jpg' ?
                            <img src={activeimg.image} alt="" className='imgbig' />
                            :
                            <img src={noimage} alt="" className='imgbig' />
                    }

                </div>

                <div className='c12'>
                <h1 style={{ color : "var(--col1)", fontWeight : "bold" }}> { productName } </h1>
                    {/* <h1 className='head1'>{productdata?.EcommerceDetail && productdata.EcommerceDetail[0]?.Desciption}</h1> */}
                    <p className='head1'>{formattedDescription}</p>
                    <h2>S$ {productdata?.SellingCost?.toFixed(2)}</h2>
                 
                    
                    <div className='qty'>
                        <button
                            onClick={() => {
                                if (count > 1) {
                                    setcount(count - 1)
                                }
                            }}
                        >-</button>
                        <span>{count}</span>
                        <button
                            onClick={() => {
                                if (productdata?.EcommerceDetail && productdata.EcommerceDetail[0].StockAvailability) {
                                    if (count < productdata.EcommerceDetail[0].QtyOnHand) {
                                        setcount(count + 1)
                                    }
                                    else {
                                        toast.error('You have reached maximum quantity', {
                                            position: "bottom-right",
                                            autoClose: 1000,
                                        })
                                    }
                                }
                                else {
                                    
                                    setcount(count + 1)
                                }
                            }}
                        >+</button>
                    </div>

                    <div className='addtocart'
                       onClick={() => {
                        addtocart()
                        setshow(true);
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span  >Add to Cart</span>
                    
                    </div>

                </div>

            </div>
            <div className='pc2'>
                {
                    showreview ?
                        <div className='tabs'>
                            {/* <button
                                className='inactive'

                                onClick={
                                    () => {
                                        setshowreview(false)
                                    }
                                }
                            >Description</button> */}
                            {/* <button
                                className='active'
                                onClick={
                                    () => {
                                        setshowreview(true)
                                    }
                                }
                            >Reviews</button> */}
                        </div>
                        :
                        <div className='tabs'>
                            {/* <button
                                className='active'
                                onClick={
                                    () => {
                                        setshowreview(false)
                                    }
                                }
                            >
                                Description
                            </button> */}

                            {/* <button
                                className='inactive'

                                onClick={
                                    () => {
                                        setshowreview(true)
                                    }
                                }
                            >Reviews</button> */}
                        </div>
                }
                {
                    showreview ?
                        <div className='reviewcont'>
                            <form>
                                <div className='fromgroup'>
                                    <label htmlFor="">Name</label>
                                    <input type="text" />
                                </div>

                                <div className='fromgroup'>
                                    <label htmlFor="">Email</label>
                                    <input type="email" />
                                </div>

                                <div className='fromgroup'>
                                    <label htmlFor="">Review</label>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>

                                <div className='fromgroup'>
                                    <label htmlFor="">Rating</label>
                                    <div className='rating'>
                                        <div className='star'
                                            onClick={() => {
                                                setrating(1)
                                            }}
                                        >
                                            {
                                                rating >= 1 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>

                                            }
                                        </div>

                                        <div className='star' onClick={() => {
                                            setrating(2)
                                        }}>
                                            {
                                                rating >= 2 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>

                                            }
                                        </div>
                                        <div className='star' onClick={() => {
                                            setrating(3)
                                        }}>
                                            {
                                                rating >= 3 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>

                                            }
                                        </div>
                                        <div className='star' onClick={() => {
                                            setrating(4)
                                        }}>
                                            {
                                                rating >= 4 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>

                                            }
                                        </div>
                                        <div className='star' onClick={() => {
                                            setrating(5)
                                        }}>
                                            {
                                                rating >= 5 ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>

                                            }
                                        </div>
                                    </div>
                                </div>

                                <button>Submit</button>
                            </form>


                            <div className='allreview'>
                                <h1 className='head1'>Product Reviews</h1>
                                {productdata.ProductReviews &&
                                    productdata.ProductReviews.map((item, index) => {
                                        return (
                                            <div className='review'>
                                                <div className='reviewhead'>
                                                    <p className='name'>{item.Name}</p>
                                                    <div className='rating1'>
                                                        <div className='star'

                                                        >
                                                            {
                                                                item.Rating >= 1 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>

                                                            }
                                                        </div>
                                                        <div className='star'

                                                        >
                                                            {
                                                                item.Rating >= 2 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>

                                                            }
                                                        </div>
                                                        <div className='star'

                                                        >
                                                            {
                                                                item.Rating >= 3 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>

                                                            }
                                                        </div>
                                                        <div className='star'

                                                        >
                                                            {
                                                                item.Rating >= 4 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>

                                                            }
                                                        </div>


                                                        <div className='star'

                                                        >
                                                            {
                                                                item.Rating >= 5 ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 staractive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                    :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 starinactive">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>

                                                            }
                                                        </div>
                                                    </div>
                                                    <span className='date'>{item.Date}</span>
                                                </div>

                                                <div className='reviewbody'>
                                                    {item.Review}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <p className='desc'>
                            {productdata?.EcommerceDetail && productdata.EcommerceDetail[0]?.Specification}
                        </p>
                }
            </div>

            <div className='slidercont'>
                <ProductsSlider products={products} categoryname='Related Products' />
            </div>
            <div className='slidercont'>
                <ProductsSlider products={products} categoryname='Explore More' />
            </div>
            <Footer1 />
            <Footer2 />
        </div>
    )
}

export default ProductPage