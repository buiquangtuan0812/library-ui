import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FcProcess } from 'react-icons/fc';
import { TbTruckOff } from 'react-icons/tb';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import Cancel from './ConfirmCancel';

const cx = classNames.bind(styles);

function Order() {
    document.title = 'Đơn hàng của tôi | My library';
    const [user, setUser] = useState({});
    const [cancel, setCancel] = useState(false);
    const [orders, setOrders] = useState([]);
    const [numberCart, setNumberCart] = useState(0);
    const [idOrder, setIdOrder] = useState('');
    const [code, setCode] = useState('');
    const [arr, setArr] = useState([true, false, false, false, false, false]);
    const [orderCanceled, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [size1, setSize] = useState(0);
    const [size2, setSize2] = useState(0);
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
            setNumberCart(location.state.numberCart);
            axios
                .get('https://library-be-wine.vercel.app/users/order', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${location.state.user.accessToken}`,
                    },
                })
                .then((res) => {
                    setOrders(res.data);
                    res.data.map((item) => {
                        if (item.order.isCancel) {
                            setSize2(size2 + 1);
                        } else {
                            setSize(size1 + 1);
                        }
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [location.state, orderCanceled, success]);

    const solveString = (num) => {
        if (num === 0) {
            return '0';
        } else {
            const str = num.toString();
            return str.slice(0, str.length - 3) + '.' + str.slice(str.length - 3, str.length);
        }
    };

    const renderCart = orders.map((order, index) => {
        return (
            <div className={cx('order-item')} key={index}>
                <div className={cx('state-order')}>
                    <span className={cx('icon')}>
                        {order.order.isCancel ? <TbTruckOff /> : <FcProcess />}
                        {order.order.isCancel ? <span>Đã hủy</span> : <span>Đang xử lý</span>}
                    </span>
                    <span>Mã đơn hàng: #{order.order.code}</span>
                </div>
                {order.carts.map((cart, index) => {
                    return (
                        <div className={cx('cart-item')} key={index}>
                            <div className={cx('cart-item-1')}>
                                <span className={cx('img')}>
                                    <img alt="" src={cart.book.imgDes} />
                                </span>
                                <span className={cx('book')}>
                                    <p className={cx('name')}>{cart.book.name}</p>
                                    <p className={cx('author')}>{cart.book.author}</p>
                                    <p className={cx('quantity')}>SL: x{cart.quantity}</p>
                                </span>
                            </div>
                            <div className={cx('cart-item-2')}>
                                <span className={cx('price')}>
                                    {solveString(cart.book.price)}
                                    <span className={cx('unit')}>đ</span>
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div className={cx('total-price')}>
                    <span className={cx('total')}>Tổng tiền:</span>
                    <span>
                        {solveString(order.totalPrice)}
                        <span className={cx('unit')}>đ</span>
                    </span>
                </div>
                <div className={cx('btn')}>
                    <span className={cx('btn-1')}>
                        <button>Xem Chi tiết</button>
                    </span>
                    {!order.order.isCancel ? (
                        <span className={cx('btn-2')}>
                            <button
                                onClick={() => {
                                    setIdOrder(order.order._id);
                                    setCancel(true);
                                    setCode(order.order.code);
                                }}
                            >
                                Hủy
                            </button>
                        </span>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    });

    const renderOrderCanceled = orders.map((order, index) => {
        if (order.order.isCancel) {
            return (
                <div className={cx('order-item')} key={index}>
                    <div className={cx('state-order')}>
                        <span className={cx('icon')}>
                            <TbTruckOff />
                            <span>Đã hủy</span>
                        </span>
                        <span>Mã đơn hàng: #{order.order.code}</span>
                    </div>
                    {order.carts.map((cart, index) => {
                        return (
                            <div className={cx('cart-item')} key={index}>
                                <div className={cx('cart-item-1')}>
                                    <span className={cx('img')}>
                                        <img alt="" src={cart.book.imgDes} />
                                    </span>
                                    <span className={cx('book')}>
                                        <p className={cx('name')}>{cart.book.name}</p>
                                        <p className={cx('author')}>{cart.book.author}</p>
                                        <p className={cx('quantity')}>SL: x{cart.quantity}</p>
                                    </span>
                                </div>
                                <div className={cx('cart-item-2')}>
                                    <span className={cx('price')}>
                                        {solveString(cart.book.price)}
                                        <span className={cx('unit')}>đ</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div className={cx('total-price')}>
                        <span className={cx('total')}>Tổng tiền:</span>
                        <span>
                            {solveString(order.totalPrice)}
                            <span className={cx('unit')}>đ</span>
                        </span>
                    </div>
                    <div className={cx('btn')}>
                        <span className={cx('btn-1')}>
                            <button>Xem Chi tiết</button>
                        </span>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    });

    const renderCartDelivery = orders.map((order, index) => {
        if (!order.order.isCancel) {
            return (
                <div className={cx('order-item')} key={index}>
                    <div className={cx('state-order')}>
                        <span className={cx('icon')}>
                            <FcProcess />
                            <span>Đang xử lý</span>
                        </span>
                        <span>Mã đơn hàng: #{order.order.code}</span>
                    </div>
                    {order.carts.map((cart, index) => {
                        return (
                            <div className={cx('cart-item')} key={index}>
                                <div className={cx('cart-item-1')}>
                                    <span className={cx('img')}>
                                        <img alt="" src={cart.book.imgDes} />
                                    </span>
                                    <span className={cx('book')}>
                                        <p className={cx('name')}>{cart.book.name}</p>
                                        <p className={cx('author')}>{cart.book.author}</p>
                                        <p className={cx('quantity')}>SL: x{cart.quantity}</p>
                                    </span>
                                </div>
                                <div className={cx('cart-item-2')}>
                                    <span className={cx('price')}>
                                        {solveString(cart.book.price)}
                                        <span className={cx('unit')}>đ</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div className={cx('total-price')}>
                        <span className={cx('total')}>Tổng tiền:</span>
                        <span>
                            {solveString(order.totalPrice)}
                            <span className={cx('unit')}>đ</span>
                        </span>
                    </div>
                    <div className={cx('btn')}>
                        <span className={cx('btn-1')}>
                            <button>Xem Chi tiết</button>
                        </span>
                        <span className={cx('btn-2')}>
                            <button
                                onClick={() => {
                                    setIdOrder(order.order._id);
                                    setCancel(true);
                                    setCode(order.order.code);
                                }}
                            >
                                Hủy
                            </button>
                        </span>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    });
    const handleClick = (index) => {
        var newArr = [false, false, false, false, false, false];
        newArr[index] = true;
        setArr(newArr);
    };

    const handleChild = (value) => {
        setCancel(value.state);
        if (value.data !== null) {
            orderCanceled.unshift(value.data);
            setData(orderCanceled);
            setSuccess(true);
        }
    };

    return (
        <div>
            {cancel ? <Cancel handleChild={handleChild} id={idOrder} code={code} user={user} /> : ''}
            <Header user={user} numberCart={numberCart} />
            <div className={cx('container__page-body')}>
                <div className={cx('header')}>
                    <h3>Đơn hàng của tôi</h3>
                    <div className={cx('list-option')}>
                        <span className={cx(arr[0] ? 'clicked' : '')} onClick={() => handleClick(0)}>
                            Tất cả đơn
                        </span>
                        <span className={cx(arr[1] ? 'clicked' : '')} onClick={() => handleClick(1)}>
                            Chờ thanh toán
                        </span>
                        <span className={cx(arr[2] ? 'clicked' : '')} onClick={() => handleClick(2)}>
                            Đang xử lý
                        </span>
                        <span className={cx(arr[3] ? 'clicked' : '')} onClick={() => handleClick(3)}>
                            Đang vận chuyển
                        </span>
                        <span className={cx(arr[4] ? 'clicked' : '')} onClick={() => handleClick(4)}>
                            Đã giao
                        </span>
                        <span className={cx(arr[5] ? 'clicked' : '')} onClick={() => handleClick(5)}>
                            Đã hủy
                        </span>
                    </div>
                </div>
                <div className={cx('body')}>
                    {arr[0] ? (
                        <div className={cx('body-content-1')}>
                            <div className={cx('container-order')}>
                                {renderCart}
                                <div className={cx(orders.length === 0 ? 'confirm-notice' : 'hide')}>
                                    <span>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                                            alt=""
                                        />
                                    </span>
                                    <span>Chưa có đơn hàng</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {arr[2] ? (
                        <div className={cx('body-content-1')}>
                            <div className={cx('container-order')}>
                                {renderCartDelivery}
                                <div className={cx(size1 === 0 ? 'confirm-notice' : 'hide')}>
                                    <span>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                                            alt=""
                                        />
                                    </span>
                                    <span>Chưa có đơn hàng</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {arr[1] || arr[3] || arr[4] ? (
                        <div className={cx('body-content-2')}>
                            <div className={cx('confirm-notice')}>
                                <span>
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                                        alt=""
                                    />
                                </span>
                                <span>Chưa có đơn hàng</span>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {arr[5] ? (
                        <div className={cx('body-content-1')}>
                            <div className={cx('container-order')}>
                                {renderOrderCanceled}
                                <div className={cx(size2 === 0 ? 'confirm-notice' : 'hide')}>
                                    <span>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                                            alt=""
                                        />
                                    </span>
                                    <span>Chưa có đơn hàng</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Order;
