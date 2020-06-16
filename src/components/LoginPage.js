import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import { FacebookProvider, LoginButton } from 'react-facebook'
import { TwitterLogin } from "react-twitter-login"
import styles from '../css/Facebook.module.css'

const LoginPage = () => {

    const defaultValue = {
        name: '',
        account: '',
        token: ''
    }

    const [currentUser, setCurrentUser] = useState(defaultValue)
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    // Looking for user did not sign out

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        console.log(userData)
        if (userData) {
            setCurrentUser(userData)
        } else {
            setCurrentUser([])
        }
    }, [])

    // Store user to localStorage when auth changed

    useEffect(() => {
        setLocalStorage(currentUser)
    }, [currentUser])

    // functions

    const setLocalStorage = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    const getUser = async (url) => {
        const userData = await fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then((data) => {
            console.log(data)
            return data
        }).catch((error) => {
            console.log(error)
            return null
        })
        return userData
    }

    const postUser = async (url, data) => {
        const userData = await fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }).then((response) => {
            console.log(response.status)
            if (response.status === 201) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then((data) => {
            console.log(data)
            return data
        }).catch((error) => {
            console.log(error)
            return null
        })
        return userData
    }

    // handle click functions

    const handleSignUpClick = async (e) => {
        e.preventDefault()
        const data = {
            account,
            password
        }
        const url = 'https://5ee7111052bb0500161fd346.mockapi.io/users'
        const userData = await postUser(url, data)
        if (userData) {
            alert('Sign up Sucess')
            setCurrentUser(userData)
        } else {
            alert('Something went wrong, please try again')
        }

    }

    const handleSignInClick = async (e) => {
        e.preventDefault()
        const url = `https://5ee7111052bb0500161fd346.mockapi.io/users?search=${account}`
        const userData = await getUser(url)
        console.log(userData)
        if (userData && userData[0].password === password) {
            alert('Login Sucess')
            setCurrentUser(userData[0])
        } else {
            alert('No such user exist or wrong password!!')
        }
    }

    const handleSignOutClick = async (e) => {
        e.preventDefault()
        setCurrentUser(defaultValue)
        alert('logout success')
    }

    const responseGoogle = async (response) => {
        if (response.error) {
            console.log(response.error)
        } else {
            const basicProfile = response.getBasicProfile()
            const userName = basicProfile.getName()
            const userId = basicProfile.getId()
            const userEmail = basicProfile.getEmail()
            const url = `https://5ee7111052bb0500161fd346.mockapi.io/users`
            const data = {
                id: userId,
                name: userName,
                account: userEmail
            }

            const userData = await postUser(url, data)

            if (userData) {
                alert('Sign up or sign in success')
                setCurrentUser(userData)
            } else {
                alert('Something went wrong, please try again')
            }
        }
    }

    const responseFacebook = async (response) => {
        const data = {
            id: response.profile.id,
            name: response.profile.name,
            account: response.profile.email
        }
        const url = 'https://5ee7111052bb0500161fd346.mockapi.io/users'
        const userData = await postUser(url, data)
        if (userData) {
            alert('Sign up or sign in success')
            setCurrentUser(userData)
        } else {
            alert('Something went wrong, please try again')
        }
    }

    const responseTwitter = async (err, data) => {
        console.log(err, data)
    }

    // handleInput functions

    const handleChange = (e, component) => {
        const value = e.target.value
        if (component === 'account') {
            setAccount(value)
        } else {
            setPassword(value)
        }
    }

    // UI change functions

    const handleButtonDisable = () => {
        return account && password ? false : true
    }

    // rendering

    return (
        <div className={styles.page}>
            <div className={styles.title}>Welcome to Login Simulator</div>
            <div><p className={styles.currentUser}>{`Current user: ${currentUser && currentUser.name ? currentUser.name : 'None'}`}</p></div>
            <form>
                <div>
                    <input type='text' value={account} onChange={(e) => handleChange(e, 'account')} placeholder='Account' />
                </div>
                <div>
                    <input type='text' value={password} onChange={(e) => handleChange(e, 'password')} placeholder='Password' />
                </div>
                <button onClick={handleSignUpClick} disabled={handleButtonDisable()}>Sign up</button>
                {currentUser && currentUser.name ? (
                    <button onClick={handleSignOutClick}>Sign out</button>
                ) : (
                    <button onClick={handleSignInClick} disabled={handleButtonDisable()}>Sign in</button>
                )}
            </form>
            <div>
                <GoogleLogin
                    clientId='314840229738-mopbtqaioc7dlh11dl3v6i5boqjcrshs.apps.googleusercontent.com'
                    buttonText='Login with Google'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <div>
                <FacebookProvider appId='265264941218877'>
                    <LoginButton scope='email' onCompleted={responseFacebook} onError={responseFacebook}>
                        <span className={styles.fb}>Login with Facebook</span>
                    </LoginButton>
                </FacebookProvider>
            </div>
            <div>
                <TwitterLogin
                    authCallback={responseTwitter}
                    consumerKey={process.env.REACT_APP_TWITTER_API}
                    consumerSecret={process.env.REACT_APP_TWITTER_API_SECRET}
                    callbackUrl={'http://testtwitterlogin.com:3000'}
                />
            </div>
        </div>
    )
}

export default LoginPage