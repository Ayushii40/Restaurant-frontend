import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const Success = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCount((preCount) => {
        if (preCount === 1) {
          clearInterval(timeoutId);
          navigate("/");
        }
        return preCount - 1;
      });
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [navigate]);

  return (
    <section className="success">
      <div className="container">
        <img src="/sandwich.png" alt="success" />
        <h1>RESERVATION SUCCESSFUL</h1>
        <p>Your table has been reserved. We are excited to serve you our delicious dishes! Redirecting to home in {count} seconds...</p>
        <Link to="/" className="backBtn">
          Back to Home <span><HiOutlineArrowNarrowRight /></span>
        </Link>
      </div>
    </section>
  )
}

export default Success
