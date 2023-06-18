import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { trpc } from '../utils/trpc';

const Header = () => {
  const { data } = trpc.useQuery(['pageInfo.getSocials']);
  return (
    <header className="overflow-hidden sticky top-0 max-w-7xl mx-auto z-20 xl:items-center flex items-start justify-between pr-3 md:pr-0">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex items-center"
      >
        {data &&
          data.socials.length > 0 &&
          data.socials.map((social) => (
            <SocialIcon
              key={social.id}
              url={social.url}
              fgColor="gray"
              bgColor="transparent"
              target="_blank"
            />
          ))}

        <a
          rel="noreferrer"
          target="_blank"
          className="text-gray-500 hover:text-gray-400"
          href="https://www.topcv.vn/xem-cv/V15VDgQEXlMHUA8IDgQPBwIABF1TVAMGXVwEBQf0f2"
        >
          My CV
        </a>
      </motion.div>

      <Link href="#contact">
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="cursor-pointer"
        >
          <SocialIcon
            className="cursor-pointer"
            network="email"
            fgColor="gray"
            bgColor="transparent"
          />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
};

export default Header;
