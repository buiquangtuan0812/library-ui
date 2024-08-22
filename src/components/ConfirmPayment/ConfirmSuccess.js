import classNames from 'classnames/bind';
import styles from './ConfirmSuccess.module.scss';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Confirm(props) {
    return (
        <div className={cx('show')}>
            <div className={cx('container__confirm')}>
                <div className={cx('icon-success')}>
                    <BsFillCheckCircleFill />
                </div>
                <div className={cx('text')}>{props.text}</div>
                <div className={cx('button')}>
                    <Link to="/home" state={{ user: props.user }}>
                        Quay lại trang chủ!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Confirm;
