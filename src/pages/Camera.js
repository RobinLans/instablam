import React, { useState, useRef, useEffect } from "react";
import { BsCameraFill, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  aspectRatio: 1,
  facingMode: "user",
};

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSource, setImageSource] = useState(null);
  const [currentAddress, setCurrentAddress] = useState({});
  let navigate = useNavigate();
  const currentDate = new Date();

  function getVideoStream() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 400, height: 400 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getVideoStream();
  }, []);

  function capturePhoto() {
    try {
      canvasRef.current
        .getContext("2d")
        .drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

      setImageSource(canvasRef.current.toDataURL("image/jpeg"));
    } catch (error) {
      console.log("Cant take picture", error);
    }
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

  // GEOLOCATION STUFF

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

  function goBack() {
    console.log("go back");
    navigate("/", { replace: true });
  }

  return (
    <>
      <button onClick={goBack} className="backArrow">
        <BsArrowLeft />
      </button>
      <h1 className="text-3xl mb-6">Take a nice photo</h1>
      <div className="w-72 h-72 rounded-3xl overflow-hidden bg-red-400">
        <video
          ref={videoRef}
          videoConstraints={videoConstraints}
          playsInline
        ></video>
      </div>
      <button className="cameraBtn" onClick={capturePhoto}>
        <BsCameraFill className="text-5xl " />
      </button>
      <canvas
        className="hidden"
        ref={canvasRef}
        width="400"
        height="400"
      ></canvas>
    </>
  );
}

export default Camera;
