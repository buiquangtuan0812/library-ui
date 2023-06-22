const routes = {
    homePage: '/',
    home: '/home',
    login: '/user/login',
    signup: '/user/signup',
    book: '/library/books',
    bookType: '/library/book/:type',
    bookAuthor: '/library/book/author/:author',
    bookdetail: '/library/book/detail/:nameBook',
    blog: '/library/blogs',
    createBlog: '/library/blogs/create',
    blogDetail: 'library/blog-detail/:title',
    profile: '/user/profile',
    cart: '/user/carts',
    payCart: '/user/payment',
    order: '/user/order',
    homeAdmin: '/admin/home',
    manageBook: '/admin/manage/books',
    viewBook: '/admin/manage/book/:name',
    createBook: '/admin/manage/book-create',
};

export default routes;
