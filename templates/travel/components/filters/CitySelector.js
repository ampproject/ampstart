import {AmpList, AmpMustache, AmpSelector, AmpImg} from '@ampproject/toolbox-next-amp';
import AmpListProps from '../utils/AmpListProps';

export default function CitySelector(props) {
  return (
    <AmpList
      className='travel-block-list travel-city-selector'
      layout='flex-item'
      src={AmpListProps(false).src}
      data-amp-bind-src={AmpListProps(false).srcBind}
    >
      <AmpMustache>
        <AmpSelector
          layout='container'
          name='city'
          multiple=''
          on='select: AMP.setState({display: {
                ui_reset: false,
                fields_city: display.fields_city.includes(event.targetOption)
                    ? copyAndSplice(display.fields_city, display.fields_city.indexOf(event.targetOption), 1)
                    : display.fields_city.concat([event.targetOption]),
                fields_city_edited: true
            }})'
          data-amp-bind-selected='display.fields_city'
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
  );
}
