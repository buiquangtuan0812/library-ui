import classNames from 'classnames/bind';
import styles from './BookDetail.module.scss';

import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../Book/CategoryBook/CategoryBook';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookDetail() {
    let { nameBook } = useParams();
    const [book, setBook] = useState([]);
    document.title = 'Book | ' + nameBook;
    const [user, setUser] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
        }
    });

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

    const countPrice = (price) => {
        const oldPrice = (Number(price) + (Number(price) * 20) / 100).toString();
        return oldPrice.slice(0, oldPrice.length - 3) + '.000';
    };
    const solveString = (num) => {
        const str = num.toString();
        return str.slice(0, str.length - 3) + '.000';
    };
    return (
        <div>
            <Header user={user} />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/library/books">
                        <i className={cx('fa-solid fa-arrow-left')}></i>
                        Back
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
                                    <div className={cx('book-author')}>Edit by {book.author}</div>
                                </nav>
                                <div className={cx('container__book-content')}>
                                    <h3>OVERVIEW</h3>
                                    <span className={cx('container__book-content-des')}>
                                        Description:
                                        <p>{book.description}</p>
                                    </span>
                                    <span className={cx('container__book-content-page')}>
                                        Number of pages:
                                        <p>{book.numberPage}</p>
                                    </span>
                                    <span className={cx('container__book-content-date')}>
                                        Date publish:
                                        <p>{book.publish}</p>
                                    </span>
                                    <span className={cx('container__book-content-company')}>
                                        Publish company:
                                        <p>{book.publishCompany}</p>
                                    </span>
                                    <span className={cx('container__book-content-type')}>
                                        Type:
                                        <p>{book.type}</p>
                                    </span>
                                    <span className={cx('container__book-content-language')}>
                                        Language:
                                        <p>{book.language}</p>
                                    </span>
                                </div>
                            </div>
                            <div className={cx('col-4')}>
                                <div className={cx('container__book-cart')}>
                                    <div className={cx('container__book-cart-img')}>
                                        <img src={book.imgDes} alt="" />
                                    </div>
                                    <div className={cx('container__book-cart-price')}>
                                        <span>Price: </span>
                                        <span className={cx('value')}>{solveString(`${book.price}`)}đ</span>
                                    </div>
                                    <div className={cx('container__book-cart-save')}>
                                        <span>List Price:</span>
                                        <span>{countPrice(`${book.price}`)}đ</span>
                                        <span> (Save: 20%)</span>
                                        <p>Free shipping</p>
                                    </div>
                                    <div className={cx('bar-code-book')}></div>
                                    <div className={cx('container__book-cart-btn')}>
                                        <button>ADD TO CART</button>
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
