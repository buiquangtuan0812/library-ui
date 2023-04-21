import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

import axios from 'axios';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Comment(props) {
    const [userComment, setUser] = useState([]);
    const countTime = (time) => {
        const currentTime = new Date();
        const timePost = new Date(time);
        if (currentTime.getFullYear() - timePost.getFullYear() > 0) {
            return (currentTime.getFullYear() - timePost.getFullYear()).toString() + ' năm trước';
        } else if (currentTime.getMonth() - timePost.getMonth() > 1) {
            return (currentTime.getMonth() - timePost.getMonth()).toString() + ' tháng trước';
        } else if (currentTime.getMonth() - timePost.getMonth() === 1 && currentTime.getDate() >= timePost.getDate()) {
            return '1 tháng trước';
        } else if (currentTime.getMonth() - timePost.getMonth() > 0 && currentTime.getDate() < timePost.getDate()) {
            return (currentTime.getDate() + (30 - timePost.getDate())).toString() + ' ngày trước';
        } else {
            return (currentTime.getDate() - timePost.getDate()).toString() + ' ngày trước';
        }
    };
    useEffect(() => {
        axios
            .get('http://localhost:8086/users/cmt/by', { params: { _id: props.user } })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className={cx('container__comment')}>
            <div className={cx('container__comment-content')}>
                <div className={cx('container__comment-content-img')}>
                    <img src={userComment.imgDes || ' '} alt="" />
                </div>
                <div className={cx('container__comment-content-text')}>
                    <div className={cx('comment__header')}>{userComment.username || ' '}</div>

                    <div className={cx('comment__content')}>{props.title}</div>
                </div>
            </div>
            <div className={cx('container__comment-interact')}>
                <div className={cx('interact__like')}>Like</div>
                <div className={cx('interact__reply')}>Reply</div>
                <div>{countTime(props.time)}</div>
            </div>
        </div>
    );
}

export default Comment;
