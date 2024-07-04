import classNames from 'classnames/bind';
import styles from './FormUpdate.module.scss';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function FormUpdate(props) {
    const inputElement = useRef();
    const [warning, setWarning] = useState(false);
    const [user, setUser] = useState({});
    const [inputValue, setValue] = useState('');

    const [passCurrent, setPassCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [warn, setWarn] = useState([false, false, false, false]);

    useEffect(() => {
        setUser(props.user);
        if (props.type === 'tel') {
            setValue(props.tel);
        } else {
            setValue(props.email);
        }
    }, [props]);

    const handleCancel = () => {
        props.handleProps({
            show: false,
            user: user,
            state: false,
        });
    };

    const handleClick = () => {
        setValue('');
        inputElement.current.focus();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (props.type === 'tel') {
            user.tel = inputValue;
            if (inputValue.length !== 10) {
                setWarning(true);
                e.preventDefault();
                return;
            }
            for (var i = 0; i < inputValue.length; i++) {
                if (Number(inputValue[i]) >= 0 && Number(inputValue[i]) < 10) {
                    continue;
                } else {
                    setWarning(true);
                    e.preventDefault();
                    return;
                }
            }
        } else {
            user.email = inputValue;
            if (!inputValue.includes('@gmail.com')) {
                setWarning(true);
                e.preventDefault();
                return;
            }
        }
        axios
            .put('https://be-library.vercel.app/user/update/profile', user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
            .then((res) => {
                props.handleProps({
                    show: false,
                    user: res.data,
                    state: true,
                });
            })
            .catch((err) => {
                e.preventDefault();
                console.log(err);
            });
    };

    const checkString = () => {
        if (newPass.length < 8) {
            return false;
        } else {
            return /[a-zA-Z]/.test(newPass) && /\d/.test(newPass);
        }
    };

    const handleChangePass = (e) => {
        e.preventDefault();
        if (newPass !== confirmPass) {
            setWarn([false, false, false, true]);
            e.preventDefault();
            return;
        } else {
            setWarn([false, false, false, false]);
            if (!checkString()) {
                setWarn([false, false, true, false]);
                e.preventDefault();
                return;
            }
            setWarn([false, false, false, false]);
            const data = {
                newPassword: newPass,
                oldPassword: passCurrent,
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            };
            axios
                .put('https://be-library.vercel.app/user/update/password', data, config)
                .then((res) => {
                    if (res.status === 200 && res.data.message === 'Password updated successfully!') {
                        setWarn([false, false, false, false]);
                        props.handleProps({
                            show: false,
                            user: user,
                            state: true,
                        });
                    } else if (res.status === 401) {
                        setWarn([true, false, false, false]);
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((err) => setWarn([true, false, false, false]));
        }
    };

    if (warning) {
        setTimeout(() => {
            setWarning(false);
        }, 2000);
    }

    return (
        <div className={cx('container__page')}>
            {props.type === 'tel' ? (
                <div className={cx('container__page-main')}>
                    <div className={cx('header')}>
                        <h3>Cập nhật số điện thoại</h3>
                        <span>
                            <i className={cx('fa-solid fa-xmark')} onClick={handleCancel}></i>
                        </span>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('container-tel')}>
                            <label htmlFor="tel">Số điện thoại</label>
                            <div className={cx('input')}>
                                <i className={cx('fa-solid fa-phone')}></i>
                                <input
                                    ref={inputElement}
                                    type="text"
                                    defaultValue={inputValue}
                                    name="tel"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <span className={cx('icon-erase')} onClick={handleClick}>
                                    <i className={cx('fa-regular fa-circle-xmark')}></i>
                                </span>
                            </div>
                            <span className={cx(warning ? 'warning' : 'hide')}>Số điện thoại sai định dạng</span>
                            <button onClick={handleUpdate}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            ) : props.type === 'email' ? (
                <div className={cx('container__page-main')}>
                    <div className={cx('header')}>
                        <h3>Cập nhật email</h3>
                        <span>
                            <i className={cx('fa-solid fa-xmark')} onClick={handleCancel}></i>
                        </span>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('container-tel')}>
                            <label htmlFor="tel">Email</label>
                            <div className={cx('input')}>
                                <i class="fa-solid fa-envelope"></i>
                                <input
                                    ref={inputElement}
                                    type="text"
                                    defaultValue={inputValue}
                                    name="tel"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <span className={cx('icon-erase')} onClick={handleClick}>
                                    <i className={cx('fa-regular fa-circle-xmark')}></i>
                                </span>
                            </div>
                            <span className={cx(warning ? 'warning' : 'hide')}>Email chưa đúng định dạng</span>
                            <button onClick={handleUpdate}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container__page-main')}>
                    <div className={cx('header')}>
                        <h3>Đổi mật khẩu</h3>
                        <span>
                            <i className={cx('fa-solid fa-xmark')} onClick={handleCancel}></i>
                        </span>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('container-password')}>
                            <div className={cx('form-control')}>
                                <label htmlFor="passCurrent">Mật khẩu hiện tại</label>
                                <input
                                    type="password"
                                    placeholder="Mật khẩu hiện tại"
                                    name="passCurrent"
                                    onChange={(e) => setPassCurrent(e.target.value)}
                                    className={cx(warn[0] ? 'warn' : '')}
                                />
                                <span className={cx(warn[0] ? 'warning' : 'hide')}>Mật khẩu chưa chính xác</span>
                            </div>

                            <div className={cx('form-control')}>
                                <label htmlFor="newPass">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu mới"
                                    name="newPass"
                                    onChange={(e) => setNewPass(e.target.value)}
                                    className={cx(warn[1] || warn[2] ? 'warn' : '')}
                                />
                                <span className={cx(warn[1] || warn[2] ? 'hide' : 'suggest')}>
                                    Mật khẩu phải từ 8 - 20 ký tự, bao gồm chữ và số
                                </span>
                                <span className={cx(warn[1] ? 'warning' : 'hide')}>Mật khẩu đã được đặt</span>
                                <span className={cx(warn[2] ? 'warning' : 'hide')}>Mật khẩu chưa đúng định dạng</span>
                            </div>

                            <div className={cx('form-control')}>
                                <label htmlFor="confirmPass">Nhập lại mật khẩu mới</label>
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu mới"
                                    name="confirmPass"
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    className={cx(warn[3] ? 'warn' : '')}
                                />

                                <span className={cx(warn[3] ? 'warning' : 'hide')}>Mật khẩu chưa trùng khớp</span>
                            </div>
                            <button onClick={handleChangePass}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormUpdate;
