import Link from 'next/link';

function Showcase() {
  return (
    <div className='container'>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
        <div className='flex flex-col items-center justify-center text-center sm:items-start sm:text-left'>
          <h1 className='text-4xl font-bold xl:text-6xl'>
            <span className='text-blue-700'>fin</span>labs
          </h1>
          <p className='my-4 text-lg xl:text-3xl md:w-3/4'>
            find collabs, share projects and <br /> manage task boards among
            peers.
          </p>
          <div className='flex items-center space-x-4'>
            <Link href='/login'>
              <a className='text-xl font-bold btn btn-outline w-max'>
                get started
              </a>
            </Link>
            <Link href='/projects'>
              <a className='text-xl font-bold btn w-max'>browse projects</a>
            </Link>
          </div>
        </div>
        <div className="relative flex items-center before:absolute before:content-[''] before:w-full before:h-full before:left-full before:bg-blue-700 p-5 py-7 bg-blue-700 ">
          <img
            className='object-contain h-full'
            src='/showcase_hero.svg'
            alt='hero_image'
          />
        </div>
      </div>
    </div>
  );
}

export default Showcase;
