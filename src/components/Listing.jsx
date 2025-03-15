import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { context } from '../MainContext';

export default function Listing() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchProduct, setSearchProduct] = useState('');
    const { category_slug } = useParams();
    let limit = 30;
    const [pages, totalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [SearchParams, setSearchParams] = useSearchParams(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { addtoCart } = useContext(context)


    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (category_slug) {
            setProducts([]); 
            setLoading(true);
            axios.get(`https://dummyjson.com/products/category/${category_slug}`)
                .then(res => setProducts(res.data.products))
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        } else {
           
            setProducts([]);
            setLoading(true);
            axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${limit * currentPage}`)
                .then(res => {
                    setProducts(res.data.products);
                    totalPages(Math.ceil(res.data.total / limit));
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false));
        }
    }, [category_slug, currentPage]); 


    useEffect(() => {
        if (searchProduct.length > 0) {
            axios.get(`https://dummyjson.com/products/search?q=${searchProduct}`)
                .then(res => setProducts(res.data.products))
                .catch(err => console.log(err));
        }
    }, [searchProduct]);

    return (
        <div className="bg-white max-w-[1470px] mx-auto grid grid-cols-1 md:grid-cols-4">

            <button
                className="md:hidden p-4 bg-blue-600 text-white font-bold w-full"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? "Hide Categories" : "Show Categories"}
            </button>

            <div className={`p-6 border-r border-gray-300 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <ul className="mt-6 space-y-4">
                    <Link to="/">
                        <li className={`py-3 px-4 rounded-lg text-lg font-medium cursor-pointer transition-all duration-300 ${!category_slug ? 'bg-blue-400 text-white font-bold' : 'hover:bg-gray-100'}`}>
                            All
                        </li>
                    </Link>
                    {
                        categories.map((d, i) => (
                            <Link to={`/${d.slug}`} key={i}>
                                <li className={`py-3 px-4 rounded-lg text-lg font-medium cursor-pointer transition-all duration-300 ${category_slug == d.slug ? 'bg-blue-400 text-white font-bold shadow-md' : 'hover:bg-gray-100 hover:text-blue-700'}`}>
                                    {d.name}
                                </li>
                            </Link>
                        ))
                    }

                </ul>
            </div>

            <div className="col-span-3 p-6">
                <h2 className="text-3xl font-bold text-gray-900">Products</h2>

                <div className="flex flex-col sm:flex-row items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4 justify-between">
                    <input
                        onChange={(e) => setSearchProduct(e.target.value)}
                        value={searchProduct}
                        type="search"
                        className="w-full sm:w-96 p-3 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Products..."
                    />
                    <div className="flex">
                        {[...Array(pages).keys()].map(i => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`mx-1 px-4 py-2 border rounded-lg ${i === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-600 border-gray-300"}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        [1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="min-w-[230px] min-h-[300px] p-4 bg-gray-100 rounded-lg animate-pulse"></div>
                        ))
                    ) : (
                        products.map((d, i) => (
                            <div key={i} className="bg-white border rounded-lg shadow-md p-4">
                                <Link to={'/details/' + d.id}>
                                    <img src={d.thumbnail} alt={d.title} className="w-full h-46 object-cover rounded-md" />
                                </Link>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={'/details/' + d.id}>
                                                {d.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{d.rating}/5</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${d.price}</p>
                                </div>
                                <button
                                    onClick={() => addtoCart(d?.id)}
                                    className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 duration-200"
                                >
                                    Add to Cart
                                </button>


                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
