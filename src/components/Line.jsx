const Line = ({ path, color }) => {
  const newPath = path?.some((item) => item <= 0)
    ? path?.map((item) => item - Math.min(...path) + 1)
    : path;

  const dx = 100 / (newPath?.length - 1);
  const d = `M0,${newPath ? newPath[0] : null} ${newPath
    ?.slice(1)
    .map(
      (p, i) =>
        `C${dx * i + dx / 2},${newPath[i]} ` +
        `${dx * (i + 1) - dx / 2},${newPath[i + 1]} ` +
        `${dx * (i + 1)},${newPath[i + 1]} `
    )
    .join(' ')}`;

  return (
    <>
      <path stroke={color} d={d} fill="none" className="stroke" />
      <path
        d={d + ` V0 H0 Z`}
        fill={`url(#gradient-${color})`}
        className="gradient"
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={0.25} />
        </linearGradient>
      </defs>
    </>
  );
};
export default Line;
