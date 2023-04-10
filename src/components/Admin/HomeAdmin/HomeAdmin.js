import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';

import Statistic from '../Statistic/Statistic';
import Navigation from '../Navigation/Navigation';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import CreateBook from '../CreateBook/CreateBook';
import ViewBookComponent from '../ViewBook/ViewBook';
import ManagementBook from '../MangementBook/ManagementBook';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function HomeAdmin(props) {
    const [data, setToken] = useState('');
    document.title = 'Admin | Books';
    const location = useLocation();
    useEffect(() => {
        if (location.state.data) {
            setToken(location.state.data);
        }
    }, []);
    return (
        <div className={cx('container__admin')}>
            <Navigation />
            <div className={cx('container__admin-conent')}>
                <HeaderAdmin />
                {props.page === 'Statistic' ? <Statistic /> : ''}
                {props.page === 'ManagementBook' ? <ManagementBook data={data} /> : ''}
                {props.page === 'Create' ? <CreateBook data={data} /> : ''}
                {props.page === 'View' ? <ViewBookComponent data={data} /> : ''}
            </div>
        </div>
    );
}

export default HomeAdmin;
