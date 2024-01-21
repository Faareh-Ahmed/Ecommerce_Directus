import axios from 'axios';

export async function getProducts() {
  try {
    const query = `
      query {
        products {
          id
          product_name
          price
          slug
          product_image{
            id
          }
          product_category{
            categories_id{
              id
              category_name
              slug
            }
          }
        }
      }
    `;

    const response = await axios.post('http://localhost:8055/graphql', { query });

    console.log(response.data.data.products);
    return response.data.data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it further up the call stack if needed
  }
}


export async function getCategories() {
  try {
    const query = `
      query {
        categories{
          id
          category_name
          slug
        }
      }
    `;

    const response = await axios.post('http://localhost:8055/graphql', { query });

    console.log(response.data.data.categories);
    return response.data.data.categories;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it further up the call stack if needed
  }
}




export async function getFilteredProducts(categories) {
  console.log("Hi i am filtering");
  console.log(categories);
  // console.log({query ,variables:{categories}});
  try {
    const query = `
      query($categories: [GraphQLStringOrFloat]) {
        products(filter: {product_category: {categories_id: {id: {_in: $categories}}}}) {
          id
          product_name
          price
          slug
          product_image{
            id
          }
          product_category{
            categories_id{
              id
              category_name
            }
          }
        }
      }
    `;

    const response = await axios.post('http://localhost:8055/graphql', {query, variables:{categories}});

    console.log(response.data.data.products);
    return response.data.data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it further up the call stack if needed
  }
}



export async function getSingleProduct() {
  try {
    const query = `
      query($product_slug: String) {
        products(filter: {slug: {_eq: $product_slug}}){
          id
          product_name
          price
          slug
          product_image{
            id
          }
          product_category{
            categories_id{
              id
              category_name
              slug
            }
          }
        }
      }
    `;

    const response = await axios.post('http://localhost:8055/graphql', { query });

    console.log(response.data.data.products);
    return response.data.data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it further up the call stack if needed
  }
}
