import classNames from 'classnames/bind';
import styles from './style.module.scss';

import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const cx = classNames.bind(styles);

const RatingStar = (props) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [warn, setWarn] = useState(false);

    const handleRatingChange = (value) => {
        if (value === 1 && rating === 1) {
            setRating(0);
        } else {
            setRating(value);
        }
    };
    const handleClose = () => {
        props.onChange({
            state: false,
            success: false,
        });
    };
    const handleCmt = async (e) => {
        if (rating === 0) {
            setWarn(true);
            e.preventDefault();
            return;
        }
        const data = {
            book: props.book._id,
            title: title,
            rating: rating,
        };
        await axios
            .post('http://localhost:8086/users/cmt/create', data, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${props.user.accessToken}` },
            })
            .then((response) => {
                props.onChange({
                    state: false,
                    success: true,
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('ctn')}>
            <div className={cx('ctn-main')}>
                <div className={cx('icon-close')}>
                    <AiOutlineClose className={cx('icon')} onClick={handleClose} />
                </div>
                <div className={cx('container__rating')}>
                    <p>Vui lòng đánh giá</p>
                    <div className={cx('container__rating-star')}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                style={{
                                    cursor: 'pointer',
                                    color: rating >= value ? 'gold' : 'gray',
                                }}
                                onClick={() => handleRatingChange(value)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <p className={cx(warn ? 'warn' : 'hide')}>Bạn cần đánh giá trước khi gửi.</p>
                </div>
                <div className={cx('container__text')}>
                    <textarea
                        placeholder="Hãy cho chúng tôi biết cảm nhận của bạn."
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                <div className={cx('btn-submit')}>
                    <button onClick={handleCmt}>Gửi đánh giá</button>
                </div>
            </div>
        </div>
    );
};

export default RatingStar;
