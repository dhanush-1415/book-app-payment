import React, { useEffect, useState } from 'react'
import './SlidingTopText.css'

const SlidingTopText = () => {
    const text = "Free Delivery above $80"
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setAnimate(true);
    }, []);
  
    return (
      <div className={`sliding-text-container ${animate ? 'animate' : ''}`}>
        <span className="sliding-text">{text}</span>
      </div>
    );
}

export default SlidingTopText