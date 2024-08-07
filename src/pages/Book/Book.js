import classNames from 'classnames/bind';
import styles from './Book.module.scss';
import Header from '~/components/Display/Header/Header';
import Footer from '~/components/Display/Footer/Footer';
import CategoryBook from './CategoryBook/CategoryBook';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const cx = classNames.bind(styles);

function BookPage() {
    const [id, setIndex] = useState(1);
    const [numberCart, setNumberCart] = useState(0);
    const [dataBook, setdataBook] = useState([]);
    const [inputBook, setinputBook] = useState('');
    document.title = 'Book | My Library';

    const [user, setUser] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (location.state.user) {
            setUser(location.state.user);
        }
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
    }, [location.state, id]);

    useEffect(() => {
        axios
            .get('https://be-library.vercel.app/library/books')
            .then((res) => setdataBook(res.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const renderBook = useCallback(
        dataBook.map((book, index) => {
            if (index < 20 * (id - 1) || index >= 20 * id) {
                return '';
            } else {
                if (book.name.includes(inputBook)) {
                    return (
                        <div className={cx('col-3')} key={index}>
                            <Link className={cx('link-item')} to={`/book/detail/${book.name}`} state={{ user: user }}>
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
                }
            }
        }),
        [dataBook, id, inputBook],
    );

    const searchBook = () => {
        axios
            .get('https://be-library.vercel.app/library/books/search', { params: { name: inputBook } })
            .then((response) => {
                if (response.data.length > 1) {
                    setdataBook(response.data);
                } else {
                    setdataBook([response.data]);
                }
            })
            .catch((err) => console.error(err));
    };

    const [indexArr, setArr] = useState([true, false, false, false]);
    const handleDivide = (value) => {
        const arr = [false, false, false, false];
        for (var i = 0; i < arr.length; i++) {
            if (value === i + 1) {
                arr[i] = true;
            }
        }
        setArr(arr);
        setIndex(value);
    };
    const handlePre = () => {
        if (id === 1) {
            return;
        } else {
            const value = id - 1;
            const arr = [false, false, false, false];
            for (var i = 0; i < arr.length; i++) {
                if (value === i + 1) {
                    arr[i] = true;
                }
            }
            setArr(arr);
            setIndex(value);
        }
    };

    const handleNext = () => {
        if (id === 4) {
            return;
        } else {
            const value = id + 1;
            const arr = [false, false, false, false];
            for (var i = 0; i < arr.length; i++) {
                if (value === i + 1) {
                    arr[i] = true;
                }
            }
            setArr(arr);
            setIndex(value);
        }
    };

    return (
        <div>
            <Header user={user} numberCart={numberCart} page="book" />
            <div className={cx('container')}>
                <div className={cx('separate')}></div>
                <div className={cx('btn-back')}>
                    <Link to="/home">
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
                                        value={inputBook}
                                        onChange={(e) => setinputBook(e.target.value)}
                                    />
                                </div>
                                <div className={cx('col-2')} id="btnSubmit">
                                    <button onClick={searchBook} className={cx('btn-search')}>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('row row-cols-auto"')}>{renderBook}</div>
                        <div className={cx('divide-page')}>
                            <span className={cx('icon-pre')} onClick={handlePre}>
                                <GrFormPrevious />
                            </span>
                            <span
                                className={cx(indexArr[0] === true ? 'index-curr' : 'index')}
                                onClick={() => handleDivide(1)}
                            >
                                1
                            </span>
                            <span
                                className={cx(indexArr[1] === true ? 'index-curr' : 'index')}
                                onClick={() => handleDivide(2)}
                            >
                                2
                            </span>
                            <span
                                className={cx(indexArr[2] === true ? 'index-curr' : 'index')}
                                onClick={() => handleDivide(3)}
                            >
                                3
                            </span>
                            <span
                                className={cx(indexArr[3] === true ? 'index-curr' : 'index')}
                                onClick={() => handleDivide(4)}
                            >
                                4
                            </span>
                            <span>
                                <GrFormNext className={cx('icon-next')} onClick={handleNext} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookPage;
