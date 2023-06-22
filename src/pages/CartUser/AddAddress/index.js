import classNames from 'classnames/bind';
import styles from './style.module.scss';

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { GiHouse } from 'react-icons/gi';

const cx = classNames.bind(styles);

function FormUpdate(props) {
    const inputElement = useRef();
    const [inputValue, setValue] = useState('');

    useEffect(() => {
        setValue(props.user.address);
    }, [props]);

    const handleClick = () => {
        props.child({
            show: false,
            user: props.user,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        props.user.address = inputValue;
        axios
            .put('http://localhost:8086/user/update/profile', props.user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${props.user.accessToken}`,
                },
            })
            .then((res) => {
                props.child({
                    show: false,
                    user: res.data,
                });
            })
            .catch((err) => {
                e.preventDefault();
                console.log(err);
            });
    };

    const handleRemove = () => {
        setValue('');
        inputElement.current.focus();
    };

    return (
        <div className={cx('container__page')}>
            <div className={cx('container__page-main')}>
                <div className={cx('header')}>
                    <h3>Cập nhật địa chỉ</h3>
                    <span>
                        <i className={cx('fa-solid fa-xmark')} onClick={handleClick}></i>
                    </span>
                </div>
                <div className={cx('body')}>
                    <div className={cx('container-tel')}>
                        <label htmlFor="tel">Địa chỉ</label>
                        <div className={cx('input')}>
                            <GiHouse />
                            <input
                                ref={inputElement}
                                type="text"
                                defaultValue={inputValue}
                                name="tel"
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <span className={cx('icon-erase')}>
                                <i className={cx('fa-regular fa-circle-xmark')} onClick={handleRemove}></i>
                            </span>
                        </div>
                        <button onClick={handleUpdate}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormUpdate;
