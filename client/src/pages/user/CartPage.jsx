import React, { useEffect, useState } from 'react'
import CartCard from '../../components/user/CartCard'
import { getCartItems, makepaymentOnStripe } from '../../services/userServices'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

export default function CartPage() {

    console.log(import.meta.env.PUBLISHED_KEY_STRIPE);

    const [cartItems, setCartitems] = useState([])
    const [total, setTotal] = useState(0)

    const navigate = useNavigate()

    const updateCartFromChild = (id, totalPrice) => {

        setCartitems((prev) => prev.filter(item => item.courseId._id != id))
        setTotal(totalPrice)
    }

    function EmptyCart() {
        return (
            <div className='flex justify-center items-center flex-col h-screen'>
                <p>cart is empty</p>
                <button className="btn btn-primary" onClick={() => navigate("/courses")}>Get Courses</button>
            </div>
        )
    }


    const makePayment = async () => {
        const body = {
            products: cartItems
        }

        const response = await makepaymentOnStripe(body)
        console.log(response.data.sessionId, "stripe");

        const session = response.data.sessionId

        const stripe = await stripePromise

        if (stripe) {
            const result = await stripe.redirectToCheckout({
                sessionId: session
            })

            if (result.error) {
                console.log(result.error.message);

            }
        } else {
            console.log('Stripe failed to load');


        }



    }


    useEffect(() => {
        getCartItems().then((res) => {
            console.log(res.data);
            setCartitems(res.data.courses)
            setTotal(res.data.totalPrice)
        }).catch((err) => {
            console.log(err);

        })
    }, [])
    return (
        <>
            {cartItems.length ? <>
                {cartItems.map((item) => (<CartCard key={item._id} item={item} updateCartFromChild={updateCartFromChild} />))

                }
                <div className='text-right mt-5'>
                    <p>TOTAL PRICE:{total}</p>
                    <button className='btn bg-green-700 text-white' onClick={makePayment}>Check out</button>
                </div>
            </> : <EmptyCart />}

        </>
    )
}
