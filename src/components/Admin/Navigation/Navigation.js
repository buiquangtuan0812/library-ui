import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';

import { IoBookSharp } from 'react-icons/io5';
import { RiCalendarEventLine } from 'react-icons/ri';
import { ImLibrary } from 'react-icons/im';
import { BiChevronRight } from 'react-icons/bi';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navigation() {
    const [item1, setItem1] = useState(false);
    const [item2, setItem2] = useState(false);
    const [item3, setItem3] = useState(false);
    const [item4, setItem4] = useState(false);
    const [item5, setItem5] = useState(false);
    const [item6, setItem6] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);

    const handleClick = (value) => {
        setCurrentItem(value);
        setItem1(false);
        setItem2(false);
        setItem3(false);
        setItem4(false);
        setItem5(false);
        setItem6(false);
        if (value === currentItem) {
            return;
        }
        if (value === 1) {
            setItem1(true);
        } else if (value === 2) {
            setItem2(true);
        } else if (value === 3) {
            setItem3(true);
        } else if (value === 4) {
            setItem4(true);
        } else if (value === 5) {
            setItem5(true);
        } else {
            setItem6(true);
        }
    };
    return (
        <div className={cx('container__admin-navigation')}>
            <div className={cx('heading-navigation')}>
                <span className={cx('logo-library')}></span>
                <span className={cx('title-library')}>My Library</span>
            </div>
            <span className={cx('separate')}></span>

            <div className={cx('main__navigation')}>
                <div className={cx('main__navigation-header')}>MAIN NAVIGATION</div>

                <div className={cx('main__navigation-menu')}>
                    <ul className={cx('main__navigation-menu-items')}>
                        <li className={cx('item')}>
                            <div className={cx('nav-item-1')} onClick={() => handleClick(1)}>
                                <ImLibrary className={cx('icon-navigation')}></ImLibrary>
                                Library
                                <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                            </div>
                            <div className={cx(item1 === true ? 'nav-item-2' : 'hide')}>
                                <ul className={cx('nav-item-library')}>
                                    <li>
                                        <Link to="">Information</Link>
                                    </li>
                                    <li>
                                        <Link to="">Fix</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('nav-item-1')} onClick={() => handleClick(2)}>
                                <i className={cx('fa-solid fa-user-tie')}></i>
                                Users
                                <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                            </div>
                            <div className={cx(item2 === true ? 'nav-item-2' : 'hide')}>
                                <ul className={cx('nav-item-library')}>
                                    <li>
                                        <Link to="">List</Link>
                                    </li>
                                    <li>
                                        <Link to="">Delete</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('nav-item-1')} onClick={() => handleClick(3)}>
                                <IoBookSharp className={cx('icon-navigation')}></IoBookSharp>
                                Books
                                <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                            </div>
                            <div className={cx(item3 === true ? 'nav-item-2' : 'hide')}>
                                <ul className={cx('nav-item-library')}>
                                    <li>
                                        <Link to="/admin/manage/books" state={{ page: 'ManagementBook' }}>
                                            List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/manage/book-create" state={{ page: 'book-create' }}>
                                            Create
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('nav-item-1')} onClick={() => handleClick(4)}>
                                <i className={cx('fa-solid fa-user-secret')}></i>
                                Authors
                                <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                            </div>
                            <div className={cx(item4 === true ? 'nav-item-2' : 'hide')}>
                                <ul className={cx('nav-item-library')}>
                                    <li>
                                        <Link to="">List</Link>
                                    </li>
                                    <li>
                                        <Link to="">Create</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('nav-item-1')} onClick={() => handleClick(5)}>
                                <i className={cx('fa-solid fa-blog')}></i>
                                Blogs
                                <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                            </div>
                            <div className={cx(item5 === true ? 'nav-item-2' : 'hide')}>
                                <ul className={cx('nav-item-library')}>
                                    <li>
                                        <Link to="">List</Link>
                                    </li>
                                    <li>
                                        <Link to="">Create</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('nav-item-1')} onClick={() => handleClick(6)}>
                                <RiCalendarEventLine className={cx('icon-navigation')}></RiCalendarEventLine>
                                Sales
                                <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                            </div>
                            <div className={cx(item6 === true ? 'nav-item-2' : 'hide')}>
                                <ul className={cx('nav-item-library')}>
                                    <li>
                                        <Link to="">History</Link>
                                    </li>
                                    <li>
                                        <Link to="">Rent</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
