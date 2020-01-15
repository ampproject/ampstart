export default function TravelInputRangeSvg(props) {
  return (
    <svg
      viewBox="0 0 800 100"
      className="travel-input-range-shape col-12 block">
      <defs>
        <linearGradient x2="0" y2="120%" id="a">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="200%" stopColor="#FFF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#a)"
        d="M0 100h25s37.5-8.523 50-17.045 37.5-18.75 50-20.455 37.5-6.534 50-9.66 37.5-11.363 50-16.476 37.5-8.24 50-6.25 37.5 13.352 50 22.727 37.5 23.58 50 28.41 37.5 3.977 50-1.704 37.5-28.41 50-45.455 37.5-32.67 50-31.25 37.5 12.217 50 21.592 37.5 21.45 50 24.147 37.5 7.528 50 9.66 37.5 13.635 50 23.01S762.5 100 775 100h25"
      />
    </svg>
  );
}
