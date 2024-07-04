import classNames from 'classnames/bind';
import styles from './style.module.scss';

import axios from 'axios';
import { AiOutlineWarning } from 'react-icons/ai';

const cx = classNames.bind(styles);

function Remove(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.handleChild({
            show: false,
            success: false,
        });
    };
    const handleRemove = (e) => {
        e.preventDefault();
        axios
            .post(
                'https://be-library.vercel.app/users/cart/delete',
                { idCart: props.idCart },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${props.user.accessToken}`,
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    props.handleChild({
                        show: false,
                        success: true,
                    });
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <div className={cx('ctn')}>
            <div className={cx('container__cancel')}>
                <div className={cx('header')}>
                    <h3>
                        <AiOutlineWarning className={cx('icon-warn')} />
                        Xóa sản phẩm
                    </h3>
                    <span>
                        <i className={cx('fa-solid fa-xmark')} onClick={handleClick}></i>
                    </span>
                </div>
                <div className={cx('body')}>
                    <p className={cx('text')}>Bạn muốn xóa sản phẩm đang chọn?</p>
                    <p>Không thể khôi phục sau khi xóa!</p>
                </div>
                <div className={cx('footer')}>
                    <button onClick={handleRemove}>Đồng ý</button>
                </div>
            </div>
        </div>
    );
}

export default Remove;
