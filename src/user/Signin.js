import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth/index'
import '../css/signin.css'

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    })
                }
            })
    }

    const signinForm = () => (
        <form className="signin-form">
            <h2 style={{marginTop:"50px", marginBottom:"30px"}}>Signup</h2>
            <div>
                <label>Email</label>
                <input onChange={handleChange('email')} type="email" value={email} />

                <br />

                <label>Password</label>
                <input onChange={handleChange('password')} type="password" value={password} />

                <button onClick={clickSubmit}>Submit</button>
            </div>
        </form>
    )

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div>Loading</div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }

    return (
        <div>
            {showLoading()}
            {showError()}
            {signinForm()}
            {redirectUser()}
        </div>
    )
}

export default Signin