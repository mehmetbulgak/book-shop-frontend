import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/index'
import { itemTotal } from './cartHelpers'
import '../css/menu.css'
import Logo from '../images/logo.svg'

const Menu = ({ history }) => (
    <div className="navbar">
        <ul>
            <li>
                <Link to='/'>
                    <img style={{ width: "100px" }} src={Logo} alt='logo'/>
                </Link>
            </li>

            <div className="right-menu">
                <li>
                    <Link to='/shop'>Shop</Link>
                </li>

                {!isAuthenticated() && (
                    <div className="sign">
                        <li>
                            <Link to='/signin'>Signin</Link>
                        </li>

                        <li>
                            <Link to='/signup'>Signup</Link>
                        </li>
                    </div>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li>
                        <Link to='/user/dashboard'>Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li>
                        <Link to='/admin/dashboard'>Dashboard</Link>
                    </li>
                )}

                <li>
                    <Link to='/cart'><i class="fas fa-shopping-cart"></i> <sup><small>{itemTotal()}</small></sup></Link>
                </li>

                {isAuthenticated() && (
                    <li>
                        <span onClick={() => signout(() => history.push('/'))} style={{ cursor: 'pointer' }}>Signout</span>
                    </li>
                )}
            </div>
        </ul>
    </div>
)

export default withRouter(Menu)