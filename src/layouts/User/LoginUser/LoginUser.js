import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './LoginUser.module.scss';
import Loading from '~/components/FormLoading/Loading';

const cx = classNames.bind(styles);

function LoginUser() {
    document.title = 'My Library | Log In';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [data, setData] = useState({});
    const [err, setErr] = useState('');
    const [url, setUrl] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state) {
            setUrl(location.state.url);
        }
    }, [location.state]);

    const API_URL = 'https://be-library.vercel.app/user/signin';

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const dataUser = {
            username: username,
            password: password,
        };

        try {
            const response = await loginUser(dataUser);
            handleResponse(response);
        } catch (err) {
            setIsLoading(false);
            setErr('An error occurred. Please try again.');
        }
    };

    const loginUser = (dataUser) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.post(API_URL, dataUser).then(resolve).catch(reject);
            }, 1000);
        });
    };

    const handleResponse = (response) => {
        if (response.data.message) {
            setIsLoading(false);
            setErr(response.data.message);
        } else {
            setErr('');
            setIsLoading(false);
            if (response.data.accessToken) {
                let newUrl = url.replace('my-library-ecru-one.vercel.app/', '').replace('https://', '');
                const newPath = `/${newUrl}` || '/home';
                navigate(newPath, { state: { user: response.data } });
            }
        }
    };

    return (
        <div className={cx('container__signin')}>
            <div className={cx('form')}>
                <p className={cx('heading')}>Đăng nhập</p>
                <form>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-user')}></i>
                        <label htmlFor="username"></label>
                        <input
                            autoComplete="off"
                            placeholder="Username"
                            className={cx('input-field')}
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-lock')}></i>
                        <label htmlFor="password"></label>
                        <input
                            placeholder="Password"
                            className={cx('input-field')}
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className={cx(err ? 'show-err' : 'hide-err')}>{err}</span>
                    </div>
                    <div className={cx('btn')}>
                        <div
                            // to={data.accessToken ? url : '/user/login'}
                            // state={data.accessToken ? { user: data } : ''}
                            className={cx('btn-submit')}
                            // onClick={handleLogin}
                        >
                            <button className={cx('button1')} onClick={handleLogin}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đăng nhập&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        {/* {url ? (
                        ) : (
                            <div
                                // to={data.accessToken ? (data.role === 'User' ? '/home' : '/admin/home') : '/user/login'}
                                // state={data.accessToken ? { user: data } : ''}
                                className={cx('btn-submit')}
                                // onClick={handleLogin}
                            >
                                <button className={cx('button1')} onClick={handleLogin}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đăng nhập&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </button>
                            </div>
                        )} */}
                        <Link to="/user/signup" className={cx('btn-signup')}>
                            <button className={cx('button2')}>Đăng ký</button>
                        </Link>
                    </div>
                </form>
                <button className={cx('button3')}>Quên mật khẩu</button>
            </div>
            {isLoading ? (
                <div className={cx('form-loading')}>
                    <Loading props="Đang đăng nhập" />
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default LoginUser;
