import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';

import { BiChevronRight } from 'react-icons/bi';
import { FaSellcast } from 'react-icons/fa';
import { GiWhiteBook } from 'react-icons/gi';
import { RiContactsBookUploadFill } from 'react-icons/ri';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navigation(props) {
    const [item1, setItem1] = useState(false);
    const [item2, setItem2] = useState(false);
    const [item3, setItem3] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);

    const handleClick = (value) => {
        setCurrentItem(value);
        if (value === currentItem) {
            return;
        }
        setItem1(false);
        setItem2(false);
        setItem3(false);
        if (value === 1) {
            setItem1(true);
        } else if (value === 2) {
            setItem2(true);
        } else if (value === 3) {
            setItem3(true);
        }
    };
    return (
        <div className={cx('container__page-navigation')}>
            <div className={cx('heading-navigation')}>
                <span className={cx('logo-library')}></span>
            </div>
            <span className={cx('separate')}></span>

            <div className={cx('main__navigation')}>
                <div className={cx('main__navigation-header')}>MAIN NAVIGATION</div>

                <div className={cx('main__navigation-menu')}>
                    <ul className={cx('main__navigation-menu-items')}>
                        <li className={cx('item')}>
                            <Link to="/employee/sell" state={{ data: props.data }}>
                                <div
                                    className={cx(item1 ? 'nav-item-clicked' : 'nav-item-1')}
                                    onClick={() => handleClick(1)}
                                >
                                    <FaSellcast className={cx('icon-navigation')} />
                                    Bán sách
                                    <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                                </div>
                            </Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to="/employee/lend" state={{ data: props.data }}>
                                <div
                                    className={cx(item2 ? 'nav-item-clicked' : 'nav-item-1')}
                                    onClick={() => handleClick(2)}
                                >
                                    <RiContactsBookUploadFill className={cx('icon-navigation')} />
                                    Thuê sách
                                    <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                                </div>
                            </Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to="/employee/return" state={{ data: props.data }}>
                                <div
                                    className={cx(item3 ? 'nav-item-clicked' : 'nav-item-1')}
                                    onClick={() => handleClick(3)}
                                >
                                    <GiWhiteBook className={cx('icon-navigation')} />
                                    Trả sách
                                    <BiChevronRight className={cx('item-icon')}></BiChevronRight>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
