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
    const [err, setErr] = useState('');

    const handleLogin = () => {
        const dataUser = {
            username: userNamme,
            password: password,
        };
        axios
            .post('http://localhost:8086/library/signin', dataUser, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                if (response.data.message) {
                    setErr(response.data.message);
                } else {
                    setData(response.data);
                    setErr('');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('container__signin')}>
            <Link to="/admin/login">
                <div className={cx('btn-loginAdmin')}>Admin</div>
            </Link>
            <div className={cx('form')}>
                <p className={cx('heading')}>Log In</p>
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
                </form>
                <div className={cx('btn')}>
                    <button className={cx('button1')} onClick={(e) => handleLogin(e)}>
                        <Link
                            to={data.token ? '/home' : '/library/login'}
                            state={data.token ? { user: data } : ''}
                            className={cx('btn-submit')}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log In&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Link>
                    </button>
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
