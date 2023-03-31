import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment(props) {
    return (
        <div className={cx('container__comment')}>
            <div className={cx('container__comment-content')}>
                <div className={cx('container__comment-content-img')}>
                    <img src={props.user.img} alt="" />
                </div>
                <div className={cx('container__comment-content-text')}>
                    <div className={cx('comment__header')}>{props.user.name}</div>

                    <div className={cx('comment__content')}>{props.title}</div>
                </div>
            </div>
            <div className={cx('container__comment-interact')}>
                <div className={cx('interact__like')}>Like</div>
                <div className={cx('interact__reply')}>Reply</div>
            </div>
        </div>
    );
}

export default Comment;
