import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import { ImNotification } from 'react-icons/im';

const cx = classNames.bind(styles);

function Notification(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.handleProps(false);
    };
    return (
        <div className={cx('ctn')}>
            <div className={cx('container-notice')}>
                <div className={cx('container-notice-header')}>
                    <div className={cx('icon')}>
                        <ImNotification />
                    </div>
                    <div className={cx('text')}>Bạn chưa chọn quyển sách nào để mua!</div>
                </div>
                <div className={cx('container-notice-body')}>
                    <button onClick={handleClick}>OK, đã hiểu</button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
