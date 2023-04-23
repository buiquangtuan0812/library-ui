import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiTickOutline } from 'react-icons/ti';
import { MdErrorOutline } from 'react-icons/md';

const cx = classNames.bind(styles);

function Notification(props) {
    const [state, setStates] = useState(false);
    const handleClick = () => {
        setStates(!state);
    };
    return (
        <div
            className={cx(
                (props.count % 2 === 1 && !state) || (props.count % 2 === 0 && state) || props.count === 0
                    ? 'container-confirm'
                    : 'hide-confirm',
            )}
        >
            <div className={cx('confirm__success')}>
                <div className={cx(props.check ? 'confirm__success-icon' : 'confirm__err')}>
                    {props.check ? (
                        <TiTickOutline className={cx('icon-success')} />
                    ) : (
                        <MdErrorOutline className={cx('icon-err')} />
                    )}
                    <p>{props.check ? 'SUCCESS' : 'Error'}</p>
                </div>

                <div className={cx('confirm__success-content')}>{props.message}</div>
                {props.check ? (
                    <Link
                        to={props.count !== 0 ? '/user/login' : '/admin/manage/books'}
                        state={{ token: props.count === 0 ? 'token' : '' }}
                    >
                        <div className={cx(props.count !== 0 ? 'confirm__success-link' : 'confirm__success-create')}>
                            <button>{props.messageLink}</button>
                        </div>
                    </Link>
                ) : (
                    <div className={cx('confirm__err-link')} onClick={handleClick}>
                        <button>{props.messageLink}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;
