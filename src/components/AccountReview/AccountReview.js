import classNames from 'classnames/bind';
import styles from './AccountReview.module.scss';

import { Link } from 'react-router-dom';

import { BiHelpCircle, BiPackage } from 'react-icons/bi';
import { BsCoin } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';

const cx = classNames.bind(styles);

function AccountReview(props) {
    return (
        <div className={cx('ctn')}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(255, 255, 255, 1)"
                viewBox="0 0 24 8"
                width="1em"
                height="1em"
                className={cx('tiktok-znnspw-StyledTopArrow')}
            >
                <path d="M0 8c7 0 10-8 12-8s5 8 12 8z"></path>
            </svg>
            <div className={cx('container__account')}>
                <Link
                    to="/user/profile"
                    state={{ user: props.user, numberCart: props.numberCart }}
                    className={cx('container__account-profile')}
                >
                    <div>
                        <AiOutlineUser className={cx('icon')} />
                        View profile
                    </div>
                </Link>

                <div className={cx('container__account-coin')}>
                    <BsCoin className={cx('icon')} />
                    My coin
                </div>

                <Link
                    to="/user/order"
                    state={{ user: props.user, numberCart: props.numberCart }}
                    className={cx('container__account-coin')}
                >
                    <div>
                        <BiPackage className={cx('icon')} />
                        My Order
                    </div>
                </Link>

                <div className={cx('container__account-feedback')}>
                    <BiHelpCircle className={cx('icon')} />
                    Feedback and help
                </div>

                <Link to={'/user/login'} className={cx('container__account-logout')}>
                    <div>
                        <i className={cx('fa-solid fa-arrow-right-from-bracket')}></i>
                        Log out
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AccountReview;
