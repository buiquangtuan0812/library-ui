import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import AccountReview from '../AccountReview/AccountReview';

import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header(props) {
    const renderTippy = (prop) => {
        return (
            <div>
                <AccountReview />
            </div>
        );
    };
    return (
        <div className={cx('header')}>
            <div className={cx('container__content')}>
                <div className={cx('container__content-book')}>
                    <Link to="/library/books" state={props.user ? { user: props.user } : ''}>
                        Sách
                    </Link>
                </div>
                <div className={cx('container__content-author')}>
                    <Link to="/library/authors">Tác giả</Link>
                </div>
                <div className={cx('container__content-blog')}>
                    <Link to="/library/blogs" state={props.user ? { user: props.user } : ''}>
                        Blogs
                    </Link>
                </div>
            </div>

            <div className={cx('container__infor')}>
                <div className={cx('introduction')}>
                    <Link to="/home" state={{ user: props.user }}>
                        <span className={cx('icon')}></span>
                    </Link>
                </div>
            </div>

            <div className={cx('container__account')}>
                {props.user.accessToken ? (
                    <Tippy render={renderTippy} interactive delay={[200, 100]} offset={[-85, 3]} placement="bottom">
                        <div className={cx('container__account-user')}>
                            <img src={props.user.imgDes} className={cx('iconUser')} alt="" />
                        </div>
                    </Tippy>
                ) : (
                    <Link to="/library/login">
                        <div className={cx('container__account-user')}>Đăng nhập</div>
                    </Link>
                )}
                <div className={cx('container__account-support')}>
                    <a href="/">Hỗ trợ</a>
                </div>
                <div className={cx('container__account-cash')}>
                    <a href="/">
                        <i className={cx('fa-solid fa-cart-shopping')}></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;
