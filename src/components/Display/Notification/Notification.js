import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiTickOutline } from 'react-icons/ti';

const cx = classNames.bind(styles);

function Notification(props) {
    return (
        <div className={cx('confirm__success')}>
            <div className={cx('confirm__success-icon')}>
                <TiTickOutline className={cx('icon-success')} />
                <p>SUCCESS</p>
            </div>

            <div className={cx('confirm__success-content')}>Bạn đã đăng ký thành công!</div>
            <Link to="/library/login" token={props.token}>
                <div className={cx('confirm__success-link')}>
                    <button>Đăng nhập ngay!</button>
                </div>
            </Link>
        </div>
    );
}

export default Notification;
