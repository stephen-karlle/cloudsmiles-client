import Logo from '/logo.svg'

const Footer = () => {
  return (
    <footer className="w-screen ">

      <article className="w-full border border-y-gray-200 flex items-center justify-center">
        <section className="max-w-[1920px] flex items-start justify-between px-4 xl:px-40 pb-8 pt-16 gap-20 w-[80%]">
          <div className="flex-1">
            <div className="flex items-center justify-start gap-2">
              <figure className="w-8 h-8 rounded-md">
                <img src={Logo} alt="VS Dental Logo" className="w-full h-full" />
              </figure>
              <h1 className="text-2xl font-medium text-lime-500 break-keep tracking-wide">VS
                <span className="text-green-950 tracking-wide">Dental</span>
              </h1>
            </div>
            <p className="mt-4 mb-6 text-base text-gray-500 text-center lg:text-start max-w-[50ch]">Discover exceptional dental care with our wide range of top-quality services, delivered by our experienced team of qualified dentists.</p>
            {/* <div className="text-rose-500">
              Social medias here
            </div> */}
          </div>
          {/* Clinic */}
          <div className="w-fit">
            <ul className="flex flex-col items-start justify-center">
              <h1 className="mb-4 text-xl text-gray-700 font-medium">Clinic</h1>
              <p className="text-base text-gray-700 mb-2">Home</p>
              <p className="text-base text-gray-700 mb-2">Services</p>
              <p className="text-base text-gray-700 mb-2">Dentists</p>
              <p className="text-base text-gray-700 mb-2">Reviews</p>
            </ul>
          </div>
          {/* Contact Us */}
          <div className="w-fit">
            <ul className="flex flex-col items-start justify-center">
              <h1 className="mb-4 text-xl text-gray-700 font-medium">Contact Us</h1>
              <p className="text-base text-gray-700 mb-2">(+63) 917 149 2766</p>
              <p className="text-base text-gray-700 mb-2">mysmile@vsdentalclinic.com</p>
            </ul>
          </div>

        </section>
      </article>
      <article className="w-full flex items-center justify-center">
        <section className="max-w-[1920px] flex items-start px-4 xl:px-40 w-[80%] py-6">
          <p className="text-gray-500 text-base">© 2024 <span className="text-gray-700 font-medium">VS Dental.</span> All rights reserved.</p>
        </section>
      </article>
    </footer>
  )
}

export default Footer
