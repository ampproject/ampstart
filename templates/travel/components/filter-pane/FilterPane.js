import Filters from '../filters/Filters';

export default function FilterPane(props) {
  return (
    <div
      className='travel-pane'
      data-amp-bind-class="'travel-pane' + (display.ui_filterPane ? ' travel-pane-visible' : '')"
    >
      <div className='travel-pane-overflow absolute overflow-hidden left-0 right-0 pb2'>
        <div className='travel-pane-content travel-shadow travel-border-gray border-bottom'>
          <div className='max-width-3 mx-auto px1 md-px2 py1'>
            <Filters />
          </div>
          <div className='travel-border-gray mx1 md-mx2 border-top' />
          <div className='max-width-3 mx-auto px1 md-px2 py1 center'>
            <button
              className='travel-filters-reset-btn ampstart-btn rounded bold'
              on='
                tap:AMP.setState({display: {
                    ui_reset: true,
                    query_maxPrice: display.fields_maxPrice_initial,
                    fields_maxPrice: display.fields_maxPrice_initial,
                    fields_maxPrice_live: display.fields_maxPrice_initial,
                    fields_maxPrice_edited: false,
                    query_city: display.fields_city_initial,
                    fields_city: display.fields_city_initial,
                    fields_city_edited: false,
                    query_type: display.fields_type_initial,
                    fields_type: display.fields_type_initial,
                    fields_type_edited: false,
                }})
              '
            >
              Reset Filters
            </button>
            <button
              className='travel-filters-apply-btn ampstart-btn rounded bold'
              disabled=''
              data-amp-bind-disabled='!display.fields_maxPrice_edited && !display.fields_city_edited && !display.fields_type_edited && !display.ui_reset'
              on='
                tap:AMP.setState({display: {
                    ui_reset: false,
                    ui_filterPane: false,
                    query_query: display.fields_query,
                    fields_query_edited: false,
                    query_departure: display.fields_departure,
                    fields_departure_edited: false,
                    query_return: display.fields_return,
                    fields_return_edited: false,
                    query_maxPrice: display.fields_maxPrice,
                    fields_maxPrice_edited: false,
                    query_city: display.fields_city,
                    fields_city_edited: false,
                    query_type: display.fields_type,
                    fields_type_edited: false,
                    query_sort: display.fields_sort,
                    fields_sort_edited: false,
                }})
              '
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
