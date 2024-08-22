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
    const [err, setErr] = useState('');
    const [url, setUrl] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state?.url) {
            setUrl(location.state.url);
        }
    }, [location.state]);

    const API_URL = 'https://library-be-wine.vercel.app/user/signin';

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const dataUser = { username, password };

        try {
            const response = await axios.post(API_URL, dataUser);
            handleResponse(response);
        } catch (err) {
            setIsLoading(false);
            setErr(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    const handleResponse = (response) => {
        if (response.status === 200) {
            setErr('');
            localStorage.setItem('token', response.data.accessToken);

            let newUrl = url?.replace('library-be-wine.vercel.app/', '').replace('https://', '') || '';
            const newPath = `/${newUrl}` || '/home';
            navigate(newPath, { state: { user: response.data } });
        } else {
            setIsLoading(false);
            setErr(response.data.message);
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
                        <div className={cx('btn-submit')}>
                            <button className={cx('button1')} onClick={handleLogin}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đăng nhập&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        <Link to="/user/signup" className={cx('btn-signup')}>
                            <button className={cx('button2')}>Đăng ký</button>
                        </Link>
                    </div>
                </form>
                <button className={cx('button3')}>Quên mật khẩu</button>
            </div>
            {isLoading && (
                <div className={cx('form-loading')}>
                    <Loading props="Đang đăng nhập" />
                </div>
            )}
        </div>
    );
}

export default LoginUser;
