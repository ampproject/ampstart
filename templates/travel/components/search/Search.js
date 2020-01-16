export default function Search(props) {
  return (
    <section className='travel-search py4 xs-hide sm-hide relative'>
      <div className='px1 md-px2 pb1 relative'>
        <h3 className='travel-search-heading travel-spacing-none h1 bold mb2 center'>
          Have a specific destination in mind?
        </h3>

        <div className='flex justify-center pb2'>
          <div className='travel-input-group flex items-center col-8'>
            <input
              className='travel-input travel-input-big line-height-2 block col-12 flex-auto rounded-left'
              type='text'
              name='query'
              placeholder='Where would you like to go?'
              on='change:AMP.setState({display: {fields_query: event.value}})'
              defaultValue=''
              data-amp-bind-value='display.fields_query'
            />
            <span className='travel-input-group-sep travel-border-gray relative z1 block' />
            <a
              href='results'
              className='travel-link travel-input travel-input-big line-height-2 link rounded-right nowrap text-decoration-none'
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
              Find my next adventure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
