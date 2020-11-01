import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import { signup } from '../auth/index'
import '../css/signup.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const signUpForm = () => (
        <form className="signup-form">
            <h2 style={{ marginTop: "120px", marginBottom: "30px" }}>Signup</h2>
            <div>
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" value={name} />

                <br />

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

    const showSuccess = () => (
        <div style={{ display: success ? '' : 'none' }}>
            Your account has been successfully created, Please <Link to='/signin'>Sign In</Link>
        </div>
    )

    return (
        <div>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </div>
    )
}

export default Signup