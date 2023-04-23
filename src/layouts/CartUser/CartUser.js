import classNames from 'classnames/bind';
import styles from './CartUser.module.scss';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Tippy from '@tippyjs/react/headless';
import { FaTrashAlt } from 'react-icons/fa';
import { AiTwotoneHome } from 'react-icons/ai';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import CartItem from './CartItem/CartItem';
import Footer from '~/components/Display/Footer/Footer';
import AccountReview from '~/components/Display/AccountReview/AccountReview';

const cx = classNames.bind(styles);

function CartUser() {
    document.title = 'Giỏ hàng | My library';
    const location = useLocation();
    const [user, setUser] = useState({});
    const [carts, setCarts] = useState([]);
    const [numberCart, setNumberCart] = useState(0);

    useEffect(() => {
        setUser(location.state.user);
        setNumberCart(location.state.numberCart);
        axios
            .get('http://localhost:8086/users/cart', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${location.state.user.accessToken}`,
                },
            })
            .then((res) => {
                setCarts(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const renderCart = carts.map((cart, index) => {
        return (
            <div key={index}>
                <CartItem id={cart.book} quantity={cart.quantity} total={cart.total} state={cart.state} />
            </div>
        );
    });

    const renderTippy = (prop) => {
        return (
            <div>
                <AccountReview />
            </div>
        );
    };

    return (
        <div className={cx('container-page')}>
            <div className={cx('header')}>
                <div className={cx('btn-back')}>
                    <span className={cx('icon-back')}>
                        <MdOutlineArrowBackIosNew />
                    </span>
                    <span className={cx('back')}>
                        <Link to="/library/books" state={{ user }}>
                            Quay lại
                        </Link>
                    </span>
                </div>
                <div className={cx('logo')}>
                    <Link to="/home" state={{ user }}>
                        <span className={cx('icon')}></span>
                    </Link>
                </div>
                <div className={cx('header-item')}>
                    <span className={cx('support')}>Hỗ trợ</span>
                    <Tippy render={renderTippy} interactive delay={[200, 100]} offset={[-85, 12]} placement="bottom">
                        <span className={cx('my-account')}>
                            <img className={cx('icon-user')} src={user.imgDes} alt="" />
                        </span>
                    </Tippy>
                    <span className={cx('cart')}>
                        <i className={cx('fa-solid fa-cart-shopping')}></i>
                        {user.accessToken ? <span>{numberCart}</span> : ''}
                    </span>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('container')}>
                    <h2>GIỎ HÀNG</h2>
                    <div className={cx('row')}>
                        <div className={cx('col-9')}>
                            <div className={cx('container__left')}>
                                <div className={cx('container__left-header')}>
                                    <div className={cx('check-box')}>
                                        <input type="checkbox" />
                                    </div>
                                    <div className={cx('product')}>Tất cả ({numberCart} sản phẩm)</div>
                                    <div className={cx('price')}>Đơn giá</div>
                                    <div className={cx('quantity')}>Số lượng</div>
                                    <div className={cx('money')}>Thành tiền</div>
                                    <div className={cx('trash')}>
                                        <FaTrashAlt className={cx('icon-trash')} />
                                        <span>Xóa mục đã chọn</span>
                                    </div>
                                </div>
                                <div className={cx('container__cart-item')}>{renderCart}</div>
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('container__right')}>
                                <div className={cx('container__infor')}>
                                    <div className={cx('container__infor-header')}>
                                        <span>Giao tới</span>
                                        <span className={cx('btn-change')}>Thay đổi</span>
                                    </div>

                                    <div className={cx('container__infor-content')}>
                                        <div className={cx('information-user')}>
                                            <span className={cx('fullName')}>{user.fullName}</span>
                                            <span>{user.numberPhone}</span>
                                        </div>
                                        <div className={cx('address')}>
                                            <span className={cx('address-icon')}>
                                                <AiTwotoneHome className={cx('icon-address')} />
                                            </span>
                                            <span className={cx('address-detail')}>{user.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('container__money')}>
                                    <div className={cx('container__money-anti')}>
                                        <span>Tạm tính</span>
                                        <span className={cx('container__money-anti-value')}>100.000đ</span>
                                    </div>
                                    <div className={cx('container__money-discount')}>
                                        <span>Giảm giá</span>
                                        <span className={cx('container__money-discount-value')}>0đ</span>
                                    </div>
                                    <div className={cx('container__money-total')}>
                                        <span>Tổng tiền</span>
                                        <span className={cx('container__money-total-value')}>
                                            100.000
                                            <span className={cx('unit')}>đ</span>
                                        </span>
                                    </div>
                                    <div className={cx('container__btn-buy')}>Đặt mua</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CartUser;
