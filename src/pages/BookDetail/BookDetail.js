import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';

import Comment from '~/components/Comment/Comment';
import ConfirmCart from '~/components/ConfirmCart/ConfirmCart';
import ConfirmLogin from '~/components/ConfirmLogin/ConfirmLogin';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../Book/CategoryBook/CategoryBook';
import RatingStar from './RatingStar/index';

import axios from 'axios';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

const cx = classNames.bind(styles);

function BookDetail() {
    let { nameBook } = useParams();
    document.title = 'Book | ' + nameBook;
    const [book, setBook] = useState([]);
    const [user, setUser] = useState([]);
    const [check, setCheck] = useState(false);
    const [confirmLogin, setConfirmLogin] = useState(false);
    const [comment, setComment] = useState([]);
    const [numberCart, setNumberCart] = useState(0);
    const [showRating, setShowRating] = useState(false);
    const [success, setSuccess] = useState(false);
    const [checkLike, setCheckLike] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
            axios
                .get('https://be-library.vercel.app/users/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${location.state.user.accessToken}`,
                    },
                })
                .then((res) => {
                    setNumberCart(res.data.length);
                })
                .catch((err) => console.error(err));
        }
    }, [location.state, success]);

    useEffect(() => {
        axios
            .get('https://be-library.vercel.app/library/books/detail', { params: { name: nameBook } })
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [nameBook]);
    useEffect(() => {
        axios
            .get('https://be-library.vercel.app/users/cmt', { params: { name: nameBook } })
            .then((cmts) => {
                setComment(cmts.data);
            })
            .catch((err) => console.log(err));
    }, [nameBook, success, checkLike]);

    const handleRatingChange = (value) => {
        setShowRating(value.state);
        setSuccess(value.success);
    };

    const handleLike = (value) => {
        setCheckLike(value);
    };

    const renderCmt = useCallback(
        comment.map((cmt, index) => {
            return (
                <div key={index}>
                    <Comment
                        user={user}
                        id={cmt._id}
                        title={cmt.title}
                        time={cmt.created_at}
                        rating={cmt.rating}
                        like={cmt.like}
                        handleLike={handleLike}
                    />
                </div>
            );
        }),
        [comment],
    );
    const countPrice = (price) => {
        const oldPrice = (Number(price) + (Number(price) * 20) / 100).toString();
        return oldPrice.slice(0, oldPrice.length - 3) + '.000';
    };
    const solveString = (num) => {
        const str = num.toString();
        return str.slice(0, str.length - 3) + '.000';
    };

    const addCart = async () => {
        if (user.accessToken) {
            const data = {
                book: book._id,
                price: book.price,
                quantity: 1,
            };
            await axios
                .post('https://be-library.vercel.app/users/cart/add', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                })
                .then((response) => {
                    setNumberCart(numberCart + 1);
                    setCheck(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setConfirmLogin(true);
        }
    };

    return (
        <div>
            <Header user={user} numberCart={numberCart} />
            <div className={cx('container')}>
                <ConfirmCart check={check} user={user} numberCart={numberCart} />
                <ConfirmLogin check={confirmLogin} url={document.URL} />
                {showRating ? <RatingStar onChange={handleRatingChange} book={book} user={user} /> : ''}
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/books" state={{ user: user }}>
                        <span>
                            <i className={cx('fa-solid fa-arrow-left')}></i>
                        </span>
                        Quay lại
                    </Link>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-2')}>
                        <CategoryBook user={user} />
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('row row-cols-auto')}>
                            <div className={cx('col-8')}>
                                <nav className={cx('container__book-heading')}>
                                    <div id="nameBook">{book.name}</div>
                                    <div className={cx('book-author')}>
                                        <p>Tác giả: {book.author}</p>
                                        <p className={cx('sold')}>Đã bán {book.sold}</p>
                                    </div>
                                </nav>
                                <div className={cx('container__book-content')}>
                                    <h3>OVERVIEW</h3>
                                    <span className={cx('container__book-content-des')}>
                                        Mô tả:
                                        <ReactMarkdown children={book.description} remarkPlugins={[remarkGfm]} />
                                    </span>
                                    <span className={cx('container__book-content-page')}>
                                        Số trang:
                                        <p>{book.numberPage}</p>
                                    </span>
                                    <span className={cx('container__book-content-date')}>
                                        Ngày phát hành:
                                        <p>{book.publish}</p>
                                    </span>
                                    <span className={cx('container__book-content-type')}>
                                        Thể loại:
                                        <p>{book.type}</p>
                                    </span>
                                    <span className={cx('container__book-content-language')}>
                                        Ngôn ngữ:
                                        <p>{book.language}</p>
                                    </span>
                                    <span className={cx('container__book-content-company')}>
                                        Nhà xuất bản:
                                        <p>{book.publishCompany}</p>
                                    </span>
                                </div>
                                <div className={cx('container__book-feedback')}>
                                    <h3>Nhận xét - đánh giá từ độc giả</h3>
                                    {comment.length > 0 ? (
                                        renderCmt
                                    ) : (
                                        <div className={cx('not-cmt')}>Chưa có nhận xét đánh giá!</div>
                                    )}
                                    <div className={cx(user.accessToken ? 'comment__user' : 'hide')}>
                                        <div className={cx('imgDes-user')}>
                                            <img src={user.imgDes} alt="" />
                                        </div>
                                        <button onClick={setShowRating}>Viết nhận xét - đánh giá</button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-4')}>
                                <div className={cx('container__book-cart')}>
                                    <div className={cx('container__book-cart-img')}>
                                        <img src={book.imgDes} alt="" />
                                    </div>
                                    <div className={cx('container__book-cart-price')}>
                                        <span>Giá: </span>
                                        <span className={cx('value')}>{solveString(`${book.price}`)}đ</span>
                                    </div>
                                    <div className={cx('container__book-cart-save')}>
                                        <span>Giá gốc:</span>
                                        <span>{countPrice(`${book.price}`)}đ</span>
                                        <span> (Save: 20%)</span>
                                        <p>Miễn phí vận chuyển</p>
                                    </div>
                                    <div className={cx('bar-code-book')}></div>
                                    <div className={cx('container__book-cart-btn')}>
                                        <button onClick={addCart}>Thêm vào giỏ hàng</button>
                                    </div>
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

export default BookDetail;

// import React, { useState } from 'react';
// import RatingStar from './RatingStar';

// const ProductReview = () => {
//     const [rating, setRating] = useState(0);

//     const handleRatingChange = (value) => {
//         setRating(value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Gửi đánh giá sản phẩm lên máy chủ hoặc thực hiện hành động khác
//         console.log('Đánh giá sản phẩm:', rating);
//     };

//     return (
//         <div>
// <h2>Đánh giá sản phẩm</h2>
// <form onSubmit={handleSubmit}>
//     <RatingStar onChange={handleRatingChange} />
//     <button type="submit">Gửi đánh giá</button>
// </form>
//         </div>
//     );
// };

// export default ProductReview;
