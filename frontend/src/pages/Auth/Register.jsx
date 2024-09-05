import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passworts do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input type="text" id="name" className="mt-1 p-2 border rounded w-full" value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Adress
            </label>
            <input type="email" id="email" className="mt-1 p-2 border rounded w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input type="password" id="password" className="mt-1 p-2 border rounded w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded w-full" value={confirmPassword} onChange={(e) => setConformPassword(e.target.value)} />
          </div>

          <button disabled={isLoading} className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-pink-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <img src="register.jpg" alt="" className="h-[100vh] object-cover w-[59%] xl:block md:hidden sm:hidden rounded-lg" />
    </section>
  );
};

export default Register;
