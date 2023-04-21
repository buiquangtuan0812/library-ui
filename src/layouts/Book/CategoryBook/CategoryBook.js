import classNames from 'classnames/bind';
import styles from './CategoryBook.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CategoryBook(props) {
    const [stateArea, setArea] = useState([false, false]);
    const [stateAuthor, setStateAuthor] = useState([false, false, false, false, false]);
    const [state, setState] = useState([false, false, false, false, false, false, false, false]);

    const handleTitle = (title) => {
        return title.slice(0, 1).toUpperCase() + title.slice(1, title.length);
    };
    const listType = [
        {
            type: 'Tâm lý học',
            title: 'psychology',
        },
        {
            type: 'Kinh tế',
            title: 'economy',
        },
        {
            type: 'Văn học',
            title: 'literature',
        },
        {
            type: 'Lịch sử',
            title: 'history',
        },
        {
            type: 'Phát triển bản thân',
            title: 'self-growth',
        },
        {
            type: 'Kỹ năng sống',
            title: 'life-skill',
        },
        {
            type: 'Chánh niệm',
            title: 'contemplation',
        },
        {
            type: 'Kỹ năng giao tiếp',
            title: 'communicate',
        },
    ];

    const listAuthor = ['Dale Carnegie', 'Paulo Coelho', 'Thích Nhất Hạnh', 'Tony Buổi Sáng', 'Nguyễn Nhật Ánh'];

    const changeColor = (index) => {
        const arr = [false, false, false, false, false, false, false, false];
        setStateAuthor([false, false, false, false, false]);
        setArea([false, false]);
        setState(arr);
        arr[index] = true;
        setState(arr);
    };
    const changeColorAuthor = (index) => {
        const arr = [false, false, false, false, false];
        setState([false, false, false, false, false, false, false, false]);
        setArea([false, false]);
        setStateAuthor(arr);
        arr[index] = true;
        setStateAuthor(arr);
    };

    const changeColorArea = (index) => {
        const arr = [false, false];
        setState([false, false, false, false, false, false, false, false]);
        setStateAuthor([false, false, false, false, false]);
        setArea(arr);
        arr[index] = true;
        setArea(arr);
    };

    const renderType = listType.map((type, index) => {
        return (
            <li className={cx('item-catergory')} key={index} onClick={() => changeColor(index)}>
                <Link
                    to={`/library/book/${type.title}`}
                    style={state[index] ? { color: '#f05123' } : { color: '#000' }}
                    state={{ title: type.title, user: props.user, type: handleTitle(type.title) }}
                >
                    {type.type}
                </Link>
            </li>
        );
    });

    const renderAuthor = listAuthor.map((author, index) => {
        return (
            <Link
                key={index}
                className={cx('link-author')}
                to={`/library/book/author/${author}`}
                onClick={() => changeColorAuthor(index)}
                state={{ author: author, user: props.user, type: handleTitle(author) }}
            >
                <li className={cx('getAuthor')} style={stateAuthor[index] ? { color: '#f05123' } : { color: '#000' }}>
                    {author}
                </li>
            </Link>
        );
    });

    return (
        <div className={cx('container__catergory')}>
            <h2>Main navigation</h2>
            <ul className={cx('catergory__search')}>
                Thể loại
                {renderType}
            </ul>
            <ul className={cx('author__search')}>
                Tác giả
                {renderAuthor}
            </ul>

            <ul className={cx('country__search')}>
                Phạm vi
                <li className={cx('item-catergory')} onClick={() => changeColorArea(0)}>
                    <Link
                        to={`/library/book/${'domestic'}`}
                        style={stateArea[0] ? { color: '#f05123' } : { color: '#000' }}
                        state={{ title: 'domestic', user: props.user, type: handleTitle('domestic') }}
                    >
                        Trong nước
                    </Link>
                </li>
                <li className={cx('item-catergory')} onClick={() => changeColorArea(1)}>
                    <Link
                        to={`/library/book/${'foreign'}`}
                        style={stateArea[1] ? { color: '#f05123' } : { color: '#000' }}
                        state={{ title: 'foreign', user: props.user, type: handleTitle('foreign') }}
                    >
                        Nước ngoài
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CategoryBook;
