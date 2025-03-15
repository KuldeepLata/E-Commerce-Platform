import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  const [details, setDetails] = useState({});
  const { id } = useParams();

  const getDetails = () => {
    axios.get(`https://dummyjson.com/product/${id}`)
      .then((success) => {
        setDetails(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <section className="py-10 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-6 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              src={details.thumbnail}
              alt={details.title}
            />
            <div className="flex mt-4 gap-2 overflow-x-auto">
              {details?.images?.map((d, i) => (
                <img key={i} className="w-24 h-24 object-cover rounded-lg shadow-md" src={d} alt={`Product image ${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {details.title}
            </h1>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                ${details.price}
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <p className="text-sm font-medium leading-none text-gray-500">
                  {details.rating}/5
                </p>
                <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">
                  345 Reviews
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                href="#"
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                role="button"
              >
                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
                Add to favorites
              </a>
              <a
                href="#"
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                role="button"
              >
                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Add to cart
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />
            <p className="mb-6 text-gray-500">{details.description}</p>

            <h2 className="font-bold text-xl my-4">Customer Reviews:</h2>

            <div className="space-y-4">
              {details?.reviews?.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-black">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
