import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';

const cx = classNames.bind(styles);

function BlogDetail() {
    return (
        <div className={cx('container__blog')}>
            <div className={cx('row')}>
                <div className={cx('col-3')}>1</div>
                <div className={cx('col-6')}>2</div>
                <div className={cx('col-3')}>3</div>
            </div>
        </div>
    );
}

export default BlogDetail;
