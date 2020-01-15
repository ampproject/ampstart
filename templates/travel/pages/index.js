/*
Copyright 2020 The AMP Start Authors. All Rights Reserved.

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
import {AmpState} from '@ampproject/toolbox-next-amp';
import Hero from '../components/hero/Hero';
import Discover from '../components/discover/Discover';
import Angles from '../components/angles/Angles';
import Activities from '../components/activities/Activities';
import Popular from '../components/popular/Popular';
import Featured from '../components/featured/Featured';
import Search from '../components/search/Search';
import DiscoverMobile from '../components/discover/DiscoverMobile';
import Footer from '../components/footer/Footer';
import HomeIconSvg from '../components/svg/HomeIconSvg';
import TravelData from '../components/data/TravelData';

export default function Index(props) {
  const travelData = TravelData();

  return (
    <>
      <Head>
        <title>Travel Template</title>
        <meta name='amp-google-client-id-api' content='googleanalytics' />
        <link
          href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'
          rel='stylesheet'
        />
        {/* TODO: This CSS file reference needs to be removed */}
        <link rel='stylesheet' type='text/css' href='/css/travel.css' />{' '}
      </Head>

      {/* Put in a div so can collapse these easily in developer tools */}
      <AmpState id='display'>
        {{
          ui_hero: true,
          ui_reset: false,
          ui_filterPane: false,
          ui_sortPane: false,

          fields_query: '',
          fields_query_initial: '',
          fields_query_live: '',
          fields_query_edited: false,
          query_query: '',

          fields_departure: '',
          fields_departure_initial: '',
          fields_departure_edited: false,
          query_departure: '',

          fields_return: '',
          fields_return_initial: '',
          fields_return_edited: false,
          query_return: '',

          fields_type: [],
          fields_type_initial: [],
          fields_type_edited: false,
          query_type: [],

          fields_city: [],
          fields_city_initial: [],
          fields_city_edited: false,
          query_city: [],

          fields_sort: 'popularity-desc',
          fields_sort_initial: 'popularity-desc',
          fields_sort_edited: false,
          query_sort: 'popularity-desc',

          fields_maxPrice: 801,
          fields_maxPrice_initial: 801,
          fields_maxPrice_live: 801,
          fields_maxPrice_edited: false,
          query_maxPrice: 801,
        }}
      </AmpState>

      <section className='travel-main-wrapper overflow-hidden' role='main'>
        <section className='relative z2'>
          <header className='travel-header absolute top-0 right-0 left-0'>
            <div className='px1 md-px2 py1 md-py2 flex justify-between items-center'>
              <a href='/' className='travel-results-navbar-icon h2 circle my1 md-my2'>
                <HomeIconSvg />
              </a>
            </div>
          </header>
        </section>

        <Hero />

        <div id='travel-landing-content' className='travel-landing-content relative'>
          <Angles />
          <Discover />
          <Activities />

          <div className='travel-footer-wrapper'>
            <Popular />
            <Featured />
            <Search />
            <DiscoverMobile />
            <Footer />
          </div>
        </div>
      </section>
    </>
  );
}
