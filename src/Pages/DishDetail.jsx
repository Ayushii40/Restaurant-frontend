import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const DishDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [relatedDishes, setRelatedDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/dish/getall');
        const foundDish = data.dishes.find((d) => d._id === id);
        if (foundDish) {
          setDish(foundDish);
          const related = data.dishes
            .filter((d) => d.category === foundDish.category && d._id !== foundDish._id)
            .slice(0, 3);
          setRelatedDishes(related);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDishData();
  }, [id]);

  if (loading) return null;

  if (!dish) {
    return (
      <section className="dishDetail">
        <div className="dishDetail_container">
          <h1>Dish not found</h1>
          <Link to="/menu" className="dishDetail_back">
            ← Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="dishDetail">
      <div className="dishDetail_container">
        <div className="dishDetail_nav">
          <Link to="/menu" className="dishDetail_back">
            ← Back to Menu
          </Link>
        </div>

        <div className="dishDetail_content">
          <div className="dishDetail_image">
            <img src={dish.image} alt={dish.title} />
            <span className="dishDetail_category">{dish.category}</span>
          </div>
          <div className="dishDetail_info">
            <h1>{dish.title}</h1>
            <span className="dishDetail_price">{dish.price}</span>
            <p className="dishDetail_desc">{dish.description}</p>
            <div className="dishDetail_meta">
              <div className="dishDetail_meta_item">
                <span className="label">Category</span>
                <span className="value">{dish.category}</span>
              </div>
              <div className="dishDetail_meta_item">
                <span className="label">Preparation</span>
                <span className="value">25-30 mins</span>
              </div>
              <div className="dishDetail_meta_item">
                <span className="label">Serves</span>
                <span className="value">1-2 persons</span>
              </div>
            </div>
            <Link to="/menu" className="dishDetail_cta">
              Explore Full Menu{' '}
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </Link>
          </div>
        </div>

        {relatedDishes.length > 0 && (
          <div className="dishDetail_related">
            <h2>You May Also Like</h2>
            <div className="dishDetail_related_grid">
              {relatedDishes.map((d) => (
                <Link to={`/dish/${d._id}`} key={d._id} className="dishDetail_related_card">
                  <img src={d.image} alt={d.title} />
                  <h4>{d.title}</h4>
                  <span>{d.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DishDetail;
