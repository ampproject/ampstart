import SlidersControlSvg from '../svg/SlidersControlSvg';
import HomeIconSvg from '../svg/HomeIconSvg';
import AmpListProps from '../utils/AmpListProps';
import {AmpList, AmpMustache} from '@ampproject/toolbox-next-amp';

export default function ResultsNavBar(props) {
  return (
    <header className='travel-results-navbar pt4 pr4 pl4'>
      <div className='px1 md-px2 flex justify-between items-stretch'>
        <div className='flex items-stretch'>
          <a href='/' className='travel-results-navbar-icon h2 circle my1 md-my2'>
            <HomeIconSvg />
          </a>
          <div className='ml3 flex items-center xs-hide sm-hide'>
            <AmpList
              className='travel-block-list flex items-center'
              layout='flex-item'
              noloading=''
              src={AmpListProps(false).src}
              data-amp-bind-src={AmpListProps(false).srcBind}
            >
              <AmpMustache>
                <div className='flex items-center'>
                  <label className='travel-input-icon relative'>
                    <input
                      className='travel-input travel-input-dark rounded'
                      type='text'
                      name='query'
                      placeholder='Location'
                      on='
                        change:
                          AMP.setState({display: {fields_query: event.value}}),
                          AMP.setState({display: {query_query: event.value}})
                      '
                      defaultValue='{{stats.location}}'
                    />
                    <span className='travel-icon travel-img-icon-map-pin-transparent' />
                  </label>
                  <label className='travel-date-input travel-input-dark travel-date-input-touched bold relative rounded ml2'>
                    <input
                      className='block relative p0 z1'
                      type='date'
                      placeholder='yyyy-mm-dd'
                      pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
                      title='yyyy-mm-dd'
                      name='departure'
                      defaultValue='{{stats.startDate.raw}}'
                    />
                    <span className='travel-icon travel-img-icon-plane-taking-off-transparent' />
                    <div className='travel-date-input-label'>Departure</div>
                  </label>
                  <label className='travel-date-input travel-input-dark travel-date-input-touched bold relative rounded ml2'>
                    <input
                      className='block relative p0 z1'
                      type='date'
                      placeholder='yyyy-mm-dd'
                      pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
                      title='yyyy-mm-dd'
                      name='return'
                      defaultValue='{{stats.endDate.raw}}'
                    />
                    <span className='travel-icon travel-img-icon-plane-landing-transparent' />
                    <div className='travel-date-input-label'>Return</div>
                  </label>
                </div>
              </AmpMustache>
            </AmpList>
          </div>
        </div>
        <div className='flex flex-auto items-center md-hide lg-hide'>
          <AmpList
            className='travel-block-list flex flex-auto center'
            layout='flex-item'
            noloading=''
            src='/api/search?maxPrice=0&query=&sort=popularity-desc'
            data-amp-bind-src="
                    '/api/search?maxPrice=' + (display.query_maxPrice < 801 ? display.query_maxPrice : 0) +
                    '&query=' + display.query_query +
                    (display.query_city.length ? '&cities[]=' + display.query_city.join('&cities[]=') : '') +
                    (display.query_type.length ? '&types[]=' + display.query_type.join('&types[]=') : '') +
                    '&sort=' + display.query_sort"
          >
            <AmpMustache>
              <div className='h3 line-height-2 bold'>{`{{stats.resultCount}}`} Results</div>
              <div className='travel-results-navbar-subheading h6 caps line-height-4'>
                {`{{stats.location}}`}
                {`{{#stats.startDate}}`}
                {`{{#stats.endDate}}`}
                &bull;
                {`{{stats.startDate.formatted}}`}-{`{{stats.endDate.formatted}}`}
                {`{{/stats.endDate}}`}
                {`{{/stats.startDate}}`}
              </div>
            </AmpMustache>
          </AmpList>
        </div>
        <div
          className='travel-results-navbar-icon h3 my1 md-my2 md-hide lg-hide'
          role='button'
          tabIndex='0'
          on='tap:AMP.setState({display: {ui_filterPane: !ui_filterPane, ui_sortPane: false}})'
        >
          <SlidersControlSvg />
        </div>
      </div>
    </header>
  );
}
