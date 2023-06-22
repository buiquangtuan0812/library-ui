import classNames from 'classnames/bind';
import styles from './style.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Cancel(props) {
    const handleClick = () => {
        props.handleChild({
            state: false,
            data: null,
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8086/user/order/cancel',
                { _id: props.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${props.user.accessToken}`,
                    },
                },
            )
            .then((res) => {
                props.handleChild({
                    state: false,
                    data: res.data,
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={cx('ctn')}>
            <div className={cx('container__cancel')}>
                <div className={cx('header')}>
                    <h3>Thông báo</h3>
                    <span>
                        <i className={cx('fa-solid fa-xmark')} onClick={handleClick}></i>
                    </span>
                </div>
                <div className={cx('body')}>
                    <p className={cx('text')}>Bạn muốn hủy đơn hàng #{props.code}?</p>
                    <p>Không thể khôi phục sau khi hủy!</p>
                </div>
                <div className={cx('footer')}>
                    <button onClick={handleCancel}>Đồng ý</button>
                </div>
            </div>
        </div>
    );
}

export default Cancel;
