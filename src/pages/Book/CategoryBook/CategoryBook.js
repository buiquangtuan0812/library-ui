import classNames from 'classnames/bind';
import styles from './CategoryBook.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CategoryBook(props) {
    const [activeStates, setActiveStates] = useState({
        categories: [false, false, false, false, false, false, false, false],
        authors: [false, false, false, false, false],
        areas: [false, false],
    });

    const handleTitle = (title) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    };

    const listType = [
        { type: 'Tâm lý học', title: 'psychology' },
        { type: 'Kinh tế', title: 'economy' },
        { type: 'Văn học', title: 'literature' },
        { type: 'Lịch sử', title: 'history' },
        { type: 'Phát triển bản thân', title: 'self-growth' },
        { type: 'Kỹ năng sống', title: 'life-skill' },
        { type: 'Chánh niệm', title: 'contemplation' },
        { type: 'Kỹ năng giao tiếp', title: 'communicate' },
    ];

    const listAuthor = ['Dale Carnegie', 'Paulo Coelho', 'Thích Nhất Hạnh', 'Tony Buổi Sáng', 'Nguyễn Nhật Ánh'];

    const updateState = (type, index) => {
        const newState = {
            categories: type === 'categories' ? generateArray(8, index) : generateFalseArray(8),
            authors: type === 'authors' ? generateArray(5, index) : generateFalseArray(5),
            areas: type === 'areas' ? generateArray(2, index) : generateFalseArray(2),
        };
        setActiveStates(newState);
    };

    const generateArray = (size, activeIndex) => {
        return Array(size)
            .fill(false)
            .map((_, index) => index === activeIndex);
    };

    const generateFalseArray = (size) => {
        return Array(size).fill(false);
    };

    const renderList = (list, type, isAuthor) =>
        list.map((item, index) => (
            <Link
                key={index}
                className={isAuthor ? cx('link-author') : cx('item-catergory')}
                to={`/library/book/${isAuthor ? 'author/' + item : item.title}`}
                onClick={() => updateState(type, index)}
                state={{
                    [isAuthor ? 'author' : 'title']: isAuthor ? item : item.title,
                    user: props.user,
                    type: handleTitle(isAuthor ? item : item.title),
                }}
            >
                <li
                    className={cx(isAuthor ? 'getAuthor' : 'item')}
                    style={activeStates[type][index] ? { color: '#f05123' } : { color: '#000' }}
                >
                    {isAuthor ? item : item.type}
                </li>
            </Link>
        ));

    return (
        <div className={cx('container__catergory')}>
            <h2>Main navigation</h2>
            <ul className={cx('catergory__search')}>
                Thể loại
                {renderList(listType, 'categories', false)}
            </ul>
            <ul className={cx('author__search')}>
                Tác giả
                {renderList(listAuthor, 'authors', true)}
            </ul>
            <ul className={cx('country__search')}>
                Phạm vi
                {['domestic', 'foreign'].map((area, index) => (
                    <li className={cx('item-area')} key={index} onClick={() => updateState('areas', index)}>
                        <Link
                            className={cx('item')}
                            to={`/library/book/${area}`}
                            style={activeStates.areas[index] ? { color: '#f05123' } : { color: '#000' }}
                            state={{ title: area, user: props.user, type: handleTitle(area) }}
                        >
                            {index === 0 ? 'Trong nước' : 'Nước ngoài'}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryBook;
