import React from 'react';
import SectionHeader from './shared/SectionHeader';
import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import { LinkIcon } from '@heroicons/react/24/solid';

const Projects = () => {
  const { data } = trpc.useQuery(['project.getAllProjects']);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row 
    max-w-full justify-evenly mx-auto items-center z-0"
    >
      <SectionHeader text="Projects" />

      <div
        className="relative w-full flex overflow-x-scroll overflow-y-hidden
       snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-yellowColor/80"
      >
        {data &&
          data.map((project, i) => (
            <div
              key={project.id}
              className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
            >
              <motion.img
                initial={{
                  y: -300,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.2,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
                src={project.image}
                alt=""
                className="max-h-[400px]"
              />
              <div className=" px-0 md:px-10 max-w-6xl">
                <div className="text-xl font-semibold text-center mt-2 mb-5">
                  <span className="underline decoration-yellowColor/50">
                    Project {i + 1} of {data.length}:
                  </span>{' '}
                  {project.title}
                </div>

                <p className="text-md md:text-lg text-center md:text-left">
                  {project.description}
                </p>

                <div className="flex flex-wrap my-5 gap-4 justify-center">
                  {project.technologies.map((skill) => (
                    <div key={skill.id} className="flex gap-2 items-center">
                      <img
                        src={skill.image}
                        alt=""
                        className="w-8 object-fit"
                      />
                      <p className="text-md font-semibold text-white">
                        {skill.title}
                      </p>
                    </div>
                  ))}
                </div>

                <Link href={project.gitLink} target="_blank">
                  <div className="flex gap-2 my-2 cursor-pointer">
                    <SocialIcon
                      style={{ height: '1.5rem', width: '1.5rem' }}
                      fgColor="gray"
                      url={project.gitLink}
                    />
                    <p className="text-gray-500">{project.gitLink}</p>
                  </div>
                </Link>
                <Link href={project.appLink} target="_blank">
                  <div className="flex gap-2 my-2 cursor-pointer">
                    <LinkIcon className="w-6 h-6 text-green-400" />
                    <p className="text-green-300">{project.appLink}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full absolute top-[30%] bg-yellowColor/10 left-0 h-[500px] -skew-y-12 "></div>
    </motion.div>
  );
};

export default Projects;
