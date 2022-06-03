import React, { useEffect } from 'react';
import './App.css';
import { GiphyFetch } from '@giphy/js-fetch-api'
import GridArea from './components/GridArea';

 function App() {
  useEffect(() => {
    document.title = 'Gif';
  },[])
  return (
    <div className="container py-5 mt-4">
    <GridArea/>
    </div>
  );
}

export default App;
