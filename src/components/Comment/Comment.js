import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { AiOutlineLike } from 'react-icons/ai';

const cx = classNames.bind(styles);

function Comment(props) {
    const [userComment, setUser] = useState([]);
    const [state, setState] = useState(false);
    const [like, setLike] = useState(0);
    const countTime = (time) => {
        const currentTime = new Date();
        const timePost = new Date(time);
        const seconds = Math.floor((currentTime - timePost) / 1000);
        const minutes = Math.floor((currentTime - timePost) / (1000 * 60));
        const hours = Math.floor((currentTime - timePost) / (1000 * 60 * 60));
        const days = Math.floor((currentTime - timePost) / (1000 * 60 * 60 * 24));
        var months =
            (currentTime.getFullYear() - timePost.getFullYear()) * 12 + (currentTime.getMonth() - timePost.getMonth());
        if (currentTime.getDate() < timePost.getDate()) {
            months--;
        }
        if (months === 0) {
            if (days === 0) {
                if (hours === 0) {
                    if (minutes === 0) {
                        return seconds + ' giây trước';
                    } else {
                        return minutes + ' phút trước';
                    }
                } else {
                    return hours + ' giờ trước';
                }
            } else {
                return days + ' ngày trước';
            }
        } else {
            return months + ' tháng trước';
        }
    };
    useEffect(() => {
        setLike(props.like);
        axios
            .get('https://library-be-wine.vercel.app/users/cmt/by', { params: { _id: props.id } })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => console.error(err));
    }, [props, like, state]);
    const renderTitle = [1].map((value) => {
        if (props.rating === 1) {
            return (
                <span key={value} className={cx('rating-text')}>
                    Rất không hài lòng
                </span>
            );
        } else if (props.rating === 2) {
            return (
                <span key={value} className={cx('rating-text')}>
                    Không hài lòng
                </span>
            );
        } else if (props.rating === 3) {
            return (
                <span key={value} className={cx('rating-text')}>
                    Bình thường
                </span>
            );
        } else if (props.rating === 4) {
            return (
                <span key={value} className={cx('rating-text')}>
                    Hay
                </span>
            );
        } else {
            return (
                <span key={value} className={cx('rating-text')}>
                    Rất hay
                </span>
            );
        }
    });

    const renderRating = [1, 2, 3, 4, 5].map((value) => {
        if (value <= props.rating) {
            return (
                <span key={value}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path
                            d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                            stroke="#FFA142"
                            fill="#FFD52E"
                        ></path>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                            fill="#FFA142"
                        ></path>
                    </svg>
                </span>
            );
        } else {
            return (
                <span key={value}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path
                            d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
                            stroke="#DDDDE3"
                            fill="#DDDDE3"
                        ></path>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
                            fill="#DDDDE3"
                        ></path>
                    </svg>
                </span>
            );
        }
    });

    const handleLike = (e) => {
        e.preventDefault();
        if (state) {
            axios
                .post(
                    'https://library-be-wine.vercel.app/users/cmt/unlike',
                    { _id: props.id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${props.user.accessToken}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        setLike(like - 1);
                        props.handleLike(false);
                        setState(false);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            axios
                .post(
                    'https://library-be-wine.vercel.app/users/cmt/like',
                    { _id: props.id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${props.user.accessToken}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        setLike(like + 1);
                        props.handleLike(true);
                        setState(true);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className={cx('container__comment')}>
            <div className={cx('container__comment-user')}>
                <div className={cx('container__comment-user-img')}>
                    <img src={userComment.imgDes || ' '} alt="" />
                    <span className={cx('text')}>
                        <p className={cx('name')}>{userComment.fullName || userComment.username}</p>
                        <p className={cx('time')}>Đã tham gia {countTime(userComment.created_at)}</p>
                    </span>
                </div>
            </div>
            <div className={cx('container__comment-content')}>
                <div className={cx('rating')}>
                    {renderRating}
                    {renderTitle}
                </div>
                <div className={cx('comment__content')}>{props.title}</div>
                <div className={cx('interact')}>
                    <div className={cx(!state ? 'interact__like' : 'interact__liked')}>
                        <button onClick={handleLike}>
                            <AiOutlineLike />
                            <span>Hữu ích</span>
                            {like > 0 ? <span>({like})</span> : ''}
                        </button>
                    </div>
                    <div className={cx('interact__reply')}>Bình luận</div>
                    <div className={cx('time')}>{countTime(props.time)}</div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
