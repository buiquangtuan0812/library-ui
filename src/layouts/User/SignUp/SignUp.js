import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SignUp.module.scss';
import Loading from '~/components/FormLoading/Loading';
import Notification from '~/components/Display/Notification/Notification';

const cx = classNames.bind(styles);

function SignUpForm() {
    document.title = 'My Library | Sign Up';

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        tel: '',
    });

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        tel: false,
        password: false,
    });

    const [warnings, setWarnings] = useState({
        username: false,
        email: false,
        tel: false,
        password: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        messageLink: '',
        success: false,
        token: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const { username, email, tel, password } = formData;
        let isValid = true;
        const newErrors = { username: false, email: false, tel: false, password: false };
        const newWarnings = { username: false, email: false, tel: false, password: false };

        if (username.length === 0) {
            newErrors.username = true;
            isValid = false;
        } else if (username.length < 6) {
            newWarnings.username = true;
            isValid = false;
        }

        if (email.length === 0) {
            newErrors.email = true;
            isValid = false;
        } else if (!email.endsWith('@gmail.com')) {
            newWarnings.email = true;
            isValid = false;
        }

        if (tel.length === 0) {
            newErrors.tel = true;
            isValid = false;
        } else if (tel.length !== 10) {
            newWarnings.tel = true;
            isValid = false;
        }

        if (password.length === 0) {
            newErrors.password = true;
            isValid = false;
        } else if (password.length < 8) {
            newWarnings.password = true;
            isValid = false;
        }

        setErrors(newErrors);
        setWarnings(newWarnings);
        return isValid;
    };

    const handleSignup = async () => {
        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://library-be-wine.vercel.app/user/signup', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setNotification({
                visible: true,
                message: 'Bạn đã đăng ký thành công!',
                messageLink: 'Đăng nhập!',
                success: true,
                token: response.data,
            });
        } catch (err) {
            setNotification({
                visible: true,
                message: err.response?.data || 'Có một lỗi xảy ra. Vui lòng thử lại',
                messageLink: 'Thử lại!',
                success: false,
                token: '',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setNotification((prevNotification) => ({
            ...prevNotification,
            visible: false,
        }));
    };

    return (
        <div className={cx('container__signup')}>
            <div className={cx(notification.visible ? 'show' : 'hide-content')}>
                <Notification
                    token={notification.token}
                    message={notification.message}
                    messageLink={notification.messageLink}
                    check={notification.success}
                    close={handleClose}
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
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.username && <div className={cx('err-username')}>Tên đăng nhập không được bỏ trống!</div>}
                    {warnings.username && <div className={cx('warn-username')}>Tên đăng nhập ít nhất 6 ký tự!</div>}

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
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.email && <div className={cx('err-email')}>Email không được bỏ trống!</div>}
                    {warnings.email && <div className={cx('warn-email')}>Email chưa đúng định dạng!</div>}

                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-phone')}></i>
                        <label htmlFor="tel"></label>
                        <input
                            autoComplete="off"
                            placeholder="Số điện thoại"
                            className={cx('input-field')}
                            type="text"
                            id="tel"
                            name="tel"
                            value={formData.tel}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.tel && <div className={cx('err-tel')}>Bạn cần nhập số điện thoại!</div>}
                    {warnings.tel && <div className={cx('warn-tel')}>Số điện thoại gồm 10 chữ số!</div>}

                    <div className={cx('field')}>
                        <i className={cx('fa-solid fa-lock')}></i>
                        <label htmlFor="password"></label>
                        <input
                            placeholder="Mật khẩu"
                            className={cx('input-field')}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.password && <div className={cx('err-password')}>Mật khẩu không được bỏ trống!</div>}
                    {warnings.password && <div className={cx('warn-password')}>Mật khẩu phải gồm ít nhất 8 ký tự!</div>}
                </form>
                <div className={cx('btn-signup')}>
                    <button className={cx('button2')} onClick={handleSignup}>
                        Đăng ký
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className={cx('form-loading')}>
                    <Loading props="Đang đăng ký" />
                </div>
            )}
        </div>
    );
}

export default SignUpForm;
