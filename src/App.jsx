import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import img_1 from './assets/img-1.jpg';
import img_2 from './assets/img-2.webp';
import img_3 from './assets/img-3.jpg';
import img_4 from './assets/img-4.jpg';
import img_5 from './assets/img-5.jpg';
import img_6 from './assets/img-6.jpg';
import img_7 from './assets/img-7.jpg';
import img_8 from './assets/img-8.jpg';


import { PaginationControl } from "react-bootstrap-pagination-control";

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(8)

  const [loader, setLoader] = useState(true)

  const placeholderImages = [
    img_1,img_2,img_3,img_4,img_5,img_6,img_7,img_8
  ];   


  useEffect(()=>{
    setLoader(true)
    fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
    .then(res => res.json())
    .then(data =>{
      setData(data)
      setLoader(false)
    })
    .catch(err =>{
      console.log(err);
    })
    .finally(function () {
      setLoader(false)
    })
  },[page,limit])

  return (
    <div className="bg-pink-500 w-full h-full py-36">
      <div className="continer max-w-[1280px] pb-[200px] pl-[100px] pr-[100px] mx-auto text-center bg-white rounded-md ">
        <h1 className="text-3xl font-bold pt-20 pb-5">Food Blog</h1>
        <p className="max-w-[593px] ml-[240px] pb-[53px] text-gray-500 font-sans text-xl text-center">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur.
        </p>
        <div className="flex flex-wrap gap-3 flex-row mb-32">
        {loader ? (
            placeholderImages.map(function (img,index) {
              return (<img className="w-[255px] max-h-[217px]" key={index} src={img} alt="" />)
            })
          ) : (
            data.map(function (value) {
             return  <img className="w-[255px] max-h-[217px]" key={value.id} src={value.thumbnailUrl} alt="" />
            })
          )}
        </div>
        <div className="-mb-36">
          <PaginationControl
            page={page}
            between={4}
            total={250}
            limit={limit}
            changePage={(page) => {
              setPage(page);
            }}
            ellipsis={1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
