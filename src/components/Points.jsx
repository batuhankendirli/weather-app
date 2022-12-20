import { useRef, useContext } from 'react';
import { Context } from '../Context';

const Points = ({ data, width, height, setActive, range }) => {
  const { selectedCondition, setSelectedCondition } = useContext(Context);
  const timeout = useRef();
  const dr = Math.abs(range[1] - range[0]);

  const newPath = data[0]?.some((item) => item <= 0)
    ? data[0]?.map((item) => item - Math.min(...data[0]) + 1)
    : data[0];

  const handleClick = (path, point) => {
    clearTimeout(timeout.current);
    setActive({ path, point });
  };
  return (
    <div className="points">
      {data?.map((row, r) => {
        return newPath?.map((y, i) => (
          <div
            style={{
              '--x': `${(i * width) / (row.length - 1)}px`,
              '--y': `${height - y * (height / dr)}px`,
              cursor: 'pointer',
            }}
            onClick={() => handleClick(r, i)}
            key={i}
          >
            <p className="whitespace-nowrap text-color-fifth text-sm font-semibold text-opacity-30">
              {data[0][i]}
              {selectedCondition === 'humidity'
                ? '%'
                : selectedCondition === 'wind'
                ? ' km/s'
                : '℃'}
            </p>
          </div>
        ));
      })}
    </div>
  );
};

export default Points;
