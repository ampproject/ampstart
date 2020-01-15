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
import ResultsNavBar from '../components/results-navbar/ResultsNavBar';
import Results from '../components/results/Results';
import FilterBar from '../components/filter-bar/FilterBar';
import FilterPane from '../components/filter-pane/FilterPane';
import SortBar from '../components/sort-bar/SortBar';
import TravelResultsData from '../components/data/TravelResultsData';

export default function ResultsPage(props) {
  const travelResultsData = TravelResultsData();

  return (
    <>
      <Head>
        <title>Travel Template</title>
        <link
          rel="canonical"
          href="https://www.ampstart.com/templates/travel/travel-results.amp"
        />
        <meta name="amp-google-client-id-api" content="googleanalytics" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="/css/travel-results.css" />
      </Head>

      <AmpState id="display">
        {{
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

      <div role="main">
        <div
          className="travel-overlay-fx-scale"
          data-amp-bind-class="'travel-overlay-fx-scale' + (display.ui_filterPane ? ' travel-overlay-fx-scale-active' : '')">
          <div
            className="travel-no-focus"
            role="button"
            tabIndex="-1"
            on="tap:AMP.setState({display: {ui_filterPane: false, ui_reset: false, ui_sortPane: false}})">
            <ResultsNavBar />
          </div>

          <FilterBar data={travelResultsData.travel.data} />
          <FilterPane />
          <SortBar />

          <div
            className="travel-no-focus flex-auto overflow-auto"
            role="button"
            tabIndex="-1"
            on="tap:AMP.setState({display: {ui_filterPane: false, ui_reset: false, ui_sortPane: false}})">
            <Results />
          </div>
        </div>
      </div>
    </>
  );
}
