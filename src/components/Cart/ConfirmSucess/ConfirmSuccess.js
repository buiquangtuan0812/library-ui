import classNames from 'classnames/bind';
import styles from './ConfirmSuccess.module.scss';

import { BsFillCheckCircleFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ConfirmSuccess(props) {
    return (
        <div className={cx('show')}>
            <div className={cx('container__confirm')}>
                <div className={cx('icon-success')}>
                    <BsFillCheckCircleFill />
                </div>
                <div className={cx('text')}>{props.text}</div>
                <div className={cx('btn')}>
                    <Link to="/home" state={{ user: props.user }}>
                        <button>Quay lại</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ConfirmSuccess;
