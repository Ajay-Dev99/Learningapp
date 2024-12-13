import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../services/userServices'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { saveUser } from '../../redux/features/userSlice'

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const onSubmit = () => {

        userLogin(values).then((res) => {
            console.log(res.data.userExist);
            toast.success("Login successfull")
            dispatch(saveUser(res.data.userExist))
            navigate("/")

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.error, {
                position: 'top-center'
            })
        })



    }
    return (
        <div className="hero bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl card-body">
                    {/* <form className="card-body"> */}
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
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required onChange={(e) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }} />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={onSubmit}>Login</button>
                    </div>
                    <div className='text-center'>
                        Don't have an accout?<Link to={"/signup"} className='text-blue-600 underline'>sign up</Link>
                    </div>
                    {/* </form> */}

                </div>
            </div>
        </div>
    )
}

export default LoginPage
