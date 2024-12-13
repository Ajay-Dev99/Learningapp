import React from 'react'
import { removeCartItem } from '../../services/userServices';

function CartCard({ item, updateCartFromChild }) {

    const removeItem = (courseId) => {
        try {
            removeCartItem(courseId).then((res) => {
                console.log(res);
                updateCartFromChild(courseId, res.data.cart.totalPrice)

            }).catch((error) => {
                console.log(error);

            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className=" bg-gray-100 shadow-xl flex items-center w-full justify-between p-5 text-black">
            <figure>
                <img
                    src={item.courseId.image}
                    alt="Shoes" className='h-[100px]' />
            </figure>
            <div className="">
                <p>PRICE:{item.price}</p>
            </div>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => removeItem(item.courseId._id)}>Remove</button>
            </div>
        </div>
    )
}

export default CartCard
