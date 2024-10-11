import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./navigation.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [logoutApiCall] = useLogoutMutation();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ zIndex: 999 }} className={`${showSideBar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container">
      <div className="flex flex-col justify-center space-y-4">
        <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link to="/cart" className="flex relative items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>

          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">{cartItems.reduce((a, c) => a + Number(c.qty), 0)}</span>
              </span>
            )}
          </div>
        </Link>
        <Link to="/favorite" className="flex items-center transition-transform transform hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropDown} className="flex items-center text-gray-8000 focus:outline-none">
          {userInfo ? <span className="text-white">{userInfo.username}</span> : <></>}
          {userInfo && (dropDownOpen ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />)}
        </button>

        {dropDownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 mr-4 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="block  px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/productlist" className="block  px-4 py-2 hover:bg-gray-100">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categorylist" className="block  px-4 py-2 hover:bg-gray-100">
                    Category
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orderlist" className="block  px-4 py-2 hover:bg-gray-100">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/userlist" className="block  px-4 py-2 hover:bg-gray-100">
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block  px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Logout
              </button>
            </li>
          </ul>
        )}

        {!userInfo && (
          <ul>
            <li>
              <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
