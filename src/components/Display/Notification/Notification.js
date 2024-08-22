import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import { Link } from 'react-router-dom';
import { TiTickOutline } from 'react-icons/ti';
import { MdErrorOutline } from 'react-icons/md';

const cx = classNames.bind(styles);

function Notification({ token, message, messageLink, check, close }) {
    return (
        <div className={cx('container-confirm')}>
            <div className={cx('confirm__success')}>
                <div className={cx(check ? 'confirm__success-icon' : 'confirm__err')}>
                    {check ? (
                        <TiTickOutline className={cx('icon-success')} />
                    ) : (
                        <MdErrorOutline className={cx('icon-err')} />
                    )}
                    <p>{check ? 'Thành công' : 'Lỗi'}</p>
                </div>

                <div className={cx('confirm__success-content')}>{message}</div>
                {check ? (
                    <Link to={'/user/login'} state={{ token: token }}>
                        <div className={cx('confirm__success-link')}>
                            <button>{messageLink}</button>
                        </div>
                    </Link>
                ) : (
                    <div className={cx('confirm__err-link')} onClick={close}>
                        <button>{messageLink}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;
