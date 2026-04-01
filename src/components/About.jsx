import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

const About = () => {
  return (
    <section className='about' id='about'>
      <div className="container">
        <div className="banner">
          <div className="top">
            <h1 className='heading'>ABOUT US</h1>
            <p>The only thing we are serious about is food.</p>
          </div>
          <p className='mid'>
            We craft every dish with fresh ingredients and care, delivering a warm dining experience in every bite. Our story is simple: passion for flavor, clean presentation, and friendly hospitality.
          </p>
          {/* <Link to={"/menu"}>Explore Menu{" "} <span><HiOutlineArrowNarrowRight/></span></Link> */}
        </div>
        <div className="banner">
          <img src="/about.png" alt="about" />
        </div>
      </div>
    </section>
  )
}

export default About
