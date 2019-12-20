/*
Copyright 2017 The AMP Start Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export const config = {amp: true};

import Head from 'next/head';
import LikeButton from '../components/LikeButton';
import HomeButton from '../components/HomeButton';
import ActivityInfo from '../components/ActivityInfo';
import {AmpState, AmpMustache, AmpList, AmpSelector, AmpImg} from '@ampproject/toolbox-next-amp';

export default () => (
  <>
    <Head>
      <title>Travel Template</title>
      <link rel='canonical' href='https://www.ampstart.com/templates/travel/travel-results.amp' />
      <meta name='amp-google-client-id-api' content='googleanalytics' />
      <link
        href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'
        rel='stylesheet'
      />
      <link rel='stylesheet' type='text/css' href='/css/travel-results.css' />
    </Head>

    {/* This div makes it easier to collapse in document outline tools. */}
    <div>
      <AmpState id='ui_reset'>{false}</AmpState>
      <AmpState id='ui_filterPane'>{false}</AmpState>
      <AmpState id='ui_sortPane'>{false}</AmpState>

      <AmpState id='fields_query'>{''}</AmpState>
      <AmpState id='fields_query_initial'>{''}</AmpState>
      <AmpState id='fields_query_live'>{''}</AmpState>
      <AmpState id='fields_query_edited'>{false}</AmpState>
      <AmpState id='query_query'>{''}</AmpState>

      <AmpState id='fields_departure'>{''}</AmpState>
      <AmpState id='fields_departure_initial'>{''}</AmpState>
      <AmpState id='fields_departure_edited'>{false}</AmpState>
      <AmpState id='query_departure'>{''}</AmpState>

      <AmpState id='fields_return'>{''}</AmpState>
      <AmpState id='fields_return_initial'>{''}</AmpState>
      <AmpState id='fields_return_edited'>{false}</AmpState>
      <AmpState id='query_return'>{''}</AmpState>

      <AmpState id='fields_type'>{[]}</AmpState>
      <AmpState id='fields_type_initial'>{[]}</AmpState>
      <AmpState id='fields_type_edited'>{false}</AmpState>
      <AmpState id='query_type'>{[]}</AmpState>

      <AmpState id='fields_city'>{[]}</AmpState>
      <AmpState id='fields_city_initial'>{[]}</AmpState>
      <AmpState id='fields_city_edited'>{false}</AmpState>
      <AmpState id='query_city'>{[]}</AmpState>

      <AmpState id='fields_sort'>{'popularity-desc'}</AmpState>
      <AmpState id='fields_sort_initial'>{'popularity-desc'}</AmpState>
      <AmpState id='fields_sort_edited'>{false}</AmpState>
      <AmpState id='query_sort'>{'popularity-desc'}</AmpState>

      <AmpState id='fields_maxPrice'>{801}</AmpState>
      <AmpState id='fields_maxPrice_initial'>{801}</AmpState>
      <AmpState id='fields_maxPrice_live'>{801}</AmpState>
      <AmpState id='fields_maxPrice_edited'>{false}</AmpState>
      <AmpState id='query_maxPrice'>{801}</AmpState>
    </div>

    <div role='main'>
      <div
        className='travel-overlay-fx-scale'
        data-amp-bind-class="'travel-overlay-fx-scale' + (ui_filterPane ? ' travel-overlay-fx-scale-active' : '')"
      >
        <div
          className='travel-no-focus'
          role='button'
          tabIndex='-1'
          on='tap:AMP.setState({ui_filterPane: false, ui_reset: false, ui_sortPane: false})'
        >
          {/* <!-- Results Navbar --> */}
          <header className='travel-results-navbar pt4 pr4 pl4'>
            <div className='px1 md-px2 flex justify-between items-stretch'>
              <div className='flex items-stretch'>
                <HomeButton />
                <div className='ml3 flex items-center xs-hide sm-hide'>
                  <AmpList
                    className='travel-block-list flex items-center'
                    layout='flex-item'
                    noloading=''
                    src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                    data-amp-bind-src="
                      '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
                      '&query=' + query_query +
                      (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
                      (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
                      '&sort=' + query_sort"
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
                        AMP.setState({fields_query: event.value}),
                        AMP.setState({query_query: event.value})
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
                  src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                  data-amp-bind-src="
                    '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
                    '&query=' + query_query +
                    (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
                    (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
                    '&sort=' + query_sort"
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
                on='tap:AMP.setState({ui_filterPane: !ui_filterPane, ui_sortPane: false})'
              >
                <svg className='travel-icon' viewBox='0 0 100 100'>
                  <g fill='currentColor'>
                    <path d='M77 74v18.312C77 94.35 78.79 96 81 96s4-1.65 4-3.688V74h-8zm0-37V6.778C77 4.69 78.79 3 81 3s4 1.69 4 3.778V37h-8zM47 52v41.24c0 2.076 1.79 3.76 4 3.76s4-1.684 4-3.76V52h-8zm0-38V6.667C47 4.642 48.79 3 51 3s4 1.642 4 3.667V14h-8zM16 86v7.29c0 2.05 1.79 3.71 4 3.71s4-1.66 4-3.71V86h-8zm0-38V6.75C16 4.68 17.79 3 20 3s4 1.68 4 3.75V48h-8z' />
                    <circle cx='20.5' cy='67.5' r='11.5' />
                    <circle cx='50.5' cy='33.5' r='11.5' />
                    <circle cx='80.5' cy='55.5' r='11.5' />
                  </g>
                </svg>
              </div>
            </div>
          </header>
          {/* <!--/ Results Navbar --> */}
        </div>

        {/* <!-- Filter Bar --> */}
        <section className='travel-filter-bar sm-hide xs-hide relative z2'>
          <div className='flex mxn2 px1 md-px2'>
            <div
              className='travel-no-focus flex flex-auto overflow-hidden'
              role='button'
              tabIndex='0'
              on='tap:AMP.setState({ui_filterPane: !ui_filterPane, ui_sortPane: false})'
            >
              <div className='pl2 pr1 py2 nowrap border-bottom travel-border-gray flex-none'>
                <span className='bold'>Filters</span>
                <span
                  className='travel-flip travel-filters-text inline-block'
                  data-amp-bind-class="'travel-flip travel-filters-text inline-block' + (ui_filterPane ? ' travel-flip-flipped' : '')"
                >
                  <svg className='travel-icon' viewBox='0 0 66 100'>
                    <path
                      fill='currentColor'
                      d='M33.5 56.172l-18.96-18.1c-1.497-1.43-3.922-1.43-5.418 0a3.539 3.539 0 0 0 0 5.17l21.67 20.687a3.914 3.914 0 0 0 2.708 1.07c.98 0 1.96-.357 2.71-1.07l21.668-20.687a3.541 3.541 0 0 0 0-5.172c-1.496-1.427-3.92-1.427-5.417 0L33.5 56.173z'
                    />
                  </svg>
                </span>
              </div>

              <div className='pl1 py2 nowrap border-bottom travel-border-gray flex-none'>
                <span className='travel-filters-text'>Price</span>
              </div>

              <div className='pr1 py2 nowrap border-bottom travel-border-gray'>
                <span
                  className='travel-badge'
                  data-amp-bind-class="query_maxPrice < 801 ? 'travel-badge green' : 'travel-badge'"
                  data-amp-bind-text="query_maxPrice < 801 ? 'Up to $ ' + round(query_maxPrice) : 'Any price'"
                >
                  Any price
                </span>
              </div>

              <div className='pl1 py2 nowrap border-bottom travel-border-gray flex-none'>
                <span className='travel-filters-text'>Type</span>
              </div>

              <div className='border-bottom travel-border-gray'>
                <div className='travel-fade-right pr1 py2'>
                  <span
                    className='travel-badge'
                    data-amp-bind-class="'travel-badge' + (query_type.length > 0 && query_type.length < 10 ? ' hide' : '')"
                  >
                    All types
                  </span>

                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('active') ? '' : ' hide')"
                  >
                    Active
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('artistic') ? '' : ' hide')"
                  >
                    Artistic
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('drinks') ? '' : ' hide')"
                  >
                    Drinks
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('fashion') ? '' : ' hide')"
                  >
                    Fashion
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('food') ? '' : ' hide')"
                  >
                    Food
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('music') ? '' : ' hide')"
                  >
                    Music
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('nature') ? '' : ' hide')"
                  >
                    Nature
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('nightlife') ? '' : ' hide')"
                  >
                    Nightlife
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('tours') ? '' : ' hide')"
                  >
                    Tours
                  </span>
                  <span
                    className='travel-badge green hide'
                    data-amp-bind-class="'travel-badge green' + (query_type.includes('water') ? '' : ' hide')"
                  >
                    Water
                  </span>
                </div>
              </div>

              <div className='pl1 py2 nowrap border-bottom travel-border-gray flex-none'>
                <span className='travel-filters-text'>City</span>
              </div>

              <div className='flex-auto border-bottom travel-border-gray'>
                <div className='travel-fade-right pr1 py2'>
                  <AmpList
                    className='travel-inline-list'
                    layout='flex-item'
                    src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                    data-amp-bind-src="
                      '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
                      '&query=' + query_query +
                      (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
                      (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
                      '&sort=' + query_sort"
                  >
                    <AmpMustache>
                      {`{{#stats.allCities}}`}
                      <span className='travel-badge'>All cities</span>
                      {`{{/stats.allCities}}`}
                      {`{{^stats.allCities}}`}
                      {`{{#stats.cities}}`}
                      {`{{#isSelected}}`}
                      <span className='travel-badge green'>{`{{name}}`}</span>
                      {`{{/isSelected}}`}
                      {`{{/stats.cities}}`}
                      {`{{/stats.allCities}}`}
                    </AmpMustache>
                  </AmpList>
                </div>
              </div>

              <div className='travel-border-gray px1 md-pr2 py2 nowrap border-bottom flex-none'>
                <AmpList
                  className='travel-inline-list'
                  layout='flex-item'
                  src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                  data-amp-bind-src="
  '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
  '&query=' + query_query +
  (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
  (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
  '&sort=' + query_sort
"
                >
                  <AmpMustache>
                    <span className='travel-filters-results-text'>
                      {`{{stats.resultCount}}`}
                      <span className='sm-hide xs-hide md-hide'>Tours & Activities Found</span>
                      <span className='lg-hide'>Results</span>
                    </span>
                  </AmpMustache>
                </AmpList>
              </div>
            </div>

            <div className='flex-none'>
              <div
                className='travel-no-focus travel-border-gray pl1 pr2 py2 md-pl2 nowrap border-left border-bottom relative z2'
                role='button'
                tabIndex='0'
                on='tap:AMP.setState({ui_filterPane: false, ui_reset: false, ui_sortPane: !ui_sortPane})'
              >
                <span className='travel-filters-text'>Sort by </span>
                <div className='inline-block'>
                  {/* <!--
            Render an invisible set of labels to force the element to always be
            the width of the widest label.
          --> */}
                  <div aria-hidden='' className='travel-filter-bar-collapse bold'>
                    Popular
                  </div>
                  <div aria-hidden='' className='travel-filter-bar-collapse bold'>
                    Best Rated
                  </div>
                  <div aria-hidden='' className='travel-filter-bar-collapse bold'>
                    New
                  </div>
                  <div aria-hidden='' className='travel-filter-bar-collapse bold'>
                    Lowest Price
                  </div>

                  <span className='bold'>
                    <span data-amp-bind-class="fields_sort == 'popularity-desc' ? '' : 'hide'">
                      Popular
                    </span>
                    <span
                      className='hide'
                      data-amp-bind-class="fields_sort == 'rating-desc' ? '' : 'hide'"
                    >
                      Best Rated
                    </span>
                    <span
                      className='hide'
                      data-amp-bind-class="fields_sort == 'age-asc' ? '' : 'hide'"
                    >
                      New
                    </span>
                    <span
                      className='hide'
                      data-amp-bind-class="fields_sort == 'price-asc' ? '' : 'hide'"
                    >
                      Lowest Price
                    </span>
                  </span>
                </div>
                <span
                  className='travel-flip travel-filters-text inline-block'
                  data-amp-bind-class="'travel-flip travel-filters-text inline-block ' + (ui_sortPane ? ' travel-flip-flipped' : '')"
                >
                  <svg className='travel-icon' viewBox='0 0 66 100'>
                    <path
                      fill='currentColor'
                      d='M33.5 56.172l-18.96-18.1c-1.497-1.43-3.922-1.43-5.418 0a3.539 3.539 0 0 0 0 5.17l21.67 20.687a3.914 3.914 0 0 0 2.708 1.07c.98 0 1.96-.357 2.71-1.07l21.668-20.687a3.541 3.541 0 0 0 0-5.172c-1.496-1.427-3.92-1.427-5.417 0L33.5 56.173z'
                    />
                  </svg>
                </span>
              </div>
              {/* <!-- Sort pane --> */}
              <div
                className='travel-pane'
                data-amp-bind-class="'travel-pane' + (ui_sortPane ? ' travel-pane-visible' : '')"
              >
                <div className='travel-pane-overflow absolute overflow-hidden left-0 right-0 pb2 px2 mxn2'>
                  <div className='travel-pane-content travel-shadow travel-border-gray border-bottom border-left z1'>
                    <div className='p1 pr2 mdp2'>
                      <AmpSelector
                        className='travel-list-selector'
                        layout='container'
                        name='sort'
                        on='
            select:AMP.setState({
              query_sort: event.targetOption,
              fields_sort: event.targetOption
            })
          '
                        data-amp-bind-selected='fields_sort'
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
              {/* <!--/ Sort pane --> */}
            </div>
          </div>
        </section>
        {/* <!--/ Filter Bar --> */}

        {/* <!-- Filter Pane --> */}
        <div
          className='travel-pane'
          data-amp-bind-class="'travel-pane' + (ui_filterPane ? ' travel-pane-visible' : '')"
        >
          <div className='travel-pane-overflow absolute overflow-hidden left-0 right-0 pb2'>
            <div className='travel-pane-content travel-shadow travel-border-gray border-bottom'>
              <div className='max-width-3 mx-auto px1 md-px2 py1'>
                {/* <!-- Filters --> */}
                <div
                  className='travel-filters clearfix mxn2'
                  data-amp-bind-class="'travel-filters clearfix mxn2' + (ui_reset ? ' travel-filters-reset' : '')"
                >
                  <div className='col col-12 md-col-4 px2 py1'>
                    <div className='travel-filters-text h5 mb1 caps'>max price</div>

                    {/* <!-- Price Selector --> */}
                    <div
                      className='h1'
                      data-amp-bind-text="fields_maxPrice_live < 801 ? '$' + round(fields_maxPrice_live) : '$800+'"
                    >
                      $800+
                    </div>
                    {/* <!--
  This should be rendered with path data from the api but rendering SVG with
  amp-mustache is currently blocked.
  see: https://github.com/ampproject/amphtml/issues/8214
--> */}
                    <svg viewBox='0 0 800 100' className='travel-input-range-shape col-12 block'>
                      <defs>
                        <linearGradient x2='0' y2='120%' id='a'>
                          <stop offset='0%' stopColor='currentColor' />
                          <stop offset='200%' stopColor='#FFF' />
                        </linearGradient>
                      </defs>
                      <path
                        fill='url(#a)'
                        d='M0 100h25s37.5-8.523 50-17.045 37.5-18.75 50-20.455 37.5-6.534 50-9.66 37.5-11.363 50-16.476 37.5-8.24 50-6.25 37.5 13.352 50 22.727 37.5 23.58 50 28.41 37.5 3.977 50-1.704 37.5-28.41 50-45.455 37.5-32.67 50-31.25 37.5 12.217 50 21.592 37.5 21.45 50 24.147 37.5 7.528 50 9.66 37.5 13.635 50 23.01S762.5 100 775 100h25'
                      />
                    </svg>
                    <div className='mb1 pb2'>
                      <input
                        type='range'
                        className='travel-input-range col-12'
                        name='maxPrice'
                        step='1'
                        min='1'
                        max='801'
                        defaultValue='801'
                        data-amp-bind-value="'' + fields_maxPrice"
                        on='
      change:AMP.setState({
        ui_reset: false,
        fields_maxPrice: event.value,
        fields_maxPrice_live: event.value,
        fields_maxPrice_edited: event.value != query_maxPrice
      });
      input-debounced:AMP.setState({
        fields_maxPrice_live: event.value
      });
    '
                      />
                    </div>
                    {/* <!--/ Price Selector --> */}
                    <div className='travel-filters-text h3 line-height-3'>
                      <AmpList
                        className='travel-inline-list'
                        layout='flex-item'
                        src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                        data-amp-bind-src="
  '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
  '&query=' + query_query +
  (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
  (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
  '&sort=' + query_sort
"
                      >
                        <AmpMustache>
                          Average Price for activites in {`{{stats.location}}`}
                          is between ${`{{stats.price.average.min}}`} and $
                          {`{{stats.price.average.max}}`}.
                        </AmpMustache>
                      </AmpList>
                    </div>
                  </div>
                  <div className='col col-12 md-col-5 px2 py1'>
                    <div className='travel-filters-text h5 mb2 caps'>type</div>

                    {/* <!-- Type Selector --> */}
                    <AmpSelector
                      className='travel-type-selector clearfix'
                      layout='container'
                      name='type'
                      multiple=''
                      on='
    select:AMP.setState({
      ui_reset: false,
      fields_type: fields_type.includes(event.targetOption)
        ? copyAndSplice(fields_type, fields_type.indexOf(event.targetOption), 1)
        : fields_type.concat([event.targetOption]),
      fields_type_edited: true
    })
  '
                      data-amp-bind-selected='fields_type'
                    >
                      <ul className='list-reset'>
                        {/* <!-- <div className=""> --> */}
                        <li option='active' className='col col-6 travel-type-active'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 70 100'>
                                <path
                                  fill='currentColor'
                                  d='M63.157 50.527h-11.03a9.028 9.028 0 0 1-7.13-3.537c-.78-.97-1.497-1.99-2.14-3.058a.325.325 0 0 0-.297-.123.324.324 0 0 0-.256.196L37.398 55.4a.344.344 0 0 0 .073.38L48.65 66.79a10.925 10.925 0 0 1 3.215 7.238l1.118 17.65c.045 2.225-1.624 4.105-3.82 4.303-2.196.198-4.17-1.352-4.517-3.548l-2.053-16.08a1.358 1.358 0 0 0-.492-.886L31.105 66.64a.317.317 0 0 0-.277-.06.317.317 0 0 0-.218.182l-4.26 9.28a21.584 21.584 0 0 1-3.75 5.635c-1.53 1.66-8.837 10.284-9.574 11.084a4.128 4.128 0 0 1-3.182 1.253c-2.147-.025-3.868-1.8-3.844-3.967 0-.914.3-1.802.858-2.523.555-.716 9.03-12.36 9.247-12.638.216-.282.357-.614.408-.966l1.597-11.13a44.158 44.158 0 0 1 3.7-12.416l6.11-13.06a.344.344 0 0 0-.026-.337.33.33 0 0 0-.303-.144c-.253.027-11.375.68-11.817.728a.981.981 0 0 0-.855.857l-1.526 11.547c-.17 1.49-1.472 2.584-2.957 2.48-1.484-.104-2.625-1.368-2.588-2.87v-12.31c-.028-3.69 2.44-6.928 5.982-7.848 3.51-.88 13.463-2.706 14.595-2.99 3.37-.843 6.93-.426 10.02 1.173l4.477 2.31a10.575 10.575 0 0 1 4.428 4.35c1.022 1.876 3.81 7.288 4 7.638.188.347.52.59.905.664l11.41 2.14a2.94 2.94 0 0 1 2.324 3.142c-.132 1.49-1.35 2.646-2.834 2.682zM43.49 24A9.5 9.5 0 0 1 34 14.492c.004-5.245 4.26-9.494 9.504-9.492a9.5 9.5 0 1 1-.014 19z'
                                />
                              </svg>
                              Active
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 70 100'>
                                <path
                                  fill='currentColor'
                                  d='M63.157 50.527h-11.03a9.028 9.028 0 0 1-7.13-3.537c-.78-.97-1.497-1.99-2.14-3.058a.325.325 0 0 0-.297-.123.324.324 0 0 0-.256.196L37.398 55.4a.344.344 0 0 0 .073.38L48.65 66.79a10.925 10.925 0 0 1 3.215 7.238l1.118 17.65c.045 2.225-1.624 4.105-3.82 4.303-2.196.198-4.17-1.352-4.517-3.548l-2.053-16.08a1.358 1.358 0 0 0-.492-.886L31.105 66.64a.317.317 0 0 0-.277-.06.317.317 0 0 0-.218.182l-4.26 9.28a21.584 21.584 0 0 1-3.75 5.635c-1.53 1.66-8.837 10.284-9.574 11.084a4.128 4.128 0 0 1-3.182 1.253c-2.147-.025-3.868-1.8-3.844-3.967 0-.914.3-1.802.858-2.523.555-.716 9.03-12.36 9.247-12.638.216-.282.357-.614.408-.966l1.597-11.13a44.158 44.158 0 0 1 3.7-12.416l6.11-13.06a.344.344 0 0 0-.026-.337.33.33 0 0 0-.303-.144c-.253.027-11.375.68-11.817.728a.981.981 0 0 0-.855.857l-1.526 11.547c-.17 1.49-1.472 2.584-2.957 2.48-1.484-.104-2.625-1.368-2.588-2.87v-12.31c-.028-3.69 2.44-6.928 5.982-7.848 3.51-.88 13.463-2.706 14.595-2.99 3.37-.843 6.93-.426 10.02 1.173l4.477 2.31a10.575 10.575 0 0 1 4.428 4.35c1.022 1.876 3.81 7.288 4 7.638.188.347.52.59.905.664l11.41 2.14a2.94 2.94 0 0 1 2.324 3.142c-.132 1.49-1.35 2.646-2.834 2.682zM43.49 24A9.5 9.5 0 0 1 34 14.492c.004-5.245 4.26-9.494 9.504-9.492a9.5 9.5 0 1 1-.014 19z'
                                />
                              </svg>
                              Active
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='artistic' className='col col-6 travel-type-artistic'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M91 9c2.01.413 3.58 1.957 4 3.933 0 3.28-29.278 38.624-37 46.217C52.995 64.072 46.184 68 42.5 68c-1.634 0-7.5-5.896-7.5-7.375 0-3.623 3.995-10.32 9-15.242C51.722 37.79 87.665 9 91 9zM5 86c0-1.75 2.114-.465 5.345-3.686 2.71-2.702 1.692-9.02 7.354-14.665 4.87-4.864 12.77-4.867 17.643-.007 4.874 4.86 4.876 12.74.006 17.605a22.75 22.75 0 0 1-16.32 6.752C11.857 92 5 87.75 5 86z'
                                />
                              </svg>
                              Artistic
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M91 9c2.01.413 3.58 1.957 4 3.933 0 3.28-29.278 38.624-37 46.217C52.995 64.072 46.184 68 42.5 68c-1.634 0-7.5-5.896-7.5-7.375 0-3.623 3.995-10.32 9-15.242C51.722 37.79 87.665 9 91 9zM5 86c0-1.75 2.114-.465 5.345-3.686 2.71-2.702 1.692-9.02 7.354-14.665 4.87-4.864 12.77-4.867 17.643-.007 4.874 4.86 4.876 12.74.006 17.605a22.75 22.75 0 0 1-16.32 6.752C11.857 92 5 87.75 5 86z'
                                />
                              </svg>
                              Artistic
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='drinks' className='col col-6 travel-type-drinks'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 86 100'>
                                <path
                                  fill='currentColor'
                                  d='M81.637 15.817L48.46 58.92a6.995 6.995 0 0 0-1.454 4.27v17.15c-.004.843.6 1.568 1.43 1.72 5.734 1.04 14.485 2.664 14.665 2.7.816.175 1.39.907 1.363 1.74v1.75a1.75 1.75 0 0 1-1.75 1.75H24.286a1.75 1.75 0 0 1-1.75-1.75V86.5a1.723 1.723 0 0 1 1.36-1.74c.18-.036 8.933-1.66 14.666-2.7a1.743 1.743 0 0 0 1.43-1.72V63.187a6.99 6.99 0 0 0-1.453-4.268L5.363 15.817A1.75 1.75 0 0 1 6.75 13h73.5a1.751 1.751 0 0 1 1.387 2.817zM48 43c2.76 0 5-2.24 5-5s-2.24-5-5-5a5.002 5.002 0 0 0-3.536 8.535A5.001 5.001 0 0 0 48 43zm20.565-23h-50.13a.435.435 0 0 0-.39.244.44.44 0 0 0 .045.46l4.428 5.784c.247.323.63.512 1.035.512h39.894c.405 0 .788-.19 1.035-.512l4.428-5.784c.1-.132.118-.31.045-.46a.433.433 0 0 0-.39-.244z'
                                />
                              </svg>
                              Drinks
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 86 100'>
                                <path
                                  fill='currentColor'
                                  d='M81.637 15.817L48.46 58.92a6.995 6.995 0 0 0-1.454 4.27v17.15c-.004.843.6 1.568 1.43 1.72 5.734 1.04 14.485 2.664 14.665 2.7.816.175 1.39.907 1.363 1.74v1.75a1.75 1.75 0 0 1-1.75 1.75H24.286a1.75 1.75 0 0 1-1.75-1.75V86.5a1.723 1.723 0 0 1 1.36-1.74c.18-.036 8.933-1.66 14.666-2.7a1.743 1.743 0 0 0 1.43-1.72V63.187a6.99 6.99 0 0 0-1.453-4.268L5.363 15.817A1.75 1.75 0 0 1 6.75 13h73.5a1.751 1.751 0 0 1 1.387 2.817zM48 43c2.76 0 5-2.24 5-5s-2.24-5-5-5a5.002 5.002 0 0 0-3.536 8.535A5.001 5.001 0 0 0 48 43zm20.565-23h-50.13a.435.435 0 0 0-.39.244.44.44 0 0 0 .045.46l4.428 5.784c.247.323.63.512 1.035.512h39.894c.405 0 .788-.19 1.035-.512l4.428-5.784c.1-.132.118-.31.045-.46a.433.433 0 0 0-.39-.244z'
                                />
                              </svg>
                              Drinks
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='fashion' className='col col-6 travel-type-fashion'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M94.93 77.903l-9.12 3.887a1.767 1.767 0 0 1-2.381-1.102L71.505 41.745s3.367 47.975 3.497 49.94a3.511 3.511 0 0 1-3.372 3.732l-13.967.578a3.522 3.522 0 0 1-3.672-3.415c-.048-1.958-1.686-62.796-1.686-62.796a27.9 27.9 0 0 1 .833-7.503l2.597-9.236a.875.875 0 0 0-.855-1.088h-8.76a.88.88 0 0 0-.855 1.09l2.597 9.24a27.87 27.87 0 0 1 .833 7.5s-1.638 60.84-1.687 62.798a3.515 3.515 0 0 1-3.672 3.413L29.37 95.42a3.513 3.513 0 0 1-3.373-3.733c.13-1.965 3.498-49.94 3.498-49.94L17.573 80.688a1.768 1.768 0 0 1-2.382 1.1L6.07 77.904a1.75 1.75 0 0 1-1.006-2.072c.23-.844 12.75-46.918 13.806-50.765a14.047 14.047 0 0 1 7.294-8.85 113.943 113.943 0 0 0 10.233-5.09 21.138 21.138 0 0 0 3.178-3.683A7.067 7.067 0 0 1 44.925 5h11.15a7.067 7.067 0 0 1 5.352 2.444 21.1 21.1 0 0 0 3.18 3.682 114.173 114.173 0 0 0 10.23 5.092 14.037 14.037 0 0 1 7.295 8.85c1.056 3.846 13.575 49.92 13.807 50.764a1.75 1.75 0 0 1-1.01 2.07z'
                                />
                              </svg>
                              Fashion
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M94.93 77.903l-9.12 3.887a1.767 1.767 0 0 1-2.381-1.102L71.505 41.745s3.367 47.975 3.497 49.94a3.511 3.511 0 0 1-3.372 3.732l-13.967.578a3.522 3.522 0 0 1-3.672-3.415c-.048-1.958-1.686-62.796-1.686-62.796a27.9 27.9 0 0 1 .833-7.503l2.597-9.236a.875.875 0 0 0-.855-1.088h-8.76a.88.88 0 0 0-.855 1.09l2.597 9.24a27.87 27.87 0 0 1 .833 7.5s-1.638 60.84-1.687 62.798a3.515 3.515 0 0 1-3.672 3.413L29.37 95.42a3.513 3.513 0 0 1-3.373-3.733c.13-1.965 3.498-49.94 3.498-49.94L17.573 80.688a1.768 1.768 0 0 1-2.382 1.1L6.07 77.904a1.75 1.75 0 0 1-1.006-2.072c.23-.844 12.75-46.918 13.806-50.765a14.047 14.047 0 0 1 7.294-8.85 113.943 113.943 0 0 0 10.233-5.09 21.138 21.138 0 0 0 3.178-3.683A7.067 7.067 0 0 1 44.925 5h11.15a7.067 7.067 0 0 1 5.352 2.444 21.1 21.1 0 0 0 3.18 3.682 114.173 114.173 0 0 0 10.23 5.092 14.037 14.037 0 0 1 7.295 8.85c1.056 3.846 13.575 49.92 13.807 50.764a1.75 1.75 0 0 1-1.01 2.07z'
                                />
                              </svg>
                              Fashion
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='food' className='col col-6 travel-type-food'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 72 100'>
                                <path
                                  fill='currentColor'
                                  d='M61.4 94h-3.6c-1.988 0-3.6-1.64-3.6-3.666v-31.14a3.612 3.612 0 0 0-1.214-2.74C50.934 54.666 47 49.83 47 38.998c0-21.942 8.905-33.096 16.295-33 .962.04 1.718.853 1.705 1.833v82.5a3.7 3.7 0 0 1-1.055 2.593A3.558 3.558 0 0 1 61.4 94zM24.57 57.725v32.608c0 2.025-1.662 3.667-3.713 3.667h-3.714c-2.05 0-3.714-1.642-3.714-3.667V57.725C13.43 49.117 6 50.713 6 39c0-9.686 1.453-28.055 1.79-32.17A.912.912 0 0 1 8.713 6h1.95c.505 0 .917.398.93.895 0 0 .607 25.564.63 26.59a1.904 1.904 0 0 0 1.9 1.85 1.903 1.903 0 0 0 1.93-1.82l1.054-26.634c.02-.49.43-.88.93-.88h1.927c.5 0 .91.39.93.88 0 0 1.013 25.62 1.052 26.636a1.906 1.906 0 0 0 1.93 1.82 1.904 1.904 0 0 0 1.9-1.85l.632-26.59a.924.924 0 0 1 .93-.896h1.95a.913.913 0 0 1 .923.832C30.548 10.945 32 29.314 32 39c0 11.715-7.43 10.105-7.43 18.725z'
                                />
                              </svg>
                              Food
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 72 100'>
                                <path
                                  fill='currentColor'
                                  d='M61.4 94h-3.6c-1.988 0-3.6-1.64-3.6-3.666v-31.14a3.612 3.612 0 0 0-1.214-2.74C50.934 54.666 47 49.83 47 38.998c0-21.942 8.905-33.096 16.295-33 .962.04 1.718.853 1.705 1.833v82.5a3.7 3.7 0 0 1-1.055 2.593A3.558 3.558 0 0 1 61.4 94zM24.57 57.725v32.608c0 2.025-1.662 3.667-3.713 3.667h-3.714c-2.05 0-3.714-1.642-3.714-3.667V57.725C13.43 49.117 6 50.713 6 39c0-9.686 1.453-28.055 1.79-32.17A.912.912 0 0 1 8.713 6h1.95c.505 0 .917.398.93.895 0 0 .607 25.564.63 26.59a1.904 1.904 0 0 0 1.9 1.85 1.903 1.903 0 0 0 1.93-1.82l1.054-26.634c.02-.49.43-.88.93-.88h1.927c.5 0 .91.39.93.88 0 0 1.013 25.62 1.052 26.636a1.906 1.906 0 0 0 1.93 1.82 1.904 1.904 0 0 0 1.9-1.85l.632-26.59a.924.924 0 0 1 .93-.896h1.95a.913.913 0 0 1 .923.832C30.548 10.945 32 29.314 32 39c0 11.715-7.43 10.105-7.43 18.725z'
                                />
                              </svg>
                              Food
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='music' className='col col-6 travel-type-music'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M83.563 24.417c-1.02 0-2 .406-2.723 1.128L63.3 43.09a1.608 1.608 0 0 0-.117 2.118c5.59 7.328 5.782 13.566 1.213 18.132-4.354 4.35-6.927 4.78-9.513 7.366-2.587 2.586-.266 9.583-7.574 16.887s-18.113 8.39-30.704-4.194C4.016 70.813 5.102 60.015 12.41 52.71c7.308-7.304 14.36-4.933 16.946-7.52 2.585-2.584 2.965-5.206 7.32-9.557 4.564-4.563 10.8-4.377 18.123 1.198.634.496 1.54.446 2.114-.12l17.546-17.55a3.849 3.849 0 0 0 1.128-2.723c0-1.02.405-2 1.128-2.723L82.96 7.47c.396-.398.97-.558 1.513-.423a11.872 11.872 0 0 1 5.47 3.012 11.867 11.867 0 0 1 3.01 5.47 1.591 1.591 0 0 1-.422 1.512l-6.245 6.248a3.855 3.855 0 0 1-2.722 1.127zm-59.25 39.996l-.906.906a1.406 1.406 0 0 0-.123 1.837c1.576 2.132 1.986 4.675 3.435 6.124 1.448 1.45 3.992 1.86 6.123 3.436.558.42 1.342.37 1.838-.123l.907-.906a1.41 1.41 0 0 0 0-1.993l-9.28-9.28a1.408 1.408 0 0 0-1.993-.001zM45.504 48a6.5 6.5 0 1 0-9.193 9.192 6.5 6.5 0 0 0 13.786-7.288A6.488 6.488 0 0 0 45.502 48z'
                                />
                              </svg>
                              Music
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M83.563 24.417c-1.02 0-2 .406-2.723 1.128L63.3 43.09a1.608 1.608 0 0 0-.117 2.118c5.59 7.328 5.782 13.566 1.213 18.132-4.354 4.35-6.927 4.78-9.513 7.366-2.587 2.586-.266 9.583-7.574 16.887s-18.113 8.39-30.704-4.194C4.016 70.813 5.102 60.015 12.41 52.71c7.308-7.304 14.36-4.933 16.946-7.52 2.585-2.584 2.965-5.206 7.32-9.557 4.564-4.563 10.8-4.377 18.123 1.198.634.496 1.54.446 2.114-.12l17.546-17.55a3.849 3.849 0 0 0 1.128-2.723c0-1.02.405-2 1.128-2.723L82.96 7.47c.396-.398.97-.558 1.513-.423a11.872 11.872 0 0 1 5.47 3.012 11.867 11.867 0 0 1 3.01 5.47 1.591 1.591 0 0 1-.422 1.512l-6.245 6.248a3.855 3.855 0 0 1-2.722 1.127zm-59.25 39.996l-.906.906a1.406 1.406 0 0 0-.123 1.837c1.576 2.132 1.986 4.675 3.435 6.124 1.448 1.45 3.992 1.86 6.123 3.436.558.42 1.342.37 1.838-.123l.907-.906a1.41 1.41 0 0 0 0-1.993l-9.28-9.28a1.408 1.408 0 0 0-1.993-.001zM45.504 48a6.5 6.5 0 1 0-9.193 9.192 6.5 6.5 0 0 0 13.786-7.288A6.488 6.488 0 0 0 45.502 48z'
                                />
                              </svg>
                              Music
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='nature' className='col col-6 travel-type-nature'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 76 100'>
                                <path
                                  fill='currentColor'
                                  d='M71.57 71a16.245 16.245 0 0 1-12.498 5.385 38.102 38.102 0 0 1-9.7-1.494A23.872 23.872 0 0 1 38 78a23.847 23.847 0 0 1-11.37-3.11 38.088 38.088 0 0 1-9.702 1.495A16.25 16.25 0 0 1 4.428 71a1.625 1.625 0 0 1 .145-2.337 68.925 68.925 0 0 0 14.152-16.12c-1.54-.54-3-1.283-4.338-2.213a1.612 1.612 0 0 1-.71-1.186c-.045-.482.13-.958.476-1.297a86.822 86.822 0 0 0 13.264-17.103 18.438 18.438 0 0 1-3.132-1.24 1.616 1.616 0 0 1-.88-1.183 1.61 1.61 0 0 1 .455-1.4A51.206 51.206 0 0 0 36.49 7.984C36.752 7.386 37.344 7 38 7s1.248.386 1.51.983A51.206 51.206 0 0 0 52.14 26.92a1.604 1.604 0 0 1-.426 2.583c-1.002.51-2.05.924-3.13 1.24a86.87 86.87 0 0 0 13.263 17.104c.346.34.52.815.476 1.297a1.61 1.61 0 0 1-.71 1.186 18.16 18.16 0 0 1-4.338 2.214 68.96 68.96 0 0 0 14.15 16.12c.34.285.545.696.572 1.137.027.442-.127.875-.426 1.2zm-40.75 9.75a.825.825 0 0 1 .328-.594.758.758 0 0 1 .645-.13c3.75.988 7.675.987 11.424-.003.223-.056.458-.01.645.13s.307.356.33.594A40.69 40.69 0 0 0 46.92 92.3c.146.396.09.84-.15 1.184a1.177 1.177 0 0 1-1.032.514H29.264a1.179 1.179 0 0 1-1.035-.514 1.292 1.292 0 0 1-.15-1.184 40.73 40.73 0 0 0 2.74-11.55z'
                                />
                              </svg>
                              Nature
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 76 100'>
                                <path
                                  fill='currentColor'
                                  d='M71.57 71a16.245 16.245 0 0 1-12.498 5.385 38.102 38.102 0 0 1-9.7-1.494A23.872 23.872 0 0 1 38 78a23.847 23.847 0 0 1-11.37-3.11 38.088 38.088 0 0 1-9.702 1.495A16.25 16.25 0 0 1 4.428 71a1.625 1.625 0 0 1 .145-2.337 68.925 68.925 0 0 0 14.152-16.12c-1.54-.54-3-1.283-4.338-2.213a1.612 1.612 0 0 1-.71-1.186c-.045-.482.13-.958.476-1.297a86.822 86.822 0 0 0 13.264-17.103 18.438 18.438 0 0 1-3.132-1.24 1.616 1.616 0 0 1-.88-1.183 1.61 1.61 0 0 1 .455-1.4A51.206 51.206 0 0 0 36.49 7.984C36.752 7.386 37.344 7 38 7s1.248.386 1.51.983A51.206 51.206 0 0 0 52.14 26.92a1.604 1.604 0 0 1-.426 2.583c-1.002.51-2.05.924-3.13 1.24a86.87 86.87 0 0 0 13.263 17.104c.346.34.52.815.476 1.297a1.61 1.61 0 0 1-.71 1.186 18.16 18.16 0 0 1-4.338 2.214 68.96 68.96 0 0 0 14.15 16.12c.34.285.545.696.572 1.137.027.442-.127.875-.426 1.2zm-40.75 9.75a.825.825 0 0 1 .328-.594.758.758 0 0 1 .645-.13c3.75.988 7.675.987 11.424-.003.223-.056.458-.01.645.13s.307.356.33.594A40.69 40.69 0 0 0 46.92 92.3c.146.396.09.84-.15 1.184a1.177 1.177 0 0 1-1.032.514H29.264a1.179 1.179 0 0 1-1.035-.514 1.292 1.292 0 0 1-.15-1.184 40.73 40.73 0 0 0 2.74-11.55z'
                                />
                              </svg>
                              Nature
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='nightlife' className='col col-6 travel-type-nightlife'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M35.272 26.553a38.191 38.191 0 0 0 38.181 38.194 37.46 37.46 0 0 0 10.343-1.673 3.304 3.304 0 0 1 3.88 4.604c-7.722 16.818-25.603 26.543-43.923 23.888-18.32-2.655-32.702-17.054-35.33-35.372-2.625-18.318 7.13-36.177 23.968-43.87a3.306 3.306 0 1 1 4.612 3.883 37.474 37.474 0 0 0-1.73 10.346z'
                                />
                              </svg>
                              Nightlife
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M35.272 26.553a38.191 38.191 0 0 0 38.181 38.194 37.46 37.46 0 0 0 10.343-1.673 3.304 3.304 0 0 1 3.88 4.604c-7.722 16.818-25.603 26.543-43.923 23.888-18.32-2.655-32.702-17.054-35.33-35.372-2.625-18.318 7.13-36.177 23.968-43.87a3.306 3.306 0 1 1 4.612 3.883 37.474 37.474 0 0 0-1.73 10.346z'
                                />
                              </svg>
                              Nightlife
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='tours' className='col col-6 travel-type-tours'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M89.35 47.336h-2.49l.303 3.358c.24 2.65.36 5.304.36 7.966v18.007c0 4.05-3.27 7.333-7.305 7.333H21.783c-4.035 0-7.305-3.283-7.305-7.333V58.66c0-2.66.12-5.315.36-7.966l.304-3.358h-2.49A3.658 3.658 0 0 1 9 43.67v-11a3.659 3.659 0 0 1 3.652-3.665h4.15l.97-10.72a7.327 7.327 0 0 1 4.274-6.024A77.014 77.014 0 0 1 51 7.007a77.011 77.011 0 0 1 28.954 5.255 7.327 7.327 0 0 1 4.273 6.026l.97 10.72h4.15A3.658 3.658 0 0 1 93 32.673v11a3.659 3.659 0 0 1-3.65 3.666zM74.5 72c3.038 0 5.5-2.24 5.5-5s-2.462-5-5.5-5-5.5 2.24-5.5 5 2.462 5 5.5 5zM27 72c2.76 0 5-2.24 5-5s-2.24-5-5-5a5.002 5.002 0 0 0-3.535 8.536A5.002 5.002 0 0 0 27 72zm34.375-60h-21.75C37.623 12 36 13.567 36 15.5s1.623 3.5 3.625 3.5h21.75C63.377 19 65 17.433 65 15.5S63.377 12 61.375 12zm19.61 38.726l-2.095-22.43c-.186-1.877-1.795-3.306-3.713-3.296H27.82c-1.917-.01-3.526 1.42-3.712 3.297l-2.097 22.43c-.072.844.22 1.68.805 2.304.585.624 1.41.976 2.273.97h52.856a3.064 3.064 0 0 0 2.25-.96c.58-.616.867-1.444.795-2.28l-.004-.034zM19.876 87h11.25C32.16 87 33 87.784 33 88.75v1.75c0 1.933-1.68 3.5-3.75 3.5h-7.5C19.68 94 18 92.433 18 90.5v-1.75c0-.464.198-.91.55-1.237.35-.33.828-.513 1.325-.513zm51 0h11.25C83.16 87 84 87.784 84 88.75v1.75c0 1.933-1.68 3.5-3.75 3.5h-7.5C70.68 94 69 92.433 69 90.5v-1.75c0-.464.198-.91.55-1.237.35-.33.828-.513 1.325-.513z'
                                />
                              </svg>
                              Tours
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M89.35 47.336h-2.49l.303 3.358c.24 2.65.36 5.304.36 7.966v18.007c0 4.05-3.27 7.333-7.305 7.333H21.783c-4.035 0-7.305-3.283-7.305-7.333V58.66c0-2.66.12-5.315.36-7.966l.304-3.358h-2.49A3.658 3.658 0 0 1 9 43.67v-11a3.659 3.659 0 0 1 3.652-3.665h4.15l.97-10.72a7.327 7.327 0 0 1 4.274-6.024A77.014 77.014 0 0 1 51 7.007a77.011 77.011 0 0 1 28.954 5.255 7.327 7.327 0 0 1 4.273 6.026l.97 10.72h4.15A3.658 3.658 0 0 1 93 32.673v11a3.659 3.659 0 0 1-3.65 3.666zM74.5 72c3.038 0 5.5-2.24 5.5-5s-2.462-5-5.5-5-5.5 2.24-5.5 5 2.462 5 5.5 5zM27 72c2.76 0 5-2.24 5-5s-2.24-5-5-5a5.002 5.002 0 0 0-3.535 8.536A5.002 5.002 0 0 0 27 72zm34.375-60h-21.75C37.623 12 36 13.567 36 15.5s1.623 3.5 3.625 3.5h21.75C63.377 19 65 17.433 65 15.5S63.377 12 61.375 12zm19.61 38.726l-2.095-22.43c-.186-1.877-1.795-3.306-3.713-3.296H27.82c-1.917-.01-3.526 1.42-3.712 3.297l-2.097 22.43c-.072.844.22 1.68.805 2.304.585.624 1.41.976 2.273.97h52.856a3.064 3.064 0 0 0 2.25-.96c.58-.616.867-1.444.795-2.28l-.004-.034zM19.876 87h11.25C32.16 87 33 87.784 33 88.75v1.75c0 1.933-1.68 3.5-3.75 3.5h-7.5C19.68 94 18 92.433 18 90.5v-1.75c0-.464.198-.91.55-1.237.35-.33.828-.513 1.325-.513zm51 0h11.25C83.16 87 84 87.784 84 88.75v1.75c0 1.933-1.68 3.5-3.75 3.5h-7.5C70.68 94 69 92.433 69 90.5v-1.75c0-.464.198-.91.55-1.237.35-.33.828-.513 1.325-.513z'
                                />
                              </svg>
                              Tours
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                        {/* <!-- <div className=""> --> */}
                        <li option='water' className='col col-6 travel-type-water'>
                          <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M91.573 93.997a15.786 15.786 0 0 1-8.377-2.22 10.496 10.496 0 0 0-10.63 0c-5.24 2.96-11.51 2.96-16.752 0a9.428 9.428 0 0 0-5.314-1.446 9.422 9.422 0 0 0-5.315 1.448 15.789 15.789 0 0 1-8.376 2.22 15.796 15.796 0 0 1-8.378-2.22 9.42 9.42 0 0 0-5.314-1.447 9.422 9.422 0 0 0-5.315 1.448A15.789 15.789 0 0 1 9.426 94C7.535 93.997 6 92.355 6 90.33s1.535-3.665 3.427-3.665a9.424 9.424 0 0 0 5.314-1.445A15.8 15.8 0 0 1 23.119 83c2.926-.06 5.815.705 8.376 2.22a9.412 9.412 0 0 0 5.315 1.445 9.429 9.429 0 0 0 5.314-1.445A15.789 15.789 0 0 1 50.5 83c2.926-.06 5.815.705 8.376 2.22a10.496 10.496 0 0 0 10.63 0c5.24-2.958 11.51-2.958 16.75 0a9.428 9.428 0 0 0 5.317 1.445c1.892 0 3.427 1.64 3.427 3.665 0 2.024-1.535 3.665-3.427 3.665zM90.293 62h-30.89a1.406 1.406 0 0 1-1.291-1.961 48.605 48.605 0 0 0 3.262-18.51 49.415 49.415 0 0 0-3.264-18.62 1.37 1.37 0 0 1 .33-1.54c.277-.26.65-.39 1.03-.364 17.262 1.17 31.527 22.68 32.527 39.178a1.711 1.711 0 0 1-1.705 1.82zm-1.746 4a2.458 2.458 0 0 1 1.809 4.118 58.618 58.618 0 0 1-9.736 8.3 6.82 6.82 0 0 1-3.724 1.185 19.938 19.938 0 0 0-9.278 2.41 7.646 7.646 0 0 1-7.502-.004 19.895 19.895 0 0 0-9.81-2.414 19.927 19.927 0 0 0-9.82 2.417 6.575 6.575 0 0 1-3.746.98 6.594 6.594 0 0 1-3.754-.984 19.909 19.909 0 0 0-9.812-2.415c-2.76-.05-5.5.49-8.036 1.578A1.525 1.525 0 0 1 13 79.778V68.55A2.547 2.547 0 0 1 15.545 66h73.002zm-37.12-4H7.715a1.717 1.717 0 0 1-1.295-2.844L50.99 7.593A1.713 1.713 0 0 1 54 8.718v50.703c0 .685-.272 1.34-.754 1.825a2.56 2.56 0 0 1-1.818.754z'
                                />
                              </svg>
                              Water
                            </span>
                          </div>
                          <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                            <span className='travel-type-selector-content nowrap'>
                              <svg className='travel-icon' viewBox='0 0 100 100'>
                                <path
                                  fill='currentColor'
                                  d='M91.573 93.997a15.786 15.786 0 0 1-8.377-2.22 10.496 10.496 0 0 0-10.63 0c-5.24 2.96-11.51 2.96-16.752 0a9.428 9.428 0 0 0-5.314-1.446 9.422 9.422 0 0 0-5.315 1.448 15.789 15.789 0 0 1-8.376 2.22 15.796 15.796 0 0 1-8.378-2.22 9.42 9.42 0 0 0-5.314-1.447 9.422 9.422 0 0 0-5.315 1.448A15.789 15.789 0 0 1 9.426 94C7.535 93.997 6 92.355 6 90.33s1.535-3.665 3.427-3.665a9.424 9.424 0 0 0 5.314-1.445A15.8 15.8 0 0 1 23.119 83c2.926-.06 5.815.705 8.376 2.22a9.412 9.412 0 0 0 5.315 1.445 9.429 9.429 0 0 0 5.314-1.445A15.789 15.789 0 0 1 50.5 83c2.926-.06 5.815.705 8.376 2.22a10.496 10.496 0 0 0 10.63 0c5.24-2.958 11.51-2.958 16.75 0a9.428 9.428 0 0 0 5.317 1.445c1.892 0 3.427 1.64 3.427 3.665 0 2.024-1.535 3.665-3.427 3.665zM90.293 62h-30.89a1.406 1.406 0 0 1-1.291-1.961 48.605 48.605 0 0 0 3.262-18.51 49.415 49.415 0 0 0-3.264-18.62 1.37 1.37 0 0 1 .33-1.54c.277-.26.65-.39 1.03-.364 17.262 1.17 31.527 22.68 32.527 39.178a1.711 1.711 0 0 1-1.705 1.82zm-1.746 4a2.458 2.458 0 0 1 1.809 4.118 58.618 58.618 0 0 1-9.736 8.3 6.82 6.82 0 0 1-3.724 1.185 19.938 19.938 0 0 0-9.278 2.41 7.646 7.646 0 0 1-7.502-.004 19.895 19.895 0 0 0-9.81-2.414 19.927 19.927 0 0 0-9.82 2.417 6.575 6.575 0 0 1-3.746.98 6.594 6.594 0 0 1-3.754-.984 19.909 19.909 0 0 0-9.812-2.415c-2.76-.05-5.5.49-8.036 1.578A1.525 1.525 0 0 1 13 79.778V68.55A2.547 2.547 0 0 1 15.545 66h73.002zm-37.12-4H7.715a1.717 1.717 0 0 1-1.295-2.844L50.99 7.593A1.713 1.713 0 0 1 54 8.718v50.703c0 .685-.272 1.34-.754 1.825a2.56 2.56 0 0 1-1.818.754z'
                                />
                              </svg>
                              Water
                            </span>
                          </div>
                        </li>
                        {/* <!-- </div> --> */}
                      </ul>
                    </AmpSelector>
                    {/* <!--/ Type Selector --> */}
                  </div>
                  <div className='col col-12 md-col-3 px2 py1'>
                    <div className='travel-filters-text h5 mb2 caps'>city</div>

                    {/* <!-- City Selector --> */}
                    <AmpList
                      className='travel-block-list travel-city-selector'
                      layout='flex-item'
                      src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                      data-amp-bind-src="
  '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
  '&query=' + query_query +
  (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
  (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
  '&sort=' + query_sort"
                    >
                      <AmpMustache>
                        <AmpSelector
                          layout='container'
                          name='city'
                          multiple=''
                          on='select: AMP.setState({
    ui_reset: false,
    fields_city: fields_city.includes(event.targetOption)
        ? copyAndSplice(fields_city, fields_city.indexOf(event.targetOption), 1)
        : fields_city.concat([event.targetOption]),
    fields_city_edited: true
})'
                          data-amp-bind-selected='fields_city'
                        >
                          <ul className='list-reset'>
                            {`{{#stats.cities}}`}
                            {`{{#isSelected}}`}
                            <li option='{{name}}' selected=''>
                              {`{{/isSelected}}`}
                              {`{{^isSelected}}`}
                            </li>
                            {/* This closing </li> is a hack */}
                            <li option='{{name}}'>
                              {`{{/isSelected}}`}
                              <span>
                                <div className='travel-city-selector-img'>
                                  <AmpImg
                                    className='circle'
                                    layout='flex-item'
                                    src='/img/travel/city/{{img}}.jpg'
                                  />
                                </div>
                                {`{{name}}`}
                              </span>
                            </li>
                            {`{{/stats.cities}}`}
                          </ul>
                        </AmpSelector>
                      </AmpMustache>
                    </AmpList>
                    {/* <!--/ City Selector --> */}
                  </div>
                </div>
                {/* <!--/ Filters --> */}
              </div>
              <div className='travel-border-gray mx1 md-mx2 border-top' />
              <div className='max-width-3 mx-auto px1 md-px2 py1 center'>
                <button
                  className='travel-filters-reset-btn ampstart-btn rounded bold'
                  on='
          tap:AMP.setState({
              ui_reset: true,
              query_maxPrice: fields_maxPrice_initial,
              fields_maxPrice: fields_maxPrice_initial,
              fields_maxPrice_live: fields_maxPrice_initial,
              fields_maxPrice_edited: false,
              query_city: fields_city_initial,
              fields_city: fields_city_initial,
              fields_city_edited: false,
              query_type: fields_type_initial,
              fields_type: fields_type_initial,
              fields_type_edited: false,
          })
        '
                >
                  Reset Filters
                </button>
                <button
                  className='travel-filters-apply-btn ampstart-btn rounded bold'
                  disabled=''
                  data-amp-bind-disabled='!fields_maxPrice_edited && !fields_city_edited && !fields_type_edited && !ui_reset'
                  on='
            tap:AMP.setState({
                ui_reset: false,
                ui_filterPane: false,
                query_query: fields_query,
                fields_query_edited: false,
                query_departure: fields_departure,
                fields_departure_edited: false,
                query_return: fields_return,
                fields_return_edited: false,
                query_maxPrice: fields_maxPrice,
                fields_maxPrice_edited: false,
                query_city: fields_city,
                fields_city_edited: false,
                query_type: fields_type,
                fields_type_edited: false,
                query_sort: fields_sort,
                fields_sort_edited: false,
            })
          '
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/ Filter Pane --> */}

        {/* <!-- Sort bar --> */}
        <section className='travel-filter-bar md-hide lg-hide'>
          <div className='px1 md-px2'>
            <AmpSelector
              className='travel-row-selector px1 mxn1 md-px2 md-mxn2'
              layout='container'
              name='sort'
              on='
        select:AMP.setState({
          query_sort: event.targetOption,
          fields_sort: event.targetOption
        })
      '
              data-amp-bind-selected='fields_sort'
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
        {/* <!--/ Sort bar --> */}

        <div
          className='travel-no-focus flex-auto overflow-auto'
          role='button'
          tabIndex='-1'
          on='tap:AMP.setState({ui_filterPane: false, ui_reset: false, ui_sortPane: false})'
        >
          {/* <!-- Results --> */}
          <section className='travel-results pb1 md-pt1'>
            <div className='max-width-3 mx-auto px1 md-px2 flex'>
              <AmpList
                className='travel-inline-list travel-results-list'
                layout='flex-item'
                noloading=''
                src='/api/search?maxPrice=800&query=&sort=popularity-desc'
                data-amp-bind-src="
  '/api/search?maxPrice=' + (query_maxPrice < 801 ? query_maxPrice : 0) +
  '&query=' + query_query +
  (query_city.length ? '&cities[]=' + query_city.join('&cities[]=') : '') +
  (query_type.length ? '&types[]=' + query_type.join('&types[]=') : '') +
  '&sort=' + query_sort
"
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
                              <LikeButton mustacheVariable='liked' />
                            </div>
                          </div>
                        </div>
                        <ActivityInfo
                          title='{{name}}'
                          price='{{price.value}}'
                          stars='{{reviews.averageRating.range}}'
                          reviews='{{reviews.count}}'
                          location='Oaxaca'
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
                          AMP.setState({ui_reset: false}),
                          AMP.setState({
                            ui_filterPane: true,
                            ui_reset: true,
                            query_maxPrice: fields_maxPrice_initial,
                            fields_maxPrice: fields_maxPrice_initial,
                            fields_maxPrice_live: fields_maxPrice_initial,
                            fields_maxPrice_edited: false,
                            query_city: fields_city_initial,
                            fields_city: fields_city_initial,
                            fields_city_edited: false,
                            query_type: fields_type_initial,
                            fields_type: fields_type_initial,
                            fields_type_edited: false
                          })
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
          {/* <!--/ Results --> */}
        </div>
      </div>
    </div>
  </>
);
