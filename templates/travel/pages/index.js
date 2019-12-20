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
import TravelHero from '../components/TravelHero';
import DiscoverSection from '../components/DiscoverSection';
import HomeButton from '../components/HomeButton';
import AnglesArtwork from '../components/AnglesArtwork';
import ActivitiesPanel from '../components/ActivitiesPanel';
import ActivityInfo from '../components/ActivityInfo';
import LikeButton from '../components/LikeButton';
import {AmpState, AmpImg} from '@ampproject/toolbox-next-amp';

export default function Index(props) {
  return (
    <>
      <Head>
        <title>Travel Template</title>
        <meta name='amp-google-client-id-api' content='googleanalytics' />
        <link
          href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'
          rel='stylesheet'
        />
        <link rel='stylesheet' type='text/css' href='/css/travel.css' />
      </Head>

      {/* Put in a div so can collapse these easily in developer tools */}
      <div>
        <AmpState id='ui_hero'>{true}</AmpState>
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

      <section className='travel-main-wrapper overflow-hidden' role='main'>
        <section className='relative z2'>
          <header className='travel-header absolute top-0 right-0 left-0'>
            <div className='px1 md-px2 py1 md-py2 flex justify-between items-center'>
              <HomeButton />
            </div>
          </header>
        </section>

        <TravelHero />

        <div id='travel-landing-content' className='travel-landing-content relative'>
          <AnglesArtwork />
          <DiscoverSection />
          <ActivitiesPanel />

          <div className='travel-footer-wrapper'>
            {/* <!-- Popular --> */}
            <section className='travel-popular pb4 pt3 relative'>
              <header className='max-width-3 mx-auto px1 md-px2'>
                <h3 className='h1 bold line-height-2 md-hide lg-hide' aria-hidden='true'>
                  Top Adventures
                  <br />
                  Near You
                </h3>
                <h3 className='h1 bold line-height-2 xs-hide sm-hide center'>
                  Top Adventures Near You
                </h3>
              </header>
              <div className='overflow-scroll'>
                <div className='travel-overflow-container'>
                  <div className='flex px1 md-px2 mxn1'>
                    <div className='m1 mt3 mb2'>
                      <div className='travel-popular-tilt-right mb1'>
                        <div className='relative travel-results-result'>
                          <a className='travel-results-result-link block relative' href='#'>
                            <AmpImg
                              className='block rounded'
                              width='346'
                              height='200'
                              noloading=''
                              src='/img/travel/activity/surf-day.jpg'
                              srcset='/img/travel/activity/surf-day@2x.jpg 2x, /img/travel/activity/surf-day.jpg 1x'
                            />
                          </a>

                          <div className='travel-results-result-like absolute top-0 right-0'>
                            <div className='p1'>
                              <LikeButton />
                            </div>
                          </div>
                        </div>
                      </div>

                      <ActivityInfo
                        title='Surf Day. Board and Wetsuits Included in Price!'
                        price={100}
                        stars={5}
                        reviews={241}
                        location='Oaxaca'
                      />
                    </div>
                    <div className='m1 mt3 mb2'>
                      <div className='travel-results-result relative mb1'>
                        <div className='relative travel-results-result'>
                          <a className='travel-results-result-link block relative' href='#'>
                            <AmpImg
                              className='block rounded'
                              width='346'
                              height='200'
                              noloading=''
                              src='/img/travel/activity/discover-electronic-scene.jpg'
                              srcset='/img/travel/activity/discover-electronic-scene@2x.jpg 2x, /img/travel/activity/discover-electronic-scene.jpg 1x'
                            />
                          </a>
                          <div className='travel-results-result-flags absolute top-0 left-0'>
                            <div className='p1'>
                              <span className='travel-pill bold'>NEW</span>
                            </div>
                          </div>
                          <div className='travel-results-result-like absolute top-0 right-0'>
                            <div className='p1'>
                              <LikeButton />
                            </div>
                          </div>
                        </div>
                      </div>

                      <ActivityInfo
                        title='Discover Oaxaca&#39;s Electronic Music Scene with a Top DJ'
                        price={113}
                        stars={5}
                        reviews={42}
                        location='Oaxaca'
                      />
                    </div>
                    <div className='m1 mt3 mb2'>
                      <div className='travel-popular-tilt-left mb1'>
                        <div className='relative travel-results-result'>
                          <a className='travel-results-result-link block relative' href='#'>
                            <AmpImg
                              className='block rounded'
                              width='346'
                              height='200'
                              noloading=''
                              src='/img/travel/activity/skateboard-around-city.jpg'
                              srcset='/img/travel/activity/skateboard-around-city@2x.jpg 2x, /img/travel/activity/skateboard-around-city.jpg 1x'
                            />
                          </a>
                          <div className='travel-results-result-like absolute top-0 right-0'>
                            <div className='p1'>
                              <LikeButton />
                            </div>
                          </div>
                        </div>
                      </div>
                      <ActivityInfo
                        title='Skateboard Around the City'
                        price={92}
                        stars={5}
                        reviews={42}
                        location='Mexico City'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!--/ Popular --> */}

            {/* <!-- Featured --> */}
            <section className='travel-featured pt3 relative clearfix'>
              <header className='max-width-2 mx-auto px1 md-px2 relative'>
                <h3 className='travel-featured-heading h1 bold line-height-2 mb2 center'>
                  Featured Destinations
                </h3>
              </header>
              <div className='max-width-3 mx-auto relative'>
                <div className='travel-featured-grid flex flex-wrap items-stretch'>
                  <div className='col-12 md-col-6 flex items-stretch flex-auto'>
                    <a
                      href='results?amp=1'
                      className='travel-featured-tile flex flex-auto relative travel-featured-color-blue'
                      on="tap:AMP.setState({fields_query: 'New York', query_query: 'New York'})"
                    >
                      <AmpImg
                        className='travel-object-cover flex-auto'
                        layout='responsive'
                        width='336'
                        height='507'
                        src='/img/travel/city/new-york.jpg'
                      />
                      <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                        <div className='travel-featured-tile-heading caps bold line-height-2 h3'>
                          New York
                        </div>
                        <div className='h5'>379 adventures</div>
                      </div>
                    </a>
                    <div className='flex flex-column items-stretch flex-auto'>
                      <a
                        href='results?amp=1'
                        className='travel-featured-tile flex flex-auto relative travel-featured-color-cyan'
                        on="tap:AMP.setState({fields_query: 'Barcelona', query_query: 'Barcelona'})"
                      >
                        <AmpImg
                          className='travel-object-cover flex-auto'
                          layout='responsive'
                          width='264'
                          height='246'
                          src='/img/travel/city/barcelona.jpg'
                        />
                        <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                          <div className='travel-featured-tile-heading bold caps line-height-2 h3'>
                            Barcelona
                          </div>
                          <div className='h5'>68 adventures</div>
                        </div>
                      </a>
                      <a
                        href='results?amp=1'
                        className='travel-featured-tile flex flex-auto pointer relative travel-featured-color-orange'
                        on="tap:AMP.setState({fields_query: 'Paris', query_query: 'Paris'})"
                      >
                        <AmpImg
                          className='travel-object-cover flex-auto'
                          layout='responsive'
                          width='264'
                          height='264'
                          src='/img/travel/city/paris.jpg'
                        />
                        <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                          <div className='travel-featured-tile-heading bold caps line-height-2 h3'>
                            Paris
                          </div>
                          <div className='h5'>221 adventures</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className='col-12 md-col-6 flex items-stretch flex-auto'>
                    <div className='flex flex-column items-stretch flex-auto'>
                      <a
                        href='results?amp=1'
                        className='travel-featured-tile flex flex-auto pointer relative travel-featured-color-purple'
                        on="tap:AMP.setState({fields_query: 'Tokyo', query_query: 'Tokyo'})"
                      >
                        <AmpImg
                          className='travel-object-cover flex-auto'
                          layout='responsive'
                          width='276'
                          height='207'
                          src='/img/travel/city/tokyo.jpg'
                        />
                        <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                          <div className='travel-featured-tile-heading caps bold line-height-2 h3'>
                            Tokyo
                          </div>
                          <div className='h5'>500+ adventures</div>
                        </div>
                      </a>
                      <a
                        href='results?amp=1'
                        className='travel-featured-tile flex flex-auto relative travel-featured-color-cornflower'
                        on="tap:AMP.setState({fields_query: 'Chicago', query_query: 'Chicago'})"
                      >
                        <AmpImg
                          className='travel-object-cover flex-auto'
                          layout='responsive'
                          width='264'
                          height='286'
                          src='/img/travel/city/chicago.jpg'
                        />
                        <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                          <div className='travel-featured-tile-heading caps bold line-height-2 h3'>
                            Chicago
                          </div>
                          <div className='h5'>143 adventures</div>
                        </div>
                      </a>
                    </div>
                    <a
                      href='results?amp=1'
                      className='travel-featured-tile flex flex-auto relative travel-featured-color-teal'
                      on="tap:AMP.setState({fields_query: 'Reykjavik', query_query: 'Reykjavik'})"
                    >
                      <AmpImg
                        className='travel-object-cover flex-auto'
                        layout='responsive'
                        width='312'
                        height='507'
                        src='/img/travel/city/reykjavik.jpg'
                      />
                      <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                        <div className='travel-featured-tile-heading caps bold h3'>Reykjavik</div>
                        <div className='h5'>87 adventures</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            {/* <!--/ Featured --> */}

            {/* <!-- Search --> */}
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
                      on='change:AMP.setState({fields_query: event.value})'
                      defaultValue=''
                      data-amp-bind-value='fields_query'
                    />
                    <span className='travel-input-group-sep travel-border-gray relative z1 block' />
                    <a
                      href='results?amp=1'
                      className='travel-link travel-input travel-input-big line-height-2 link rounded-right nowrap text-decoration-none'
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
                      Find my next adventure
                    </a>
                  </div>
                </div>
              </div>
            </section>
            {/* <!--/ Search --> */}

            {/* <!-- Discover mobile--> */}
            <section className='travel-discover-mobile max-width-3 mx-auto py3 px1 md-hide lg-hide'>
              <header>
                <h2 className='h1 bold line-height-2'>Discover Adventures</h2>
                <div className='travel-discover-subheading h3'>
                  Get inspired and find your next big trip
                </div>
              </header>
              <div className='flex md-mx2 my3 py2 items-center travel-discover-panel travel-shadow-hover'>
                <AmpImg
                  className='rounded relative flex-none mx1'
                  width='100'
                  height='100'
                  src='/img/travel/blogpost-thumbnail.jpg'
                />
                <div className='flex-auto'>
                  <div className='h3 bold line-height-2 mb1'>From the blog</div>
                  <p className='travel-discover-panel-subheading my1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit amet dolor set.{' '}
                    <a className='travel-link' href='#'>
                      Read more
                    </a>
                  </p>
                </div>
              </div>
            </section>
            {/* <!--/ Discover mobile--> */}

            {/* <!-- Footer --> */}
            <footer className='travel-footer overflow-hidden'>
              <div className='relative bg-black'>
                {/* <!-- Angle --> */}
                <div className='travel-footer-angle-block absolute top-0 bottom-0 right-0 xs-hide sm-hide' />
                <div className='travel-footer-angle absolute xs-hide sm-hide' />
                {/* <!--/ Angle --> */}

                {/* <!-- Right column --> */}
                <div className='travel-newsletter-signup'>
                  <header className='max-width-3 mx-auto px1 md-px2'>
                    <h4 className='travel-footer-right-column-heading travel-spacing-none h2 mb3 blue'>
                      Want travel deals
                      <br />
                      straight to your inbox?
                    </h4>
                    <div className='h4 bold mb1'>Sign up to our newsletter</div>
                  </header>
                  <div className='relative'>
                    <div className='travel-footer-input-bg bg-black absolute right-0 left-0 md-hide lg-hide' />
                    <div className='max-width-3 mx-auto px1 md-px2 relative'>
                      <div className='travel-input-group flex items-center col-12 rounded travel-shadow'>
                        <input
                          className='travel-input travel-input-big block col-12 flex-auto rounded-left'
                          type='text'
                          name='email'
                          placeholder='Enter your email'
                        />
                        <span className='travel-input-group-sep travel-border-gray relative z1 block' />
                        <button
                          type='button'
                          className='travel-link travel-input-big nowrap rounded-right'
                        >
                          Sign up now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--/ Right column --> */}

                {/* <!-- Left column --> */}
                <div className='max-width-3 mx-auto px1 md-px2'>
                  <div className='flex pt3 md-pt4 col-12 md-col-6 pr3'>
                    <div className='col-2'>
                      <a href='/?amp=1' className='inline-block h2 line-height-1 circle white'>
                        <svg className='travel-icon travel-icon-logo h2' viewBox='0 0 100 100'>
                          <g fill='none' fillRule='evenodd' stroke='currentColor' strokeWidth='7.5'>
                            <circle cx='50' cy='50' r='45' />
                            <path d='M20.395 83.158c-2.37-10.263-.79-18.553 4.737-24.87 8.29-9.472 17.763-1.183 26.052-9.472 8.29-8.29 2.37-18.948 10.658-26.053 5.526-4.737 12.237-6.316 20.132-4.737M39.084 95c-2.788-10.2-1.912-17.304 2.627-21.316 6.808-6.017 14.956-.68 24.088-9.623 9.13-8.94 3.062-17.133 10.255-23.534 4.795-4.267 10.282-5.668 16.46-4.203' />
                          </g>
                        </svg>{' '}
                      </a>
                    </div>
                    <div className='col-5'>
                      <h4 className='travel-spacing-none mb2 h3 gray bold'>Company</h4>
                      <div className='line-height-4 mb4'>
                        <a href='#' className='travel-link block gray'>
                          About
                        </a>
                        <a href='#' className='travel-link block gray'>
                          Careers
                        </a>
                        <a href='#' className='travel-link block gray'>
                          Contact
                        </a>
                      </div>
                    </div>
                    <div className='col-5'>
                      <h4 className='travel-spacing-none mb2 h3 gray bold'>Discover</h4>
                      <div className='line-height-4 mb4'>
                        <a href='#' className='travel-link block gray'>
                          Activities
                        </a>
                        <a href='#' className='travel-link block gray'>
                          Tours
                        </a>
                        <a href='#' className='travel-link block gray'>
                          Experiences
                        </a>
                        <a href='#' className='travel-link block gray'>
                          Featured Adventures
                        </a>
                        <a href='#' className='travel-link block gray'>
                          Search
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='py3 gray'>&copy; Copyright 2017</div>
                </div>
                {/* <!--/ Left column --> */}
              </div>
            </footer>
            {/* <!--/ Footer  --> */}
          </div>
        </div>
      </section>
    </>
  );
}
