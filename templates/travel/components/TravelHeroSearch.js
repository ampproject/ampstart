import {AmpMustache, AmpList} from '@ampproject/toolbox-next-amp/dist/src-gen';

export default function TravelHeroSearch(props) {
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
              change:AMP.setState({
                fields_query: event.value,
                fields_query_live: event.value,
                fields_query_edited: query_query != event.value
              });
              input-debounced:AMP.setState({
                fields_query_live: event.value
              });
            '
          defaultValue=''
          data-amp-bind-value='fields_query'
        />
        <svg className='travel-icon' viewBox='0 0 74 100'>
          <path
            fill='currentColor'
            d='M40.18 95.404A3.944 3.944 0 0 1 37 97a3.944 3.944 0 0 1-3.18-1.596C28.268 87.787 5 54.66 5 34.334 5 17.027 19.327 3 37 3c17.673 0 32 14.028 32 31.333 0 20.327-23.267 53.454-28.82 61.07zM37 14.75c-11.046 0-20 8.768-20 19.583 0 10.816 8.954 19.584 20 19.584s20-8.768 20-19.584c0-5.193-2.107-10.174-5.858-13.847-3.75-3.672-8.838-5.736-14.142-5.736z'
          />
        </svg>
      </label>

      <AmpList
        layout='flex-item'
        src='/api/places?types=(regions)&types=(cities)&input='
        data-amp-bind-src="'/api/places?types=(regions)&types=(cities)&input=' + fields_query_live"
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
          data-amp-bind-class="'travel-date-input relative bold flex-auto' + (fields_departure ? ' travel-date-input-touched' : '')"
        >
          <input
            className='block relative p0 z1'
            type='date'
            placeholder='yyyy-mm-dd'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            title='yyyy-mm-dd'
            name='departure'
            on='
                change:AMP.setState({
                  fields_departure: true,
                  fields_departure_edited: true
                })
              '
          />
          <svg className='travel-icon' viewBox='0 0 100 100'>
            <path
              fill='currentColor'
              d='M7.93 79.476h84.32v8.876H7.93v-8.876zm86.848-41.538c-.932-3.55-4.615-5.68-8.165-4.704l-23.566 6.302L32.427 11l-8.566 2.263 18.374 31.82-22.056 5.902-8.743-6.834L5 45.883l8.077 14.023 3.417 5.903 7.1-1.91 23.566-6.3 19.305-5.148 23.565-6.302c3.594-1.02 5.68-4.66 4.748-8.21z'
            />
          </svg>
          <div className='travel-date-input-label'>Departure</div>
        </label>
        <label
          className='travel-date-input relative bold flex-auto'
          data-amp-bind-class="'travel-date-input relative bold flex-auto' + (fields_return ? ' travel-date-input-touched' : '')"
        >
          <input
            className='block relative p0 z1'
            type='date'
            placeholder='yyyy-mm-dd'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            title='yyyy-mm-dd'
            name='return'
            on='
                change:AMP.setState({
                  fields_return: true,
                  fields_return_edited: true
                })
              '
            disabled={true}
            data-amp-bind-disabled='!fields_departure'
          />
          <svg className='travel-icon' viewBox='0 0 100 100'>
            <path
              fill='currentColor'
              d='M7.929 79.476h84.32v8.876H7.929v-8.876zm81.693-15.409c1.03-3.523-1.03-7.246-4.576-8.238L61.6 49.094 50.051 8.863l-8.508-2.471-.64 36.737-21.946-6.3-3.974-10.361-6.407-1.831-.3 16.18-.11 6.82 7.069 2.021 23.445 6.735 19.199 5.53 23.445 6.736c3.607.976 7.269-1.069 8.298-4.592z'
            />
          </svg>
          <div className='travel-date-input-label'>Return</div>
        </label>
      </div>

      <a
        href='results?amp=1'
        className='ampstart-btn travel-input-big rounded center bold white block col-12'
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
        Find Adventures & Tours
      </a>
      <a
        className='travel-hero-discover block center mx-auto mt1 md-hide lg-hide'
        on='tap:travel-landing-content.scrollTo'
      >
        Explore
        <svg className='travel-icon' viewBox='0 0 66 100'>
          <path
            fill='currentColor'
            d='M33.5 56.172l-18.96-18.1c-1.497-1.43-3.922-1.43-5.418 0a3.539 3.539 0 0 0 0 5.17l21.67 20.687a3.914 3.914 0 0 0 2.708 1.07c.98 0 1.96-.357 2.71-1.07l21.668-20.687a3.541 3.541 0 0 0 0-5.172c-1.496-1.427-3.92-1.427-5.417 0L33.5 56.173z'
          />
        </svg>
      </a>
    </div>
  );
}
