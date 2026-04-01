import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const MenuPage = () => {
    const [dishes, setDishes] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

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

    const categories = ['All', ...new Set(dishes.map((d) => d.category))];

    const filteredDishes =
        activeCategory === 'All'
            ? dishes
            : dishes.filter((d) => d.category === activeCategory);

    return (
        <section className="menuPage">
            <div className="menuPage_header">
                <Link to="/" className="menuPage_back">
                    ← Back to Home
                </Link>
                <h1 className="heading">OUR MENU</h1>
                <p>Explore our complete collection of dishes prepared with love</p>
            </div>

            <div className="menuPage_filters">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={activeCategory === cat ? 'active' : ''}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="menuPage_grid">
                {filteredDishes.map((dish) => (
                    <Link to={`/dish/${dish._id}`} key={dish._id} className="menuPage_card">
                        <div className="menuPage_card_img">
                            <img src={dish.image} alt={dish.title} />
                            <span className="menuPage_card_category">{dish.category}</span>
                        </div>
                        <div className="menuPage_card_info">
                            <h3>{dish.title}</h3>
                            <p className="menuPage_card_desc">{dish.description}</p>
                            <div className="menuPage_card_bottom">
                                <span className="menuPage_card_price">{dish.price}</span>
                                <span className="menuPage_card_view">
                                    View Details <HiOutlineArrowNarrowRight />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MenuPage;
