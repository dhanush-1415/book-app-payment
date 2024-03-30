import React, { useState } from 'react'
import './YourOrders.css'
import { useRecoilState } from 'recoil'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'
import OrderSuccessful from '../OrderSuccessful/OrderSuccessful'
import { toast } from 'react-toastify'
import { Grid, Paper, Typography, Button , TextField } from '@mui/material';


const YourOrders = ({ userid, EmailId }) => {
    const data = [
        {
            id: 1,
            date: '12/12/2020',
            status: 'Delivered',
            total: 1000
        },
        {
            id: 2,
            date: '12/12/2020',
            status: 'On the Way',
            total: 1000
        },
        {
            id: 3,
            date: '12/12/2020',
            status: 'Delivered',
            total: 1000
        },
        {
            id: 1,
            date: '12/12/2020',
            status: 'Delivered',
            total: 1000
        },
        {
            id: 2,
            date: '12/12/2020',
            status: 'On the Way',
            total: 1000
        },
        {
            id: 3,
            date: '12/12/2020',
            status: 'Delivered',
            total: 1000
        },
        {
            id: 1,
            date: '12/12/2020',
            status: 'Delivered',
            total: 1000
        },
        {
            id: 2,
            date: '12/12/2020',
            status: 'On the Way',
            total: 1000
        },
        {
            id: 3,
            date: '12/12/2020',
            status: 'Delivered',
            total: 1000
        }
    ]

    const [allorders, setallorders] = React.useState(null)
    const getorders = () => {
        console.log(userid)
        fetch(process.env.REACT_APP_BACKEND_URL + `/B2CCustomerOrder/GetHeaderSearch?searchModel.organisationId=3&searchModel.customerCode=${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.Data[0])
                setallorders(data.Data)
            })
    }

    React.useEffect(() => {
        getorders()
    }, [userid])


    const [odersuccesscont, setodersuccesscont] = useRecoilState(orderSuccessfulProvider)
    const [ordersuccessmessage, setordersuccessmessage] = React.useState('Order Placed Successfully')
    const [ordersuccessdata, setordersuccessdata] = React.useState({})
    const [ordersuccessdataitems , setordersuccessdataitems] = React.useState([])
    const [subtotal, setsubtotal] = React.useState(0)
    const [tax, settax] = React.useState(0)
    const [ordersuccessorderid, setordersuccessorderid] = React.useState('')
    const [shippingcost, setshippingcost] = React.useState(0)
  
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
  
  
            let total = 0;
            let tax = 0;
            let shipping = 0;

            
            if (total >= 80) {
                shipping = 0;
            } else if (total >= 50 && total <= 79) {
                shipping = 3; 
            } else if (total < 50) {
                shipping = 5;
            }


            data.Data[0].OrderDetail.forEach(item => {
              total += item.Price * item.Qty
              tax += item.Tax * item.Qty
            })
            setshippingcost(shipping)
            setsubtotal(total)
            settax(0)
          }
          else {
            toast.error('Error in getting order details')
          }
        })
        .catch((error) => {
          toast.error('Error in getting order details')
        })
    }
  

    return (
        <div className='yourorders'>

            {
                odersuccesscont && <OrderSuccessful orderid={ordersuccessorderid} message={ordersuccessmessage} redirectto={'none'}  orderdata={ordersuccessdata} orderitems={ordersuccessdataitems} tax={tax} subtotal={subtotal} shipping={shippingcost}/>
            }

            <h1 className='mainhead2'>My order list</h1>

            <table>
                <thead>
                    <tr>
                        <th style={{textAlign:'center'}}>Order ID</th>
                        <th style={{textAlign:'center'}}>Order Date</th>
                        <th style={{textAlign:'center'}}>Order Status</th>
                        <th style={{textAlign:'center'}}>Order Total</th>
                        <th style={{textAlign:'center'}}>Order Action</th>
                    </tr>
                </thead>

                <tbody>
                    {allorders && allorders?.map((item, index) => {
                        let status = 'pending'
                        item = {
                            ...item,
                            status: status,
                        }
                        return (
                            <tr key={index}>
                                <td>{item.OrderNo}</td>
                                <td>{item.OrderDateString}</td>
                                <td>
                                    <p className={item.status === 'Delivered' ? 'delivered' : 'ontheway'}></p>
                                    {item.status}</td>
                                <td>S${item.NetTotal
                                }</td>
                                <td style={{maxWidth:'250px'}}>
                                    <Grid container direction='row'>
                                        <Grid item>
                                        <button
                                    className='mainbutton1'
                                    style={{padding:'3px 13px'}}
                                // onClick={() => getsuccessfulorder(item.OrderNo)}
                                onClick={() => {
                                    getsuccessfulorder(item.OrderNo)
                                    setodersuccesscont(true)
                                    setordersuccessorderid(item.OrderNo)
                                    setordersuccessmessage(item.OrderNo)
                                }}
                                >View</button>
                                        </Grid>
                                        <Grid item ml={1}>
                                        <button
                                    className='mainbutton1'
                                    style={{padding:'3px 13px'}}
                                // onClick={() => getsuccessfulorder(item.OrderNo)}
                                
                                >ReOrder</button>
                                        </Grid>
                                    </Grid>
                                    </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default YourOrders