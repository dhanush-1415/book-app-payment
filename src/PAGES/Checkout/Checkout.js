import React , {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import AddNewAddress from '../../COMPONENTS/Address/AddNewAddress'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import { newAddressProvider } from '../../Providers/NewAddressProvider'
import './Checkout.css'
import OrderSuccessful from '../../COMPONENTS/OrderSuccessful/OrderSuccessful'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'
import CardFormPopup from '../../COMPONENTS/Payment/CardFormPopup'
import { cardDetailsPopupState } from '../../Providers/CardDetailsPopupProvider'
import noimage from '../../ASSETS/noimage.png'
import { cartPopupState } from '../../Providers/CartPopupProvider'
import { loadStripe } from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';


const Checkout = () => {


 

  // ////////////////// right container //////////////////////////////////////////


  const stripePromise = loadStripe('pk_test_51N00U8FFReMpJzWzSL2lAHaCnQneRLTpZFtzIhnDdAyqNci4iSEJXrKCehecCCTrfWwBdgneBPXKh5KYSNtdgMUJ00k1doHzNY'); 

  const [cartdata, setcartdata] = React.useState([])
  const [subtotal, setsubtotal] = React.useState(0)
  const [shippingcost, setshippingcost] = React.useState(0)
  const [tax, settax] = React.useState(0)
  const [boxLoad , setboxload ] = React.useState(false);
  const [quantitySum, setQuantitySum] = React.useState(0);
  const [shiptax , setShiptax] = useState(0);
  // const getcartdata = async () => {
  //   let cart = JSON.parse(localStorage.getItem('cart'))
  //   // console.log(cart)
  //   if (cart !== null) {
  //     setcartdata(cart)
  //     let total = 0
  //     cart.forEach(item => {
  //       total += item.data.SellingCost * item.quantity
  //     })
  //     setsubtotal(total)

  //     if (total >= 80) {
  //       setshippingcost(0); 
  //     } else if (total >= 50 && total <= 79) {
  //       setshippingcost(3); 
  //     } else if (total < 50) {
  //       setshippingcost(5);
  //     }
  //   }
  //   else {
  //     setcartdata([])
  //   }
  // }

  const getcartdata = async () => {
    const userData = JSON.parse(localStorage.getItem('token'));
    const userId = userData && userData.length ? userData[0].B2CCustomerId : null;

    const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

    if (userId) {
        const userCart = cartArray.find((userCart) => userCart.UserId === userId);

        if (userCart) {
          setcartdata(userCart.CartItems);

            let total = 0;
            let sumOfQuantities = 0;
            let taxamt = 0;

            userCart.CartItems.forEach((item) => {
                let taxp = item.data.TaxPerc / 100;
                taxamt =  taxp * item.data.SellingCost * item.quantity;
                total += item.data.SellingCost * item.quantity;
                sumOfQuantities += item.quantity;
            });

            setsubtotal(total);
            setQuantitySum(sumOfQuantities);
            // settax(taxamt.toFixed(2));
            settax(0);
            setShiptax()
            if (total >= 80) {
              setshippingcost(0);
              // setShiptax((0 + taxamt));
              setShiptax((0));
          } else if (total >= 50 && total <= 79) {
              setshippingcost(3);
              // setShiptax((3 + taxamt));
              setShiptax((3 ));
          } else if (total < 50) {
              setshippingcost(5);
              // setShiptax((5 + taxamt));
              setShiptax((5));
          }
          
        } else {
            // User has no items in the cart
            setcartdata([]);
            setsubtotal(0);
            setshippingcost(0);
        }
    } else {
        // User is not logged in or has invalid data
        setcartdata([]);
        setsubtotal(0);
        setshippingcost(0);
    }
};


  React.useEffect(() => {
    getcartdata()
  }, [])
  // //////////////////////////////////////////////////////////////////////////////////////
  const [activesection, setactivesection] = React.useState(1);
  const [selectedaddress, setselectedaddress] = React.useState({});
  
  const validateAddress = () => {
    if (Object.keys(selectedaddress).length > 0) { 
      setactivesection(2);
    } else {
      toast.error('Please select an address', {
        position: "bottom-right",
        autoClose: 1000,
      });
    }
  }
  


  const [deliverydate, setdeliverydate] = React.useState(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

  const [user, setuser] = React.useState({})
  const checklogin = () => {
    let user = localStorage.getItem('token')
    user = JSON.parse(localStorage.getItem('token'))

    // console.log(user)

    if (user && user[0].B2CCustomerId) {
      // console.log(user[0])
      setuser(user[0])
      getaddress(user[0])
      return true
    }
    else {
      console.log('not logged in')
      toast.error('Please Login First')
      return false
    }
  }
  const [savedaddresses, setsavedaddresses] = React.useState([])
  const getaddress = (userdata) => {
    // console.log(userdata)
    let mainaddress = {
      AddressLine1: userdata.AddressLine1,
      FloorNo: userdata.FloorNo,
      UnitNo: userdata.UnitNo,
      AddressLine3: userdata.AddressLine3,
      EmailId: userdata.EmailId,
    }
    let otheraddress = [];
    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerDeliveryAddress/GetAll?OrganizationId=3&CustomerId=' + userdata.B2CCustomerId)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.Data != null) {
          otheraddress = data.Data
          if (mainaddress.AddressLine1 == '' && mainaddress.FloorNo == '' && mainaddress.UnitNo == '' && mainaddress.AddressLine3 == '') {
            let alladdress = [
              ...otheraddress
            ]
            setsavedaddresses(alladdress)
            // console.log(alladdress)

          }

          else {
            let alladdress = [
              ...otheraddress,
              mainaddress
            ]
            setsavedaddresses(alladdress)
            console.log(alladdress)
          }

        }
        else {
          let alladdress = [
            mainaddress
          ]
          if (mainaddress.AddressLine1 == '' && mainaddress.FloorNo == '' && mainaddress.UnitNo == '' && mainaddress.AddressLine3 == '') {
            setsavedaddresses([])
            console.log('no address')
          }
          else {
            setsavedaddresses(alladdress)
            console.log(alladdress)

          }

        }
      })
    // let alladdress = []
    // if (userdata.Address) {
    //     alladdress = [
    //         ...userdata.Address,
    //         mainaddress
    //     ]
    //     setsavedaddresses(alladdress)
    // }
    // else {
    //     alladdress = [
    //         mainaddress
    //     ]
    //     setsavedaddresses(alladdress)
    // }

  }

  React.useEffect(() => {
    checklogin()
  }, [])





  // /////////////////////////////// add address ////////////////////////////////////////// 
  const [shownewaddressform, setShownewaddressform] = useRecoilState(newAddressProvider)
  // remove address
  const removeaddress = (deliveryid) => {
    let temp = process.env.REACT_APP_BACKEND_URL + `/B2CCustomerDeliveryAddress/Remove?OrganizationId=3&CustomerId=${user.B2CCustomerId}&DeliveryId=${deliveryid}&UserName=${user.EmailId}`

    fetch(temp, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Message == 'Sucess') {
          toast.success('Address Removed')
          getaddress(user)
        }
      })
  }
  // //////////////////////////////////////////////////////////////////////////////////////
  const [paymentmethod, setpaymentmethod] = React.useState('')




  // place order 



  const [ordersuccessorderid, setordersuccessorderid] = React.useState(null)
  const placeorder = () => {

    setboxload(true);
    // console.log('place order', cartdata)
    if (selectedaddress.AddressLine1 == '' && selectedaddress.FloorNo == '' && selectedaddress.UnitNo == '' && selectedaddress.AddressLine3 == '') {
      toast.error('Please Select Address')
      return
    }
    else if (paymentmethod == '') {
      toast.error('Please Select Payment Method')
      return
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const temp = {
      "OrgId": 3,
      "BrachCode": "",
      "OrderNo": "",
      "OrderDate": formattedDate,
      "CustomerId": user.B2CCustomerId,
      "CustomerName": user.B2CCustomerName,
      "CustomerAddress": selectedaddress.AddressLine1 + ' ' + selectedaddress.FloorNo + ' ' + selectedaddress.UnitNo + ' ' + selectedaddress.AddressLine3,
      "PostalCode": selectedaddress.PostalCode,
      "TaxCode": 1,
      "TaxType": "e",
      "TaxPerc": 0,
      "CurrencyCode": "SGD",
      "CurrencyRate": 1,
      "Total": subtotal,
      "BillDiscount": 0,
      "BillDiscountPerc": 0,
      "SubTotal": subtotal,
      "Tax": 0,
      "NetTotal": subtotal + shippingcost,
      "PaymentType": paymentmethod,
      "PaidAmount": 0,
      "Remarks": "string",
      "IsActive": true,
      "CreatedBy": "admin",
      "CreatedOn": formattedDate,
      "ChangedBy": "admin",
      "ChangedOn": formattedDate,
      "Status": 0,
      "CustomerShipToId": user.B2CCustomerId,
      "CustomerShipToAddress": selectedaddress.AddressLine1 + ' ' + selectedaddress.FloorNo + ' ' + selectedaddress.UnitNo + ' ' + selectedaddress.AddressLine3,
      "Latitude": 0,
      "Longitude": 0,
      "Signatureimage": "string",
      "Cameraimage": "string",
      "OrderDateString": "string",
      "CreatedFrom": "W",
      "ShippingCost":shippingcost,
      "url":'catchyfive'
      "OrderDetail":
        cartdata.map((item, index) => {
          return {
            "OrgId": 3,
            "OrderNo": "",
            "SlNo": index + 1,
            "ProductCode": item.data.ProductCode,
            "ProductName": item.data.ProductName,
            "Qty": item.quantity,
            "Price": item.data.SellingCost,
            "Foc": 0,
            "Total": item.data.SellingCost * item.quantity,
            "ItemDiscount": 0,
            "ItemDiscountPerc": 0,
            "SubTotal": item.data.SellingCost * item.quantity,
            "Tax": (item.data.TaxPerc) / 100 * (item.data.SellingCost) * (item.quantity),
            "NetTotal": ((item.data.TaxPerc) / 100 * (item.data.SellingCost) * (item.quantity)) + (item.data.SellingCost) * item.quantity,
            "TaxCode": 1,
            "TaxType": "e",
            "TaxPerc": item.data.TaxPerc,
            "Remarks": "",
            "CreatedBy": "admin",
            "CreatedOn": formattedDate,
            "ChangedBy": "admin",
            "ChangedOn": formattedDate,
            "Weight": 0
          }
        })

    }

    // console.log(temp)

    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerOrder/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp)
    })
      .then(res => res.json())
      .then(data => {
        if (data.Message == 'Sucess' && data.Code == 200) {
          setboxload(false);
          toast.success('Order Placed Successfully')
          setordersuccessorderid(data.Data)
          setordersuccessmessage('Order Placed Successfully')
          getsuccessfulorder(data.Data)
          setodersuccesscont(true)
          setloyaltypoints()

        }
        else {
          toast.error('Order Not Placed')
          setboxload(false);
        }
      })
      .catch(err => {
        toast.error('Order Not Placed')
        setboxload(false);
      })
  }
  const savepreorderobjtoLS = async () => {
    if (selectedaddress.AddressLine1 == '' && selectedaddress.FloorNo == '' && selectedaddress.UnitNo == '' && selectedaddress.AddressLine3 == '') {
      toast.error('Please Select Address')
      return false
    }
    else if (paymentmethod == '') {
      toast.error('Please Select Payment Method')
      return false
    }
    else {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const temp = {
        "OrgId": 3,
        "BrachCode": "",
        "OrderNo": "",
        "OrderDate": formattedDate,
        "CustomerId": user.B2CCustomerId,
        "CustomerName": user.B2CCustomerName,
        "CustomerAddress": selectedaddress.AddressLine1 + ' ' + selectedaddress.FloorNo + ' ' + selectedaddress.UnitNo + ' ' + selectedaddress.AddressLine3,
        "PostalCode": selectedaddress.PostalCode,
        "TaxCode": 1,
        "TaxType": "e",
        "TaxPerc": 0,
        "CurrencyCode": "SGD",
        "CurrencyRate": 1,
        "Total": subtotal,
        "BillDiscount": 0,
        "BillDiscountPerc": 0,
        "SubTotal": subtotal,
        "Tax": 0,
        "NetTotal": subtotal + shippingcost,
        "PaymentType": paymentmethod,
        "PaidAmount": 0,
        "Remarks": "string",
        "IsActive": true,
        "CreatedBy": "admin",
        "CreatedOn": formattedDate,
        "ChangedBy": "admin",
        "ChangedOn": formattedDate,
        "Status": 0,
        "CustomerShipToId": user.B2CCustomerId,
        "CustomerShipToAddress": selectedaddress.AddressLine1 + ' ' + selectedaddress.FloorNo + ' ' + selectedaddress.UnitNo + ' ' + selectedaddress.AddressLine3,
        "Latitude": 0,
        "Longitude": 0,
        "Signatureimage": "string",
        "Cameraimage": "string",
        "OrderDateString": "string",
        "CreatedFrom": "W",
        "ShippingCost": shippingcost,
        "OrderDetail":
          cartdata.map((item, index) => {
            return {
              "OrgId": 3,
              "OrderNo": "",
              "SlNo": index + 1,
              "ProductCode": item.data.ProductCode,
              "ProductName": item.data.ProductName,
              "Qty": item.quantity,
              "Price": item.data.SellingCost,
              "Foc": 0,
              "Total": item.data.SellingCost * item.quantity,
              "ItemDiscount": 0,
              "ItemDiscountPerc": 0,
              "SubTotal": item.data.SellingCost * item.quantity,
              "Tax": (item.data.TaxPerc) / 100 * (item.data.SellingCost) * (item.quantity),
              "NetTotal": ((item.data.TaxPerc) / 100 * (item.data.SellingCost) * (item.quantity)) + (item.data.SellingCost) * item.quantity,
              "TaxCode": 1,
              "TaxType": "e",
              "TaxPerc": item.data.TaxPerc,
              "Remarks": "",
              "CreatedBy": "admin",
              "CreatedOn": formattedDate,
              "ChangedBy": "admin",
              "ChangedOn": formattedDate,
              "Weight": 0
            }
          })

      }
      await localStorage.setItem('preorderarray', JSON.stringify(temp))
     
    }
  }



  const makePayment = async (preorderData) => {
    setboxload(true);
    const data = [{
      products: preorderData
    }];
  
    try {
      const response = await fetch('https://stripe-payment-service.onrender.com/create-checkout-session', {
      // const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const session = await response.json();
  
      localStorage.setItem('paymentId', session.id);
  
      const stripe = await stripePromise; // Await the promise here
  
      if (session.sessionId) {
        stripe.redirectToCheckout({ sessionId: session.sessionId });
      } else {
        setboxload(false);
        toast.error('Some error occurred, please try again later');
      }
  
    } catch (error) {
      setboxload(false);
      console.error('Error creating Stripe session:', error);
      toast.error("Error creating");
    }
  };
  
  



  // payment integration
  const makePayme = async(preorderData)=>{
    const stripe = await loadStripe("pk_test_51N00U8FFReMpJzWzSL2lAHaCnQneRLTpZFtzIhnDdAyqNci4iSEJXrKCehecCCTrfWwBdgneBPXKh5KYSNtdgMUJ00k1doHzNY");

    const body = {
        products:preorderData
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("https://paymentserver-vpjj.onrender.com/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    localStorage.setItem('paymentId', session.id);

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    console.log(result);

    if(result.error){
        console.log(result.error);
    }
}

  const setloyaltypoints = () => {
    let loyaltypointsarray = localStorage.getItem('loyaltypointsarray')
    if (loyaltypointsarray != null) {
      let loyaltypointsarray = JSON.parse(loyaltypointsarray);
      let temp = [...loyaltypointsarray, { "Date": new Date(), "Points": parseInt(subtotal + shippingcost) }]
      localStorage.setItem('loyaltypointsarray', JSON.stringify(temp))
    }
    else {
      let temp = [{ "Date": new Date(), "Points": parseInt(subtotal + shippingcost) }]
      localStorage.setItem('loyaltypointsarray', JSON.stringify(temp))
    }
  }



  // order successcontainer
  const [odersuccesscont, setodersuccesscont] = useRecoilState(orderSuccessfulProvider)
  const [ordersuccessmessage, setordersuccessmessage] = React.useState('Order Placed Successfully')
  const [ordersuccessdata, setordersuccessdata] = React.useState({})
  const [ordersuccessdataitems, setordersuccessdataitems] = React.useState([])

  const getsuccessfulorder = (ordrid) => {
    console.log(ordrid)
    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerOrder/Getbycode?OrganizationId=3&OrderNo=' + ordrid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (data.Status === true && data.Data) {
          setordersuccessdata(data.Data[0])
          // console.log(data.Data[0].OrderDetail)
          setordersuccessdataitems(data.Data[0].OrderDetail)


          let total = 0
          let tax = 0
          data.Data[0].OrderDetail.forEach(item => {
            total += item.Price * item.Qty
            tax += item.Tax * item.Qty
          })
          setsubtotal(total)
          settax(tax)
        }
        else {
          toast.error('Error in getting order details')
        }
      })
      .catch((error) => {
        toast.error('Error in getting order details')
      })
  }

  const [cardDetailsPopup, setcardDetailsPopup] = useRecoilState(cardDetailsPopupState)
  const [cartPopupShow, setCartPopupShow] = useRecoilState(cartPopupState);

  useEffect(() => {
    if (savedaddresses.length > 0) {
      setselectedaddress(savedaddresses[0]);
    }
  }, [savedaddresses]);
  return (
    <div className='checkoutpage'>

      {
        odersuccesscont && <OrderSuccessful orderid={ordersuccessorderid} message={ordersuccessmessage} redirectto={'home'}
          orderdata={ordersuccessdata} orderitems={ordersuccessdataitems} tax={tax} subtotal={subtotal} shipping={shippingcost}

        />
      }
      <Navbar />
      {
        shownewaddressform && <AddNewAddress user={user} getaddress={getaddress} />
      }
      <div className='checkoutpage__container'>
        <div className='checkoutpage__container__left'>
          {
            activesection === 1 ?
              <div className='s1'>
                <div className='s1__head'>
                  <span>1</span>
                  <h3>Delivery Address</h3>
                </div>
                <div className='s1__body'>
                  {/* <div className='addresscontainer'>
                    <h3>Home</h3>
                    <p>123, ABC Street, XYZ City, 123456</p>
                  </div>
                  <div className='addresscontainer'>
                    <h3>Office</h3>
                    <p>123, ABC Street, XYZ City, 123456</p>
                  </div> */}
                  {
                    savedaddresses.length > 0 &&
                    savedaddresses.map((item, index) => {
                      return (
                        <div className={
                          selectedaddress.AddressLine1 == item.AddressLine1 &&
                            selectedaddress.FloorNo == item.FloorNo &&
                            selectedaddress.UnitNo == item.UnitNo &&
                            selectedaddress.AddressLine3 == item.AddressLine3 &&
                            selectedaddress.EmailId == item.EmailId ? 'addresscontainer active' : 'addresscontainer'
                        } key={index}
                          onClick={() => setselectedaddress(item)}
                        >
                          <p>
                            {
                              item.AddressLine1 && <span>{item.AddressLine1} ,</span>
                            }
                            {
                              item.FloorNo && <span>{item.FloorNo} ,</span>
                            }
                             {
                              item.UnitNo && <span>{item.UnitNo} ,</span>
                            }
                            {
                              item.AddressLine3 && <span>{item.AddressLine3}</span>
                            }
                          </p>
                          <button className='delbtn'
                            onClick={() => removeaddress(item.DeliveryId)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )
                    })
                  }
                  <div className='addresscontainer'
                    onClick={() => {
                      // if(user != null || user != {} || user != undefined){
                      //   setShownewaddressform(true)
                      // } 
                      // else{
                      //   toast.error('Please Login First')
                      // }
                      if (user.B2CCustomerId == null) {
                        toast.error('Please Login First')
                      }
                      else {
                        setShownewaddressform(true)
                      }
                    }}
                  >
                    <h2><span>+</span> Add Address</h2>
                  </div>
                </div>
                <div className='s1__footer'
                  onClick={() =>validateAddress()}
                >
                  <button>Next Step</button>
                </div>
              </div>
              :
              <div className='s11'
                onClick={() => setactivesection(1)}
              >
                <div className='s1__head'>
                  <span>1</span>
                  <h3>Delivery Address</h3>
                </div>

              </div>
          }
          {
            activesection === 2 ?
              <div className='s1'

              >
                <div className='s1__head'>
                  <span>2</span>
                  <h3>Select Delivery Date</h3>
                </div>
                <div className='s1__body'>
                  <input type='date' className='date_cont'
                    min={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}

                    value={deliverydate}
                    onChange={(e) => {
                      // console.log(e.target.value)
                      setdeliverydate(e.target.value)
                    }}
                  />

                </div>
                <div className='s1__footer'
                  onClick={() => setactivesection(3)}
                >
                  <button>Next Step</button>
                </div>
              </div>
              :
              <div className='s11'
                onClick={() => setactivesection(2)}
              >
                <div className='s1__head'>
                  <span>2</span>
                  <h3>Select Delivery Date</h3>
                </div>
              </div>
          }
          {
            activesection === 3 ?
              <div className='s1'>
                <div className='s1__head'>
                  <span>3</span>
                  <h3>Payment Option</h3>
                </div>
                <div className='s12__body'>
                  {/* <div className='addresscontainer disabled' */}
                  <div className={paymentmethod == 'STRIPE' ? 'addresscontainer active' : 'addresscontainer'}
                    onClick={() => {
                      // toast.error('This Payment method is Not Available')
                      setpaymentmethod('STRIPE')
                    }}
                  >
                    <h3>Pay via Stripe</h3>
                    <img src='https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg' />
                  </div>
                  {/* <div className={paymentmethod == 'COD' ? 'addresscontainer active' : 'addresscontainer'}
                    onClick={() => setpaymentmethod('COD')}
                  >
                    <h3>Cash On Delivery</h3>
                    // <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAAD7+/sBAQH+/v78/Pz9/f3l5eWWlpZWVlZFRUUoKCjh4eHr6+utra3x8fFRUVGlpaVcXFy7u7s+Pj6Dg4Pa2trHx8fS0tJra2vu7u5KSkqJiYl4eHjExMR7e3ucnJwPDw81NTUjIyMVFRUmJiaysrJjY2M4ODguLi4bGxtoaGiHh4dZvvioAAASk0lEQVR4nN1da2OqPAwuyMWpwLzMy5xubju7nPf8/9/3Ck16LxQpytYPs2La5GnSJrSBkZhUJQ4TWgnDqPqMwpBeSEKVJAYSF1qNJEISz7Q1YnYBSJpo/QiddBnb9i0v4uJZKy1ooy4ASROtAaC7tj1pMHTk4kfoG5hoRTLIRaYbwFgBeLU5eC0TlWmvJvT1FhlFzCHOwcigwcvFHPIc7OQmFIc4pDlo0mAHb3Z1obstMs6sOa0rwJu6iU4RZY8Ab+4mCI5tT0J3i0U9RDKM9sfMwR4B/rxQTaL9zXOQ0g7QRD2PbQsu/QLs5ui9ALyEy81CNU7bL8CbhWoC7XWEvo2bQNpf5SauAHBIbgJof7uJEvLrARJby596R98rwAHOQTvAYYRqzqzraP1xuUGo5iRmU8sfGqpJtP3bye1WUQvA3+MmKO0A3ERfqyjQ/l43wWg9Cj2EO/rhAex3DmoAf0+oxll3BnjbO3oHMfsQekBzsKL9wW7iCgC7uYn+52BF0kXoAYdqAu3vdROM9mIugw7VfAAceKjGSLoLPWA3UZEoXMjtC8ji03i0YSw2493i7hZl8d/TMrMIfflSobbcfga3LZMPwfQ9bDwoLbcrzmo0ws+RfEGvjPzSLtFkfaxvsgafSjaaRDZZhYoDSQvaYPHYXYNIIgIM97dUnDSkp5kFYPsVV/hWfF9DeleStScXLLZ8vUyivtQ+i7xElMLlg8Vg3AE60Lp3F6zCy01UiEf45c0gFCeSjC8GKGg7Zt/i7yHMQZk262yiAkCyFEyokX9vbkIeg4MngPTyPrhIGf0quUg83NXB5TQINC7+za7tYHyQ9hrUaOHyPLCzc5fIM22wI11NFEtEdhoXG/8rzcGqzSruaqIIMCTfrQf4KgvtY0uABm3jN2eJeLHScgrN7PRO6pGmXU2U57U1jWf5Zzq552Wv0ZZ/3lfVj5M3Y3di+8mrOEw2tac+Tg3oZZmLOsBn0R+OaUHE8nhQx+B1vH4EYylm+T3XE/3Yr8XNLxJm26cvXZXyhdTD5h9crrfM72Vo4HIvjcHfI7BDCOu9pJVRQRTfdhZye29QnMA6TTrNQTGkqTPRIDcNTRkGCRPswdB5Lnb3YPZtG/MtG/Q6S4xCt9Agwbw2YeFQNThJzS3JOuAazI2CrEeBOkyaROFBN1XWaNYdIBY7l4V1pr8wfBaA5SBgd4jQcIf6ZGM9ClJXgKQBYEJY56oq74nSkiTQZ3ZigigmSmLkUgb00B1FyHtJUJCEQjSuA6kvgOAPDVy+hTvJMCtLmtGPnKvnLwdYUJKISb/DfnMKsIDmWSEIsrMtdKkbwLoNePxmmwhraBmRze5PYCpn0iN2fryDi5M5AKxC+qq7nI40M+33xUfIFoN3S1iXdj9hwG8WgE/QkswmFiWfK6/Y+U4g2RdwNLkD2pxKNBdaT4+YznO0LHSpj3MM+s0ofXAqACCbTqZ1fQyd76TWr8B/C8LnVKK5aQQTcm8EWHn8ThpkAM0eH3ZKovMQyz/JtGvK5SiToPS4iOX0VnQuBzBjMKWN2UTSpPshGHzTI0S+lCWZCRervD9SLncqCWSVrRBhJdFcGaYNFST8Nmiw3FHsDBAngtHjv9GWzPzMc2UVVaZUaEreUPUcECEBhNJ4fSX0sPTZuA5AsEFiQBoxZ4MVh8BcMiWZy1PVMspUgDLSPeWSqQDL85VyK5B6O45Q4bSkt3BHkxUF66Isj4+PhVqhn0XEwjrrOS39RrTOywocc+XAzqjBMiaoRi/T7hCWdK9zHHCPHzGEjBZ2Klj0Y7y1sZbPwg0g9/hS51uq+89AV5we9WTaOrSka8uY0ubU4ucSCQsXSHGyAazbIDh73gaAIX4zdpHRdWhSy0VAqEi0pGvLmHn8crzmmtB0OYjfmgEaZXhuSCXAb8bOCxpfrmrHExGmgUKC55zjADx+ZRCix6e0CRVkatNTkypzUgcwwm/GzgtKtwrsGhwBwgRdirBzzhCiIOV4Sh6/+kzogjRtAmj7BSPLhrw2o/3BtsXKfu9YVu6rzvUVV0dICPWHslYSuiBNjQxcyimpA4h5bca1miGUJFIFuaedZxrJks50hpAgQrm7hJ4uTU0A36Y1BXdAg0UdQMxrM3r8ghKsagGeEVYzPRN/GiHC0IBQ6S6k7nxq0mBG6kqOtOPmtC/N41f8i2poAKF1ItzTmZ5pY7CkXCqEmsfnKCAWmZo2YFOz0BjAHLCbjf5UhQwwNHv8gg7NqhbgGWHVeaYpeUm5iB4/QYSCQ4wRoWGQU7PQGKHFLDcGlW3NazN7/ILqfhXYTTRo5fETg8cPQKQ/ar9lJa3T4Pm+PD1BL182gOyU2yh9Knh8mwYFhOovmscvx2uu9UI9fvjXxCBtups44jg915hz9U01j6psaCi/qwE4Mnh8hKp6/Mog5mov35VEyeNJ6XdEx5jn1ODdBFao9GOk/agHaPb4c0rPD8AdPL7gbDR/WIo2Vy3+gU6TtQlgkEZc6DgpSwwVdme7wEZry3vL4JvR/p6hQaD+IlX2dIKpHh90GOF2aE4XJM3jb+nC8WFkMINNx+1roJQDrjoFLlF/8VzFnNdm9PgBtYqaLduy8hVW5lHdHEi/bIlw/6z5Q6C9A4l2Rgaw5224tcLJkZAtirswAsTDBK2LaoDLiO8ccSR/jABBGaOMmsd/KglwoQGnweMDhkqi4t2wDqA/JIaNfzgpSfD+tfzlxQQQJq3Z45fpHtXsLRdl+2qzpTfaa2n9gfvns34DBaHU+Ai+7cMEkCG8kxtB5QUjmQM2OloBGjw+/Uhh9s6+cQgMSB+ILDz9ZQdclnAlpxY/lxov0Xl/a6yZPzzHIwsz6yOsNskEG2WRdhoHlms75d6xI7GHQC3MlN5DmK+58OsDcrmD7vLK4vkwnMsnOwDV43HmD0vpFhJAfgcK05TnynwxnbF9KQBoOeVmPu08VsX87qShpLSVVynvEB7HVNfvhzVy2WJ3ObV4hnAynrHwKwsMQSkgLMdgIUrHxQz+FDC2R7zyrAJkh8BGgNxO5DC9KvSIl9KGQoIdN/2KC0vKzdXtPcIAhittJWcev2K9MAIsfXFE6MCN8ZfcAlD2+GJXb4Ut3SNZMdoFsaVnjVm/OXPIWrbhpzXzOqXzamFc6Mo/zxjJMJJ161Pu78z2xrMPTouLjQpwyfvNiQ0grCM669LjR5TC5qrOM4QOXPEGw/QWKicB+im3NhmXktlJp9xsvh6MAHNB2LkyBji2KVumDaxhKVnYs1Lo0R4RooI7IotJEKGti/PHIRMBsr27XHTe+1QDWAhZxyPc+VUAhmM9mtI9vqBllRZHIeQr+dgAMOL+ULUTWvm35rTYMvyWuT2xLYeo3JcI53/leVVJwkw0Lm0rm7+ZjIf3S4+GuD800U4LGDiW4LPRAdpPuVnl62k5E6MEsv1SSYK7fEuX72L9sTupEr1/iO3DdPOyNyqu2eMrtHu0jC+8kimn3BE/5baysxc57Uv5SSExtbbRoj+M7B4fKwdYC7MTCPHKbiLjEM1OktEeglpcSn3FqTszLZxyKx5fbRy8gGHgSS4ufEpeW7sUyTa0DrgstHDKvahnTWdeOdnGeOEDNJiwhcOTRJ0HQ6GFU+5FI2tM2rjDK2sEKJxyX1t6l4GDvLYajw8X/oZU2yFunb+F+CRu3Sm3teJA4mW+1nl85cJ9jGEI0D4TOQwOAkvLGyhOGB3F49cdY8KmEnf8RARYk9fWzwriOhguHh8Gg4aFCcuMCEQF1uS13ViVNK+tweNjZUsjmQQQCx6/Jq/tJooTKild7BdO/e7F/C7cKGzIa+tVehdaweM3d/dOJM9HAUa1eW29rSDOtHBycnBiPQHHACQyQOOet2lxayG0D9qU5j7NAlZqutugX6AX8EamNq8NPq+sOKGCeW3iQ/SWMsVH3BNECHdq7h7/BqsNevyE7XJplUjdI0vwmIXIe2OB2nm/K4jjYIDHF87o8f4ZbzXxF/EpGUQoAoz5LsaAyggQtn1pCjQXFcjy2oLxQMoLBNBpS4AJy+9ChEpem4T7pmXCPH77194EgsfX8tosLX39zxf3lGY4a0nba5B5Pkar4fb0RqBu77Kgjwagx3cDiCSwVMkABdy1GuwgdCtaRDhL2gPkHt+U13ZTgOKrHhAhaQ8wRoRqXhvD7QyQFZ+vPCLUtzErtQycxloQE7EYPT5zpbUAy7+zzXK5PFY7wLWvPLpQ2xPBHyoZv2fe2+Nmm+FgaKwRizGvzZ5ty8OJcjN+z9zy+8OGPbHmyUSFzGslry0h8fHhDVnvXzBslcWUPL6S14ZZdDXvFz1HweycBEG+FL4BYqaZlNeWkPSfwnqVh7qYosdX89oCmyAc4Nq0o3Ca+5yDFCF6fH5yXDyorIPyEWWNteb5xLw2iYtJg5DCpcXNk8x6AHrRiss8Pgd4PJlZ3xUKa9XzhSruGg0WCwWgcKOzaRK61asecC1leW2YmGVivZXFZB7flNdGalfRYm/jUn5+KBrsADDhHh9lUF/cIW08LCXW6A+NeW31bmJiMVG4sOxsooy16vENbyaRKkdxsQdS7FfOaytIzRz8rOdS5T92CdVEVzWh2sFn16wmiqxnjLXg8QkvEXkHi47sAF+auATvPP/RGaDl+UHJ4+MjrDWs/wo3/YhQBBhibtwLUQRhAKO1jYtw+IsJqR3cBNAK/pAkj8YMaQtrIiNMkAs8MvBl02CMNlq/FbNuCdCqbe4Pz8b2rx1rgA7dYecbuLwxazCMtjIXy2qzqBG6hQZFhKGeX93AOlA8H+USnejlVWIJtj8buVSVmR+A3OOHqMJG1muL50MuT9DyYAZY1IyeWHly+KeYLi/r4B6/+e1AUHlgng89vpTXxlM0MY1B9m25hYvKDlewjjfH3ONHMIGat1nZ4okeX85rYyn15xBzpgO05z8qXOBhwM6vehA8/qGBNVYweOP+UMyKOlsmJHGV9LtNxu8eqURvllBNqyyJl0KTV6t3fa2MnAys8Q04iFAGGNPkPhyR0etqsRUApi4ToapMJz7K/kS7W53rI5fZUVbeoDEiVAFKyaBVWTKAVS6zExePxTyCjqzRHyr/lWzJfq9aTGM2aTYa3xueuTmx1k65K6Rk+y7R8VdPsoSx2olglcgzrVt3FGAiLWUJKaSHcwp4HUWEOhy64kSSkwYQlvM1fyU7Jm+fve7W0IVnidrT2khoJVfy2ngkQ9L5Z/Wk2LPgkNVn5+ydB/0UFxOVGoyZzvQ9mRJ2lqYp4QBJeHIcvWBcNk3TWUrLrLnSRPLturY8ZbzRo7hJJ2mQ3w8mAkD6XgWnFYxuSCVKL7ySsAoGFRpJJJN8uproUeq3CaAaW41dJwLt7qJQzUKbu/ri2NidI0D+BsGGCf7pHSB/hLrBTSzM3TkCTMrA1AFgaSmej9oS3GFpWgeW5q1eR4AhfU63kcvUuwYT63vAlMp3bOvO8QA0ngaNE6HcFfYOMKY3Go2s844AadDaFJ2sIv1ArzvAKt5oZG09xnQ/MeLp5NbJuK55AcdFcxBI/l3EWs5rc9iOt7+rCisvDpkTF/17qKZX5FQP6VnH1hVgjM+/WQHu+gKYJDC6VtbPPgCeW5r3hLDyGccOJnoBwJKkeolJzdhqrBFS1AZg/ZQ/RM25Lx3+g1k2tbN+1gHysW0F8MzH8AZunINWLh1NFEjYCaLGOm9a31r98+BwbOSyr1lFfWiwvEKWbybWC0NmWHwxwDIGStlLKgK02bcl6clNyEKH4usKaJlsDKxlSBec2hYv4rtUTruNKXPHswZRzOXnibP+8zSrYw1j24KLsP6mx+rf630+51vzPYvfOSic05J4uxwfdrvnl82sQUzorv0wMrNjpS+A9hSdGtYW2p4SYj3OwYvFdG7pJ0+mK0Bn1py2Ty6+5+BlYrZveYm2vc7BdrTxxULfwEQvFXOQADtlXiusexrGG2jQRnsVO7kyQJn1AE3UswseHkBfTz/gDkhDyx8+BwnPa3MfmiHOwTrWPQp9cz+ItIMyUV+hWo8Ab+smjLS/3UQJGRBAz26C75ibW/58N9EDwG5zsI9FpgbgMOagM+s6Wn9chjEHddomgD/sjt5I6z1UG4yb8ApwGH7QzHoAbqKvVRRob+8mep2DrPwCEx0swL5CNQvA3xOqcda2lqSx5aBDNYG1N6FvGqrVs/5poVprMX9rqMZJfmmoJtD+TDfRhvV1uPg3UdJE2x3gwEM1RtJd6G4a7Dj9HcS8DcDeQzW5u583B1uK+VPzZJzFvH4kc+1b0Z8xB7vo4de6CSbm5UL/CBO9OsCrhWq8u+twuZGbIODxLxLa9Mazfk300rH9H6EDTM1lRT3BAAAAAElFTkSuQmCC' alt='paypal' />
                  </div> */}
                </div>
                {/* <div className='s1__footer'>
                  <button
                    onClick={() => setactivesection}
                  >Next Step</button>
                </div> */}
              </div>
              :
              <div className='s11'
                onClick={() => setactivesection(3)}
              >
                <div className='s1__head'>
                  <span>3</span>
                  <h3>Payment Option</h3>
                </div>
              </div>
          }
        </div>

        <div className='checkoutpage__container__right'>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th className='price'>Amount</th>
              </tr>
            </thead>

            <tbody>
              {
                cartdata.map((item, index) => {
                  return (
                    <tr key={index}
                    style={{cursor:'pointer'}
                    }
                      onClick={() => {
                        setCartPopupShow(true)
                      }}
                    >
           
                      <td>
                        <div className='imgandname'>
                          {
                            item.data.ProductImagePath == null || item.data.ProductImagePath == '' 

                              ? <img src={noimage} alt='noimage' />
                              :
                              <img src={item.data.ProductImagePath} alt='noimg' loading='eager' />
                          }
                          <p>{item.data.ProductName}</p>
                        </div>
                      </td>
                      <td className='quantity'>
                        <span>
                          {item.quantity}
                        </span>
                      </td>
                      <td className='price'>
                        S${(item.data.SellingCost * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className='subtotal'>
            <h1>Qty Total</h1>
            <h2>{quantitySum} items</h2>
          </div>
          <div className='subtotal'>
            <h1>Qty Amount</h1>
            <h2>S${subtotal.toFixed(2)}</h2>
          </div>
          <div className='subtotal'>
            <h1>Shipping charges </h1>
            <h2>S${shiptax.toFixed(2)}</h2>
          </div>
          <div className='subtotal'>
            <h1>Tax </h1>
            <h2>S$0.00</h2>
          </div>
          <div className='subtotal'>
            <h1>Pay Total</h1>
            <h2>S${(subtotal + shiptax).toFixed(2)}</h2>
          </div>
          {
              paymentmethod !== '' &&
              selectedaddress.AddressLine1 !== '' && 
              selectedaddress.FloorNo !== '' && 
              selectedaddress.UnitNo !== '' && 
              selectedaddress.AddressLine3 !== ''&& 
              deliverydate !== ''
                ?
              <div className='subtotal'
                onClick={() => {
                  // if (user.B2CCustomerId == null) {
                  //   toast.error('Please Login First')
                  // }
                  // else {
                  //   placeorder()
                  // }
                  // console.log('place order' , selectedaddress)
                  if (user.B2CCustomerId == null) {
                    toast.error('Please Login First')
                  }
                  else if (selectedaddress.AddressLine1 == undefined && selectedaddress.FloorNo == undefined && selectedaddress.UnitNo == undefined && selectedaddress.AddressLine3 == undefined) {
                    toast.error('Please select a delivery address')
                  }

                  // else {
                  //   placeorder()
                  // }

                  else if (paymentmethod == '') {
                    toast.error('Please select a payment method')
                  }

                  else if (deliverydate == '') {
                    toast.error('Please select a delivery date')
                  }

                  else if (paymentmethod == 'STRIPE') {
                    // setcardDetailsPopup(true)
                    savepreorderobjtoLS()
                    const preorderarray = JSON.parse(localStorage.getItem('preorderarray'));
                    if (!preorderarray) {
                      // Handle the case where preorderarray is not found in local storage
                      toast.error('Preorder data not found');
                      return;
                    }
                    makePayment(preorderarray)
                   // window.open('/payment', '_self')
                  }

                  else if (paymentmethod == 'COD') {
                    // 
                    placeorder()

                  }

                  else {
                    toast.error('Something went wrong')
                  }
                }
                }
              >
                <button>
                  {boxLoad ? <CircularProgress sx={{color:'white'}} /> : "Order Now"}
                  </button>
              </div>
              :
              <div className='subtotal disabled'
                onClick={() => {
                  toast.error('Please select a payment method, delivery address and delivery date')
                }}
              >
                <button>
                        {boxLoad ? <CircularProgress sx={{color:'white'}} /> : "Order Now"}
                </button>
              </div>
          }
        </div>
      </div>
      <Footer2 />
    </div>
  )
}

export default Checkout