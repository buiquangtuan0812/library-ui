import Header from '~/components/Display/Header/Header';
import Body from '~/components/Display/Body/Body';
import Footer from '~/components/Display/Footer/Footer';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
    document.title = 'My Library';

    const [user, setUser] = useState([]);
    const [numberCart, setNumberCart] = useState(0);
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setUser(location.state.user);
            axios
                .get('http://localhost:8086/users/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${location.state.user.accessToken}`,
                    },
                })
                .then((res) => {
                    setNumberCart(res.data.length);
                })
                .catch((err) => console.error(err));
        }
    }, [location.state]);

    return (
        <div>
            <Header user={user} numberCart={numberCart} />
            <Body />
            <Footer />
        </div>
    );
}

export default Home;
