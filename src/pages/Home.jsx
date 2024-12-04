import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import star from '../assets/icons/rating-icon.png'

const Home = () => {
  const [products, setProducts] = useState([]);
  //created a loading state to display before api loads
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]); 

  //split page into pages
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const baseURL = "https://fakestoreapi.com/products";

  useEffect(() => {
    //set loading state to true
    setIsLoading(true);
    axios
      .get(baseURL)
      .then((response) => {
        setIsLoading(false);
        setProducts(response.data);
        setSearch(response.data); 
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching products:", error);
      });
  }, []);

  //first we calculate the total number of pages
  const totalPages = Math.ceil(search.length / itemsPerPage);

   // Get products for the current page
   const lastItemIndex = currentPage * itemsPerPage;
   const firstItemIndex = lastItemIndex - itemsPerPage;
   const currentProducts = search.slice(firstItemIndex, lastItemIndex);
  
     // Handling page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   return (
    <main>
      <Header products={products} setSearch={setSearch}/>
      <section className="catalog">
        {isLoading && <div className="h-fit loader"></div>}
        {!isLoading && currentProducts.length > 0 ? (
          <div className="products-grid grid gap-4">
            {currentProducts.map((product, index) => (
              <div className="product-container border rounded-lg p-4 shadow" key={index}>
                <div className="product-image-container">
                  <img className="product-image object-cover" src={product.image} alt={product.title} />
                </div>
                <div className="product-info p-4 mb-2 h-40">
                  <div className="font-medium overflow-hidden text-ellipsis whitespace-normal max-h-[3rem] mb-2">
                    {product.title}
                  </div>
                  <div className="product-rating-container mt-2 flex items-center">
                    <span className="flex">{product.rating.rate} <img className=" star h-1" src={star} alt="rating-icon" /></span>
                    <span className="product-rating-count text-blue-600 ml-2">({product.rating.count} reviews)</span>
                  </div>
                  <div className="product-price font-bold text-lg mt-2">${product.price}</div>
                  <div className="product-description overflow-hidden text-ellipsis whitespace-normal max-h-[1rem] text-sm">
                    {product.description}
                  </div>
                </div>
                <button
                  className="add__to__cart rounded-lg p-2 bg-blue-800 text-white w-full mt-4 hover:bg-blue-500"
                  data-product-id={product.id}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )  : (
          <div className="flex justify-center">No products found</div>
        )}

        {/* Pagination Controls */}
        <div className="pagination flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
