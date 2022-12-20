import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';

import cities from '../data/cities.json';
import City from './City';
import TurkeyMap from 'turkey-map-react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Şehirler');
  const [search, setSearch] = useState('');
  const [filteredSearch, setFilteredSearch] = useState(cities);
  const [position, setPosition] = useState({});
  const parentRef = useRef(null);
  const { setClickedCity } = useContext(Context);

  const navigate = useNavigate();

  const handleClick = (e, text) => {
    setActiveTab(text);
    const { top, width, height } = e.target.getBoundingClientRect();
    const left = e.target.offsetLeft;
    setPosition({
      left,
      top,
      width,
      height,
    });
  };

  useEffect(() => {
    const element = parentRef.current.querySelector('.active');
    const { top, width, height } = element.getBoundingClientRect();
    const left = element.offsetLeft;

    setPosition({
      left,
      top,
      width,
      height,
    });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredSearch(
      cities.filter((city) =>
        city.name.toLocaleLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleMapClick = (city) => {
    setClickedCity(city.plateNumber);
    navigate(`/city/${city.plateNumber}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-color-secondary text-5xl font-semibold text-center mb-8">
        Türkiye - İllere Göre Hava Durumu
      </h1>
      <div
        className="sticky top-4 flex p-2 bg-gradient-to-br from-color-primary to-color-secondary rounded-full text-color-tertiary mb-8 self-center shadow-lg"
        ref={parentRef}
      >
        <div
          className="selection bg-color-tertiary rounded-full"
          style={{
            '--left': position.left + 'px',
            '--top': position.top + 'px',
            '--width': position.width + 'px',
            '--height': position.height + 'px',
          }}
        />
        <button
          className={`py-2 px-4 font-semibold text-lg duration-100 ${
            activeTab === 'Şehirler' ? 'active text-color-fifth' : ''
          }`}
          onClick={(e) => handleClick(e, 'Şehirler')}
        >
          Şehir Listesi
        </button>
        <button
          className={`py-2 px-4 font-semibold text-lg duration-100 ${
            activeTab === 'Harita' ? 'active text-color-fifth' : ''
          }`}
          onClick={(e) => (
            handleClick(e, 'Harita'), setSearch(''), setFilteredSearch(cities)
          )}
        >
          Harita
        </button>
      </div>
      {activeTab === 'Şehirler' ? (
        <div className="flex self-stretch flex-col gap-4">
          <div className="self-center w-full sm:w-1/2 bg-gradient-to-br from-color-primary to-color-secondary rounded-full p-[3px]">
            <input
              type="text"
              placeholder="Şehilerlerde ara..."
              className="bg-color-tertiary py-2 px-6 text-lg w-full rounded-full focus:outline-none"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="cities-wrapper">
            {filteredSearch.map((city) => {
              return (
                <City key={city.id} name={city.name} id={city.id} city={city} />
              );
            })}
          </div>
          {filteredSearch.length < 1 ? (
            <div className="flex flex-col items-center w-full bg-red-400 py-6 gap-4">
              <p className="text-color-tertiary font-medium text-xl text-center">
                Aradığınız kriteri sağlayan bir şehir bulunamadı.
              </p>
              <button
                className="bg-color-tertiary text-color-fifth text-lg font-medium rounded-full px-8 py-3 shadow-lg duration-300 hover:scale-[1.03] hover:shadow-xl  active:scale-100 active:shadow-md"
                onClick={() => (setSearch(''), setFilteredSearch(cities))}
              >
                Filtreyi sıfırla
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex-1 flex items-center">
          <div className="flex-1">
            <TurkeyMap
              hoverable={true}
              customStyle={{ idleColor: '#888', hoverColor: '#0083B0' }}
              showTooltip={true}
              onClick={(city) => handleMapClick(city)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
