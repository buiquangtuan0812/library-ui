import Header from '~/components/Display/Header/Header';
import Body from '~/components/Display/Body/Body';
import Footer from '~/components/Display/Footer/Footer';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
    document.title = 'My Library';
    const [user, setUser] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
        }
    });
    return (
        <div>
            <Header user={user} />
            <Body />
            <Footer />
        </div>
    );
}

export default Home;
