import React, { useState, useRef, useCallback, useEffect } from "react";
import { BsCameraFill, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const videoConstraints = {
  aspectRatio: 1,
  facingMode: "user",
};

function Camera() {
  const webcamRef = useRef(null);
  const [imageSource, setImageSource] = useState(null);
  const [currentAddress, setCurrentAddress] = useState({});
  let navigate = useNavigate();
  const currentDate = new Date();

  const capture = useCallback(() => {
    setImageSource(webcamRef.current.getScreenshot());
  }, [webcamRef, setImageSource]);

  function goBack() {
    console.log("go back");
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (imageSource) {
      const imgObj = {
        src: imageSource,
        place: currentAddress,
        date: `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`,
      };

      const imgsInLS = JSON.parse(localStorage.getItem("imgs"));
      const newImgArr = [...imgsInLS, imgObj];

      localStorage.setItem("imgs", JSON.stringify(newImgArr));
    }
  }, [imageSource]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
        setCurrentAddress({
          error: error.message,
        });
      });
    } else {
      console.log("No location");
    }
  }, []);

  async function onSuccess(pos) {
    const address = await getAddress(pos.coords.latitude, pos.coords.longitude);

    if (address) {
      setCurrentAddress({
        country: address.country,
        city: address.city,
      });
    }
  }

  async function getAddress(lat, long) {
    try {
      const response = await fetch(
        `https://geocode.xyz/${lat},${long}?geoit=json&auth=216031875532726209583x64218`
      );
      const data = await response.json();

      if (data.error) {
        console.log("Cannot get position");
        setCurrentAddress({
          error: "Position not available",
        });
      }
      return data;
    } catch (error) {
      console.log("Cannot get position");
      setCurrentAddress({
        error: "Position not available",
      });
      return null;
    }
  }

  return (
    <>
      <button onClick={goBack} className="backArrow">
        <BsArrowLeft />
      </button>
      <h1 className="text-3xl mb-6">Take a nice photo</h1>
      <div className="w-72 h-72 rounded-3xl overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          height={400}
          width={300}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
        />
      </div>

      <button className="cameraBtn" onClick={capture}>
        <BsCameraFill className="text-5xl " />
      </button>
    </>
  );
}

export default Camera;
