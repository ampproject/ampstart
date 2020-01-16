import {AmpList, AmpMustache} from '@ampproject/toolbox-next-amp';
import SortPane from '../filter-bar/SortPane';
import CaretDownSmallSvg from '../svg/CaretDownSmallSvg';
import AmpListProps from '../utils/AmpListProps';

export default function FilterBar({data}) {
  return (
    <section className='travel-filter-bar sm-hide xs-hide relative z2'>
      <div className='flex mxn2 px1 md-px2'>
        <div
          className='travel-no-focus flex flex-auto overflow-hidden'
          role='button'
          tabIndex='0'
          on='tap:AMP.setState({display: {ui_filterPane: !ui_filterPane, ui_sortPane: false}})'
        >
          <div className='pl2 pr1 py2 nowrap border-bottom travel-border-gray flex-none'>
            <span className='bold'>Filters</span>
            <span
              className='travel-flip travel-filters-text inline-block'
              data-amp-bind-class="'travel-flip travel-filters-text inline-block' + (display.ui_filterPane ? ' travel-flip-flipped' : '')"
            >
              <CaretDownSmallSvg />
            </span>
          </div>

          <div className='pl1 py2 nowrap border-bottom travel-border-gray flex-none'>
            <span className='travel-filters-text'>Price</span>
          </div>

          <div className='pr1 py2 nowrap border-bottom travel-border-gray'>
            <span
              className='travel-badge'
              data-amp-bind-class="display.query_maxPrice < 801 ? 'travel-badge green' : 'travel-badge'"
              data-amp-bind-text="display.query_maxPrice < 801 ? 'Up to $ ' + round(display.query_maxPrice) : 'Any price'"
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
                data-amp-bind-class={`'travel-badge' + (display.query_type.length > 0 && display.query_type.length < ${
                  data.types.length
                } ? ' hide' : '')`}
              >
                All types
              </span>

              {data.types.map(t => (
                <span
                  key={t.value}
                  className='travel-badge green hide'
                  data-amp-bind-class={`'travel-badge green' + (display.query_type.includes('${
                    t.value
                  }') ? '' : ' hide')`}
                >
                  {t.text}
                </span>
              ))}
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
                src={AmpListProps(false).src}
                data-amp-bind-src={AmpListProps(false).srcBind}
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
              src={AmpListProps(false).src}
              data-amp-bind-src={AmpListProps(false).srcBind}
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
            on='tap:AMP.setState({display: {ui_filterPane: false, ui_reset: false, ui_sortPane: !ui_sortPane}})'
          >
            <span className='travel-filters-text'>Sort by </span>
            <div className='inline-block'>
              {/*
                 Render an invisible set of labels to force the element to always be
                 the width of the widest label.
              */}
              {data.sort.map(s => (
                <div aria-hidden='' className='travel-filter-bar-collapse bold'>
                  {s.text}
                </div>
              ))}

              <span className='bold'>
                {data.sort.map(s => (
                  <span
                    key={s.value}
                    className={s.selected ? '' : 'hide'}
                    data-amp-bind-class={`display.fields_sort == '${s.value}' ? '' : 'hide'`}
                  >
                    {s.text}
                  </span>
                ))}
              </span>
            </div>
            <span
              className='travel-flip travel-filters-text inline-block'
              data-amp-bind-class="'travel-flip travel-filters-text inline-block ' + (display.ui_sortPane ? ' travel-flip-flipped' : '')"
            >
              <CaretDownSmallSvg />
            </span>
          </div>
          <SortPane />
        </div>
      </div>
    </section>
  );
}
