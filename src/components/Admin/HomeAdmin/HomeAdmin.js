import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';

import Statistic from '../Statistic/Statistic';
import Navigation from '../Navigation/Navigation';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import CreateBook from '../CreateBook/CreateBook';
import ManagementBook from '../MangementBook/ManagementBook';

import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function HomeAdmin(props) {
    document.title = 'Admin | Books';
    const location = useLocation();
    return (
        <div className={cx('container__admin')}>
            <Navigation />
            <div className={cx('container__admin-conent')}>
                <HeaderAdmin />
                {props.page === 'Statistic' ? <Statistic /> : ''}
                {props.page === 'ManagementBook' ? <ManagementBook token={location.state.token} /> : ''}
                {props.page === 'Create' ? <CreateBook token={location.state.token} /> : ''}
            </div>
        </div>
    );
}

export default HomeAdmin;
