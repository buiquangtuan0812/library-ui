import classNames from 'classnames/bind';
import styles from './ConfirmDelete.module.scss';

import React from 'react';
import axios from 'axios';
import { AiFillWarning } from 'react-icons/ai';

const cx = classNames.bind(styles);

function ConfirmDelete(props) {
    const handleCancel = () => {
        props.handleChild({
            notice: false,
            show: false,
        });
    };

    const handleDelete = () => {
        axios
            .post(
                'https://be-library.vercel.app/admin/delete-book',
                { _id: props.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${props.data.accessToken}`,
                    },
                },
            )
            .then((res) => {
                if (res.data.message) {
                    props.handleChild({
                        notice: true,
                        show: false,
                    });
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div className={cx('confirm')}>
                <div className={cx('container__confirm')}>
                    <div className={cx('container__confirm-heading')}>
                        <span>
                            <AiFillWarning className={cx('icon-confirm')} />
                        </span>
                        <span>Confirm Delete</span>
                    </div>

                    <div className={cx('container__confirm-body')}>
                        <h3>Bạn có chắc muốn xóa quyển sách này?</h3>
                        <p>Không thể khôi phục sau khi xóa!</p>
                    </div>

                    <div className={cx('container__confirm-footer')}>
                        <button className={cx('btn-cancel')} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={cx('btn-delete')} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete;
