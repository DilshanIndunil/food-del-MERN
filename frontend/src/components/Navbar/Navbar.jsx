/* eslint-disable react/prop-types */
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");

    // eslint-disable-next-line no-unused-vars
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")

    }

    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <li>
                    <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                </li>
                <li>
                    <Link to='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
                </li>
                <li>
                    <Link to='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</Link>
                </li>
                <li>
                    <Link to='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                    : <div className='nav-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Order</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar;
