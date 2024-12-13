import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/user/Homepage";
import Userlayout from "../layout/Userlayout";
import AboutPage from "../pages/user/AboutPage";
import Courses from "../pages/user/Courses";
import LoginPage from "../pages/shared/LoginPage";
import SignupPage from "../pages/user/SignupPage";
import CartPage from "../pages/user/CartPage";
import Ordersuccess from "../pages/user/Ordersuccess";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Userlayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "",
                element: <Homepage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "courses",
                element: <Courses />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "payment/success",
                element: <Ordersuccess />
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
        ]
    },

]);