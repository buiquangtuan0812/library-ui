import classNames from 'classnames/bind';
import styles from './BookTypePage.module.scss';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../CategoryBook/CategoryBook';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookTypePage() {
    const [dataBook, setdataBook] = useState([]);
    const [inputBook, setinputBook] = useState('');
    const [user, setUser] = useState([]);
    const location = useLocation();
    document.title = 'Book | ' + location.state.type;
    const url = 'http://localhost:8086/library/books/' + location.state.title;
    const urlAuthor = 'http://localhost:8086/library/books/author';
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
    }, []);
    const renderBook = dataBook.map((book, index) => {
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
    });
    return (
        <div>
            <Header user={user} />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <a href="/library">
                        <i className={cx('fa-solid fa-arrow-left')}></i>
                        Back
                    </a>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-2')}>
                        <CategoryBook user={user} />
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('row')}>
                            <form className={cx('form-serach')} method="GET" action="/library/books/search">
                                <div className={cx('col-1')} id="btnSubmit">
                                    <Link to={`/library/book/detail/${inputBook}`}>
                                        <button type="submit" className={cx('btn-search')}>
                                            Search
                                        </button>
                                    </Link>
                                </div>
                                <div className={cx('col-6 search__input form-group')}>
                                    <label htmlFor="name"></label>
                                    <input
                                        type="text"
                                        className={cx('input__value')}
                                        name="name"
                                        id="name"
                                        placeholder="Nhập từ khóa tìm kiếm!"
                                        onChange={(e) => setinputBook(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className={cx('row row-cols-auto"')}>{renderBook}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookTypePage;
