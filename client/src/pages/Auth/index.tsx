import './Auth.css'
import Logo from '../../img/logo.png'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../../actions/AuthAction';
import { RootState } from '../../store/ReduxStore';
import { User } from '../../reducers/authReducer';

const Auth = () => {
    const [isLogin, setisLogin] = useState(true)
    const { register, handleSubmit, reset } = useForm()
    const [isMatch, setIsMatch] = useState(true)
    const dispatch = useDispatch()
    const { loading } = useSelector((state: RootState) => state.authReducer);

    function submitUser(user: User) {
        user
        if (isLogin) {
            // @ts-ignore
            const doesPasswordsMatch: boolean = user.password === user.confirmPassword
            doesPasswordsMatch
                // @ts-ignore
                ? dispatch(signup(user))
                : setIsMatch(false)
        } else {
            // @ts-ignore
            dispatch(login(user))
        }
    }

    return (
        <div className="Auth">
            <div className="authLeft">
                <img src={Logo} alt="logo" />
                <div className='presentation'>
                    <h1 className='presentation__title'>Talkania</h1>
                    <p>Explore ideias throughout the world.</p>
                </div>
            </div>
            <div className="authRight">
                {/* @ts-ignore */}
                <form className='infoForm AuthForm' onSubmit={handleSubmit(submitUser)}>
                    <h3>{isLogin ? 'Signup' : 'Login'}</h3>
                    {isLogin && (
                        <div className="inputGroup">
                            <input type="text" required placeholder='First Name' {...register('firstName')} />
                            <input type="text" required placeholder='Last Name' {...register('lastName')} />
                        </div>
                    )}
                    <div className="inputGroup">
                        <input type="email" required {...register('email')} placeholder='Email' />
                    </div>
                    <div className="inputGroup">
                        <input type="password" {...register('password')} placeholder='Password' />
                        {isLogin && (
                            <input type="password" {...register('confirmPassword')} placeholder='Confirm your password' />
                        )}
                    </div>
                    {isLogin && (
                        <small
                            style={{ display: isMatch ? 'none' : 'block', color: 'red' }}
                        >The passwords don't match</small>
                    )}
                    <div className="buttonGroup">
                        <small
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                isLogin ? setisLogin(false) : setisLogin(true)
                                reset()
                            }}>
                            {isLogin
                                ? 'Already have an account? Login'
                                : "Don't have an account? Sinup"}
                        </small>
                        <button type="submit" className='infoButton button' disabled={loading}>
                            {loading ? 'Loading...' : isLogin ? 'Signup' : 'Login'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default Auth;