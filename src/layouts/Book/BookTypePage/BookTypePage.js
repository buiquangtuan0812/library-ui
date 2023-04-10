import classNames from 'classnames/bind';
import styles from './BookTypePage.module.scss';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from '../CategoryBook/CategoryBook';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
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
    }, [dataBook]);

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

    const searchBook = () => {
        axios
            .get('http://localhost:8086/library/books/search', { params: { name: inputBook } })
            .then((response) => {
                if (response.data.length > 1) {
                    setdataBook(response.data);
                } else {
                    setdataBook([response.data]);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <Header user={user} />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/library/books">
                        <i className={cx('fa-solid fa-arrow-left')}></i>
                        Quay lại
                    </Link>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-2')}>
                        <CategoryBook user={user} />
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('row')}>
                            <div className={cx('form-serach')}>
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
                                <div className={cx('col-2')} id="btnSubmit">
                                    {/* <Link to={`/library/book/detail/${inputBook}`}> */}
                                    <button type="submit" className={cx('btn-search')} onClick={searchBook}>
                                        Tìm kiếm
                                    </button>
                                    {/* </Link> */}
                                </div>
                            </div>
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
