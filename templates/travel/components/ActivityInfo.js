import PinSvg from './svg/PinSvg';

export default function ActivityInfo({title, price, stars, reviews, location}) {
  return (
    <>
      <div className='h2 line-height-2 mb1'>
        <span className='travel-results-result-text'>{title}</span>
        <span className='travel-results-result-subtext h3'>&bull;</span>
        <span className='travel-results-result-subtext h3'>$&nbsp;</span>
        <span className='black bold'>{price}</span>
      </div>

      <div className='h4 line-height-2'>
        <div className='inline-block relative mr1 h3 line-height-2'>
          <div className='travel-results-result-stars green'>★★★★★</div>
        </div>
        <span className='travel-results-result-subtext mr1'>{reviews} Reviews</span>
        <span className='travel-results-result-subtext'>
          <PinSvg /> {location}
        </span>
      </div>
    </>
  );
}
