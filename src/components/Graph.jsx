import Line from './Line';
import Marker from './Marker';
import Points from './Points';
import { useState, useRef, useContext } from 'react';
import { useDimensions } from 'webrix/hooks';
import { Context } from '../Context';

const Graph = ({ data, colors, range, labels, animation }) => {
  const { active, setActive } = useContext(Context);
  const graph = useRef();
  const { width, height } = useDimensions(graph);

  return (
    <>
      <div className={`graph mb-32 ${animation ? 'animated' : ''}`} ref={graph}>
        <Marker
          colors={colors}
          data={data}
          active={active}
          labels={labels}
          width={width}
          height={height}
          range={range}
        />
        <svg
          viewBox={`0 ${range[0]} 100 ${range[1]}`}
          preserveAspectRatio="none"
        >
          {data && <Line path={data[0]} color={colors[0]} />}
        </svg>
        <div className="labels">
          {labels?.map((label, i) => (
            <div
              key={label}
              style={{
                '--x': `${(i * width) / (labels.length - 1)}px`,
                '--y': `0px`,
              }}
              className="text-color-fifth font-medium text-sm"
            >
              {String(label).length !== 2 ? '0' + label : label}:00
            </div>
          ))}
        </div>
        <Points
          data={data}
          width={width}
          height={height}
          setActive={setActive}
          range={range}
        />
      </div>
    </>
  );
};

export default Graph;
