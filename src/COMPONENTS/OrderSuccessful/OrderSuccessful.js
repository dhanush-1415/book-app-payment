import React from 'react'
import './OrderSuccessful.css'
import { useRecoilState } from 'recoil'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const OrderSuccessful = ({ orderid, message, redirectto , orderdata , orderitems , tax ,subtotal ,shipping}) => {

  const [odersuccesscont, setodersuccesscont] = useRecoilState(orderSuccessfulProvider)
  const [user, setuser] = useState({})


  const checklogin = () => {
    let user = localStorage.getItem('token')
    user = JSON.parse(localStorage.getItem('token'))

    // console.log(user)

    if (user && user[0].B2CCustomerId) {
      // console.log(user[0])
      setuser(user[0])
      return true
    }
    else {
      console.log('not logged in')
      toast.error('Please Login First')
      return false
    }
  }

  useEffect(() => {
    checklogin()
  }, [orderid])

  const clearcart = () => {
    localStorage.removeItem('cartArray');
};


  const converttofloat = (value) => {
    // console.log(parseFloat(value) + 0.001)
    value = value?.toFixed(2)
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
    <div
      className="OrderSuccessful"
    >
      <button className='auth-popup__close-btn'
        onClick={() => {
          setodersuccesscont(false)
          clearcart()
          if (redirectto === 'home') {
            window.location.href = '/'
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>


      <div className='confirmationcont'>
        <div className='c1'>
          {/* tick */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          <h2>{message}</h2>
        </div>


        <div className='c2'>
          <h2>Order Summary</h2>
          <div>
            <p>Order Number</p>
            <p>{orderdata.OrderNo}</p>
          </div>

          <div>
            <p>Order Date</p>
            <p>{
              new Date().toLocaleDateString()
            }</p>
          </div>

          <div>
            <p>Name</p>
            <p>{orderdata.CustomerName
            }</p>
          </div>

          <div>
            <p>Email</p>
            <p>
              {
                user.EmailId
              }
            </p>
          </div>

          {/* <div>
            <p>Order Subtotal</p>
            <p>$ {orderdata.SubTotal}</p>
          </div> */}

          <div>
            <p>Payment Method</p>
            <p>{orderdata.PaymentType}</p>
          </div>

          <div>
            <p>Shipping Address</p>
            <p>{orderdata.CustomerShipToAddress
            }</p>
          </div>

          {/* <div>
            <p>Shipping Charges</p>
            <p>$ 80.00</p>
          </div> */}

          <div>
            <p>Tax</p>
            <p>S$ {tax?.toFixed(2)}</p>
          </div>

          <div>
            <p>Qty Total</p>
            <p>S$ {orderdata.Total?.toFixed(2)}</p>
          </div>

        </div>

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

                orderitems && orderitems.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td>
                        <p>{index + 1}</p>
                      </td>
                      <td>
                        <p>{item.ProductName}</p>
                      </td>
                      <td>
                        <p>S$ {item.Price ? item.Price?.toFixed(2) : 0.00}</p>
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
                            item.Qty)?.toFixed(2)
                        }</p>
                      </td>
                    </tr>
                    // <tr key={index}>
                    //     <p>
                    //         {/* {JSON.stringify(item)} */}
                    //         {item.ProductName}
                    //     </p>
                    // </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className='right'>
            <div>
              <p style={{textAlign:'left'}}>Qty total</p>
              <p style={{textAlign:'right'}}>S$ {converttofloat(subtotal)?.toFixed(2)}</p>
            </div>

            <div>
              <p style={{textAlign:'left'}}>Shipping charges</p>
              <p style={{textAlign:'right'}}>S$ {converttofloat(shipping)?.toFixed(2)}</p>
            </div>

            <div>
              <p style={{textAlign:'left'}}>Tax</p>
              <p style={{textAlign:'right'}}>S$ {tax?.toFixed(2)}</p>
            </div>

            <div>
              <p style={{textAlign:'left'}}>Pay amount</p>
              <p style={{textAlign:'right'}}>S$ {converttofloat(subtotal + shipping + tax)?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessful