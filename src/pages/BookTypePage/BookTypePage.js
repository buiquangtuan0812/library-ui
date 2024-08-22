import classNames from 'classnames/bind';
import styles from './BookTypePage.module.scss';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../Book/CategoryBook/CategoryBook';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookTypePage() {
    const [user, setUser] = useState([]);
    const [dataBook, setdataBook] = useState([]);
    const [numberCart, setNumberCart] = useState(0);
    const location = useLocation();
    document.title = 'Book | ' + location.state.type;
    const url = 'https://library-be-wine.vercel.app/library/books/' + location.state.title;
    const urlAuthor = 'https://library-be-wine.vercel.app/library/books/author';
    useEffect(() => {
        setUser(location.state.user);
        if (location.state.author) {
            axios
                .get(urlAuthor, { params: { author: location.state.author } })
                .then((res) => setdataBook(res.data))
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .get(url)
                .then((res) => setdataBook(res.data))
                .catch((err) => {
                    console.log(err);
                });
        }
        axios
            .get('https://library-be-wine.vercel.app/users/cart', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${location.state.user.accessToken}`,
                },
            })
            .then((res) => {
                setNumberCart(res.data.length);
            })
            .catch((err) => console.error(err));
    }, [location.state.user, url, location.state.author, user]);

    const renderBook = useCallback(
        dataBook.map((book, index) => {
            return (
                <div className={cx('col-3')} key={index}>
                    <Link className={cx('link-item')} to={`/library/book/detail/${book.name}`} state={{ user: user }}>
                        <div className={cx('book-item')}>
                            <div className={cx('card')}>
                                <img src={book.imgDes} className={cx('card-img-top')} alt="..." />
                                <div className={cx('card-body')}>
                                    <div className={cx('card-title')}>
                                        <span className={cx('card-name')}>{book.name}</span>
                                        <span className={cx('card-text')}> ({book.author})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        }),
        [dataBook],
    );

    return (
        <div>
            <Header user={user} numberCart={numberCart} page="book" />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/library/books" state={{ user }}>
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
                        <div className={cx('row row-cols-auto"')}>{renderBook}</div>
                        <div className={cx('mb100')}></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookTypePage;
