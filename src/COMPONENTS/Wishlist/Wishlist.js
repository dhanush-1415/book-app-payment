import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartPopupState } from '../../Providers/CartPopupProvider';
import { cartReloadState } from '../../Providers/CartReload';

import { wishPopupState } from '../../Providers/WishPopupProvider';
import CartItem from '../Cart/CartItem';
import './Wishlist.css'
import WishListItem from './WishListItem';
import { toast } from 'react-toastify';

const Wishlist = () => {
    const [wishlistpopupshow, setwishlistpopupshow] = useRecoilState(wishPopupState);
    const [subtotal, setsubtotal] = React.useState(0)
    const [freeDelivery, setfreeDelivery] = useState(300)
    const [whishlist, setwhishlist] = useState([]);

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
                    setwhishlist(products);
                }
                else{
                    setwhishlist([])
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    React.useEffect(() => {
        getwishlist();
    }, [])


    return (
        <div className='cartcontainerout'>
             <div className='outcont' onClick={() => {
                            setwishlistpopupshow(false)
                        }}></div>
            <div className='cartcontainerin'>
                <div className='c11'>
                    <h1>Your Favourites</h1>
                    <button className='cart-popup__close-btn'
                        onClick={() => {
                            setwishlistpopupshow(false)
                            // window.location.reload()
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>


                {
                    whishlist.length === 0 ?
                        <div className='emptycart'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>

                            <h1>Your Favourites is empty</h1>
                            <p>Please add product to your favourites</p>
                        </div>
                        :
                        <div className='cartitems'>
                            {
                                whishlist.map((item, index) => {
                                    // console.log(item[0])

                                    return (
                                        <WishListItem item={item} getwishlist={getwishlist} />
                                    )
                                })
                            }
                        </div>
                }

            </div>
        </div>
    )
}



export default Wishlist