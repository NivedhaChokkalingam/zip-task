import React, { useState, useEffect, useRef, useCallback } from "react";
import { trending, search } from "../Api/giphy";

const GridArea: React.FC = () => {
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [gifData, setGifData] = useState<any>([]);
  const [count, setCount] = useState<number>(0);
  const divElement = useRef<HTMLDivElement>(null);
  const [lastElement, setLastElement] = useState<HTMLImageElement | null>(null);
  

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setCount((prevCount) => prevCount + 10);
      }
    })
  );

  useEffect(() => {
    if (searchTxt.length <= 0) return;
    search(searchTxt, count)
      .then((data) => setGifData((prev: any) => [...data]))
      .catch((err) => console.log("error:", err));
  }, [searchTxt]);

  useEffect(() => {
    if(searchTxt.length <= 0){
      trending(count).then((data) => setGifData((prev: any) => [...prev,...data]))
    }
    search(searchTxt, count)
      .then((data) => setGifData((prev: any) => [...prev, ...data]))
      .catch((err) => console.log("error:", err));
  }, [count]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(()=>{
    trending(count)
    .then((data) => setGifData((prev: any) => [...data]))
    .catch((err) => console.log("error:", err));
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value);
  };



  return (
    <>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="input-group mb-3">
            <input
              type="text"
              value={searchTxt}
              onChange={handleChange}
              className="form-control"
              placeholder="Search for...gif"
              autoFocus
            />
          </div>
        </div>
      </div>
      <div className="wrapper mt-5 mb-5" ref={divElement}>
        {gifData.map((gif: any, index: number) => (
          <div className="grid-item" key={gif.id}>
            {index + 1 === gifData.length ? (
              <img
                src={gif.images.preview_webp.url}
                ref={setLastElement}
                alt={gif.id}
              />
            ) : (
              <img src={gif.images.preview_webp.url} alt={gif.id} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default GridArea;
