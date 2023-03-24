import Home from '~/layouts/Home/Home';
import LoginForm from '~/layouts/LoginUser/LoginUser';
import SignUpForm from './layouts/SignUp/SignUp';
import BookPage from '~/layouts/Book/Book';
import BookTypePage from './layouts/Book/BookTypePage/BookTypePage';
import BookDetail from '~/layouts/BookDetail/BookDetail';

import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route exact index element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="library/login" element={<LoginForm />}></Route>
            <Route path="library/signup" element={<SignUpForm />}></Route>
            <Route path="library/books" element={<BookPage />}></Route>
            <Route path="library/book/:type" element={<BookTypePage />}></Route>
            <Route path="library/book/detail/:nameBook" element={<BookDetail />}></Route>
        </Routes>
    );
}

export default App;
