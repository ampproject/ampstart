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

export default function Activities(props) {
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
            {[
              {name: 'active', title: 'Active', icon: <ActiveSvg />},
              {name: 'artistic', title: 'Artistic', icon: <ArtisticSvg />},
              {name: 'drinks', title: 'Drinks', icon: <DrinksSvg />},
              {name: 'fashion', title: 'Fashion', icon: <FashionSvg />},
              {name: 'food', title: 'Food', icon: <FoodSvg />},
              {name: 'music', title: 'Music', icon: <MusicSvg />},
              {name: 'nature', title: 'Nature', icon: <NatureSvg />},
              {name: 'nightlife', title: 'Nightlife', icon: <NightlifeSvg />},
              {name: 'tours', title: 'Tours', icon: <ToursSvg />},
              {name: 'water', title: 'Water', icon: <WaterSvg />},
            ].map(item => (
              <a
                key={item.name}
                href='results'
                className={`travel-activities-activity travel-type-${item.name} mx1`}
                on='
                  tap:AMP.setState({display: {
                    ui_viewIndex: 1,
                    fields_type: [item.name],
                    query_type: [item.name]
                  }})
                '
              >
                <div className='travel-shadow circle inline-block'>
                  <div className='travel-activities-activity-icon'>{item.icon}</div>
                </div>
                <p className='bold center line-height-4'>{item.title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
