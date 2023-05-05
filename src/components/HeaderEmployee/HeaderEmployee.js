import classNames from 'classnames/bind';
import styles from './Styles.module.scss';

import { FiMessageCircle } from 'react-icons/fi';
import { AiFillSetting } from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';
import { BsBell } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderEmployee() {
    return (
        <div className={cx('header__page')}>
            <div className={cx('header__page-statistic')}>
                <span>My Library</span>
            </div>
            <div className={cx('header__page-interact')}>
                <span className={cx('header__page-interact-item')}>
                    <FiMessageCircle className={cx('icon-message')} />
                    <span>3</span>
                </span>
                <span className={cx('header__page-interact-item')}>
                    <BsBell className={cx('icon-bell')} />
                    <span>2</span>
                </span>
                <span className={cx('header__page-interact-item')}>
                    Cài đặt
                    <AiFillSetting className={cx('icon-setting')} />
                </span>
            </div>
        </div>
    );
}

export default HeaderEmployee;
