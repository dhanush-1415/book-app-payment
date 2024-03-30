import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './Sucess.css';

const Sucess = () => {
  const [ordersuccessorderid, setordersuccessorderid] = React.useState(null);
  const preorderarray = JSON.parse(localStorage.getItem('preorderarray'));


  const orderDetailArray = preorderarray.OrderDetail;

// Calculate the total quantity
  const totalQuantity = orderDetailArray.reduce((sum, orderItem) => sum + orderItem.Qty, 0);

  //localStorage.removeItem('preorderarray');
 // const [reloadnavbar, setreloadnavbar] = React.useState(false);
  const [placeorderCalled, setPlaceorderCalled] = React.useState(false);
  //const [reloadKey, setReloadKey] = React.useState(0); // Add a reload key
  const paymentId = localStorage.getItem('paymentId');


  const emptyCart = () => {
    const userData = JSON.parse(localStorage.getItem('token'));
    const userId = userData && userData.length ? userData[0].B2CCustomerId : null;
  
    const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
  
    if (userId) {
      // Filter out the user's cart from cartArray
      const updatedCartArray = cartArray.filter((userCart) => userCart.UserId !== userId);
    
      // Update localStorage with the modified cartArray
      localStorage.setItem('cartArray', JSON.stringify(updatedCartArray));
    
    }
  
  };

  const placesuccessorder = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerOrder/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preorderarray)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Order Code ', data.Data);
      if (data.Message === 'Sucess' && data.Code === 200) {
        setordersuccessorderid(data.Data);
        emptyCart();
        //setreloadnavbar(!reloadnavbar);
       // setReloadKey(prevKey => prevKey + 1); // Increment the reload key
      }
      else {
        // Handle order placement failure
      }
    })
    .catch(err => {
      // Handle order placement failure
    });
  }

  useEffect(() => {
    if (!placeorderCalled) {
      placesuccessorder();
      setPlaceorderCalled(true); // Set the flag to true after calling placeorder
    }
  }, [placeorderCalled]);


  const converttofloat = (value) => {
    // console.log(parseFloat(value) + 0.001)
    value = value.toFixed(2)
    // console.log(value , parseFloat(value) + 0.001)
    // check if value has decimal
    if (!value.includes('.00')) {
        console.log(value, parseFloat(value))
        return parseFloat(value)
    }
    else {
        console.log(value, parseFloat(value) + 0.001)
        return parseFloat(value) + 0.001
    }
}


  return (
    <div>
      {/* Pass reloadKey as a prop to Navbar */}
      <Navbar   />
      <div className="success-container">
        <h1 className="success-heading">Thank You for Your Order!</h1>
        <p className="success-message">Your order has been successfully placed. </p>
        <p className="order-number">Your Order Number: {ordersuccessorderid}</p>
      





        <div className='confirmationcont'>

<div className='c3'>
          <table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>

            <tbody>

              {

preorderarray.OrderDetail && preorderarray.OrderDetail.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td>
                        <p>{index + 1}</p>
                      </td>
                      <td>
                        <p>{item.ProductName}</p>
                      </td>
                      <td>
                        <p>S$ {item.Price ? item.Price.toFixed(2) : 0.00}</p>
                      </td>
                      <td>
                        <p>{item.Qty}</p>
                      </td>

                      <td>
                        <p>S$ {
                          ((
                            item.Price
                          )
                            *
                            item.Qty).toFixed(2)
                        }</p>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className='right'>
            <div>
              <p style={{textAlign:'left'}}>Qty total</p>
              <p style={{textAlign:'left'}}>{totalQuantity} items</p>
            </div>
            <div>
              <p style={{textAlign:'left'}}>Qty amount</p>
              <p style={{textAlign:'left'}}>S$ {converttofloat(preorderarray.SubTotal).toFixed(2)}</p>
            </div>
            <div>
              <p style={{textAlign:'left'}} >Shipping charge</p>
              <p style={{textAlign:'left'}} >S$ {converttofloat(preorderarray.ShippingCost).toFixed(2)}</p>
            </div>

            <div>
              <p style={{textAlign:'left'}} >Tax</p>
              <p style={{textAlign:'left'}} >S$ {converttofloat(preorderarray.Tax).toFixed(2)}</p>
            </div>

            <div>
              <p style={{textAlign:'left'}} >Pay amount</p>
              <p style={{textAlign:'left'}} >S$ {converttofloat(preorderarray.SubTotal + preorderarray.ShippingCost + preorderarray.Tax ).toFixed(2)}</p>
            </div>
          </div>
        </div>


      </div>


      
        {/* <p className="order-number">Your Payment Id: {paymentId}</p> */}
        <Link to="/" className="continue-shopping-link">
          <button className="continue-shopping-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Sucess;