import React from 'react'
import { useRecoilState } from 'recoil'
import { newAddressProvider } from '../../Providers/NewAddressProvider'
import './AddNewAddress.css'
import logo from '../../ASSETS/logo.png'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { Grid, Paper, Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const AddNewAddress = ({ user, getaddress }) => {
  const [shownewaddressform, setShownewaddressform] = useRecoilState(newAddressProvider)


  const [newaddress, setnewaddress] = React.useState({
    AddressLine1: '',
    AddressLine2: '',
    AddressLine3: '',
    FloorNo: '',
    UnitNo: '',
    IsDefault: true,
  })


  const [postalcode, setpostalcode] = useState('');
  const [errorPostalCode, setErrorPostalCode] = useState('');
  const [errorFloorNumber, setErrorFloorNumber] = useState('');
  const [errorUnitNumber, setErrorUnitNumber] = useState('');
  const [boxLoad , setboxload ] = React.useState(false);
  const [boxLoad2 , setboxload2 ] = React.useState(false);

  const addnewaddress = () => {
    setboxload(true);

    var checkbox = document.getElementById("defaultcheck");
    let temp =
    {
      "OrgId": 3,
      "DeliveryId": 0,
      "CustomerId": user.B2CCustomerId,
      "Name": user.B2CCustomerName,
      "AddressLine1": newaddress.AddressLine1,
      "AddressLine2": newaddress.AddressLine2,
      "AddressLine3": newaddress.AddressLine3,
      "CountryId": "string",
      "PostalCode": postalcode,
      "Mobile": user.MobileNo,
      "Phone": "string",
      "Fax": "string",
      "IsDefault": checkbox.checked,
      "IsActive": true,
      "CreatedBy": "string",
      "CreatedOn": new Date(),
      "ChangedBy": "string",
      "ChangedOn": new Date(),
      "FloorNo": newaddress.FloorNo,
      "UnitNo": newaddress.UnitNo
    }
    if (!postalcode) {
      setboxload(false);
      setErrorPostalCode('Postal Code is required.');
      return;
    }

    if (!newaddress.FloorNo) {
      setboxload(false);
      setErrorFloorNumber('Floor number is required.');
      return;
    }

    
    if (!newaddress.UnitNo) {
      setboxload(false);
      setErrorUnitNumber('Unit number is required.');
      return;
    }

    // Clear any previous errors
    setErrorPostalCode('');
    setErrorFloorNumber('');
    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerDeliveryAddress/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(temp)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.Status === true && data.Code === 200) {
          setboxload(false);
          toast.success('Address Added')
          updateuserdata()
          // after 2 seconds, set the state to false
          setTimeout(() => {
            setShownewaddressform(false)
          }, 2000)

        }
        else {
          setboxload(false);
          toast.error('Error Adding Address')
        }
      })

    // console.log(temp)

  }


  // const updateuserdata = () => {
  //   let user = localStorage.getItem('token')
  //   user = JSON.parse(user)
  //   // console.log('user customer id',user[0])
  //   fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerRegister/GetbycodeOrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION+'&B2CCustomerId=' + user[0].B2CCustomerId, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       if (data.Status === true && data.Code === 200) {
  //         localStorage.setItem('token', JSON.stringify(data.Data))
  //         // setShownewaddressform(false)
  //         window.location.reload()
  //       }
  //       else {
  //         toast.error('Error Fetching User Data')
  //       }
  //     })
  // }
  const updateuserdata = () => {
    let user = localStorage.getItem('token')
    user = JSON.parse(user)
    // console.log('user customer id',user[0])
    fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerRegister/Getbycode?OrganizationId=' + process.env.REACT_APP_BACKEND_ORGANIZATION + '&B2CCustomerId=' + user[0].B2CCustomerId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.Status === true && data.Code === 200) {
          localStorage.setItem('token', JSON.stringify(data.Data));
          window.location.reload();
        } else {
          toast.error('Error Fetching User Data');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to fetch user data');
      });
  
  }



  function toggleCheckbox() {
    var checkbox = document.getElementById("defaultcheck");
    checkbox.checked = !checkbox.checked;

    setnewaddress({
      ...newaddress,
      IsDefault: checkbox.checked
    })

    console.log(newaddress)
  }


  return (
    <div
      className='add-new-address-out'
    >
      <ToastContainer theme='dark' />
      <div
        className='add-new-address-in'
      >
        <button className='auth-popup__close-btn'
          onClick={() => {
            setShownewaddressform(false)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>


        <form>
          <h1>Add New Address</h1>
          <div className='formcont'>
            {/* <label htmlFor='postalcode'>Postal Code <span className='mandatory'>*</span></label> */}
            <label htmlFor='postalcode'>Postal Code {errorPostalCode && <span className='error-msg' > - {errorPostalCode}</span>} <span className='mandatory'>*</span></label>
            <Grid container direction='row' style={{backgroundColor:'#02B290' }}>
            <Grid item md={6}>
            <input type='text' name='postalcode' id='postalcode'
                value={postalcode}
                onChange={(e) => {
                  setpostalcode(e.target.value)
                }}
              />
            </Grid>
             
                <Grid item md={6}>
                <button 
  onClick={async (e) => {
    setboxload2(true);
    e.preventDefault();
    if (!postalcode) {
      setErrorPostalCode('Postal Code is required.');
      return;
    }

    // Clear previous errors
    setErrorPostalCode('');
    // let url = `https://developers.onemap.sg/commonapi/search?searchVal=${postalcode}&returnGeom=N&getAddrDetails=Y&pageNum=1`;
    let url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalcode}&returnGeom=N&getAddrDetails=Y&pageNum=1`;
    const response = await fetch(url);
    const data = await response.json();
console.log('API response:', data);

    // Check if data.results has at least one element
    if (data.results && data.results.length > 0) {
      let addressLine3 = data.results[0].BUILDING !== 'NIL' ? `${data.results[0].BUILDING}, SINGAPORE ${postalcode}` : `SINGAPORE ${postalcode}`;
      setnewaddress(prevAddress => ({
        ...prevAddress,
        AddressLine1: `${data.results[0].BLK_NO} ${data.results[0].ROAD_NAME}`,
        AddressLine3: addressLine3
      }));
      setboxload2(false);
    } 
    else {
      console.log('No results found.');
      // Handle when no results are found
    }
  }}
> {boxLoad2 ? <CircularProgress sx={{color:'white'}} /> : "Fetch"}</button>
                </Grid>
            </Grid>
          </div>
          <div className='formcont'>
            <label htmlFor='addressline1'>Address Line 1 </label>
            <input type='text' name='addressline1' id='addressline1'
              value={newaddress.AddressLine1}
              onChange={(e) => {
                e.preventDefault()
                setnewaddress({ ...newaddress, AddressLine1: e.target.value })
              }}
            />
          </div>
          <div className='formcont addun'>
          <div style={{width:'48%' , display:'flex' , flexDirection:'column'}}>
            <label htmlFor='addressline2'>Floor no {errorFloorNumber && <span className='error-msg'> - {errorFloorNumber}</span>} <span className='mandatory'>*</span></label>
            <input type='text' name='addressline2' id='addressline2'
              value={newaddress.FloorNo}
              onChange={(e) => {
                e.preventDefault()
                setnewaddress({ ...newaddress, FloorNo: e.target.value })
                setErrorFloorNumber('');
              }}
            />
          </div>
          <div style={{width:'49%' , display:'flex' , flexDirection:'column'}}>
          <label htmlFor='addressline3'>Unit no {errorUnitNumber && <span className='error-msg'> - {errorUnitNumber}</span>} <span className='mandatory'>*</span></label>
            <input type='text' name='addressline3' id='addressline3'
              value={newaddress.UnitNo}
              onChange={(e) => {
                e.preventDefault()
                setnewaddress({ ...newaddress, UnitNo: e.target.value })
                setErrorFloorNumber('');
              }}
            />
          </div>
          </div>

          <div className='formcont'>
            <label htmlFor='addressline4'>Address Line 3</label>
            <input type='text' name='addressline4' id='addressline4'
              value={newaddress.AddressLine3}
              onChange={(e) => {
                e.preventDefault()
                setnewaddress({ ...newaddress, AddressLine3: e.target.value })
              }}
            />
          </div>
          <div className='formcont1'>
            <label>Set as Default</label>
            <input type='checkbox' name='default' id='defaultcheck'
              //  check uncheck on single click
            />
          </div>


          <button className='btn'
            onClick={(e) => {
              e.preventDefault()
              addnewaddress()
            }}
          > {boxLoad ? <CircularProgress sx={{color:'white'}} /> : "Save Address"}
          </button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    </div>
  )
}

export default AddNewAddress