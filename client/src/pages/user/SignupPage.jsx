import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSignUp } from '../../services/userServices'
import { toast } from 'react-toastify'

const SignupPage = () => {

    const [values, setValues] = useState([])

    const navigate = useNavigate()
    const onSubmit = () => {
        userSignUp(values).then((res) => {
            console.log(res);
            toast.success("Signup successfull")
            navigate("/")
        }).catch(err => {
            console.log(err, "error")
            toast.error(err.response.data.error, {
                position: 'top-center'
            })
        }
        )
        console.log(values, "values")
    }
    return (
        <div className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
                    {/* <form className="card-body"> */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" name='name' className="input input-bordered" required onChange={(e) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" name='email' required onChange={(e) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="tel" placeholder="Phone" name='phone' className="input input-bordered" required onChange={(e) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required onChange={(e) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="password" name='confirmpassword' className="input input-bordered" required onChange={(e) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={onSubmit}>Sign up</button>
                    </div>
                    <div className='text-center'>
                        Already have an accout?<Link to={"/login"} className='text-blue-600 underline'>Log In</Link>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default SignupPage
