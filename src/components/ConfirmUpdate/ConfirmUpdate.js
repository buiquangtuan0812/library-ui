import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { BsFillCheckCircleFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

function ConfirmUpdate(props) {
    return (
        <div className={cx('show')}>
            <div className={cx(props.type ? 'container__confirm-user' : 'container__confirm')}>
                <span className={cx('icon-success')}>
                    <BsFillCheckCircleFill />
                </span>
                <span className={cx('text')}>{props.text}</span>
            </div>
        </div>
    );
}

export default ConfirmUpdate;
