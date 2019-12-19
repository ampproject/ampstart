import TravelHeroSearch from '../components/TravelHeroSearch';
import {AmpImg} from '@ampproject/toolbox-next-amp';

export default function TravelHero(props) {
  return (
    <>
      <style jsx global>{`
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

        @keyframes b {
          0% {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes g {
          0% {
            opacity: 0;
            transform: translate3d(5vmax, 2vmax, 0) scale(1.1);
          }

          5% {
            opacity: 1;
          }

          33% {
            opacity: 1;
          }

          38% {
            opacity: 0;
            transform: translate3d(0, -2vmax, 0) scale(1);
          }
        }

        @keyframes h {
          0% {
            opacity: 0;
            transform: translate3d(-2vmax, 0, 0) scale(1);
          }

          5% {
            opacity: 1;
          }

          33% {
            opacity: 1;
          }

          38% {
            opacity: 0;
            transform: translate3d(2vmax, -2vmax, 0) scale(1.1);
          }
        }

        @keyframes i {
          0% {
            opacity: 0;
            transform: translate3d(0, 2vmax, 0) scale(1);
          }

          5% {
            opacity: 1;
          }

          33% {
            opacity: 1;
          }

          38% {
            opacity: 0;
            transform: translateY(-2vmax) scale(1.1);
          }
        }

        .travel-hero {
          height: 100vmax;
        }

        .travel-hero-bg {
          height: 70vmax;
          animation: b 0.8s ease-out both;
        }

        .travel-hero-bg:after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 95vmax;
          top: calc(70vmax - 300px);
          background-image: linear-gradient(180deg, transparent, #323a43 300px);
        }

        .travel-hero-bg-img {
          top: -5vmax;
          right: -5vmax;
          bottom: -5vmax;
          left: -5vmax;
          opacity: 0;
          background: #e3e5e8;
        }

        .travel-hero-bg-img img {
          -o-object-fit: cover;
          object-fit: cover;
        }

        .travel-hero-bg-img:nth-child(3) img {
          -o-object-position: 80% 100%;
          object-position: 80% 100%;
        }

        .travel-hero-bg-img:first-child {
          animation: 18s g linear infinite;
          background: url(/img/travel/hero-2-preview.jpg) no-repeat 50% 50%;
          background-size: cover;
        }

        .travel-hero-bg-img:nth-child(2) {
          animation: 18s h linear 6s infinite;
          background: url(/img/travel/hero-3-preview.jpg) no-repeat 50% 50%;
          background-size: cover;
        }

        .travel-hero-bg-img:nth-child(3) {
          animation: 18s i linear 12s infinite;
          background: url(/img/travel/hero-1-preview.jpg) no-repeat 50% 50%;
          background-size: cover;
        }

        .travel-hero-content {
          padding-top: 86px;
          height: calc(100vmax - 70px);
        }

        .travel-hero-heading {
          color: #fff;
          font-size: 3.75rem;
          font-weight: 700;
          letter-spacing: normal;
          animation: a 0.4s 0.2s ease-in-out both;
        }

        .travel-hero-subheading {
          color: #fff;
          font-size: 18px;
          letter-spacing: normal;
          animation: a 0.4s 0.25s ease-in-out both;
        }

        @media (min-width: 52.06rem) {
          .travel-hero {
            z-index: 1;
            height: auto;
          }

          .travel-hero-bg,
          .travel-hero-content {
            position: relative;
            height: auto;
          }

          .travel-hero-content {
            padding-top: calc(86px + 56px);
            padding-bottom: 3rem;
          }

          .travel-hero-heading {
            font-size: 4.6rem;
          }

          .travel-hero-subheading {
            font-size: 1.5rem;
          }

          .travel-hero .ampstart-btn {
            display: inline-block;
            width: auto;
          }
        }
      `}</style>

      <div className='travel-hero-bg absolute col-12'>
        <AmpImg
          className='travel-hero-bg-img absolute'
          src='/img/travel/hero-2.jpg'
          height='80vmax'
          noloading=''
        />
        <AmpImg
          className='travel-hero-bg-img absolute'
          src='/img/travel/hero-3.jpg'
          height='80vmax'
          noloading=''
        />
        <AmpImg
          className='travel-hero-bg-img absolute'
          src='/img/travel/hero-1.jpg'
          height='80vmax'
          noloading=''
        />
      </div>

      <section className='travel-hero relative'>
        <div className='travel-hero-content max-width-3 mx-auto absolute top-0 left-0 right-0 flex self-end items-center'>
          <div className='travel-hero-content-inner relative px1 md-px2 flex-auto self-end'>
            <header>
              <h1 className='travel-hero-heading mb2 line-height-1'>
                Adventures
                <br className='md-hide lg-hide' /> made&nbsp;easy
              </h1>
              <h2 className='travel-hero-subheading line-height-2 bold xs-hide sm-hide'>
                Find and book activities, tours, and experiences.
              </h2>
            </header>
            <TravelHeroSearch />
          </div>
        </div>
      </section>
    </>
  );
}
