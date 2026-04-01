import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

const HeroSection = () => {

    return (
        <section className='heroSection' id='heroSection'>
            <Navbar />
            <div className="container">
                <div className="banner">
                    <div className="largeBox">
                        <h1 className='title'>Delicious Food</h1>
                        <p className='subtitle'>Experience the finest culinary creations crafted with fresh ingredients and authentic flavors</p>
                        <p className='description'>From traditional recipes to modern innovations, every dish is prepared with passion and care. Join us for an unforgettable dining experience.</p>
                        <Link to="/reservation" className="ctaBtn">
                            Reserve Now{" "}
                            <span><HiOutlineArrowNarrowRight/></span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection

