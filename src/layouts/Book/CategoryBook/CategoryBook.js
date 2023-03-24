import classNames from 'classnames/bind';
import styles from './CategoryBook.module.scss';

const cx = classNames.bind(styles);

function CategoryBook() {
    return (
        <div className={cx('container__catergory')}>
            <h2>Search</h2>
            <ul className={cx('catergory__search')}>
                Catergory
                <li className={cx('item-catergory')}>
                    <a href="/library/books/psychology">Psychology</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/economy">Economy</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/literature">Literature</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/history">History</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/self-growth">Self growth</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/life-skill">Life Skills</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/contemplation">Contemplation</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/communicate">Communicate</a>
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
                    <a href="/library/books/domestic">Domestic</a>
                </li>
                <li className={cx('item-catergory')}>
                    <a href="/library/books/foreign">Foreign</a>
                </li>
            </ul>
        </div>
    );
}

export default CategoryBook;
