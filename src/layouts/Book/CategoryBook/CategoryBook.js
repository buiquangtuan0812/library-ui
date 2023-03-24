import classNames from 'classnames/bind';
import styles from './CategoryBook.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CategoryBook(props) {
    const handleTitle = (title) => {
        return title.slice(0, 1).toUpperCase() + title.slice(1, title.length);
    };
    return (
        <div className={cx('container__catergory')}>
            <h2>Search</h2>
            <ul className={cx('catergory__search')}>
                Catergory
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'psychology'}`}
                        state={{ title: 'psychology', user: props.user, type: handleTitle('psychology') }}
                    >
                        Psychology
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'economy'}`}
                        state={{ title: 'economy', user: props.user, type: handleTitle('economy') }}
                    >
                        Economy
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'literature'}`}
                        state={{ title: 'literature', user: props.user, type: handleTitle('literature') }}
                    >
                        Literature
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'history'}`}
                        state={{ title: 'history', user: props.user, type: handleTitle('history') }}
                    >
                        History
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'self-growth'}`}
                        state={{ title: 'self-growth', user: props.user, type: handleTitle('self-growth') }}
                    >
                        Self growth
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'life-skill'}`}
                        state={{ title: 'life-skill', user: props.user, type: handleTitle('life-skill') }}
                    >
                        Life Skills
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'contemplation'}`}
                        state={{ title: 'contemplation', user: props.user, type: handleTitle('contemplation') }}
                    >
                        Contemplation
                    </Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link
                        to={`/library/book/${'communicate'}`}
                        state={{ title: 'communicate', user: props.user, type: handleTitle('communicate') }}
                    >
                        Communicate
                    </Link>
                </li>
            </ul>
            <ul className={cx('author__search')}>
                {/* <i className={cx('fa-solid fa-user-secret"></i> */}
                Author
                <li className={cx('getAuthor')}>Dale Carnegie</li>
                <li className={cx('getAuthor')}>Paulo Coelho</li>
                <li className={cx('getAuthor')}>Thích Nhất Hạnh</li>
                <li className={cx('getAuthor')}>Tony Buổi Sáng</li>
                <li className={cx('getAuthor')}>Nguyễn Nhật Ánh</li>
            </ul>

            <ul className={cx('country__search')}>
                Country
                <li className={cx('item-catergory')}>
                    <Link to="/library/books/domestic">Domestic</Link>
                </li>
                <li className={cx('item-catergory')}>
                    <Link to="/library/books/foreign">Foreign</Link>
                </li>
            </ul>
        </div>
    );
}

export default CategoryBook;
