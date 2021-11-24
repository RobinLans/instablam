import React, { useContext } from "react";
import { BsArrowLeft, BsFillTrashFill, BsDownload } from "react-icons/bs";
import { saveAs } from "file-saver";
import { useParams, useNavigate } from "react-router-dom";
import { ImageContext } from "../ContextFile";

function ImageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { imageDetails } = useContext(ImageContext);

  function goBack() {
    console.log("go back");
    navigate("/gallery", { replace: true });
  }

  const downloadImg = async () => {
    const downloadResult = await fetch(imageDetails.src);
    const blob = await downloadResult.blob();
    saveAs(blob, "downloaded.png");
  };

  console.log("bajs", imageDetails);

  function removeImage() {
    const imgsInLS = JSON.parse(localStorage.getItem("imgs"));
    imgsInLS.splice(id - 1, 1);
    localStorage.setItem("imgs", JSON.stringify(imgsInLS));
    goBack();
  }

  return (
    <div className="contentContainer justify-center">
      <button onClick={goBack} className="backArrow">
        <BsArrowLeft />
      </button>
      <h1 className="text-4xl">{imageDetails.place.country}</h1>
      <h1 className="text-3xl">{imageDetails.place.city}</h1>
      <p className="opacity-70 my-1 ml-2">{imageDetails.date}</p>
      <div className="w-5/6 my-12 shadow-lg rounded-lg overflow-hidden md:w-1/2">
        <img src={imageDetails.src} alt="selfie" className="w-full h-full" />
      </div>
      <section className="flex">
        <button
          className="imgDetailsBtn hover:bg-black hover:bg-opacity-5"
          onClick={downloadImg}
        >
          <BsDownload />
        </button>

        <button
          className="imgDetailsBtn text-red-500 hover:text-red-800  hover:bg-black hover:bg-opacity-5"
          onClick={removeImage}
        >
          <BsFillTrashFill />
        </button>
      </section>
    </div>
  );
}

export default ImageDetails;
