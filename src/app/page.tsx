const Page = () => (
  <main className="px-6">
    <section className="mx-auto flex h-screen flex-col justify-center sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
      <p className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-center text-[13vw] font-extrabold leading-none tracking-tight text-transparent sm:text-7xl md:text-8xl lg:text-9xl">
        Student.
      </p>
      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-center text-[13vw] font-extrabold leading-none tracking-tight text-transparent sm:text-left sm:text-7xl md:text-8xl lg:text-9xl">
        Developer.
      </span>
      <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-center text-[13vw] font-extrabold leading-none tracking-tight text-transparent sm:text-right sm:text-7xl md:text-8xl lg:text-9xl">
        Entrepreneur.
      </span>
    </section>

    <section className="mx-auto my-24 flex max-w-2xl flex-col gap-8 sm:my-40 lg:my-56">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
        About
      </h2>
    </section>
  </main>
)

export default Page
