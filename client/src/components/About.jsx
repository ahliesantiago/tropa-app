import Activities from "../components/Activities"

const About = () => {
  return (
    <>
    <div className="text-center">
      <h1 className="text-4xl lg:text-6xl xl:text-8xl font-semibold mt-6 xl:m-10">L4Tropa</h1>
      <h2 className="text-3xl lg:text-5xl xl:text-6xl font-light mt-2 xl:m-10">Tara, <Activities />?</h2>
      <div className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-light my-1 lg:my-3">
        <p className="lg:my-2 xl:my-5 md:inline-block md:mr-1">Busy? Shy? A little bit mean, or 'cuckoo'? No problem!</p>
        <p className="lg:my-2 xl:my-5 md:inline-block">Find new <span className="italic font-medium">friends</span> that fit.</p>
        <p className="lg:my-2 xl:my-5">Link up with like-minded people...</p>
      </div>
    </div>
    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light w-8/12 m-auto">
      <p>... who share your hobbies.</p>
      <p>... who want to hang out the same way you do.</p>
      <p>... who might just be your forever person(s).</p>
    </div>
    </>
  )
}

export default About