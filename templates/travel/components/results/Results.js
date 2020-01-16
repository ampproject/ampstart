import Like from '../like/Like';
import ActivityInfo from '../popular/ActivityInfo';
import AmpListProps from '../utils/AmpListProps';
import {AmpList, AmpMustache, AmpImg} from '@ampproject/toolbox-next-amp';

export default function Results(props) {
  return (
    <section className='travel-results pb1 md-pt1'>
      <div className='max-width-3 mx-auto px1 md-px2 flex'>
        <AmpList
          className='travel-inline-list travel-results-list'
          layout='flex-item'
          noloading=''
          src={AmpListProps(false).src}
          data-amp-bind-src={AmpListProps(false).srcBind}
        >
          <AmpMustache>
            <div>
              <div className='flex flex-wrap mxn1 flex-auto'>
                {`{{#results.length}}`}
                {`{{#results}}`}
                <div className='col-12 sm-col-6 lg-col-4 p1 travel-results-result'>
                  <div className='relative travel-results-result'>
                    <a className='travel-results-result-link' href='#'>
                      <AmpImg
                        className='rounded bg-silver mb1'
                        width='2'
                        height='1'
                        noloading=''
                        layout='responsive'
                        src='/img/travel/activity/{{img}}.jpg'
                        srcset='/img/travel/activity/{{img}}@2x.jpg 2x, /img/travel/activity/{{img}}.jpg 1x'
                      />
                    </a>
                    {`{{#flags.new}}`}
                    <div className='travel-results-result-flags absolute top-0 left-0'>
                      <div className='p1'>
                        <span className='travel-pill bold'>NEW</span>
                      </div>
                    </div>
                    {`{{/flags.new}}`}
                    <div className='travel-results-result-like absolute top-0 right-0'>
                      <div className='p1'>
                        <Like mustacheVariable='liked' />
                      </div>
                    </div>
                  </div>
                  <ActivityInfo
                    title='{{name}}'
                    price='{{price.value}}'
                    stars='{{reviews.averageRating.range}}'
                    reviews='{{reviews.count}}'
                    location='{{location.city}}'
                  />

                  {/* <!--
                        <div className="h2 line-height-2 mb1">
                          <span className="travel-results-result-text">{`{{name}}`}</span>
                          <span className="travel-results-result-subtext h3">&bull;</span>
                          <span className="travel-results-result-subtext h3">$&nbsp;</span>
                          <span className="bold">{`{{price.value}}`}</span>
                        </div>
                        <div className="h4 line-height-2">
                          {`{{#reviews.count}}`}
                          <div className="inline-block relative mr1 h3 line-height-2">
                            <div>
                              <span className="travel-icon travel-img-icon-star-silver" />
                              <span className="travel-icon travel-img-icon-star-silver" />
                              <span className="travel-icon travel-img-icon-star-silver" />
                              <span className="travel-icon travel-img-icon-star-silver" />
                              <span className="travel-icon travel-img-icon-star-silver" />
                            </div>
                            <div className="absolute top-0">
                              {`{{#reviews.averageRating.range}}`}
                              <span className="travel-icon travel-img-icon-star-green" />
                              {`{{/reviews.averageRating.range}}`}
                            </div>
                          </div>
                          <span className="travel-results-result-subtext mr1">
                            {`{{reviews.count}}`} Reviews
                          </span>
                          {`{{/reviews.count}}`}
                          {`{{^reviews.count}}`}
                          <span className="travel-results-result-subtext mr1">
                            Not Yet Reviewed
                          </span>
                          {`{{/reviews.count}}`}
                          <span className="nowrap">
                            <span className="travel-icon travel-img-icon-map-pin-outline-gray" />
                            {`{{location.city}}`}
                          </span>
                        /div>
                  --> */}
                </div>
                {`{{/results}}`}
                {`{{/results.length}}`}
                {`{{^results.length}}`}
                <div className='travel-results-empty'>
                  <div>
                    <div className='h1 center mb1'>
                      <span className='travel-icon travel-img-icon-sad-face-gray' />
                    </div>
                    <div className='h1 gray center'>No adventures for that search</div>
                    <div className='gray center'>
                      You can
                      <span
                        className='underline pointer'
                        role='button'
                        tabIndex='0'
                        on='
                          tap:
                            AMP.setState({display: {ui_reset: false}}),
                            AMP.setState({display: {
                              ui_filterPane: true,
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
                              fields_type_edited: false
                            }})
                        '
                      >
                        reset filters
                      </span>
                      to see more results
                    </div>
                  </div>
                </div>
                {`{{/results.length}}`}
              </div>
            </div>
          </AmpMustache>
        </AmpList>
      </div>
    </section>
  );
}
