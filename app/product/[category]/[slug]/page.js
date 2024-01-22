'use client'
import React, { useState, useEffect } from "react";
import { getSingleProduct } from '@/api/route';
import { selector, useRecoilValue } from 'recoil';
import { selectedProductState } from '@/app/recoil/recoil';

export default function Page() {
  // State to store the single product data
  const [singleProductData, setSingleProductData] = useState([]);

  // Recoil selector to get the selected product
  const productSelector = selector({
    key: 'page-product-selector',
    get: ({ get }) => {
      const clickedProduct = get(selectedProductState);
      return clickedProduct;
    }
  });

  // Get the selected product using Recoil
  const clickedProduct = useRecoilValue(productSelector);

  // Fetch product data on component mount or when the selected product changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSingleProduct(clickedProduct.slug);
        setSingleProductData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clickedProduct]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Product Details</h1>

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <img
            src={`http://localhost:8055/assets/${singleProductData[0]?.product_image.id}?width=380&height=400`}
            alt="Product Image"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 p-4">
          <h2 className="text-2xl font-semibold mb-2">{singleProductData[0]?.product_name}</h2>
          <p className="text-gray-700 mb-4">
            {singleProductData[0]?.product_category[0]?.categories_id?.category_name}
          </p>
          <p className="text-lg font-semibold text-gray-900">${singleProductData[0]?.price}</p>

          {/* Add to cart button - you can customize the button as needed */}
          <button
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={() => {
              // Handle add to cart action
              console.log('Added to cart:', singleProductData[0]?.product_name);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
