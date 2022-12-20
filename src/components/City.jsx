import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Context';

const City = ({ id, name }) => {
  const { setClickedCity } = useContext(Context);
  const handleClick = () => {
    setClickedCity(id);
  };
  return (
    <Link
      to={`/city/${id}`}
      onClick={handleClick}
      className="flex items-center border-color-secondary border-opacity-50 border-2 border-solid text-lg p-3 rounded-full font-semibold group duration-300 hover:bg-color-secondary"
    >
      <p className="bg-color-secondary text-color-tertiary w-12 h-12 flex items-center justify-center rounded-full duration-300 group-hover:bg-color-tertiary group-hover:text-color-secondary">
        {id}
      </p>
      <p className="flex-1 text-center text-color-fifth duration-300 group-hover:text-color-tertiary">
        {name}
      </p>
    </Link>
  );
};

export default City;
