import ActivityButton from './ActivityButton';
import ActiveSvg from './svg/ActiveSvg';
import ArtisticSvg from './svg/ArtisticSvg';
import DrinksSvg from './svg/DrinksSvg';
import FashionSvg from './svg/FashionSvg';
import FoodSvg from './svg/FoodSvg';
import MusicSvg from './svg/MusicSvg';
import NatureSvg from './svg/NatureSvg';
import NightlifeSvg from './svg/NightlifeSvg';
import ToursSvg from './svg/ToursSvg';
import WaterSvg from './svg/WaterSvg';

export default function ActivitiesPanel(props) {
  return (
    <section className='travel-activities pb4 pt3 relative'>
      <div className='max-width-3 mx-auto px1 md-px2'>
        <h3 className='bold h1 line-height-2 mb2 md-hide lg-hide' aria-hidden='true'>
          Browse
          <br />
          by activity
        </h3>
        <h3 className='bold h1 line-height-2 mb2 xs-hide sm-hide center'>Browse by activity</h3>
      </div>
      <div className='overflow-scroll'>
        <div className='travel-overflow-container'>
          <div className='flex justify-center p1 md-px1 mxn1'>
            <ActivityButton name='active' title='Active'>
              <ActiveSvg />
            </ActivityButton>
            <ActivityButton name='artistic' title='Artistic'>
              <ArtisticSvg />
            </ActivityButton>
            <ActivityButton name='drinks' title='Drinks'>
              <DrinksSvg />
            </ActivityButton>
            <ActivityButton name='fashion' title='Fashion'>
              <FashionSvg />
            </ActivityButton>
            <ActivityButton name='food' title='Food'>
              <FoodSvg />
            </ActivityButton>
            <ActivityButton name='music' title='Music'>
              <MusicSvg />
            </ActivityButton>
            <ActivityButton name='nature' title='Nature'>
              <NatureSvg />
            </ActivityButton>
            <ActivityButton name='nightlife' title='Nightlife'>
              <NightlifeSvg />
            </ActivityButton>
            <ActivityButton name='tours' title='Tours'>
              <ToursSvg />
            </ActivityButton>
            <ActivityButton name='water' title='Water'>
              <WaterSvg />
            </ActivityButton>
          </div>
        </div>
      </div>
    </section>
  );
}
