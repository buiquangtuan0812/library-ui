import classNames from 'classnames/bind';
import styles from './ConfirmDelete.module.scss';
import Notification from '~/components/Display/Notification/Notification';

import axios from 'axios';
import { useState } from 'react';
import { AiFillWarning } from 'react-icons/ai';

const cx = classNames.bind(styles);

function ConfirmDelete(props) {
    const [state, setState] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleCancel = () => {
        setState(!state);
    };

    const handleDelete = () => {
        axios
            .post(
                'http://localhost:8086/admin/delete-book',
                { _id: props.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${props.data.token}`,
                    },
                },
            )
            .then((res) => {
                setSuccess(true);
                setState(!state);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            {success ? (
                <Notification
                    token={''}
                    message={'Delete book successfully!'}
                    messageLink={'Complete'}
                    check={true}
                    count={0}
                />
            ) : (
                ''
            )}
            <div
                className={cx(
                    (state && props.count % 2 === 0) || (!state && props.count % 2 === 1) ? 'confirm' : 'hide',
                )}
            >
                <div className={cx('container__confirm')}>
                    <div className={cx('container__confirm-heading')}>
                        <span>
                            <AiFillWarning className={cx('icon-confirm')} />
                        </span>
                        <span>Confirm delete</span>
                    </div>

                    <div className={cx('container__confirm-body')}>
                        <h3>Are you sure you want to delete?</h3>
                        <p>This canot be undone!</p>
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
