import LocationPinSvg from '../svg/LocationPinSvg';
import PlaneTakeoffSvg from '../svg/PlaneTakeoffSvg';
import PlaneLandingSvg from '../svg/PlaneLandingSvg';
import ScrollDownSvg from '../svg/ScrollDownSvg';
import {AmpMustache, AmpList} from '@ampproject/toolbox-next-amp';

export default function HeroSearch(props) {
  return (
    <div className='travel-hero-search'>
      <style jsx global>{`
        .travel-hero-search-dates {
          color: #fff;
        }

        @keyframes a {
          0% {
            opacity: 0;
            transform: translateY(2rem);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        .travel-hero-discover {
          color: #8f98a3;
          cursor: pointer;
          animation: a 0.4s 0.45s ease-in-out both;
        }

        .travel-hero-discover svg {
          display: block;
          margin: 0 auto;
        }

        .travel-hero-search .travel-input-icon {
          animation: a 0.4s 0.3s ease-in-out both;
        }

        .travel-hero-search-dates {
          animation: a 0.4s 0.35s ease-in-out both;
        }

        .travel-hero-search .ampstart-btn {
          font-size: 1.25rem;
          background-color: #8b58e3;
          animation: a 0.4s 0.4s ease-in-out both;
        }

        .travel-date-input {
          line-height: 1.125rem;
          padding: 0.5rem 1rem;
          padding-left: calc(0.5rem * 2.5 + 1.2em);
        }

        .travel-date-input .travel-icon {
          position: absolute;
          left: 0;
          top: 0;
          box-sizing: content-box;
          padding: 0.5rem 1rem;
        }

        .travel-date-input.input-dark .travel-date-input-label,
        .travel-date-input.input-dark .travel-icon {
          color: hsla(0, 0%, 100%, 0.75);
        }

        .travel-date-input input {
          opacity: 0;
          border: none;
          background: none;
          font: inherit;
          line-height: 1.125rem;
          height: 1.125rem;
          margin-bottom: calc(1.125rem * -1);
          width: 8rem;
          color: inherit;
        }

        .travel-date-input-touched input,
        .travel-date-input input:focus {
          opacity: 1;
        }

        .travel-date-input input:focus {
          outline: none;
        }

        .travel-date-input-touched input ~ .travel-date-input-label,
        .travel-date-input input:focus ~ .travel-date-input-label {
          opacity: 0;
        }

        .travel-date-input-touched input[disabled],
        .travel-date-input input[disabled] ~ .travel-date-input-label,
        .travel-date-input input[disabled] ~ .travel-icon {
          opacity: 0.5;
        }

        .travel-date-input input::-webkit-datetime-edit-fields-wrapper {
          padding: 0;
        }

        .travel-date-input input::-webkit-clear-button,
        .travel-date-input input::-webkit-inner-spin-button {
          display: none;
        }

        .travel-date-input input::-webkit-calendar-picker-indicator {
          opacity: 0;
          padding: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        @media (min-width: 52.06rem) {
          .travel-hero-search {
            margin-top: 4.25rem;
            max-width: 530px;
          }

          .travel-hero-search .travel-input {
            color: inherit;
            background-color: #fff;
            border-color: transparent;
          }

          .travel-hero-search .travel-input-clear + .travel-icon {
            color: inherit;
          }

          .travel-hero-search-dates {
            -ms-flex-pack: start;
            justify-content: flex-start;
            color: #323a43;
          }

          .travel-hero-search-dates .travel-date-input {
            -ms-flex: none;
            flex: none;
          }
        }
      `}</style>

      <label className='travel-input-icon travel-shadow flex col-12 relative rounded'>
        <input
          className='travel-input travel-input-big travel-input-clear border block col-12 rounded'
          list='locations'
          type='text'
          name='query'
          placeholder='Where would you like to go?'
          on='
              change:AMP.setState({display: {
                fields_query: event.value,
                fields_query_live: event.value,
                fields_query_edited: display.query_query != event.value
              }});
              input-debounced:AMP.setState({display: {
                fields_query_live: event.value
              }});
            '
          defaultValue=''
          data-amp-bind-value='display.fields_query'
        />
        <LocationPinSvg />
      </label>

      <AmpList
        layout='flex-item'
        src='/api/places?types=(regions)&types=(cities)&input='
        data-amp-bind-src="'/api/places?types=(regions)&types=(cities)&input=' + display.fields_query_live"
      >
        <AmpMustache>
          <datalist id='locations'>
            {`{{#predictions}}`}
            <option value='{{description}}'>{`{{/predictions}}`}</option>
          </datalist>
        </AmpMustache>
      </AmpList>

      <div className='travel-hero-search-dates flex my2 justify-around'>
        <label
          className='travel-date-input relative bold flex-auto'
          data-amp-bind-class="'travel-date-input relative bold flex-auto' + (display.fields_departure ? ' travel-date-input-touched' : '')"
        >
          <input
            className='block relative p0 z1'
            type='date'
            placeholder='yyyy-mm-dd'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            title='yyyy-mm-dd'
            name='departure'
            on='
                change:AMP.setState({display: {
                  fields_departure: true,
                  fields_departure_edited: true
                }})
              '
          />
          <PlaneTakeoffSvg />
          <div className='travel-date-input-label'>Departure</div>
        </label>
        <label
          className='travel-date-input relative bold flex-auto'
          data-amp-bind-class="'travel-date-input relative bold flex-auto' + (display.fields_return ? ' travel-date-input-touched' : '')"
        >
          <input
            className='block relative p0 z1'
            type='date'
            placeholder='yyyy-mm-dd'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            title='yyyy-mm-dd'
            name='return'
            on='
                change:AMP.setState({display: {
                  fields_return: true,
                  fields_return_edited: true
                }})
              '
            disabled={true}
            data-amp-bind-disabled='!display.fields_departure'
          />
          <PlaneLandingSvg />
          <div className='travel-date-input-label'>Return</div>
        </label>
      </div>

      <a
        href='results'
        className='ampstart-btn travel-input-big rounded center bold white block col-12'
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
        Find Adventures & Tours
      </a>
      <a
        className='travel-hero-discover block center mx-auto mt1 md-hide lg-hide'
        on='tap:travel-landing-content.scrollTo'
      >
        Explore
        <ScrollDownSvg />
      </a>
    </div>
  );
}
