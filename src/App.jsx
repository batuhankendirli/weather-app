import { Routes, Route } from 'react-router-dom';
import WeatherPage from './components/WeatherPage';
import Home from './components/Home';
import { Context } from './Context';
import { useContext } from 'react';
import Footer from './components/Footer';

function App() {
  const { clickedCity, setClickedCity } = useContext(Context);

  return (
    <div className="flex flex-col justify-between bg-color-tertiary p-8 sm:p-12 min-h-screen sm:max-w-[80rem] xl:my-[4vw] sm:mx-auto xl:rounded-lg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`/city/:id`}
          element={<WeatherPage city={clickedCity} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
