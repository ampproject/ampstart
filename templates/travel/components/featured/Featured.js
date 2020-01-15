import {AmpImg} from '@ampproject/toolbox-next-amp';

export default function Featured(props) {
  return (
    <section className='travel-featured pt3 relative clearfix'>
      <header className='max-width-2 mx-auto px1 md-px2 relative'>
        <h3 className='travel-featured-heading h1 bold line-height-2 mb2 center'>
          Featured Destinations
        </h3>
      </header>
      <div className='max-width-3 mx-auto relative'>
        <div className='travel-featured-grid flex flex-wrap items-stretch'>
          <div className='col-12 md-col-6 flex items-stretch flex-auto'>
            <a
              href='results'
              className='travel-featured-tile flex flex-auto relative travel-featured-color-blue'
              on="tap:AMP.setState({display: {fields_query: 'New York', query_query: 'New York'}})"
            >
              <AmpImg
                className='travel-object-cover flex-auto'
                layout='responsive'
                width='336'
                height='507'
                src='/img/travel/city/new-york.jpg'
              />
              <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                <div className='travel-featured-tile-heading caps bold line-height-2 h3'>
                  New York
                </div>
                <div className='h5'>379 adventures</div>
              </div>
            </a>
            <div className='flex flex-column items-stretch flex-auto'>
              <a
                href='results'
                className='travel-featured-tile flex flex-auto relative travel-featured-color-cyan'
                on="tap:AMP.setState({display: {fields_query: 'Barcelona', query_query: 'Barcelona'}})"
              >
                <AmpImg
                  className='travel-object-cover flex-auto'
                  layout='responsive'
                  width='264'
                  height='246'
                  src='/img/travel/city/barcelona.jpg'
                />
                <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                  <div className='travel-featured-tile-heading bold caps line-height-2 h3'>
                    Barcelona
                  </div>
                  <div className='h5'>68 adventures</div>
                </div>
              </a>
              <a
                href='results'
                className='travel-featured-tile flex flex-auto pointer relative travel-featured-color-orange'
                on="tap:AMP.setState({display: {fields_query: 'Paris', query_query: 'Paris'}})"
              >
                <AmpImg
                  className='travel-object-cover flex-auto'
                  layout='responsive'
                  width='264'
                  height='264'
                  src='/img/travel/city/paris.jpg'
                />
                <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                  <div className='travel-featured-tile-heading bold caps line-height-2 h3'>
                    Paris
                  </div>
                  <div className='h5'>221 adventures</div>
                </div>
              </a>
            </div>
          </div>
          <div className='col-12 md-col-6 flex items-stretch flex-auto'>
            <div className='flex flex-column items-stretch flex-auto'>
              <a
                href='results'
                className='travel-featured-tile flex flex-auto pointer relative travel-featured-color-purple'
                on="tap:AMP.setState({display: {fields_query: 'Tokyo', query_query: 'Tokyo'}})"
              >
                <AmpImg
                  className='travel-object-cover flex-auto'
                  layout='responsive'
                  width='276'
                  height='207'
                  src='/img/travel/city/tokyo.jpg'
                />
                <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                  <div className='travel-featured-tile-heading caps bold line-height-2 h3'>
                    Tokyo
                  </div>
                  <div className='h5'>500+ adventures</div>
                </div>
              </a>
              <a
                href='results'
                className='travel-featured-tile flex flex-auto relative travel-featured-color-cornflower'
                on="tap:AMP.setState({display: {fields_query: 'Chicago', query_query: 'Chicago'}})"
              >
                <AmpImg
                  className='travel-object-cover flex-auto'
                  layout='responsive'
                  width='264'
                  height='286'
                  src='/img/travel/city/chicago.jpg'
                />
                <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                  <div className='travel-featured-tile-heading caps bold line-height-2 h3'>
                    Chicago
                  </div>
                  <div className='h5'>143 adventures</div>
                </div>
              </a>
            </div>
            <a
              href='results'
              className='travel-featured-tile flex flex-auto relative travel-featured-color-teal'
              on="tap:AMP.setState({display: {fields_query: 'Reykjavik', query_query: 'Reykjavik'}})"
            >
              <AmpImg
                className='travel-object-cover flex-auto'
                layout='responsive'
                width='312'
                height='507'
                src='/img/travel/city/reykjavik.jpg'
              />
              <div className='travel-featured-overlay absolute z1 center top-0 right-0 bottom-0 left-0 white p2'>
                <div className='travel-featured-tile-heading caps bold h3'>Reykjavik</div>
                <div className='h5'>87 adventures</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
