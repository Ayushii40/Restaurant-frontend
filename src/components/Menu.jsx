import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const Menu = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/dish/getall`);
                setDishes(data.dishes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDishes();
    }, []);

    const displayDishes = dishes.slice(0, 4);

    return (
        <section className='menu' id='menu'>
            <div className="container">
                <div className="heading_section">
                    <h1 className='heading'>POPULAR DISHES</h1>
                    <p>Experience the finest selection of our most loved culinary creations, prepared fresh daily.</p>
                </div>
                <div className="dishes_container">
                    {displayDishes.map((element) => {
                        return (
                            <Link to={`/dish/${element._id}`} className="card" key={element._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={element.image} alt={element.title} />
                                <h3>{element.title}</h3>
                                <button>{element.category}</button>
                            </Link>
                        )
                    })}
                </div>
                {dishes.length > 4 && (
                    <Link to="/menu" className="seeMoreBtn">
                        See More{" "}
                        <span><HiOutlineArrowNarrowRight /></span>
                    </Link>
                )}
            </div>
        </section>
    )
}

export default Menu
