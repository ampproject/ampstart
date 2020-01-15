import {AmpMustache, AmpList, AmpSelector} from '@ampproject/toolbox-next-amp';
import PriceRange from './PriceRange';
import CitySelector from './CitySelector';
import TravelInputRangeSvg from '../svg/TravelInputRangeSvg';
import ActiveSvg from '../svg/ActiveSvg';
import ArtisticSvg from '../svg/ArtisticSvg';
import DrinksSvg from '../svg/DrinksSvg';
import FashionSvg from '../svg/FashionSvg';
import FoodSvg from '../svg/FoodSvg';
import MusicSvg from '../svg/MusicSvg';
import NatureSvg from '../svg/NatureSvg';
import NightlifeSvg from '../svg/NightlifeSvg';
import ToursSvg from '../svg/ToursSvg';
import WaterSvg from '../svg/WaterSvg';
import AmpListProps from '../utils/AmpListProps';

export default function Filters(props) {
  return (
    <div
      className='travel-filters clearfix mxn2'
      data-amp-bind-class="'travel-filters clearfix mxn2' + (display.ui_reset ? ' travel-filters-reset' : '')"
    >
      <div className='col col-12 md-col-4 px2 py1'>
        <div className='travel-filters-text h5 mb1 caps'>max price</div>

        <PriceRange />

        <div className='travel-filters-text h3 line-height-3'>
          <AmpList
            className='travel-inline-list'
            layout='flex-item'
            src={AmpListProps(false).src}
            data-amp-bind-src={AmpListProps(false).srcBind}
          >
            <AmpMustache>
              Average Price for activites in {`{{stats.location}}`}
              is between ${`{{stats.price.average.min}}`} and ${`{{stats.price.average.max}}`}.
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
            select:AMP.setState({display: {
              ui_reset: false,
              fields_type: display.fields_type.includes(event.targetOption)
                ? copyAndSplice(display.fields_type, display.fields_type.indexOf(event.targetOption), 1)
                : display.fields_type.concat([event.targetOption]),
              fields_type_edited: true
            }})
          '
          data-amp-bind-selected='display.fields_type'
        >
          <ul className='list-reset'>
            {[
              {
                option: 'active',
                icon: <ActiveSvg />,
                title: 'Active',
                cls: 'col col-6 travel-type-active',
              },
              {
                option: 'artistic',
                icon: <ArtisticSvg />,
                title: 'Artistic',
                cls: 'col col-6 travel-type-artistic',
              },
              {
                option: 'drinks',
                icon: <DrinksSvg />,
                title: 'Drinks',
                cls: 'col col-6 travel-type-drinks',
              },
              {
                option: 'fashion',
                icon: <FashionSvg />,
                title: 'Fashion',
                cls: 'col col-6 travel-type-fashion',
              },
              {
                option: 'food',
                icon: <FoodSvg />,
                title: 'Food',
                cls: 'col col-6 travel-type-food',
              },
              {
                option: 'music',
                icon: <MusicSvg />,
                title: 'Music',
                cls: 'col col-6 travel-type-music',
              },
              {
                option: 'nature',
                icon: <NatureSvg />,
                title: 'Nature',
                cls: 'col col-6 travel-type-nature',
              },
              {
                option: 'nightlife',
                icon: <NightlifeSvg />,
                title: 'Nightlife',
                cls: 'col col-6 travel-type-nightlife',
              },
              {
                option: 'tours',
                icon: <ToursSvg />,
                title: 'Tours',
                cls: 'col col-6 travel-type-tours',
              },
              {
                option: 'water',
                icon: <WaterSvg />,
                title: 'Water',
                cls: 'col col-6 travel-type-water',
              },
            ].map(b => (
              <li key={b.option} option={b.option} className={b.cls}>
                <div className='travel-type-selector-inactive flex relative items-center justify-between nowrap'>
                  <span className='travel-type-selector-content nowrap'>
                    {b.icon}
                    {b.title}
                  </span>
                </div>
                <div className='travel-type-selector-active flex items-center justify-between nowrap absolute top-0 bottom-0 left-0 right-0'>
                  <span className='travel-type-selector-content nowrap'>
                    {b.icon}
                    {b.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </AmpSelector>
        {/* <!--/ Type Selector --> */}
      </div>
      <div className='col col-12 md-col-3 px2 py1'>
        <div className='travel-filters-text h5 mb2 caps'>city</div>
        <CitySelector />
      </div>
    </div>
  );
}
