import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';

import Comment from '~/components/Comment/Comment';
import ConfirmCart from './ConfirmCart/ConfirmCart';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../Book/CategoryBook/CategoryBook';

import { BsFillSendFill } from 'react-icons/bs';

import axios from 'axios';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';

const cx = classNames.bind(styles);

function BookDetail() {
    let { nameBook } = useParams();
    const [book, setBook] = useState([]);
    document.title = 'Book | ' + nameBook;
    const [user, setUser] = useState([]);
    const [check, setCheck] = useState(false);
    const [comment, setComment] = useState([]);
    const [cmtUser, setCmtUser] = useState('');
    const [numberCart, setNumberCart] = useState(0);

    const inputElement = useRef();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
        }
        axios
            .get('http://localhost:8086/users/cart', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${location.state.user.accessToken}`,
                },
            })
            .then((res) => {
                setNumberCart(res.data.length);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8086/library/books/detail', { params: { name: nameBook } })
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://localhost:8086/users/cmt', { params: { name: nameBook } })
            .then((cmts) => {
                setComment(cmts.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleCmt = async () => {
        console.log('success');
        const data = {
            book: book._id,
            title: cmtUser,
        };
        await axios
            .post('http://localhost:8086/users/cmt/create', data, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.accessToken}` },
            })
            .then((response) => {
                const cmt = [response.data];
                setComment(comment.concat(cmt));
                inputElement.current.focus();
                inputElement.current.value = '';
            })
            .catch((err) => console.log(err));
    };
    document.onkeyup = async (e) => {
        const data = {
            book: book._id,
            title: cmtUser,
        };
        if (e.key === 'Enter' && cmtUser !== '') {
            await axios
                .post('http://localhost:8086/users/cmt/create', data, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.accessToken}` },
                })
                .then((response) => {
                    const cmt = [response.data];
                    setComment(comment.concat(cmt));
                    inputElement.current.focus();
                    inputElement.current.value = '';
                })
                .catch((err) => console.log(err));
        }
    };
    const renderCmt = useCallback(
        comment.map((cmt, index) => {
            return (
                <div key={index}>
                    <Comment user={cmt._id} title={cmt.title} time={cmt.created_at} />
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
        const data = {
            book: book._id,
            price: book.price,
            quantity: 1,
        };
        await axios
            .post('http://localhost:8086/users/cart/add', data, {
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
    };

    return (
        <div>
            <Header user={user} numberCart={numberCart} />
            <div className={cx('container')}>
                <ConfirmCart check={check} user={user} numberCart={numberCart} />
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/library/books" state={{ user: user }}>
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
                                        <div className={cx('comment__user-text')}>
                                            <form>
                                                <textarea
                                                    className={cx('input-cmt')}
                                                    type="text"
                                                    placeholder="Viết nhận xét - đánh giá!"
                                                    name="comment"
                                                    spellCheck={false}
                                                    maxLength="200"
                                                    onChange={(e) => setCmtUser(e.target.value)}
                                                    ref={inputElement}
                                                />
                                                <BsFillSendFill className={cx('icon-send')} onClick={handleCmt} />
                                            </form>
                                            <span>Nhấn Enter để đăng.</span>
                                        </div>
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
