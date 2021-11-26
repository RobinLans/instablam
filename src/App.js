import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Gallery from "./pages/Gallery";
import ImageDetails from "./pages/ImageDetails";
import { ImageContext } from "./ContextFile";
import jsonData from "./data/initImg.json";

function App() {
  const [imageDetails, setImageDetails] = useState(null);
  const imageGallery = [...jsonData];

  useEffect(() => {
    const imagesInLS = JSON.parse(localStorage.getItem("imgs"));

    if (!imagesInLS || imagesInLS.length === 0) {
      localStorage.setItem("imgs", JSON.stringify(imageGallery));
    }
  }, []);

  return (
    <div className="flex flex-col h-screen font-body font-bold justify-center items-center ">
      <ImageContext.Provider value={{ imageDetails, setImageDetails }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/image/:id" element={<ImageDetails />}></Route>
        </Routes>
      </ImageContext.Provider>
    </div>
  );
}

export default App;
