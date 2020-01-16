import TravelInputRangeSvg from '../svg/TravelInputRangeSvg';

export default function PriceRange(props) {
  return (
    <>
      <div
        className='h1'
        data-amp-bind-text="display.fields_maxPrice_live < 801 ? '$' + round(display.fields_maxPrice_live) : '$800+'"
      >
        $800+
      </div>
      {/* <!--
        This should be rendered with path data from the api but rendering SVG with
        amp-mustache is currently blocked.
        see: https://github.com/ampproject/amphtml/issues/8214
      --> */}
      <TravelInputRangeSvg />
      <div className='mb1 pb2'>
        <input
          type='range'
          className='travel-input-range col-12'
          name='maxPrice'
          step='1'
          min='1'
          max='801'
          defaultValue='801'
          data-amp-bind-value="'' + display.fields_maxPrice"
          on='
            change:AMP.setState({display: {
              ui_reset: false,
              fields_maxPrice: event.value,
              fields_maxPrice_live: event.value,
              fields_maxPrice_edited: event.value != query_maxPrice
            }});
            input-debounced:AMP.setState({display: {
              fields_maxPrice_live: event.value
            }});
          '
        />
      </div>
    </>
  );
}
