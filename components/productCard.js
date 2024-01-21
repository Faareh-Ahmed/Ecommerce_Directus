import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <>
        <Link href={`/product/${product.product_category[0].categories_id.slug}/${product.slug}`}>
            <div>
                <img src={`http://localhost:8055/assets/${product.product_image.id}?width=380&height=400`} alt="Black machined steel pen with hexagonal grip and small white logo at top." className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <div className="px-6 py-4 bg-slate-200">
                <h3 className="mt-4 font-semibold   text-gray-900 text-lg">
                    {product.product_name}
                    <span className="text-xs mb-0 rounded-3xl  px-2 py-1 inline-block ml-2">
                        {product.product_category[0].categories_id.category_name}
                    </span>
                </h3>
                <p className="mt-1 text-gray-900 text-lg font-medium">${product.price}</p>
            </div>
            </Link>
        </>

    );
};

export default ProductCard;
