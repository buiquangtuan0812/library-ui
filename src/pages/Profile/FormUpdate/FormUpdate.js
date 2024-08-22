import classNames from 'classnames/bind';
import styles from './FormUpdate.module.scss';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function FormUpdate({ user, type, handleProps }) {
    const inputElement = useRef();
    const [inputValue, setInputValue] = useState(type === 'tel' ? user.tel : user.email);
    const [passState, setPassState] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [warnings, setWarnings] = useState({
        validation: false,
        password: [false, false, false, false],
    });

    const handleCancel = () => {
        handleProps({ show: false, user, state: false });
    };

    const handleClick = () => {
        setInputValue('');
        inputElement.current.focus();
    };

    const validateInput = () => {
        if (type === 'tel') {
            return inputValue.length === 10 && /^\d+$/.test(inputValue);
        }
        return inputValue.includes('@gmail.com');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            setWarnings((prev) => ({ ...prev, validation: true }));
            return;
        }

        try {
            const updatedUser = user;
            updatedUser[type] = inputValue;
            const response = await axios.put('https://library-be-wine.vercel.app/user/update/profile', updatedUser, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            if (response.status === 200) {
                handleProps({ show: false, user: updatedUser, state: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const checkPasswordStrength = () => {
        const { new: newPassword } = passState;
        return newPassword.length >= 8 && /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword);
    };

    const handleChangePass = async (e) => {
        e.preventDefault();

        if (passState.new !== passState.confirm) {
            setWarnings((prev) => ({ ...prev, password: [false, false, false, true] }));
            return;
        }

        if (!checkPasswordStrength()) {
            setWarnings((prev) => ({ ...prev, password: [false, false, true, false] }));
            return;
        }

        try {
            const response = await axios.put(
                'https://library-be-wine.vercel.app/user/update/password',
                { newPassword: passState.new, oldPassword: passState.current },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                },
            );
            if (response.status === 200 && response.data.message === 'Password updated successfully!') {
                handleProps({ show: false, user, state: true });
            } else if (response.status === 401) {
                setWarnings((prev) => ({ ...prev, password: [true, false, false, false] }));
            } else {
                console.error(response.data);
            }
        } catch (err) {
            setWarnings((prev) => ({ ...prev, password: [true, false, false, false] }));
        }
    };

    useEffect(() => {
        if (warnings.validation) {
            setTimeout(() => setWarnings((prev) => ({ ...prev, validation: false })), 2000);
        }
    }, [warnings.validation]);

    const renderFormInput = (label, type, icon) => (
        <div className={cx('container-tel')}>
            <label htmlFor={type}>{label}</label>
            <div className={cx('input')}>
                <i className={cx(icon)}></i>
                <input
                    ref={inputElement}
                    type="text"
                    value={inputValue}
                    name={type}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <span className={cx('icon-erase')} onClick={handleClick}>
                    <i className={cx('fa-regular fa-circle-xmark')}></i>
                </span>
            </div>
            <span className={cx(warnings.validation ? 'warning' : 'hide')}>
                {type === 'tel' ? 'Số điện thoại sai định dạng' : 'Email chưa đúng định dạng'}
            </span>
            <button onClick={handleUpdate}>Lưu thay đổi</button>
        </div>
    );

    return (
        <div className={cx('container__page')}>
            {type === 'tel' && (
                <div className={cx('container__page-main')}>
                    <div className={cx('header')}>
                        <h3>Cập nhật số điện thoại</h3>
                        <span>
                            <i className={cx('fa-solid fa-xmark')} onClick={handleCancel}></i>
                        </span>
                    </div>
                    <div className={cx('body')}>{renderFormInput('Số điện thoại', 'tel', 'fa-solid fa-phone')}</div>
                </div>
            )}
            {type === 'email' && (
                <div className={cx('container__page-main')}>
                    <div className={cx('header')}>
                        <h3>Cập nhật email</h3>
                        <span>
                            <i className={cx('fa-solid fa-xmark')} onClick={handleCancel}></i>
                        </span>
                    </div>
                    <div className={cx('body')}>{renderFormInput('Email', 'email', 'fa-solid fa-envelope')}</div>
                </div>
            )}
            {type === 'password' && (
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
                                    onChange={(e) => setPassState({ ...passState, current: e.target.value })}
                                    className={cx(warnings.password[0] ? 'warn' : '')}
                                />
                                <span className={cx(warnings.password[0] ? 'warning' : 'hide')}>
                                    Mật khẩu chưa chính xác
                                </span>
                            </div>

                            <div className={cx('form-control')}>
                                <label htmlFor="newPass">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu mới"
                                    name="newPass"
                                    onChange={(e) => setPassState({ ...passState, new: e.target.value })}
                                    className={cx(warnings.password[1] || warnings.password[2] ? 'warn' : '')}
                                />
                                <span className={cx(warnings.password[1] || warnings.password[2] ? 'hide' : 'suggest')}>
                                    Mật khẩu phải từ 8 - 20 ký tự, bao gồm chữ và số
                                </span>
                                <span className={cx(warnings.password[1] ? 'warning' : 'hide')}>
                                    Mật khẩu đã được đặt
                                </span>
                                <span className={cx(warnings.password[2] ? 'warning' : 'hide')}>
                                    Mật khẩu chưa đúng định dạng
                                </span>
                            </div>

                            <div className={cx('form-control')}>
                                <label htmlFor="confirmPass">Nhập lại mật khẩu mới</label>
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu mới"
                                    name="confirmPass"
                                    onChange={(e) => setPassState({ ...passState, confirm: e.target.value })}
                                    className={cx(warnings.password[3] ? 'warn' : '')}
                                />
                                <span className={cx(warnings.password[3] ? 'warning' : 'hide')}>
                                    Mật khẩu chưa trùng khớp
                                </span>
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
