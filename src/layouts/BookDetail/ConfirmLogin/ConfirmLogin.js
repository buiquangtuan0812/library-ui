import classNames from 'classnames/bind';
import styles from './ConfirmLogin.module.scss';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MdClear } from 'react-icons/md';
import { AiFillWarning } from 'react-icons/ai';
const cx = classNames.bind(styles);

function ConfirmLogin(props) {
    const [state, setState] = useState(true);
    return (
        <div className={cx(props.check && state ? 'show' : 'hide')}>
            <div className={cx('container__confirm')}>
                <span className={cx('icon-clear')} onClick={() => setState(false)}>
                    <MdClear />
                </span>
                <div className={cx('container__confirm-header')}>
                    <span className={cx('icon-success')}>
                        <AiFillWarning />
                    </span>
                    <span className={cx('text')}>Bạn cần đăng nhập để tiếp tục!</span>
                </div>
                <div className={cx('container__confirm-btn')}>
                    <Link to="/user/login" state={{ url: props.url }}>
                        <button>Đăng nhập</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ConfirmLogin;
