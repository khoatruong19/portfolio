import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import About from '../components/About';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import Avatar from "../../public/avatar.jpg"
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white h-screen overflow-x-hidden snap-y snap-mandatory 
    z-0 overflow-y-scroll scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-yellowColor/80"
    >
      <Head>
        <title>Khoa&apos;s Portfolio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section id="hero" className="snap-start">
        <Hero />
      </section>

      <section id="about" className="snap-center">
        <About />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience />
      </section>

      <section id="skills" className="snap-start">
        <Skills />
      </section>

      <section id="projects" className="snap-start">
        <Projects />
      </section>

      <section id="contact" className="snap-start">
        <Contact />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <div className='relative h-10 w-10 '>

            <Image
              className="absolute rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              src={Avatar}
              alt=""
            />
            </div>
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;
