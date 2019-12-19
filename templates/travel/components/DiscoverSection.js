export default function DiscoverSection(props) {
  return (
    <section className='travel-discover py4 mb3 relative xs-hide sm-hide'>
      <div className='max-width-3 mx-auto px1 md-px2'>
        <div className='flex justify-between items-center'>
          <header>
            <h2 className='travel-discover-heading bold line-height-2 xs-hide sm-hide'>
              Discover <br className='md-hide lg-hide' /> Adventures
            </h2>
            <div className='travel-discover-subheading h2 xs-hide sm-hide'>
              Get inspired and find your next big trip
            </div>
          </header>

          <div className='travel-discover-panel travel-shadow-hover px3 py2 ml1 mr3 myn3 xs-hide sm-hide'>
            <div className='bold h2 line-height-2 my1'>From the blog</div>
            <p className='travel-discover-panel-subheading h3 my1 line-height-2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit amet dolor set.
            </p>
            <p className='my1'>
              <a className='travel-link' href='#'>
                Read more
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
