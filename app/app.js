// pages/page.js
'use client'
import './global.css'
import React, { useEffect, useState } from 'react';
import { getCategories, getFilteredProducts, getProducts } from '../api/route';
import ProductCard from '../components/productCard';
import Filter from '../components/filter';

const App = () => {
  const [dataProducts, setDataProducts] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProducts();
        setDataProducts(result);
        const result2 = await getCategories();
        setDataCategories(result2);
        console.log(dataProducts);
        console.log(dataCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  async function handleProductFiltering(selectedCategories) {
    let filteredProducts;
    if(selectedCategories.length)
    {
      filteredProducts= await getFilteredProducts(selectedCategories);
    }else{
      filteredProducts= await getProducts();
    }

    setDataProducts(filteredProducts);
    return;
    
  }


  useEffect(() => {
    console.log(selectedCategories);
    handleProductFiltering(selectedCategories);
  }, [selectedCategories]);

  const getSelectedCategories = (category) => {
    // Check if the selectedCategories array already includes the provided category
    if (selectedCategories.includes(category)) {
      // If the category is already selected, remove it from the selectedCategories array
      setSelectedCategories(selectedCategories.filter(item => item !== category))
      return
    }
    // If the category is not already selected, add it to the selectedCategories array
    setSelectedCategories([...selectedCategories, category]);
  }


  return (
    <>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h1 className="text-xl font-bold">E-Commerce by Next.js!</h1>

        {Array.isArray(dataCategories) && <Filter categories={dataCategories} getSelectedcategories={getSelectedCategories} />}

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8'>
          {
            Array.isArray(dataProducts) && dataProducts.map(product => <ProductCard
              key={product.id}
              product={product} />)
          }
        </div>

      </div>
    </>
  );
};

export default App;
