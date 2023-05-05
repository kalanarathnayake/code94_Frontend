import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {
    getProducts,
    setSelectedProductIdToEdit,
    removeProduct,
} from '../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const productSlice = useSelector((state) => state.productSlice);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        if (productSlice.products.length > 0) {
            setProducts(productSlice.products);
            setFilteredProducts(productSlice.products);
        }
    }, [productSlice.products]);

    const handleEditClick = (e, productId) => {
        e.preventDefault();
        dispatch(setSelectedProductIdToEdit(productId));
    };

    const handleDeleteClick = (e, productId) => {
        e.preventDefault();
        dispatch(removeProduct(productId));
    };

    useEffect(() => {
        if (productSlice.selectedProductIdToEdit) {
            history.push('/editproduct');
        }
    }, [productSlice.selectedProductIdToEdit]);

    useEffect(() => {
        if (productSlice.removeProduct) {
            dispatch(getProducts());
            Swal.fire({
                icon: 'success',
                title: 'Deleted Successful',
                text: 'Product has been deleted!',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#0712e0',
                iconColor: '#60e004',
                timer: 2800000,
            });
        }
    }, [productSlice.removeProduct]);

    const onSearch = (e) => {
        if (e.target.value.trim().length > 0) {
            const searchProducts = _.filter(
                products,
                (data) =>
                    data.sku.toLowerCase().includes(e.target.value) ||
                    data.productName.toLowerCase().includes(e.target.value) ||
                    data.price.toLowerCase().includes(e.target.value)
            );
            setFilteredProducts(searchProducts);
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <div>
            <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="items-center overflow-hidden">
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className="mt-2 ">
                                    <tr>
                                        <th className="uppercase drop-shadow-md">
                                            <h1>Products</h1>
                                        </th>
                                    </tr>
                                    <tr class="flex">
                                        <div
                                            class="flex  px-1 py-2 rounded-full max-w-sm mb-5 sm:flex-row sm:text-left sm:justify-end"
                                            style={{ backgroundColor: '#F7F7F7' }}
                                        >
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <form class=" ">
                                                    <div class=" flex flex-row justify-between">
                                                        <input
                                                            className="p-2 ml-2 rounded-full"
                                                            type="search"
                                                            style={{
                                                                backgroundColor: '#F7F7F7',
                                                                borderRadius: '100px',
                                                            }}
                                                            placeholder="Filter By Product ID"
                                                            onChange={(e) => onSearch(e)}
                                                        />
                                                        <div
                                                            className="flex px-5 py-1 text-center text-white align-middle rounded-full max- form-group"
                                                            style={{ backgroundColor: '#001EB9' }}
                                                        >
                                                            <svg
                                                                class="h-5 w-5 mr-2 mt-2"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>

                                                            <input
                                                                className="text-white"
                                                                type="submit"
                                                                value="Search"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="flex container justify-between">
                                            <div class=""></div>
                                            <a className="flex mt-2" href="createproduct">
                                                <div class="">
                                                    <button
                                                        href=""
                                                        className="p-2 px-5 text-white rounded-lg"
                                                        type="button"
                                                        style={{ backgroundColor: '#001EB9' }}
                                                    >
                                                        New Product
                                                    </button>
                                                </div>
                                                <div class="">
                                                    <button
                                                        type=""
                                                        class="mx-2 p-2 border-2 rounded-lg border-blue-800"
                                                    >
                                                        <svg
                                                            class="h-5 w-5 "
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            style={{ color: '#001EB9' }}
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </a>
                                        </div>
                                    </tr>
                                </table>
                            </div>
                            <div className="relative grid content-start grid-cols-1 gap-4 px-10 overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="p-5 text-base uppercase dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                className="pl-6 font-bold tbhead"
                                                style={{ color: '#001EB9' }}
                                            >
                                                SKU
                                            </th>
                                            <th className="pl-6 tbhead" style={{ color: '#001EB9' }}>
                                                Image
                                            </th>
                                            <th className="pl-6 tbhead" style={{ color: '#001EB9' }}>
                                                Product Name
                                            </th>
                                            <th className="pl-6 tbhead" style={{ color: '#001EB9' }}>
                                                Price
                                            </th>
                                            <th
                                                className="pl-6 tbhead"
                                                style={{ color: '#001EB9' }}
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map((data, index) => (
                                            <tr
                                                className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                key={index}
                                            >
                                                <td className="py-4 pl-6 text-base font-semibold text">
                                                    {data.sku}
                                                </td>
                                                <td className="px-6 py-4 text-base font-semibold">
                                                    {data.imgUrl}
                                                </td>
                                                <td className="px-6 py-4 text-base font-semibold">
                                                    {data.productName}
                                                </td>
                                                <td className="px-3 py-4 text-base font-semibold">
                                                    ${data.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div class="flex justify-center">
                                                        <div class="">
                                                            <div class="">
                                                                <div className="border-0 form-control">
                                                                    <label className="cursor-pointer label">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="toggle toggle-xs"
                                                                        />
                                                                        {/* checked */}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="ml-2">
                                                            <button
                                                                className="items-center text-sm font-medium text-black duration-300 rounded-full nline-flex hover:bg-blue-100"
                                                                onClick={(e) => handleEditClick(e, data._id)}
                                                            >
                                                                <div class="">
                                                                    <svg
                                                                        class="h-5 w-5 m-2"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div class="ml-2">
                                                            <button
                                                                className="inline-flex items-center text-sm font-medium text-black duration-300 rounded-full hover:bg-red-100"
                                                                onClick={(e) => handleDeleteClick(e, data._id)}
                                                            >
                                                                <div class="">
                                                                    <svg
                                                                        class="h-5 w-5 m-2"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
