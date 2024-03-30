import React, { useEffect, useState , useMemo  } from 'react'
import './Navbar.css'
import logo from '../../ASSETS/logo.png';
import gif from '../../ASSETS/loaderGif.gif'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link , useNavigate } from 'react-router-dom'
import DropdownComponent from './DropdownComponent'
import AuthPopup from '../Auth/AuthPopup'
import { authPopupState } from '../../Providers/AuthPopupProvider'
import { useRecoilState } from 'recoil'
import { loginState } from '../../Providers/LoginProvider'
import Cart from '../Cart/Cart'
import { cartPopupState } from '../../Providers/CartPopupProvider'
import { cartReloadState } from '../../Providers/CartReload'
import { cartQuantity } from '../../Providers/CartQuantity'
import { toast, ToastContainer } from 'react-toastify'
import { productPopupProvider } from '../../Providers/ProductpopupProvider'
import ProductPopup from '../Product/ProductPopup'
import { searchValueProvider } from '../../Providers/SearchValueProvider'
import { wishPopupState } from '../../Providers/WishPopupProvider'
import Wishlist from '../Wishlist/Wishlist'
import { wishQuantity } from '../../Providers/WishListQuantityProvider';
import { Grid, TextField, InputAdornment ,Button , Typography , Avatar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { display } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import noimage from '../../ASSETS/noimage.png'
import Slider from 'react-slick';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Rating from '@mui/material/Rating';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Zoom from '@mui/material/Zoom';


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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:'8px',
    p: 4,
    zIndex:9999,
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
  



const Navbar = ({ onSearch, onSearchClick }) => {
    const [cartdataquantity, setcartdataquantity] = useRecoilState(cartQuantity)
    const [wishlistdataquantity, setwishlistdataquantity] = useRecoilState(wishQuantity)
    const [categories, setCategories] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);


    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      onSearch(e.target.value); 
      
      if (e.target.value !== '') {
        localStorage.setItem('showBanner', 'true');
      } if(e.target.value === '') {
        localStorage.setItem('showBanner', 'false');
      }
    
    };
  
    const handleSearchClick = () => {
      onSearchClick();
    };


    // const [searchText, setSearchText] = useState('');


    useEffect(()=>{
      localStorage.setItem('showBanner', 'false');
    }, [])

    // const handlesearch = () => {
    //   if (searchText !== "") {
    //     localStorage.setItem('showBanner', 'true');
    //   } else {
    //     localStorage.setItem('showBanner', 'false');
    //   }

    //   localStorage.setItem('searchquery' , searchText);
    // };
    


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

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/search/${searchValue}`); 
      };

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

    const dropdownitems = [
        {
            id: 1,
            title: 'Home',
            link: '/'
        },
        {
            id: 2,
            title: 'Categories',
            items:
                categories

        },
        {
            id: 3,
            title: 'About Us',
            link: '/about'
        },
        {
            id: 4,
            title: 'Contact Us',
            link: '/contact'
        },
        {
            id: 5,
            title: 'Offers',
        }
    ]

    const [authPopupShow, setAuthPopupShow] = useRecoilState(authPopupState);
    const [cartPopupShow, setCartPopupShow] = useRecoilState(cartPopupState);
    const [wishlistpopupshow, setwishlistpopupshow] = useRecoilState(wishPopupState);
    const [showreview, setshowreview] = React.useState(false)

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setuser] = useState(null)
    const [carttotal, setcarttotal] = useState(0)

    const checklogin = async () => {
        try {
            let user = localStorage.getItem('token')
            user = JSON.parse(user)

            if (user) {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/B2CCustomerRegister/Getbycode?OrganizationId=${process.env.REACT_APP_BACKEND_ORGANIZATION}&B2CCustomerId=${user[0].B2CCustomerId}`, {   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setuser(data?.Data[0]);
                getaddress(data?.Data[0]);
                localStorage.setItem('token', JSON.stringify(data.Data));
            } else {
                setLoggedIn(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const [defaultaddress, setdefaultaddress] = useState(null)

    const getaddress = (userdata) => {
        // console.log(userdata)
        let mainaddress = {
            AddressLine1: userdata?.AddressLine1,
            AddressLine2: userdata?.AddressLine2,
            AddressLine3: userdata?.AddressLine3,
            EmailId: userdata.EmailId,
            default: true
        }
        let otheraddress = [];
        fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerDeliveryAddress/GetAll?OrganizationId=3&CustomerId=' + userdata.B2CCustomerId)
            .then(res => res.json())
            .then(data => {
                
                if (data.Data != null) {
                    otheraddress = data.Data
                    if (mainaddress.AddressLine1 == '' && mainaddress.AddressLine2 == '' && mainaddress.AddressLine3 == '') {
                        let alladdress = [
                            ...otheraddress
                        ]
                
                        // find IsDefault true
                        let tempdefaultaddress = alladdress.find((address) => {
                            return address.IsDefault == true
                        }    )
                        console.log(tempdefaultaddress)
                        if(tempdefaultaddress){
                            setdefaultaddress(tempdefaultaddress)
                        }
                    }

                    else {
                        let alladdress = [
                            ...otheraddress,
                            mainaddress
                        ]
                        let tempdefaultaddress = alladdress.find((address) => {
                            return address.IsDefault == true
                        }    )
                        // console.log(defaultaddress)
                        if(tempdefaultaddress){
                            setdefaultaddress(tempdefaultaddress)
                        }
                    }

                }
                else {
                    let alladdress = [
                        mainaddress
                    ]
                    if (mainaddress.AddressLine1 == '' && mainaddress.AddressLine2 == '' && mainaddress.AddressLine3 == '') {
                        let tempdefaultaddress = alladdress.find((address) => {
                            return address.IsDefault == true
                        }    )
                        // console.log(defaultaddress)
                        if(tempdefaultaddress){
                            setdefaultaddress(tempdefaultaddress)
                        }
                    }
                    else {
                        let tempdefaultaddress = alladdress.find((address) => {
                            return address.IsDefault == true
                        }    )
                        // console.log(defaultaddress)
                        if(tempdefaultaddress){
                            setdefaultaddress(tempdefaultaddress)
                        }

                    }

                }
            })

    }

    const [products , setproducts]  = useState([]);
    const [PopProducts, setPopproducts] = useState([]);

    const getProducts = () => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION+'&pageSize=5000', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setproducts(data.Result);
                setPopproducts(data.Result);
            })
    }

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
    // const getcarttotal = () => {
    //     let cart = JSON.parse(localStorage.getItem('cart'))
    //     if (cart !== null) {
    //         let total = 0;
    //         cart.forEach((item) => {
    //             console.log(item.data.SellingCost)
    //             total += item.data.SellingCost * item.quantity
    //         })
    //         setcarttotal(total)
    //     }
    //     else {
    //         setcarttotal(0)
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
      
      const getcarttotal = () => {
        const userData = JSON.parse(localStorage.getItem('token'));
        const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
      
        const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
      
        if (userId) {
          const userCart = cartArray.find((userCart) => userCart.UserId === userId);
      
          if (userCart) {
            let total = 0;
            userCart.CartItems.forEach((item) => {
              total += item.data.SellingCost * item.quantity;
            });
            setcarttotal(total);
          } else {
            // User has no items in the cart
            setcarttotal(0);
          }
        } else {
          // User is not logged in or has invalid data
          setcarttotal(0);
        }
      };

      

    const getwishlist = async () => {
        let user = localStorage.getItem('token');
        user = JSON.parse(user);

        if (user) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/B2CCustomerWishList/GetByCustomer?OrganizationId=3&CustomerId=${user[0].B2CCustomerId}`);
                const data = await response.json();
                // console.log(data);
                if (data.Data && data.Data.length > 0) {
                    const products = await Promise.all(data.Data.map(async (item) => {
                        const productResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/Product/Getbycode?OrganizationId=3&ProductCode=${item.ProductCode}`);
                        const productData = await productResponse.json();
                        return productData.Data;
                    }));
                    setwishlistdataquantity(products.length)
                }
                else {
                    setwishlistdataquantity(0)
                }
            } catch (error) {
                // console.error(error);
            }
        }
    };

    useEffect(() => {
        checklogin()
        getcartitems()
        getcarttotal()
        getwishlist()
        getProducts()

        const LoginStatus = window.localStorage.getItem("token");
        if( LoginStatus && LoginStatus.length > 0){
            setLoggedIn(true);
        }else{
            setLoggedIn(false)
        }
    }, [cartdataquantity, wishlistdataquantity, loggedIn , products])



    const [productpopup, setproductpopup] = useRecoilState(productPopupProvider)
    const [searchvalue, setsearchvalue] = useRecoilState(searchValueProvider)

    const [freeDelivery, setfreeDelivery] = useState(80)


    const [value, setValue] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  

    const suggestionsList = useMemo(() => {
        let list = [];
        if (products && products.length > 0) {
          list = products.map((item) => item.Name);
        }
        return list;
      }, [products]);
    
      const getSuggestions = async (inputValue) => {
        try {
          const response = await fetch(`process.env.REACT_APP_BACKEND_URL + '/Product/GetAllWithImageV2?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION+'&pageSize=2000'`);
          const data = await response.json();
    
          if (data.Code === 200 && data.Status && data.Result) {
            return data.Result.map((item) => item.Name);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
    
        return [];
      };
    
      const handleChange = async (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        
        if (inputValue.trim() === '') {
          setShowSuggestions(false);
        } else {
          const fetchedSuggestions = await getSuggestions(inputValue);
          setSuggestions(fetchedSuggestions);
          setShowSuggestions(true);
        }
      };
    
      const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
      };
    // const getSuggestions = (inputValue) => {

    //     let suggestionsList = [];
    
    //     if(products && products.length > 0){
    //         products.map((item , index) => {
    //             suggestionsList.push(item.Name)
    //         })
    //     }
  
    //   const filteredSuggestions = suggestionsList.filter((suggestion) =>
    //     suggestion.toLowerCase().includes(inputValue.toLowerCase())
    //   );
  
    //   return filteredSuggestions; 
    // };
  
    // const handleChange = (e) => {
    //   const inputValue = e.target.value;
    //   setValue(inputValue);
    //   if (inputValue.trim() === "") {
    //     setShowSuggestions(false);
    //   } else {
    //     setSuggestions(getSuggestions(inputValue));
    //     setShowSuggestions(true);
    //   }
    // };
  
    // const handleSuggestionClick = (suggestion) => {
    //   setValue(suggestion);
    //   setSuggestions([]);
    //   setShowSuggestions(false);
    // };
  

    const handleWishlist =() => {
        
        let user = localStorage.getItem('token')
        user = JSON.parse(user)

        if (user) {
            setwishlistpopupshow(true)
            setAuthPopupShow(false)
            setCartPopupShow(false)
        }else{
            setwishlistpopupshow(false)
            setAuthPopupShow(true)
            setCartPopupShow(false)
        }

    }
    const handleCartlist =() => {
        
        let user = localStorage.getItem('token')
        user = JSON.parse(user)

        if (user) {
            setwishlistpopupshow(false)
            setAuthPopupShow(false)
            setCartPopupShow(true)
        }else{
            setwishlistpopupshow(false)
            setAuthPopupShow(true)
            setCartPopupShow(false)
        }
        
    }

    const [productData , setProductdata] = useState(null);
    const [popCount, setPopCount] = useState(1);
  
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


    // const addtocartPop = () => {
    //     let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    //     const itemInCart = cart.find(item => item.data.ProductCode === productData.ProductCode);
    
    //     if (itemInCart) {
    //         itemInCart.quantity += count;
    //     } else {
    //         cart.push({ data: productData, quantity: count });
    //     }
    
    //     localStorage.setItem('cart', JSON.stringify(cart));
    
    //     toast.success('Product added to cart', {
    //         position: "bottom-right",
    //         autoClose: 1000,
    //     });
    
    //     getcartitems();
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
              itemInCart.quantity += popCount;
            } else {
              userCart.CartItems.push({ data: productData, quantity: popCount });
            }
          } else {
            // User has no cart, create a new entry for the user
            cartArray.push({ UserId: userId, CartItems: [{ data: productData, quantity: popCount }] });
          }
      
          localStorage.setItem('cartArray', JSON.stringify(cartArray));
      
          toast.success('Product added to cart', {
            position: "bottom-right",
            autoClose: 1000,
          });
      
          getcartitems();
        } else {
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
                    itemInCart.quantity += popCount;
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
    



      const handleProductChange = (productCode) => {
        console.log('Selected Product Code:', productCode);
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
          setAuthPopupShow(true)
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
                <Grid container width='98%' >
                    <Grid item sm={12} md={8} >
                      <Grid container direction='row'>
                        <Grid  className='deskscroller'  item md={2.5} sx={{display:'flex' , justifyContent:'center' , alignItems:'flex-start'}}>
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
                          <Grid container justifyContent="center" alignItems="center" sx={{ border: '1px solid #02b290' , padding:'40px 0' }}>
                            <img src={imgPath} alt="" />
                          </Grid>
                        </Grid>
                        <Grid className='mobscroller' item sm={12} xs={12} md={12}  sx={{display:'flex' , justifyContent:'center' , alignItems:'flex-start'}}>
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
                        <Typography sx={{fontWeight:'bolder' , fontSize:'20px' , wordBreak:'break-all'}}>{productData.ProductName}</Typography>
                        {/* <Typography>1 each</Typography> */}
                        <Typography sx={{fontWeight:'bolder', fontSize:'20px'}} >S${productData.SellingCost}</Typography>
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
                                        addtocartPop()
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
                                <Typography  sx={{fontWeight:'bold', marginTop:'5px'}}>Remove from Cart</Typography>
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
                          <Typography>
                            <div dangerouslySetInnerHTML={{ __html: productData && productData.EcommerceDetail[0].Desciption || '-' }} />
                          </Typography>
                        </Grid>
                    </Grid>
                </Grid>
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
                                                            <Typography sx={{fontWeight:'bold' , lineHeight:'1.5rem' ,fontSize:'1rem'}}>S${item.PcsPrice} - S${item.SellingCost}</Typography>
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
                </Zoom>
                  </>
                )}
        </Modal>


        <nav>
            <ToastContainer />
            {
                authPopupShow && <AuthPopup />
            }
            {
                cartPopupShow && <Cart />
            }
            {
                wishlistpopupshow && <Wishlist />
            }
            <div className='s1'>
                <img src={logo} alt='logo' className='logo' 
                onClick={()=>{
                    window.location.href='/'
                }}
                />


    <div className="autocomplete-search-bar searchbar">
                  <TextField id="outlined-basic" label="Search" variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon onClick={handleSearchClick}/>
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleInputChange}
                    value={inputValue}
                    fullWidth
                    sx={{width:'100%' , background:'white'}}
                  />
    </div>

    

                <div className='right'>

                  {/* <div className='searchbox'>
                  <TextField id="outlined-basic" label="Search" variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    sx={{width:'100%'}}
                  />

                  </div> */}

                    <div className='freedeliveryout'>
                        {
                            carttotal >= freeDelivery &&
                            <p>
                                Proceed to checkout for free delivery
                            </p>
                        }
                        {
                            carttotal > 0 && carttotal < freeDelivery &&
                            <p>
                                Add <span className='price'>$ {(freeDelivery - carttotal).toFixed(2)}</span> more for free delivery
                            </p>
                        }
                        {
                            carttotal == 0 && carttotal < freeDelivery &&
                            <p>
                                Add <span className='price'>$ {(freeDelivery - carttotal).toFixed(2)}</span> for free delivery
                            </p>
                        }
                        <div className='freedeliveryprogress'>
                            <div className='freedelivery'
                                style={{ width: `${(carttotal / freeDelivery) * 100}%` }}
                            >

                            </div>
                        </div>
                    </div>

                    <div className='cartout'
                        onClick={() => {
                            handleWishlist()
                        }}
                    >


                        <div className='cart'>
                            <span className='qty'>{wishlistdataquantity}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cicon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <p className='resp'>Favourites</p>
                    </div>
                
                    <div className='cartout'
                        onClick={() => {
                            handleCartlist()
                        }}
                    >
                        <div className='cart'>
                            <span className='qty'>{cartdataquantity}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cicon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <p className='resp'>Cart</p>
                    </div>


                    {
                        loggedIn ?
                            <Link to='/user/accountsettings' className={'stylenone'}>
                                <div className='userout'
                                // onClick={() => setAuthPopupShow(true)}
                                >

                                    <div className='user'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                    <p>Account</p>
                                </div>
                            </Link>
                            :
                            <div className='userout'
                                onClick={() => {
                                    setAuthPopupShow(true)
                                    setCartPopupShow(false)
                                    setwishlistpopupshow(false)
                                }}

                            >
                                <div className='user'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                
                                <p>Sign In</p>
                            </div>
                    }
                </div>
            </div>


            {
                // user &&
                <div className='s2'>
                    <div className='s21'>
                        {
                            dropdownitems.map((item, index) => {
                                return (
                                    <DropdownComponent data={item} key={index} />
                                )
                            })
                        }
                    </div>
                    {user && 
                    <Link to='/user/address'
                        className={'stylenone'}
                    >
                        <div className='s22'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                           <h3>Delivery:</h3>
                           <p>Address</p>
                        </div>
                    </Link>
                    }
                </div>
            }
        </nav>
        </>
    )
}

export default Navbar;