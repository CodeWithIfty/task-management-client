import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../utils/context/AuthProvider";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, SignInWithGoogle, updateUserProfile, user } =
    useContext(authContext);
  const navigate = useNavigate();

  // Registering via email and password
  const handleFormSubmit = async (e) => {
    const toastId = toast.loading("Creating Account ...");
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userCredintial = { name, email, password };
    console.log(userCredintial);
    try {
      const res = await createUser(email, password);
      console.log(res);
      await updateUserProfile(name);
      toast.success("Successfully Registered !", { id: toastId });
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error);
      if (error.message.match(/email-already-in-use/g))
        toast.error("This email already in use", { id: toastId });
      console.log(error.message);
    }
  };

  // Sign up using google
  const handleSignInWithGoogle = () => {
    const toastId = toast.loading("Logging in ...");
    SignInWithGoogle()
      .then(() => {
        toast.success("Logged in", { id: toastId });
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh]">
        <div className="w-full bg-white rounded-lg shadow-xl border  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign Up From Here
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Full Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter your name here..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a strong password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline text-primary underline"
                >
                  Sing In
                </Link>
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="py-2 px-4 border rounded-full  flex items-center gap-2 text-lg bg-white"
                  onClick={handleSignInWithGoogle}
                >
                  <FcGoogle className="text-3xl" />
                  <span>Register With Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
