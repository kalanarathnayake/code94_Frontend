import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    createProduct,
} from '../redux/slices/productSlice';

export default function AddProduct() {
    const dispatch = useDispatch();
    const history = useHistory();
    const productSlice = useSelector((state) => state.productSlice);

    const [creatableProduct, setCreateProduct] = useState({
        sku: '',
        quantity: '',
        productName: '',
        imgUrl: '',
        productDescription: '',
        isFavourite: true,
        price: ''
    });

    const createAPIData = (e) => {
        e.preventDefault();
        const product = {
            sku: creatableProduct.sku,
            quantity: creatableProduct.quantity,
            productName: creatableProduct.productName,
            imgUrl: creatableProduct.imgUrl,
            productDescription: creatableProduct.productDescription,
            isFavourite: creatableProduct.isFavourite,
            price: creatableProduct.price,
        };
        //check payload
        if (product.sku.length <= 3) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'ID is short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000,
            });
        } else if (product.quantity.length <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Add quantity',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000,
            });
        } else if (product.productName.length <= 5) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Product Name is too short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000,
            });
        } else if (product.productDescription.length <= 5) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Description in too short',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000,
            });
        } else if (product.price.length <= 1) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Add valid price',
                color: '#f2220f',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#f2220f',
                iconColor: '#60e004',
                timer: 2800000,
            });
        } else {
            console.log(product);
            dispatch(
                createProduct({ product: product })
            );
        }
    };

    useEffect(() => {
        if (productSlice.isProductCreated) {
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: 'Product has been Created!',
                background: '#fff',
                showConfirmButton: true,
                confirmButtonText: 'Okay',
                confirmButtonColor: '#0712e0',
                iconColor: '#60e004',
                timer: 2800000,
            });
            history.push('/');
        }
    }, [productSlice.isProductCreated]);


    return (
        <div className="flex flex-col px-5 pt-1 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='container px-20'>
                                    <div class="">
                                        <p className='flex items-center font-semibold text-black uppercase '>
                                            <span class=" text-4xl">Products</span>
                                            <span class="ml-3">
                                                <svg class="h-8 w-8 mr-2 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            <span class="pt-2" style={{ color: "#001EB9" }}> Add new product</span>
                                        </p>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    SKU
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="border-0 form-control"
                                                    style={{ backgroundColor: "#F7F7F7" }}
                                                    value={creatableProduct.sku}

                                                    onChange={(e) =>
                                                        setCreateProduct({
                                                            ...creatableProduct,
                                                            sku: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div class="">
                                            </div>
                                        </div><p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Name
                                                </label>
                                                <input type="text"
                                                    className="border-0 form-control"
                                                    style={{ backgroundColor: "#F7F7F7" }}
                                                    value={creatableProduct.productName}

                                                    onChange={(e) =>
                                                        setCreateProduct({
                                                            ...creatableProduct,
                                                            productName: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 form-group">
                                                <div className="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        QTY
                                                    </label>
                                                    <input type="text"
                                                        className="border-0 form-control"
                                                        style={{ backgroundColor: "#F7F7F7" }}
                                                        value={creatableProduct.quantity}

                                                        onChange={(e) =>
                                                            setCreateProduct({
                                                                ...creatableProduct,
                                                                quantity: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>

                                            </div>
                                        </div><p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Product Description
                                                    <span class="text-xs ml-2 text-slate-500">(A small description about the product.)</span>
                                                </label>
                                                <textarea type="time"
                                                    className="border-0 form-control"
                                                    style={{ backgroundColor: "#F7F7F7" }}
                                                    value={creatableProduct.productDescription}

                                                    onChange={(e) =>
                                                        setCreateProduct({
                                                            ...creatableProduct,
                                                            productDescription: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Price
                                                </label>
                                                <input type="number"
                                                    className="border-0 form-control"
                                                    style={{ backgroundColor: "#F7F7F7" }}
                                                    value={creatableProduct.price}

                                                    onChange={(e) =>
                                                        setCreateProduct({
                                                            ...creatableProduct,
                                                            price: e.target.value,
                                                        })}
                                                />
                                            </div>
                                        </div><p />
                                        <div className="grid grid-cols-1 gap-4 ">
                                            <div className="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Product Image
                                                </label>
                                                <input type="text"
                                                    className="border-0 form-control"
                                                    style={{ backgroundColor: "#F7F7F7" }}
                                                    value={creatableProduct.imgUrl}

                                                    onChange={(e) =>
                                                        setCreateProduct({
                                                            ...creatableProduct,
                                                            imgUrl: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center align-middle form-group">
                                            <input
                                                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                                                type="submit" value="Add Product"
                                                onClick={createAPIData} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}