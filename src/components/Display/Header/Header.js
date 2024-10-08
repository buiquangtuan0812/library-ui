import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import AccountReview from '../../AccountReview/AccountReview';

const cx = classNames.bind(styles);

function Header(props) {
    const renderTippy = (prop) => {
        return (
            <div>
                <AccountReview user={props.user} numberCart={props.numberCart} />
            </div>
        );
    };

    return (
        <div className={cx('header')}>
            <div className={cx('container__content')}>
                <div className={cx('container__content-book')}>
                    <Link to="/library/books" state={props.user ? { user: props.user } : ''}>
                        {props.page === 'book' ? <span style={{ color: '#ffca42' }}>Sách</span> : <span>Sách</span>}
                    </Link>
                </div>
                <div className={cx('container__content-author')}>
                    <Link to="/library/authors" state={props.user ? { user: props.user } : ''}>
                        {props.page === 'author' ? (
                            <span style={{ color: '#ffca42' }}>Tác giả</span>
                        ) : (
                            <span>Tác giả</span>
                        )}
                    </Link>
                </div>
                <div className={cx('container__content-blog')}>
                    <Link to="/library/blogs" state={props.user ? { user: props.user } : ''}>
                        {props.page === 'blog' ? <span style={{ color: '#ffca42' }}>Blogs</span> : <span>Blogs</span>}
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
                    <Link to="/user/login">
                        <div className={cx('container__account-login')}>Đăng nhập</div>
                    </Link>
                )}
                <div className={cx('container__account-support')}>
                    <Link to="/">Hỗ trợ</Link>
                </div>
                {props.user.accessToken ? (
                    <Link to="/user/carts" state={{ user: props.user, numberCart: props.numberCart }}>
                        <div className={cx('container__account-cash')}>
                            <i className={cx('fa-solid fa-cart-shopping')}></i>
                            {props.user.accessToken ? <span>{props.numberCart}</span> : ''}
                        </div>
                    </Link>
                ) : (
                    <Link
                        to="/user/login"
                        state={{
                            url: 'http://localhost:3000/user/carts',
                            user: props.user,
                            numberCart: props.numberCart,
                        }}
                    >
                        <div className={cx('container__account-cash')}>
                            <i className={cx('fa-solid fa-cart-shopping')}></i>
                            {props.user.accessToken ? <span>{props.numberCart}</span> : ''}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
