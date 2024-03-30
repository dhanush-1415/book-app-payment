import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { cartQuantity } from '../../Providers/CartQuantity'
import { cartReloadState } from '../../Providers/CartReload'
import './CartItem.css'
import { Link } from 'react-router-dom'
import { cartPopupState } from '../../Providers/CartPopupProvider'
import noimage from '../../ASSETS/noimage.png'
import { Grid, Paper, Typography, Button , TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slider from 'react-slick';
import LinearProgress from '@mui/material/LinearProgress';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast, ToastContainer } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Zoom from '@mui/material/Zoom';
import logo from '../../ASSETS/loaderGif.gif'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'8px',
  p: 4,
  zIndex:9999,
  minHeight: '85vh !important',
};

  

  const style2 = {
    position: 'absolute',
    top: '8%',
    left: '7%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:'8px',
    p: 4,
    minHeight: '85vh !important',
    display:'flex',
    justifyContent:'center'
  };


  const CustomPrevArrow = (props) => (
    <div className="custom-arrow custom-prev" onClick={props.onClick}>
      <ArrowBackIosNewIcon />
    </div>
  );
  
  const CustomNextArrow = (props) => (
    <div className="custom-arrow custom-next" onClick={props.onClick}>
      <ArrowForwardIosIcon />
    </div>
  );

  
const CartItem = ({ itemdata, getcartdata }) => {
    console.log(itemdata.data)


    const [showdelete, setshowdelete] = useState(false)
    const [cartreload, setcartreload] = useRecoilState(cartReloadState)
    const [cartdataquantity, setcartdataquantity] = useRecoilState(cartQuantity)
    const [open, setOpen] = useState(false);
    const [showreview, setshowreview] = useState(false)

    const [productData , setProductdata] = useState(null);
    const [popCount, setPopCount] = useState(1);
    const [count, setCount] = useState(1)

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
      };
  
      const [imgPath , setImgPath ] = useState(noimage);

      const imageclick = (path) => {
        setImgPath(path);
      }
      
    
      const getProductById = async (code) => {
    
        fetch(process.env.REACT_APP_BACKEND_URL + '/Product/Getbycode?OrganizationId=3&ProductCode='+code, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      })
          .then(response => response.json())
          .then(data => {
              if (data.Code == 200) {
                setProductdata(data.Data[0]);          
                if (data.Data[0].EcommerceGalleryImages && data.Data[0].EcommerceGalleryImages.length) {
                  imageclick(data.Data[0].EcommerceGalleryImages[0].ImageFilePath);
                } else {
                  if(data.Data[0].ProductImagePath !== ""){
                    setImgPath(data.Data[0].ProductImagePath);
                  }
                }
    
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
      }

    const [PopProducts, setproducts] = useState([]);

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

    // const handleOpen = (code) => {
    //     getProductById(code);
    //     getProducts();
    //     setOpen(true);
    //   };


    const [isinwhishlist, setisinwhishlist] = useState(false);

    const handleOpen = (code) => {
        // Fetch product details using the product code
        getProductById(code);
    
        // Fetch the current cart data from local storage
        const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
        

      let user = localStorage.getItem('token');
      user = JSON.parse(user);

      if (user) {
        fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerWishList/GetByCustomer?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}`)
          .then(res => res.json())
          .then(data => {
            if (data.Code === 200) {
              const isProductInWishlist = data.Data.some(item => item.ProductCode === code);
              setisinwhishlist(isProductInWishlist);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }


        const productInCart = cartArray.some((userCart) => {
            return userCart.CartItems.some((item) => item.data.ProductCode === code);
        });
    
        if (productInCart) {
            const userData = JSON.parse(localStorage.getItem('token'));
            const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
            if (userId) {
                const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
                if (userCart) {
                    const itemInCart = userCart.CartItems.find((item) => item.data.ProductCode === code);
    
                    if (itemInCart) {
                        setPopCount(itemInCart.quantity);
                        setShowfunc(true);
                    }
                }
            }
        } else {
            // If the product is not in the cart, set showfunc to false
            setShowfunc(false);
        }
    
        getProducts();
        setOpen(true);
    };
    

      const handleClose = () => setOpen(false);

    // }

    const [showfunc , setShowfunc ] = useState(false);

    const addtocartPop = () => {
        setShowfunc(true)
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                const itemInCart = userCart.CartItems.find(item => item.data.ProductCode === productData.ProductCode);
    
                if (itemInCart) {
                    itemInCart.quantity += count;
                } else {
                    userCart.CartItems.push({ data: productData, quantity: count });
                }
            } else {
                // User has no cart, create a new entry for the user
                cartArray.push({ UserId: userId, CartItems: [{ data: productData, quantity: count }] });
            }
    
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
    
            toast.success('Product added to cart', {
                position: "bottom-right",
                autoClose: 1000,
            });
    
            getcartitems(); // Assuming you have a function to update cart quantity in UI
        } else {
            // Handle the case where the user is not logged in
            // You may want to show a message or redirect the user to the login page
            console.log('User not logged in');
        }
    };

    
    const rmcartPop = () => {

      setShowfunc(true)
    
      const userData = JSON.parse(localStorage.getItem('token'));
      const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
      let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
      if (userId) {
          const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
          if (userCart) {
              const itemInCart = userCart.CartItems.find(item => item.data.ProductCode === productData.ProductCode);
    
              if (itemInCart) {
                  itemInCart.quantity += count;
              } else {
                  userCart.CartItems.push({ data: productData, quantity: popCount });
              }
          } else {
              // User has no cart, create a new entry for the user
              cartArray.push({ UserId: userId, CartItems: [{ data: productData, quantity: popCount }] });
          }
    
          localStorage.setItem('cartArray', JSON.stringify(cartArray));
    
          toast.success('Product decreased from cart', {
              position: "bottom-right",
              autoClose: 1000,
          });
    
          getcartitems(); // Assuming you have a function to update cart quantity in UI
      } else {
          // Handle the case where the user is not logged in
          // You may want to show a message or redirect the user to the login page
          console.log('User not logged in');
      }
    };

    const removeFromCart = () => {
      setPopCount(1)
        setShowfunc(false)
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCartIndex = cartArray.findIndex((userCart) => userCart.UserId === userId);
    
            if (userCartIndex !== -1) {
                const userCart = cartArray[userCartIndex];
                const itemIndex = userCart.CartItems.findIndex(item => item.data.ProductCode === productData.ProductCode);
    
                if (itemIndex !== -1) {
                    // Remove the item from the cart
                    userCart.CartItems.splice(itemIndex, 1);
    
                    // If the cart is empty after removing the item, remove the entire cart entry
                    if (userCart.CartItems.length === 0) {
                        cartArray.splice(userCartIndex, 1);
                    }
    
                    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    
                    toast.success('Product removed from cart', {
                        position: "bottom-right",
                        autoClose: 1000,
                    });
    
                    getcartitems(); // Assuming you have a function to update cart quantity in UI
                } else {
                    console.warn('Product not found in the cart');
                }
            } else {
                console.warn('User has no cart entry');
            }
        } else {
            // Handle the case where the user is not logged in
            // You may want to show a message or redirect the user to the login page
            console.log('User not logged in');
        }
    };
    



    const getcartitems = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
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
    


    

    const deleteitem = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                userCart.CartItems = userCart.CartItems.filter((item) => item.data.ProductCode !== itemdata.data.ProductCode);
            }
    
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
             getcartdata();
             getcartitems();        }
    };
    


    const increaseqty = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                userCart.CartItems.forEach((item) => {
                    if (item.data.ProductCode === itemdata.data.ProductCode) {
                        item.quantity = item.quantity + 1;
                    }
                });
            }
    
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            getcartdata()
            getcartitems()

            toast.success('Product count increassed', {
                position: "bottom-right",
                autoClose: 1000,
            });
        }
    };
    


    const decreaseqty = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
        const updatedCart = [];
    
        if (userId) {
            const userCart = cartArray.find((userCart) => userCart.UserId === userId);
    
            if (userCart) {
                userCart.CartItems.forEach((item) => {
                    if (item.data.ProductCode === itemdata.data.ProductCode) {
                        if (item.quantity > 1) {
                            item.quantity = item.quantity - 1;
                            toast.success('Product count decreased', {
                                position: "bottom-right",
                                autoClose: 1000,
                            });
                        } else {
                            // If quantity is 1, remove the item from the cart
                            deleteitem(); // Assuming you have a function to delete the item
                            return; // Exit the loop early since the item is removed
                        }
                    }
    
                    // Keep items that are not the one being decreased or have a quantity greater than 1
                    if (item.quantity > 0) {
                        updatedCart.push(item);
                    }
                });
            }
    
            // Update the cart in local storage
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            getcartdata();
            getcartitems();
        }
    };


    const getwhishlist = () => {
        let user = localStorage.getItem('token')
        user = JSON.parse(user)
        if (user) {
          fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerWishList/GetByCustomer?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}`)
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              if (data.Code == 200) {
                data.Data.forEach((item) => {
                  if (item.ProductCode === productData.productCode) {
                    setisinwhishlist(true)
                  }
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    
    const addtowhishlist = () => {
        let user = localStorage.getItem('token');
        user = JSON.parse(user);
      
        if (user) {
          fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerWishList/Create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "OrgId": "3",
              "CustomerId": user[0].B2CCustomerId,
              "ProductCode": productData.ProductCode,
              "ProductName": productData.ProductName,
              "IsActive": true,
              "CreatedBy": user[0].B2CCustomerId,
              "CreatedOn": `${new Date()}`,
            }),
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              if (data.Code === 200) {
                setisinwhishlist(true);
                getwhishlist();
                toast.success('Product added to favourites', {
                  position: "bottom-right",
                  autoClose: 1000,
                });
              }
            })
            .catch(err => {
              console.log(err);
              toast.error('Product could not be able to added to cart', {
                position: "bottom-right",
                autoClose: 1000,
            });
            });
        }
        else {
            toast.error('Please login to continue', {
                position: "bottom-right",
                autoClose: 1000,
            });
        }
      }



      const removewhishlist = () => {
        let user = localStorage.getItem('token')
        user = JSON.parse(user)
        if (user) {
          fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerWishList/Remove?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}&ProductCode=${productData.productCode}&UserName=admin`)
    
            .then(res => res.json())
            .then(data => {
              // console.log(data)
              if (data.Code == 200) {
                setisinwhishlist(false);
                getwhishlist();
                toast.success('Product removed from favourites', {
                  position: "bottom-right",
                  autoClose: 1000,
                });
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
       // localStorage.removeItem('wishlist_' + productcode);
      }
    

    const [cartPopupShow, setCartPopupShow] = useRecoilState(cartPopupState);
    return (

        <>
             <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{zIndex:'9999'}}
        >

                {productData ? (
                <>
              <Box sx={style} className='pop-responsive'>
              <ToastContainer />
              <CloseIcon sx={{ position:'relative' , float:'right' , cursor:'pointer'}} onClick={handleClose} />
            {productData && (
                <>
                <Grid container width='98%' >
                    <Grid item sm={12} md={8} >
                      <Grid container direction='row' justifyContent='center'>
                        <Grid className='deskscroller' item md={2.5} sx={{display:'flex' , justifyContent:'center' , alignItems:'flex-start'}}>
                          {productData.EcommerceGalleryImages && productData.EcommerceGalleryImages.length ? (
                            <>
                       <Grid container direction='column'>
                       <div className='imgslider'>
                          {productData.EcommerceGalleryImages.map((image, index) => (
                            <Grid
                            key={index}
                            item
                            p={2}
                            m={1}
                            sx={{ border: '1px solid #02b290' , display:'flex' , justifyContent:'center' }}
                            onClick={() => imageclick(image.ImageFilePath)}
                          >
                                <img src={image.ImageFilePath || noimage} alt='' width='90px' height='100px' />
                            </Grid>
                          ))}
                          </div>
                          </Grid>
                          </>
                          ):(
                            <Grid className="imgslider" container direction='column' justifyContent='center'  alignItems='center'>
                          <Grid item p={2} m={1} sx={{border:'1px solid #02b290'}}>
                            <img src={productData.ProductImagePath || noimage} alt='' width='90px' height='100px' />
                          </Grid>
                          </Grid>
                          )}
                        </Grid>
                        <Grid item md={9} m={1}>
                          <Grid className='topimg' container justifyContent="center" alignItems="center" sx={{ border: '1px solid #02b290' , padding:'40px 0' }}>
                            <img className='prodimg' src={imgPath} alt=""  />
                          </Grid>
                        </Grid>
                        <Grid item className='mobscroller' sm={12} xs={12} md={12}  sx={{display:'flex' , justifyContent:'center' , alignItems:'flex-start'}}>
                          {productData.EcommerceGalleryImages && productData.EcommerceGalleryImages.length ? (
                            <>
                       <Grid container direction='column'>
                       <div className='imgslider2'>
                          {productData.EcommerceGalleryImages.map((image, index) => (
                            <Grid
                            key={index}
                            item
                            p={2}
                            m={1}
                            sx={{ border: '1px solid #02b290' , display:'flex' , justifyContent:'center' }}
                            onClick={() => imageclick(image.ImageFilePath)}
                          >
                                <img src={image.ImageFilePath || noimage} alt='' width='90px' height='100px' />
                            </Grid>
                          ))}
                          </div>
                          </Grid>
                          </>
                          ):(
                            <Grid className="imgslider2" container direction='column' justifyContent='center'  alignItems='center'>
                          <Grid item p={2} m={1} sx={{border:'1px solid #02b290'}}>
                            <img src={productData.ProductImagePath || noimage} alt='' width='90px' height='100px' />
                          </Grid>
                          </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={4}>
                        <Typography sx={{fontWeight:'bolder' , fontSize:'18px' , wordBreak:'break-all'}}>{productData.ProductName}</Typography>
                        {/* <Typography>1 each</Typography> */}
                        <Typography sx={{fontWeight:'bolder', fontSize:'20px'}} >S$ {productData.SellingCost}</Typography>
                        <Typography sx={{color:'#F98F60' , padding:'10px 0'}}>only few items left</Typography>
                        {showfunc ? ( 
                        <Grid className="calc-box" container sx={{borderRadius:'5px'}}>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'30px' , cursor:'pointer'}} 
                                   onClick={() => {
                                      if (popCount > 1) {
                                        setPopCount(popCount - 1)
                                        rmcartPop()
                                      }
                                  }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'22px'}}>{popCount}</Typography>
                            </Grid>
                            <Grid item> 
                              <AddIcon   sx={{fontSize:'30px' , cursor:'pointer'}} 
                                  onClick={() => {
                                   if (productData?.EcommerceDetail && productData.EcommerceDetail[0].StockAvailability) {
                                       if (popCount < productData.EcommerceDetail[0].QtyOnHand) {
                                        setPopCount(popCount + 1)
                                        addtocartPop();
                                       }
                                       else {
                                           toast.error('You have reached maximum quantity', {
                                               position: "bottom-right",
                                               autoClose: 1000,
                                           })
                                       }
                                   }
                                   else {
                                    setPopCount(popCount + 1)
                                    addtocartPop();
                                   }
                               }}
                              />
                            </Grid>
                        </Grid>
                        ):(
                            <>
                            </>
                        )}
                        {showfunc ? (
                          <Grid className="cart-box" container 
                          onClick={() => {
                            removeFromCart()
                          }}>
                            <Grid item>
                                <ShoppingBagOutlinedIcon />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontWeight:'bold' , marginTop:'5px'}}>Remove from Cart</Typography>
                            </Grid>
                            </Grid>
                        ):(
                              <Grid className="cart-box" container 
                              onClick={() => {
                                  addtocartPop()
                              }}>
                                <Grid item>
                                    <ShoppingBagOutlinedIcon />
                                </Grid>
                                <Grid item>
                                    <Typography  sx={{fontWeight:'bold', marginTop:'5px'}}>Add to Cart</Typography>
                                </Grid>
                            </Grid>
                        )}
                        <Grid container direction='row' justifyContent='space-between'>
                        {
                             isinwhishlist ? (
                              <Grid className="pop-box" item md={5.5}>
                              < FavoriteIcon sx={{float:'right'}} onClick={removewhishlist} />
                              <Typography> Favourite</Typography>
                              </Grid> 
                             ):(
                              <Grid className="pop-box" item md={5.5}>
                              <FavoriteBorderIcon sx={{float:'right'}} onClick={addtowhishlist} />
                              <Typography> Favourite</Typography>
                            </Grid> 
                             )
                          }
                            {/* <Grid className="pop-box" item md={5.5}>
                                < ReplyOutlinedIcon />
                                <Typography>Share</Typography>
                            </Grid> */}
                        </Grid>
                        <Grid pt={2}>
                            <Typography sx={{fontWeight:'600'}}>Product Details:</Typography>
                        </Grid>
                        <Grid>
                            <Typography>{productData && productData.EcommerceDetail[0].Desciption || '-'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </>
            )}
             {showreview ? (
              <>
                  <Grid container pt={2} pb={2} justifyContent='space-between'>
                    <Grid item md={5.5}>
                      <Typography sx={{padding:'20px 0px' , fontSize:'20px'}}>Submit Your review</Typography>
                        <Grid container> 
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Name"
                            sx={{marginBottom:'20px'}}
                          />
                          <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Email"
                            sx={{marginBottom:'20px'}}
                          />
                        <TextField
                            required
                            fullWidth
                            id="outlined-required"
                            label="Review"
                            sx={{marginBottom:'20px'}}
                          />
                          <Rating name="no-value" value={null} sx={{fontSize:'50px'}} />
                        </Grid>
                        <Button sx={{margin:'10px 0',padding:'8px 30px' , backgroundColor:'#02b290' , color:'white' , fontWeight:'bold' , fontSize:'15px'}}>Submit</Button>
                    </Grid>
                    <Grid item md={5.5}>
                        <Typography sx={{padding:'20px 0px' , fontSize:'20px'}}>Product reviews</Typography>

                    </Grid>
                  </Grid>
              </>
             ):(
              <></>
             )}

                <Grid sx={{margin:'30px 0 '}}>
                    <Typography sx={{fontWeight:'bold' ,fontSize:'25px'}}>Related products</Typography>
                </Grid>
                <Grid className="slider-container">
 
                          {PopProducts.length > 0 ? (
                           <>
                                <Slider {...settings}>
                                  {PopProducts && PopProducts.length && PopProducts.map((item , index) => (
                                    <div style={{ display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                                      <Grid item xs={6} sm={4} md={3} lg={3} xl={2.4}  key={index} className="image-hover-effect" sx={{margin:'10px' , minWidth:'200px' }}>
                                        <Card sx={{cursor:'pointer'}} >
                                        <CardContent>
                                            <Grid container direction='column'>
                                                <Grid item sx={{ display: 'flex', justifyContent: 'unset'}} >
                                                    <div>
                                                        <img
                                                        src={item.ProductImagePath || noimage}
                                                        alt='c1'
                                                        width='150px'
                                                        height='160px'
                                                        style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' , paddingLeft:'10px' }}
                                                        className="image-hover-effect"
                                                    />
                                                    </div>
                                                </Grid>
                                                <Grid item  sx={{zIndex:'9999' , paddingTop:'10px' }} >
                                                    <Grid container sx={{ display:'flex' , flexDirection:'column' , justifyContent:'space-between' ,  minHeight:'150px'}} >
                                                        <Grid item>
                                                            <Typography sx={{fontWeight:'bold' , lineHeight:'1.5rem' ,fontSize:'1rem'}}>S$ {item.PcsPrice} - S$ {item.SellingCost}</Typography>
                                                            <Typography sx={{padding:' 10px 0px' , color:'#595959' , fontSize:'14px' , wordBreak:'break-all'}}>{item.ProductName}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography>1 each</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        </Card>
                                      </Grid>
                                    </div>
                                  ))}
                                </Slider>
                            </>
                          ) 

                    : (
                      <></>
                    )}
                </Grid> 
                </Box>
                </>
                ):(
                  <>
                <Zoom in={open}>
                  <Box sx={style2} className='pop-responsive'>
                    <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                      <img style={{maxHeight:'300px'}} src={logo} alt="Loading..." />
                    </div>
                  </Box>
                </Zoom>                  </>
                )}
        </Modal>

        <div className='cartitem' style={{borderBottom:'0.2px solid rgb(128, 128, 128)'}}>
            <div className='s1'
               onClick={(e) => {handleOpen(itemdata.data.ProductCode)}}
                style={{borderRadius:'6px', cursor:'pointer'}}
            >
                <img src={itemdata.data.ProductImageFileName != 'NoImage.jpg' && itemdata.data.ProductImageFileName !== "" ? itemdata.data.ProductImagePath: noimage} alt='no img' />

            </div>
            <Grid container direction='column' sx={{padding:'0px 10px'}}>
                <Grid item>
                    <Grid container direction='row' justifyContent='space-between'>
                        <Grid item md={9}>
                            <Typography className='ProdName' sx={{cursor:'pointer'}} onClick={(e) => {handleOpen(itemdata.data.ProductCode)}}>{itemdata.data.ProductName}</Typography>
                        </Grid>
                        <Grid item md={3} sx={{display:'flex' , justifyContent:'center'}}>
                            <Typography sx={{fontSize:'14px' , fontWeight:'bold'}}>S$ {(itemdata?.data?.SellingCost * itemdata.quantity).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction='row' justifyContent='space-between'>
                        <Grid item>
                            <Grid container justifyContent='space-between' sx={{padding:'10px 0'}}>
                                <RemoveIcon sx={{border:'1px solid grey' , borderRadius:'50%' , color:'#767676' , fontSize:'22px'}} onClick={decreaseqty} />
                                <Typography sx={{padding:'0px 10px' , fontWeight:'bold'}}  onClick={(e) => {handleOpen(itemdata.data.ProductCode)}}>{itemdata.quantity}</Typography>
                                <AddIcon sx={{border:'1px solid grey' , borderRadius:'50%' , color:'#767676',fontSize:'22px'}}  onClick={increaseqty} />
                            </Grid>
                        </Grid>
                        <Grid item sx={{display:'flex', alignItems:'center'}}>
                            <DeleteIcon onClick={deleteitem} sx={{color:'red'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />

        </div>
    </>
    )
}

export default CartItem