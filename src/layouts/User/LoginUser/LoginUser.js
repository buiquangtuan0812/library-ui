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
            .post('http://localhost:8086/user/signin', dataUser, {
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
                </form>
                <div className={cx('btn')}>
                    <Link
                        to={data.accessToken ? '/home' : '/user/login'}
                        state={data.accessToken ? { user: data } : ''}
                        className={cx('btn-submit')}
                        onClick={(e) => handleLogin(e)}
                    >
                        <button className={cx('button1')}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Đăng nhập&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                    </Link>
                    <Link to="/user/signup" className={cx('btn-signup')}>
                        <button className={cx('button2')}>Đăng ký</button>
                    </Link>
                </div>
                <button className={cx('button3')}>Quên mật khẩu</button>
            </div>
        </div>
    );
}

export default LoginUser;
