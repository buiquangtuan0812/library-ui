import classNames from 'classnames/bind';
import styles from './style.module.scss';

import { Link } from 'react-router-dom';
import { TiTickOutline } from 'react-icons/ti';

const cx = classNames.bind(styles);

function ConfirmSuccess(props) {
    const handleClick = () => {
        props.handleProps(false);
    };
    return (
        <div className={cx('container-confirm')}>
            <div className={cx('confirm__success')}>
                <div className={cx('confirm__success-icon')}>
                    <TiTickOutline className={cx('icon-success')} />
                    <p>SUCCESS</p>
                </div>

                <div className={cx('confirm__success-content')}>{props.message}</div>
                <Link to={'/admin/manage/books'} state={{ admin: props.admin }} className={cx('confirm__success-link')}>
                    <button onClick={handleClick}>{props.messageLink}</button>
                </Link>
            </div>
        </div>
    );
}

export default ConfirmSuccess;
