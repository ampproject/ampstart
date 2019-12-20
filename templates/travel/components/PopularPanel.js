import LikeButton from '../components/LikeButton';
import ActivityInfo from './ActivityInfo';
import {AmpImg} from '@ampproject/toolbox-next-amp';

export default function PopularPanel(props) {
  return (
    <section className='travel-popular pb4 pt3 relative'>
      <header className='max-width-3 mx-auto px1 md-px2'>
        <h3 className='h1 bold line-height-2 md-hide lg-hide' aria-hidden='true'>
          Top Adventures <br /> Near You
        </h3>
        <h3 className='h1 bold line-height-2 xs-hide sm-hide center'>Top Adventures Near You</h3>
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
  );
}
