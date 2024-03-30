import React from 'react'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import img1 from '../../COMPONENTS/Banners/img1.png'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import './Extrapage.css'
const About = () => {

    const screenwidth = window.innerWidth

    
    return (
        <div className='extrapageout'>
            <Navbar />
            <SingleBanner bannerimage={img1} heading={'Contact Us'} />
            <div className='contactformout'>
                <div className='contactformleft'>
                    <div className='c1'>
                        <h1>Support is our main priority</h1>
                        <p>Our support team is available 24/7 to answer your questions and help you with any issues you might have.

                        </p>
                    </div>
                </div>
                <div className='contactformright'>
                    <div className='formcont'>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name='name' id='name'
                            placeholder='Enter your Full Name'
                        />
                    </div>

                    <div className='formcont'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name='email' id='email'
                            placeholder='Enter your Email Address'
                        />
                    </div>

                    <div className='formcont'>
                        <label htmlfor="phone" >Phone Number</label>
                        <input type="text" name='phone' id='phone'
                            placeholder='Enter your Phone Number'
                        />
                    </div>

                    <div className='formcont'>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" cols="30" rows="10"
                        ></textarea>
                    </div>

                    <button className='submitbtn'>Send Message</button>

                </div>

            </div>

            <div className='c2'>
                <div className='c2in'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>
                        <h1>Office Location</h1>
                        <p>1234 Street Name, City Name, United States</p>
                    </div>
                </div>

                <div className='c2in'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                    <div>
                        <h1>Send Mail</h1>
                        <p>support@demoagency.com hire.us@demoteam.io</p>
                    </div>
                </div>

                <div className='c2in'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                    </svg>


                    <div>
                        <h1>Call us anytime</h1>
                        <p>Our Contact Number +91 7000896210</p>
                    </div>
                </div>
            </div>


            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7335.952226846823!2d79.91225512735242!3d23.171071889512167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b1e3dded7037%3A0x700e5fdfc761ba26!2sYadav%20Colony%2C%20Jabalpur%2C%20Madhya%20Pradesh%20482002%2C%20India!5e0!3m2!1sen!2sus!4v1679916662671!5m2!1sen!2sus"
                width={screenwidth}
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <Footer1 />
            <Footer2 />
        </div>
    )
}

export default About