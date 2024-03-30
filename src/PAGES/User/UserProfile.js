import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import AccountSettings from '../../COMPONENTS/UserProfile/AccountSettings'
import ChangePassword from '../../COMPONENTS/UserProfile/ChangePassword'
import LegalNotice from '../../COMPONENTS/UserProfile/LegalNotice'
import UserAddress from '../../COMPONENTS/UserProfile/UserAddress'
import UserSidebar from '../../COMPONENTS/UserProfile/UserSidebar'
import YourOrders from '../../COMPONENTS/UserProfile/YourOrders'
import Footer1 from '../../COMPONENTS/Footer/Footer1'

import './UserProfile.css'
import { useRecoilState } from 'recoil'
import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'
import { toast } from 'react-toastify'
import { authPopupState } from '../../Providers/AuthPopupProvider';
import LoyaltyPoints from '../../COMPONENTS/UserProfile/LoyaltyPoints';  

const UserProfile = () => {
  const { activepage } = useParams()
  // alert(activepage)
  const [user, setuser] = React.useState({})

  const [isloggedin, setisloggedin] = React.useState(false)
  const [authPopupShow, setAuthPopupShow] = useRecoilState(authPopupState);

  useEffect(() => {
    let user = localStorage.getItem('token')
    user = JSON.parse(user)
    if (user) {
      // console.log(token)

      // console.log('user customer id',user[0])
      // fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerRegister/GetbycodeOrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION+'&B2CCustomerId=' + user[0].B2CCustomerId, {
        fetch(process.env.REACT_APP_BACKEND_URL + '/B2CCustomerRegister/Getbycode?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION+'&B2CCustomerId=' + user[0].B2CCustomerId, {  
      method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          
          console.log(data.Data)
          setuser(data.Data)
          localStorage.setItem('token', JSON.stringify(data.Data))
          user = localStorage.getItem("token")
          console.log(user.MobileNo);
        })
      // console.log(token)
      // setuser(JSON.parse(token))

      // console.log(JSON.parse(token))
    }
    else {
      // toast.error('Please Login First')
      setAuthPopupShow(true)
    }

  }, [])
 



  return (
    <div className='userprofile'>


      <Navbar />
      <div className='userprofilein'>
        <div className='left'>
          <UserSidebar activepage={activepage} />
        </div>
        <div className='right'>
        {activepage === 'accountsettings' && <AccountSettings user={user} />}
        {activepage === 'yourorders' && <YourOrders userid={user[0]?.B2CCustomerId} EmailId={user[0]?.EmailId} />}
        {activepage === 'loyalty' && <LoyaltyPoints />}
        {activepage === 'address' && <UserAddress />}
        {activepage === 'changepassword' && <ChangePassword userid={user[0]?.B2CCustomerId} oldpass={user[0]?.Password} emailid={user[0]?.EmailId} />}
      </div>
      </div>
      <Footer1 />
    </div>
  )
}

export default UserProfile