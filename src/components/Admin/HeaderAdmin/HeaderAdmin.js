import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';

import { FcStatistics } from 'react-icons/fc';
import { FaSupple } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderAdmin() {
    return (
        <div className={cx('header__admin')}>
            <div className={cx('header__admin-statistic')}>
                <span className={cx('header__admin-statistic-item')}>
                    <Link to="/admin/home">
                        <FcStatistics className={cx('icon-header')}></FcStatistics>
                        Statistic
                        <span className={cx('interact-click')}></span>
                    </Link>
                </span>

                <span className={cx('header__admin-statistic-item')}>
                    <FaSupple className={cx('icon-header')}></FaSupple>
                    Supplier
                </span>
                <span className={cx('header__admin-statistic-item')}>
                    <i className={cx('fa-solid fa-user-tie')}></i>
                    Staff
                </span>
            </div>
            <div className={cx('header__admin-interact')}>
                <span className={cx('header__admin-interact-item')}>
                    <i className={cx('fa-regular fa-envelope')}></i>
                    <span>3</span>
                </span>
                <span className={cx('header__admin-interact-item')}>
                    <i className={cx('fa-regular fa-bell')}></i>
                    <span>2</span>
                </span>
                <span className={cx('header__admin-interact-item')}>
                    <GrUserAdmin className={cx('icon-admin')}></GrUserAdmin>
                    Admin
                </span>
            </div>
        </div>
    );
}

export default HeaderAdmin;
