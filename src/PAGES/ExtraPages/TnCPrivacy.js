import React, { useEffect } from 'react'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import img1 from '../../COMPONENTS/Banners/img1.png'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import './Extrapage.css'
import { Link } from 'react-router-dom'
const TnCPrivacy = () => {
 
    return (
        <div className='extrapageout'>
            <Navbar />
            <SingleBanner bannerimage={img1} heading={'About Us'} />

            <div className='extrapagein'>
                <div className='c1'>
                    <h1>Terms & conditions – Privacy Policy:</h1>
                    <ol>
                        <li>
                            <p>
                                <span>Introduction</span>&nbsp;&nbsp;&nbsp;<br></br>

                                Welcome to CATCHYFIVE PTE. LTD.<br></br>
                                <br />
                                Please note that our team regulates your access and usage of our website located at www.catchyfive.com & Mobile Applications subject to the following notices, Terms and Conditions. <br></br>
                                <br />
                                These following Terms and Conditions and our Privacy Policy are part of the agreement that you have with us. Hence, we entrust your acknowledgement that you have read and comprehend the Terms and Conditions and our Privacy Policy and affirm to abide by them<br></br>
                                <br />
                                With any case of disagreement with our Terms and Conditions and our Privacy Policy, then you might not want to use the Service in CatchyFive, however essentially you could email us at help@catchyfive.com so that we could suffice you with a solution speedily<br></br>
                            </p>


                        </li>
                        <br></br>
                        <li>
                            <p>
                                <span>Communications</span>&nbsp;&nbsp;&nbsp;<br></br>
                                <br />
                                In order to purchase any product or service through CatchyFive, you may have to provide some sensitive details related to your purchase or transaction including but not restricted to, your credit or debit card number, the expiration date of your card, card verification value (CVV), your billing address, and your shipping information<br></br>
                                <br />You represent and warrant that:<br></br>
                                <br />You have the legal right to use any card(s) or other payment methods in connection with any Purchase;<br></br>
                                <br />The information and credentials that you provide us is genuine, accurate and complete.
You must accept the Terms & Conditions and the Refund and Cancellation policy before proceeding with the payment<br></br>
<br />We may employ the use of third-party services for the purpose of facilitating payment and the completion of purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.<br></br>
<br />We reserve the right to refuse or cancel your order at any time for reasons including but not limited to product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.
<br></br>
<br />                           
We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.
<br></br>
<br />
                            </p>


                        </li>
                        {/* <div className='images2'>
                            <img src='https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout-us%2F1.png&w=640&q=75'
                                alt='noimg' />

                            <img src='https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout-us%2F2.png&w=640&q=75'
                                alt='noimg' />
                        </div> */}
                        <li>
                            <p>
                                <span>Delivery</span>&nbsp;&nbsp;&nbsp;<br></br>

                            </p>
                            <p>Warehouse Processing Time</p>
                            <br/>
                            <ol type='i'>
                                <li>
                                    <p>All the customers’ orders require at least 1 business day for warehouse processing.</p>
                                </li>
                            </ol>
                            <br />
                            <p>Standard Shipping Time & Fee</p>
                            <br/>
                            <ol type='i'>
                                <li>
                                    <p>
                                        Free shipping on orders over $79
                                    </p>
                                </li>

                                <li>
                                    <p>
                                    Flat $7 shipping charge on orders less than $79
                                    </p>
                                </li>
                                <li>
                                    <p>Delivery timings range between 10:30 AM - 09:30 PM every day</p>
                                </li>
                                <li>
                                    <p>
                                    Delivery will be done in 1 - 3 days
                                    </p>
                                </li>
                                <li>
                                    <p>
                                    We offer doorstep delivery at your stated delivery address 

                                    </p>
                                </li>
                            </ol>
                            <br />
                            <p>If there are any amendments in the delivery address / personal contact details between the submission of order and delivery date, customers are required to make any changes at least 24 hours prior to delivery. A surcharge of $6 (incl. of GST) will be applied to the order, if there should be any delay of delivery date and time be required for. A surcharge of $25 (incl. of GST) will be applied to the order, if the requests for a delay in delivery date and time are for bulk orders. 


                            </p>
                            <br />
                        </li>

                        <li>
                            <p>
                                <span>Cancellation of Orders</span><br></br>
                                <br/>
                               <p>
                               In the event the Customer cancels their order (except for bulk orders/purchases) at least 24 hours before delivery, there will be no charge.
Subsequently, an additional cancellation charge of $20 (inc.of GST) for home delivery and $30 (inc.of GST) for bulk order delivery is imposed on each order canceled.
                               </p>
                               <br/>
                            </p>
                        </li>

                       

                        <li>
                            <p>
                                <span>Return, Refunds & Exchange</span> <br/>
                                In the event that you need to return a product to Catchy Five, whether due to the cancellation of the contract, disagreement with changes in our Terms and Conditions or Policies, a claimed defect, or overall dissatisfaction with the product, we will carefully examine the returned item. Upon satisfaction with the product's condition post-examination, we will proceed to either replace the item (if returned due to a defect) or issue a refund. Refunds will typically be processed using the original payment method, and we aim to complete the refund process as promptly as possible.
                                <br/>
                                For products returned within the seven-day cooling-off period or due to a defect, we will provide a full refund after deducting any applicable delivery costs.
                                <br/>
                                Any claim regarding a shortfall in the quantity of products delivered, in comparison to the quantity ordered, must be communicated to Catchy Five help center within 2 days from the date of delivery. Failure to notify us within this timeframe will absolve us of any liability related to the shortfall, and you will be obligated to pay the price as if the products were delivered in accordance with the contract.
                                <br/>
                                The expenses associated with the return transportation of the product are to be covered by you.
                                <br/>

                            </p>
                        </li>

                        <li>
                            <p>
                                <span> Acceptance of Terms</span> <br/>
                                By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you may choose not to access or use our Service.
                                <br></br>  <br/>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span>Modifications</span> <br/>
                                CatchyFive PTE. LTD. reserves the right to modify, suspend, or discontinue the Service at any time without prior notice. We may also update these Terms and Conditions periodically. Your continued use of the Service after any changes will constitute your acceptance of such changes.
<br/>
                            </p>
                        </li>
                        {/* <div className='images3'>
                    <img src='https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout-us%2F1.png&w=640&q=75'
                        alt='noimg' />

                    <img src='https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout-us%2F2.png&w=640&q=75'
                        alt='noimg' />

                    <img src='https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout-us%2F1.png&w=640&q=75'
                        alt='noimg' />
                </div> */}
                        <li>
                            <p>
                                <span> User Accounts</span> <br></br>
                                To access certain features of the Service, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to accept responsibility for all activities that occur under your account.
                <br/>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span> User Conduct</span> <br></br>
                                You agree to use the Service in accordance with all applicable laws and regulations. You shall not engage in any conduct that may disrupt the functionality of the Service, interfere with other users, or compromise the security of the Service.
                                <br/>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span> Intellectual Property</span> <br></br>
                                All content, trademarks, logos, and other intellectual property on the Service are the property of CatchyFive PTE. LTD. and are protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works based on such content without explicit permission.
                                <br/>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span>Privacy policy</span> <br></br>
                                Your use of the Service is also governed by our Privacy Policy, which can be found at [link to your privacy policy]. Please review the Privacy Policy to understand how we collect, use, and disclose your information.
                <br/>
                            </p>
                        </li>
                    </ol>
                </div>

                {/* 

                <div className='c1'>

                    <p>We may automatically track certain information about you based upon your behavior on the website. We use this information to do internal research on our users’ demographics, interests, and behavior to better understand, protect and serve our users. This information is compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on the website or not), which URL you next go to (whether this URL is on the website or not), your computer browser information, your IP address, and other information associated with your interaction with the website. We may also share your Mobile IP/Device IP with third party(ies) and to the best of our knowledge, be-life and representations given to us by these third party(ies) this information is not stored.<br></br><br></br>
                        Our Privacy Policy is incorporated into the Terms and Conditions of Use of the website/app, and is subject to change from time to time without notice. It is strongly recommended that you periodically review our Privacy Policy as posted on the App/Web.
                        <br></br><br></br>
                        Should you have any clarifications regarding this Privacy Policy, please do not hesitate to contact us at  info@borobazar.com .</p>
                </div>

               

                <div className='c1'>
                    <p>We may automatically track certain information about you based upon your behavior on the website. We use this information to do internal research on our users’ demographics, interests, and behavior to better understand, protect and serve our users. This information is compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on the website or not), which URL you next go to (whether this URL is on the website or not), your computer browser information, your IP address, and other information associated with your interaction with the website. We may also share your Mobile IP/Device IP with third party(ies) and to the best of our knowledge, be-life and representations given to us by these third party(ies) this information is not stored.<br></br><br></br>
                        Our Privacy Policy is incorporated into the Terms and Conditions of Use of the website/app, and is subject to change from time to time without notice. It is strongly recommended that you periodically review our Privacy Policy as posted on the App/Web.
                        <br></br><br></br>
                        Should you have any clarifications regarding this Privacy Policy, please do not hesitate to contact us at  info@borobazar.com .</p>
                </div>

                <SingleBanner bannerimage={img1} heading={'About Us'} />


                <div className='c1'>
                    <h1>Be safe, be secure!!</h1>
                    <p>We may automatically track certain information about you based upon your behavior on the website. We use this information to do internal research on our users’ demographics, interests, and behavior to better understand, protect and serve our users. This information is compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on the website or not), which URL you next go to (whether this URL is on the website or not), your computer browser information, your IP address, and other information associated with your interaction with the website. We may also share your Mobile IP/Device IP with third party(ies) and to the best of our knowledge, be-life and representations given to us by these third party(ies) this information is not stored.<br></br><br></br>
                        Our Privacy Policy is incorporated into the Terms and Conditions of Use of the website/app, and is subject to change from time to time without notice. It is strongly recommended that you periodically review our Privacy Policy as posted on the App/Web.
                        <br></br><br></br>
                        Should you have any clarifications regarding this Privacy Policy, please do not hesitate to contact us at  info@borobazar.com .</p>
                </div>
                 */}
                 <div className='c1'>
                    <h2>For any inquiries or concerns regarding these Terms and Conditions, please contact us at help@catchyfive.com. We are committed to resolving any issues promptly and efficiently.</h2>
                    <p>By using the Service, you agree to abide by these Terms and Conditions. Thank you for choosing CatchyFive PTE. LTD.  <span
                     onClick={() => {
                        window.scrollTo(0, 0)
                     }}
                    >
                        <Link to='/contact'
                            style={{ textDecoration: 'none', color: 'black' }}
                        >Contact Us</Link>
                        </span>  page.</p>
                </div>
            </div>

            <Footer1 />
            <Footer2 />
        </div>
    )
}

export default TnCPrivacy