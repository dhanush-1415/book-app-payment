import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { newAddressProvider } from '../../Providers/NewAddressProvider'
import { updateAddressProvider } from '../../Providers/UpdateAddressProvider'
import AddNewAddress from '../Address/AddNewAddress'
import UpdateAddress from '../Address/UpdateAddress'
import './UserAddress.css'

const UserAddress = () => {
    const [show, setShow] = React.useState(false)
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

    //const [isUpdateAddressOpen, setIsUpdateAddressOpen] = React.useState(false);
    const [isUpdateAddressOpen, setIsUpdateAddressOpen] = useRecoilState(updateAddressProvider)

  const openUpdateAddress = (address) => {
    setselectedaddress(address);
    setIsUpdateAddressOpen(true);
  };

  //const [isAddNewAddressOpen, setIsAddNewAddressOpen] = React.useState(false);
  const [isAddNewAddressOpen, setIsAddNewAddressOpen] = useRecoilState(newAddressProvider)

  const openAddNewAddress = () => {
    setIsAddNewAddressOpen(true);
  };

//   const closeAddNewAddress = () => {
//     setIsAddNewAddressOpen(false);
//   };
    const [savedaddresses, setsavedaddresses] = React.useState([])

    // const getaddress = (userdata) => {
    //     // console.log(userdata)
    //     let mainaddress = {
    //         AddressLine1: userdata?.AddressLine1,
    //         FloorNo : userdata?.FloorNo,
    //         UnitNo : userdata?.UnitNo,
    //         AddressLine3: userdata?.AddressLine3,
    //         EmailId: userdata.EmailId,
    //         default: true
    //     }
    //     let otheraddress = [];
    //     fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerDeliveryAddress/GetAll?OrganizationId=3&CustomerId=' + userdata.B2CCustomerId)
    //         .then(res => res.json())
    //         .then(data => {
                
    //             if (data.Data != null) {
    //                 otheraddress = data.Data
    //                 if (mainaddress.AddressLine1 == '' && mainaddress.FloorNo == '' && mainaddress.UnitNo == '' && mainaddress.AddressLine3 == '') {
    //                     let alladdress = [
    //                         ...otheraddress
    //                     ]
    //                     setsavedaddresses(alladdress)
    //                     // console.log(alladdress)

    //                 }

    //                 else {
    //                     let alladdress = [
    //                         ...otheraddress,
    //                         mainaddress
    //                     ]
    //                     setsavedaddresses(alladdress)
    //                     // console.log(alladdress)
    //                 }

    //             }
    //             else {
    //                 let alladdress = [
    //                     mainaddress
    //                 ]
    //                 if (mainaddress.AddressLine1 == '' && mainaddress.FloorNo == '' && mainaddress.UnitNo == '' && mainaddress.AddressLine3 == '') {
    //                     setsavedaddresses([])
    //                     console.log('no address')
    //                 }
    //                 else {
    //                     setsavedaddresses(alladdress)
    //                     console.log(alladdress)

    //                 }

    //             }
    //         })
    //     // let alladdress = []
    //     // if (userdata.Address) {
    //     //     alladdress = [
    //     //         ...userdata.Address,
    //     //         mainaddress
    //     //     ]
    //     //     setsavedaddresses(alladdress)
    //     // }
    //     // else {
    //     //     alladdress = [
    //     //         mainaddress
    //     //     ]
    //     //     setsavedaddresses(alladdress)
    //     // }

    // }
    const getaddress = (userdata) => {
        let mainaddress = {
            AddressLine1: userdata?.AddressLine1,
            FloorNo: userdata?.FloorNo,
            UnitNo: userdata?.UnitNo,
            AddressLine3: userdata?.AddressLine3,
            EmailId: userdata.EmailId,
            default: true
        };
    
        let otheraddress = [];
    
        fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerDeliveryAddress/GetAll?OrganizationId=3&CustomerId=' + userdata.B2CCustomerId)
            .then(res => res.json())
            .then(data => {
                if (data.Data != null) {
                    otheraddress = data.Data;
    
                    // Check if mainaddress is already present in otheraddress
                    const mainAddressExists = otheraddress.some(address =>
                        address.AddressLine1 === mainaddress.AddressLine1 &&
                        address.FloorNo === mainaddress.FloorNo &&
                        address.UnitNo === mainaddress.UnitNo &&
                        address.AddressLine3 === mainaddress.AddressLine3
                    );
    
                    if (!mainAddressExists) {
                        // Combine otheraddress with mainaddress
                        let alladdress = [...otheraddress, mainaddress];
                        setsavedaddresses(alladdress);
                    } else {
                        // Mainaddress is already present, set otheraddress
                        setsavedaddresses(otheraddress);
                    }
                } else {
                    let alladdress = [mainaddress];
                    if (mainaddress.AddressLine1 === '' && mainaddress.FloorNo === '' && mainaddress.UnitNo === '' && mainaddress.AddressLine3 === '') {
                        setsavedaddresses([]);
                        console.log('no address');
                    } else {
                        setsavedaddresses(alladdress);
                        console.log(alladdress);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching addresses:', error);
            });
    };
    
    React.useEffect(() => {
        checklogin()
    }, [])



    const [shownewaddressform, setShownewaddressform] = useRecoilState(newAddressProvider)
    // remove address
    const removeaddress = (address) => {
        console.log(address)
        if (address.default == true) {
            toast.error('Default Address Cannot be Removed')
            return
        }
        let temp = process.env.REACT_APP_BACKEND_URL + `/B2CCustomerDeliveryAddress/Remove?OrganizationId=3&CustomerId=${user.B2CCustomerId}&DeliveryId=${address.DeliveryId
            }&UserName=${user.EmailId}`

        fetch(temp, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.Message == 'Sucess') {
                    toast.success('Address Removed', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                    })
                    getaddress(user)
                }
            })
    }
    const [selectedaddress, setselectedaddress] = React.useState({})

    return (
        <div className='useraddress'>
            <ToastContainer />

            {isAddNewAddressOpen && <AddNewAddress user={user} getaddress={getaddress}  />}
      {isUpdateAddressOpen && <UpdateAddress user={user} address={selectedaddress} />}

            <h1 className='mainhead1'>Your Address</h1>

            <div className='addressin'>
             
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
                            onClick={() => console.log(item)}
                            >
                                {
                                    item.IsDefault == true && <span className='default'>Default</span>
                                }
                                <p  onClick={() => openUpdateAddress(item)}>
                                    {
                                        item.AddressLine1 && <span>{item.AddressLine1}</span>
                                    }
                                    {
                                        item.FloorNo && <span>, {item.FloorNo}</span>
                                    }
                                    {
                                        item.UnitNo && <span>, {item.UnitNo}</span>
                                    }
                                    {
                                        item.AddressLine3 && <span>, {item.AddressLine3}</span>
                                    }
                                  
                                 </p>
                                <button className='delbtn'
                                    onClick={() => removeaddress(item)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {/* <button className='editbtn' onClick={() => openUpdateAddress(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3l-1 1-4-4-1-1-1 1-4 4 9 9 4-4z" />
  </svg>
                                </button> */}
                            </div>
                        )
                    })
                }
                <div className='addresscontainer'
                    onClick={() => {

                        if (user.B2CCustomerId == null) {
                            toast.error('Please Login First')
                        }
                        else {
                           // setShownewaddressform(true)
                           openAddNewAddress()
                        }
                    }}
                >
                    <h2><span>+</span> Add Address</h2>
                </div>
            </div>

            <div className='addnewbtn' onClick={() => setShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </div>
        </div>


    )
}

export default UserAddress
