import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';

import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginUser() {
    document.title = 'My Library | Log In';
    const [userNamme, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);

    const handleLogin = () => {
        const dataUser = {
            username: userNamme,
            password: password,
        };
        axios
            .post('http://localhost:8086/library/signin', dataUser, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('container__signin')}>
            <div className={cx('form')}>
                <p className={cx('heading')}>Login</p>
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
                    </div>
                </form>
                <div className={cx('btn')}>
                    <Link to={data.token ? '/home' : '/library/login'} state={data.token ? { user: data } : ''}>
                        <button className={cx('button1')} onClick={handleLogin}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                    </Link>
                </div>
                <button className={cx('button3')}>Forgot Password</button>
                <div className={cx('direct-signup')}>
                    <Link to="/library/signup">
                        <button className={cx('button2')}>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;
