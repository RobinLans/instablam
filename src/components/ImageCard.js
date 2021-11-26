import React, { useState, useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../ContextFile";

function ImageCard({ img, index, removeImage }) {
  const [btnHover, setButtonHover] = useState(false);
  const { setImageDetails } = useContext(ImageContext);
  const navigate = useNavigate();

  function goToDetailsPage() {
    setImageDetails({
      src: img.src,
      place: {
        city: img.place.city,
        country: img.place.country,
      },
      date: img.date,
    });
    navigate(`/image/${img.id}`, { replace: true });
  }

  return (
    <section className="imgCard">
      <img
        className="h-24 w-24 rounded cursor-pointer"
        src={img.src}
        alt="selfie"
        onClick={goToDetailsPage}
      />
      <article className="imgCardInfo cursor-pointer" onClick={goToDetailsPage}>
        <div>
          {!img.place.error ? (
            <>
              <p>{img.place.country}</p>
              <p>{img.place.city}</p>
            </>
          ) : (
            <p>{img.place.error}</p>
          )}
        </div>
        <p className="text-sm m-0 opacity-70">{img.date}</p>
      </article>
      <button
        className={`flex justify-center items-center group w-16 h-16 rounded-full mr-1 ${
          btnHover ? "bg-black bg-opacity-10" : ""
        } `}
        onMouseEnter={() => {
          setButtonHover(true);
        }}
        onMouseLeave={() => {
          setButtonHover(false);
        }}
        onClick={() => {
          removeImage(index);
        }}
      >
        <BsFillTrashFill
          className={` ${
            btnHover ? "text-red-800" : "text-red-500"
          }  text-4xl `}
        />
      </button>
    </section>
  );
}

export default ImageCard;
