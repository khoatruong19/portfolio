import React, { useRef, useState } from 'react';
import SectionHeader from './shared/SectionHeader';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { trpc } from '../utils/trpc';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = trpc.useQuery(['pageInfo.getContactInfo']);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !email || !subject || !message) {
      alert('Please fill all the fields!');
      return;
    }
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID!
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setUserName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };
  return (
    <div className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <SectionHeader text="Contact" />

      <div className="flex flex-col space-y-10">
        <h4 className="text-4xl font-semibold text-center">
          I have got just what you need.{' '}
          <span className="underline decoration-yellowColor/50">
            Let's talk.
          </span>
        </h4>

        <div className="space-y-10">
          <div className="flex items-center justify-center space-x-5">
            <PhoneIcon className="text-yellowColor h-7 w-7 animate-pulse" />
            <p className=" tracking-wider">{data?.phoneNumber}</p>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <EnvelopeIcon className="text-yellowColor h-7 w-7 animate-pulse" />
            <p>{data?.email}</p>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <MapPinIcon className="text-yellowColor h-7 w-7 animate-pulse" />
            <p>{data?.address}</p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="flex flex-col space-y-2 w-fit mx-auto"
        >
          <div className="flex space-x-2">
            <input
              placeholder="Name"
              className="fieldInput"
              type="text"
              name="user_name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              name="user_email"
              placeholder="Email"
              className="fieldInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            name="subject"
            placeholder="Subject"
            className="fieldInput"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            name="message"
            placeholder="Message"
            className="fieldInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
