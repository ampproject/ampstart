import {AmpSelector} from '@ampproject/toolbox-next-amp';

export default function SortPane(props) {
  return (
    <div
      className='travel-pane'
      data-amp-bind-class="'travel-pane' + (display.ui_sortPane ? ' travel-pane-visible' : '')"
    >
      <div className='travel-pane-overflow absolute overflow-hidden left-0 right-0 pb2 px2 mxn2'>
        <div className='travel-pane-content travel-shadow travel-border-gray border-bottom border-left z1'>
          <div className='p1 pr2 mdp2'>
            <AmpSelector
              className='travel-list-selector'
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
              <div className='bold' option='popularity-desc' selected=''>
                Popular
              </div>
              <div className='bold' option='rating-desc'>
                Best Rated
              </div>
              <div className='bold' option='age-asc'>
                New
              </div>
              <div className='bold' option='price-asc'>
                Lowest Price
              </div>
            </AmpSelector>
          </div>
        </div>
      </div>
    </div>
  );
}
