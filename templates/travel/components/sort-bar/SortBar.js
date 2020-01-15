import {AmpSelector} from '@ampproject/toolbox-next-amp';

export default function SortPane(props) {
  return (
    <section className='travel-filter-bar md-hide lg-hide'>
      <div className='px1 md-px2'>
        <AmpSelector
          className='travel-row-selector px1 mxn1 md-px2 md-mxn2'
          layout='container'
          name='sort'
          on='
            select:AMP.setState({display: {
              query_sort: event.targetOption,
              fields_sort: event.targetOption
            }})
          '
          data-amp-bind-selected='display.fields_sort'
        >
          <ul className='list-reset'>
            <li className='bold' option='popularity-desc' selected=''>
              Popular
            </li>
            <li className='bold' option='rating-desc'>
              Best Rated
            </li>
            <li className='bold' option='age-asc'>
              New
            </li>
            <li className='bold' option='price-asc'>
              Lowest Price
            </li>
          </ul>
        </AmpSelector>
      </div>
    </section>
  );
}
