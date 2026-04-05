import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { createOrder } from "../services/orderService";

const ProductPage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res.data);
        });
    }, []);

    const handleOrder = (product) => {

        const order = {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: 1
        };

        createOrder(order)
            .then(() => {
                alert("Order placed successfully!");
            })
            .catch(err => {
                console.error(err);
            });

    };

    return (

        <div className="p-8">

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Products
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
                    >

                        <h2 className="text-lg font-bold text-gray-800">
                            {product.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {product.description}
                        </p>

                        <div className="mt-4">

                            <p className="text-emerald-600 font-bold text-lg">
                                ₹{product.price}
                            </p>

                            <p className="text-xs text-gray-400">
                                Stock: {product.stock}
                            </p>

                        </div>

                        <button
                            onClick={() => handleOrder(product)}
                            className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-xl font-semibold hover:bg-emerald-700 transition"
                        >
                            Order
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default ProductPage;