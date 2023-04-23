import classNames from 'classnames/bind';
import styles from './ConfirmCart.module.scss';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MdClear } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

function ConfirmCart(props) {
    const [state, setState] = useState(true);

    return (
        <div className={cx(props.check && state ? 'show' : 'hide')}>
            <div className={cx('container__confirm')}>
                <span className={cx('icon-clear')} onClick={() => setState(false)}>
                    <MdClear />
                </span>
                <div className={cx('container__confirm-header')}>
                    <span className={cx('icon-success')}>
                        <BsFillCheckCircleFill />
                    </span>
                    <span className={cx('text')}>Thêm vào giỏ hàng thành công!</span>
                </div>
                <div className={cx('container__confirm-btn')}>
                    <Link to="/library/user/cart" state={{ user: props.user, numberCart: props.numberCart }}>
                        <button>Xem giỏ hàng và thanh toán</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ConfirmCart;
