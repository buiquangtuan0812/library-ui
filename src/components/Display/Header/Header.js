import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BiUserCircle } from 'react-icons/bi';

const cx = classNames.bind(styles);

function Header(props) {
    const [token, setToken] = useState('');
    useEffect(() => {
        setToken(props.user.token);
    });
    return (
        <div className={cx('header')}>
            <div className={cx('container__content')}>
                <div className={cx('container__content-book')}>
                    <Link to="/library/books" state={{ user: props.user }}>
                        Books
                    </Link>
                </div>
                <div className={cx('container__content-author')}>
                    <Link to="/library/authors">Author</Link>
                </div>
                <div className={cx('container__content-blog')}>
                    <Link to="/library/blogs">Blogs</Link>
                </div>
            </div>

            <div className={cx('container__infor')}>
                <div className={cx('introduction')}>
                    <span className={cx('icon')}></span>
                </div>
            </div>

            <div className={cx('container__account')}>
                <div className={cx('container__account-user')}>
                    <Link to="/library/login">{token ? <BiUserCircle className={cx('iconUser')} /> : 'Log in'}</Link>
                </div>
                <div className={cx('container__account-support')}>
                    <a href="/">Support</a>
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
