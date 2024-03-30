import React , {useState , useEffect} from 'react'
import Slider from 'react-slick'
import './BannerSlider.css'
import img1 from './img1.png'
import img2 from './img2.png'

const BannerSlider = () => {
    const data = [
        {
            id: 1,
            image: img1,
            title: 'Fresh Vegetables & Fruits at your doorstep',
            description: 'We deliver fresh vegetables & fruits at your doorstep',
            button: 'htttps://www.google.com'
        },
        {
            id: 2,
            image: img2,
            title: 'Fresh Vegetables & Fruits at your doorstep',
            description: 'Cherries and berries. Sweet peaches and nectarines. Summer baking season is here, and I couldn’t be more delighted.',
            button: 'htttps://www.google.com'
        }
    ]

    const [bannerimages , setbannerimages ] = React.useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    const getbannerdata = () => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/B2CBannerImage/GetAllActive?OrganizationId='+process.env.REACT_APP_BACKEND_ORGANIZATION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data.Data)
                console.log('bannerdata' , data)
                setbannerimages (data.Data)
            })
    }


    React.useEffect(() => {
        getbannerdata()
    }, [])



    const [showBanner, setShowBanner] = useState(
        localStorage.getItem('showBanner') === 'true'
      );
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          const storedShowBanner = localStorage.getItem('showBanner') === 'true';
          setShowBanner(storedShowBanner);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);


    return (
        <div className='bannerslider' style={{display : showBanner ? 'none' : 'block'}}>
            <Slider
            autoplay={true}
            autoplaySpeed={3000}
             
            className='bannerslider' {...settings}>
                {
                    bannerimages.map((item,index) => {
                        return (
                            <div className='imagecont' key={index}>
                                <img src={item.BannerImageFilePath} alt='noimg' />
                                {/* <div className='content'>
                                    <h1>{item.title}</h1>
                                    <span>{item.description}</span>
                                    <button>Shop More</button>
                                </div> */}
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default BannerSlider