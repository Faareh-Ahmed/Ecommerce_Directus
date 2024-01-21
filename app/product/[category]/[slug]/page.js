'use client'
import React from "react";
import { useState,useEffect } from "react";
import { getSingleProduct } from '@/api/route';


export default function Page()
{
    const [singleProductData, setSingleProductData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log("I am in product Page");
            const result = await getSingleProduct();
            setSingleProductData(result);
            console.log(singleProductData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <>
        This is our Product Page
        </>
    )
}