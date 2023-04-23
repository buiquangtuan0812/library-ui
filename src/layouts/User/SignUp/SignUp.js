import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import Notification from '~/components/Display/Notification/Notification';

import axios from 'axios';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SignUpForm() {
    document.title = 'My Library | Sign Up';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [display, setState] = useState(false);
    const [token, setToken] = useState('');
    const [errName, setErrorName] = useState(false);
    const [errEmail, setErrorEmail] = useState(false);
    const [errTel, setErrorTel] = useState(false);
    const [errpassword, setErrorPassword] = useState(false);
    const [warnTel, setWarningTel] = useState(false);
    const [warnEmail, setWarningEmail] = useState(false);
    const [warnPassword, setWarningPassword] = useState(false);

    const [checkRegister, setCheckRegister] = useState(false);
    const [message, setMessage] = useState('');
    const [messageLink, setMessageLink] = useState('');
    const [count, setCount] = useState(0);

    const handleSignup = () => {
        setCount(count + 1);
        const dataUser = {
            username: username,
            email: email,
            numberPhone: tel,
            password: password,
        };
        if (
            username.length === 0 &&
            email.length === 0 &&
            password.length === 0 &&
            tel.length === 0 &&
            password.length === 0
        ) {
            setErrorEmail(true);
            setErrorName(true);
            setErrorTel(true);
            setErrorPassword(true);
        } else if (email.slice(email.length - 10, email.length) !== '@gmail.com') {
            setWarningEmail(true);
        } else if (password.length < 6) {
            setWarningPassword(true);
        } else {
            setState(true);
            axios
                .post('http://localhost:8086/user/signup', dataUser, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    setToken(res.data);
                    setMessage('You have successfully registered !');
                    setMessageLink('Login now!');
                    setCheckRegister(true);
                })
                .catch((err) => {
                    setMessage(err.request.response);
                    setMessageLink('Try re-entering !');
                    setCheckRegister(false);
                });
        }
    };

    return (
        <div className={cx('container__signup')}>
            <div className={cx(display ? 'show' : 'hide-content')}>
                <Notification
                    token={token}
                    message={message}
                    messageLink={messageLink}
                    check={checkRegister}
                    count={count}
                />
            </div>
            <div className={cx('form')}>
                <form>
                    <p className={cx('heading')}>Đăng ký</p>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-user')}></i>
                        <label htmlFor="username"></label>
                        <input
                            autoComplete="off"
                            placeholder="Tên đăng nhập"
                            className={cx('input-field')}
                            type="text"
                            id="username"
                            value={username}
                            name="username"
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    setErrorName(false);
                                }
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx(errName ? 'err-username' : 'hide-content')}>
                        Tên đăng nhập không được bỏ tróng!
                    </div>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-envelope')}></i>
                        <label htmlFor="email"></label>
                        <input
                            autoComplete="off"
                            placeholder="Email"
                            className={cx('input-field')}
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (
                                    e.target.value.slice(e.target.value.length - 10, e.target.value.length) ===
                                    '@gmail.com'
                                ) {
                                    setErrorEmail(false);
                                    setWarningEmail(false);
                                } else {
                                    setErrorEmail(false);
                                    setWarningEmail(true);
                                }
                            }}
                        />
                    </div>
                    <div className={cx(warnEmail ? 'err-mail' : 'hide-content')}>Email chưa đúng định dạng!</div>
                    <div className={cx(errEmail ? 'err-email' : 'hide-content')}>Email không được bỏ trống!</div>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-phone')}></i>
                        <label htmlFor="numberphone"></label>
                        <input
                            autoComplete="off"
                            placeholder="Số điện thoại"
                            className={cx('input-field')}
                            type="text"
                            name="numberphone"
                            id="numberphone"
                            value={tel}
                            onChange={(e) => {
                                if (e.target.value.length === 10) {
                                    setErrorTel(false);
                                    setWarningTel(false);
                                } else {
                                    setErrorTel(false);
                                    setWarningTel(true);
                                }
                                setTel(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx(errTel ? 'err-tel' : 'hide-content')}>Bạn cần nhập số điện thoại!</div>
                    <div className={cx(warnTel ? 'warn-tel' : 'hide-content')}>Số điện thoại gồm 10 chữ số!</div>
                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-lock')}></i>
                        <label htmlFor="password"></label>
                        <input
                            placeholder="Mật khẩu"
                            className={cx('input-field')}
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                if (e.target.value.length >= 8) {
                                    setErrorPassword(false);
                                    setWarningPassword(false);
                                } else {
                                    setErrorPassword(false);
                                    setWarningPassword(true);
                                }
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx(warnPassword ? 'err-pass' : 'hide-content')}>
                        Mật khẩu phải gồm ít nhất 8 ký tự!
                    </div>
                    <div className={cx(errpassword ? 'err-password' : 'hide-content')}>
                        Mật khẩu không được bỏ trống!
                    </div>
                </form>
                <div className={cx('btn-signup')}>
                    <button className={cx('button2')} onClick={handleSignup}>
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
