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
  let clickedProduct = useRecoilValue(productSelector);

  // Fetch product data on component mount or when the selected product changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedstorageProduct = localStorage.getItem("single-product");
        if (storedstorageProduct) {
          // If the stored value exists, parse it back into an object
          const storedProduct = JSON.parse(storedstorageProduct);

          // Update the clickedProduct state with the parsed object
          clickedProduct = storedProduct;
          const result = await getSingleProduct(clickedProduct.slug);
          setSingleProductData(result);
        } else {
          console.log("No stored value found");
          console.log("Creating New Storage value");
          localStorage.setItem("single-product", JSON.stringify(clickedProduct));
          const result = await getSingleProduct(clickedProduct.slug);
          setSingleProductData(result);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clickedProduct]);

  return (
    <>
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

            {singleProductData[0]?.show_colors && (
              <>
                <p className="text-lg font-semibold text-gray-900">Choose a Color</p>

                <div className="flex">
                  {singleProductData[0]?.available_color.map(color => (
                    <div key={color.product_color_id.id} className="flex items-center mr-4">
                      <input
                        type="radio"
                        id={color.product_color_id.id}
                        value={color.product_color_id.id}
                        name="colors"
                        className="hidden"
                      />
                      <label
                        htmlFor={color.product_color_id.id}
                        className="cursor-pointer block w-6 h-6 rounded-full  border-4 border-black peer-checked:shadow-black"
                        style={{ background: color.product_color_id.color_value }}
                      ></label>
                    </div>
                  ))}
                </div>
              </>
            )}

            {singleProductData[0]?.show_sizes && (
              <>
                <p className="text-lg font-semibold text-gray-900">Choose Size</p>

                <div className="flex">
                  {singleProductData[0]?.available_sizes.map(size => (
                    <div key={size.product_sizes_id.id} className="flex items-center mr-4">
                      <label className=" inline-flex items-center">
                        <input
                          type="radio"
                          value={size.product_sizes_id.id}
                          name="sizes"
                          className='hidden mr-2  absolute opacity-0 w-0 h-0 peer  border border-black'
                        // className=" mr-2  absolute opacity-0 w-0 h-0 peer "
                        />
                        <span
                          className="w-8 h-8   rounded mr-2 border flex items-center justify-center border-black peer-checked:bg-black peer-checked:text-white"
                        >
                          {size.product_sizes_id.short_title}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}

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
    </>
  );
}
