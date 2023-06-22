import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import React from 'react';

import { ImWarning } from 'react-icons/im';

const cx = classNames.bind(styles);

function Confirm(props) {
    return (
        <div className={cx('show')}>
            <div className={cx('container__confirm')}>
                <span className={cx('icon-warn')}>
                    <ImWarning />
                </span>
                <span className={cx('text')}>{props.text}</span>
            </div>
        </div>
    );
}

export default Confirm;
