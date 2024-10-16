import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
const initialFormData = {
  name: "",
  email: "",
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 5000);
    }
  }, [error]);

  useEffect(() =>{
    if(userData.isLogin){
      navigate(redirectpath || "/")
    }
  },[])

  const redirectpath = new URLSearchParams(useLocation().search).get("redirect");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "password" ? e.target.value : e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestPath = isLogin ? "/api/login" : "/api/register";
      const res = await (
        await fetch(requestPath, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      ).json();

      if (res.success) {
        if(isLogin){
          setUserData({isLogin: true, data: res.data})
          navigate(redirectpath || "/")
        }else{
          setIsLogin(true)
        }
      } else throw new Error(res.message);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <form
          className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <p className="m-0 text-[16px] font-semibold dark:text-white">
                {isLogin ? "Login to your Account" : "Register For New Account"}
              </p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy
                experience.
              </span>
            </div>
            {isLogin || (
              <>
                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-400">
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                    required
                  />
                </div>
              </>
            )}
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                placeholder="Email"
                name="email"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                required={!isLogin}
              />
            </div>
            {isLogin && <p>or</p>}
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">
                Username
              </label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Username"
                name="username"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                required={!isLogin}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              name="password"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
          <div className="w-full text-red-500 font-semibold mt-2 text-center text-sm">
            {error}
          </div>
          <div className="w-full text-right text-sm mt-5">
            <p
              className="cursor-pointer text-blue-300 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't Have any Account" : "Already Have a Account"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
