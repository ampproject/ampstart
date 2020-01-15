import {AmpImg} from '@ampproject/toolbox-next-amp';

export default function DiscoverMobile(props) {
  return (
    <section className='travel-discover-mobile max-width-3 mx-auto py3 px1 md-hide lg-hide'>
      <header>
        <h2 className='h1 bold line-height-2'>Discover Adventures</h2>
        <div className='travel-discover-subheading h3'>
          Get inspired and find your next big trip
        </div>
      </header>
      <div className='flex md-mx2 my3 py2 items-center travel-discover-panel travel-shadow-hover'>
        <AmpImg
          className='rounded relative flex-none mx1'
          width='100'
          height='100'
          src='/img/travel/blogpost-thumbnail.jpg'
        />
        <div className='flex-auto'>
          <div className='h3 bold line-height-2 mb1'>From the blog</div>
          <p className='travel-discover-panel-subheading my1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit amet dolor set.{' '}
            <a className='travel-link' href='#'>
              Read more
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
