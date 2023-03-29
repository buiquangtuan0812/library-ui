import classNames from 'classnames/bind';
import styles from './LoginAdmin.module.scss';

import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginAdmin() {
    document.title = 'Admin | Log In';
    const [nameAdmin, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState('');
    const [data, setData] = useState('');

    const handleLogin = () => {
        const dataAdmin = {
            nameAdmin: nameAdmin,
            password: password,
        };
        axios
            .post('http://localhost:8086/admin/login', dataAdmin, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                if (response.data.message) {
                    setError(response.data.message);
                } else {
                    setData(response.data);
                    setError('');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('container__signin')}>
            <div className={cx('form')}>
                <p className={cx('heading')}>Log in | Admin</p>
                <form>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-user')}></i>
                        <label htmlFor="username"></label>
                        <input
                            autoComplete="off"
                            placeholder="Username"
                            className={cx('input-field')}
                            type="text"
                            name="nameAdmin"
                            id="nameAdmin"
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
                    <button className={cx('button1')} onClick={handleLogin}>
                        <Link
                            to={data ? '/admin/home' : '/admin/login'}
                            state={data ? { token: data, page: 'Statistic' } : ''}
                            className={cx('btn-submit')}
                        >
                            Log In
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;
