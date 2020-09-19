import React from 'react'
import { ReactComponent as Logo } from '../assets/img/notepal-text.svg'
import { ReactComponent as Icon } from '../assets/img/git.svg'
import IconButton from '../components/Buttons/IconBtn'

const Home = () => (
  <main className='max-w-screen-md w-full'>
    <article className='my-8 p-8 border border-gray-300 rounded'>
      <div className='flex items-center'>
        <Logo className='h-12' />
      </div>
      <h2 className='font-medium text-gray-500'>
        Write notes, share your ideas, and get feedback from others.
      </h2>
      <p className='my-8 leading-relaxed'>
        This is a full-stack application build on React, Redux & React Router
        for the front end. For the backend, it is using Node.js, Express and
        MongoDB. This is part of a course by the University of Helsinki called{' '}
        <a
          className='font-semibold text-blue-800 hover:underline'
          href='https://fullstackopen.com/'
          target='_blank'
          rel='noopener noreferrer'>
          Full Stack Open.
        </a>
      </p>
      <h3 className='text-2xl font-semibold -mb-4'>React</h3>
      <p>
        <a
          href='https://reactjs.org/'
          target='_blank'
          rel='noopener noreferrer'>
          <span>React </span>
        </a>
        is a JavaScript library for building user interfaces. React makes it
        painless to create interactive UIs. Design simple views for each state
        in an application, and React will efficiently update and render just the
        right components when the data changes. Declarative views make code more
        predictable and easier to debug.
      </p>
      <p>
        React is component-based. Build encapsulated components that manage
        their own state, then compose them to make complex UIs. Since component
        logic is written in JavaScript instead of templates, it is easy to pass
        rich data through the app and keep state out of the DOM. Learn Once,
        Write Anywhere. React does not make assumptions about the rest of the
        technology stack, so it be used without rewriting existing code. React
        can also render on the server using Node and power mobile apps using
        React Native.
      </p>
      <a
        className='flex items-center mt-4 font-semibold text-blue-800 hover:underline'
        href='https://github.com/astridlyre'
        target='_blank'
        rel='noopener noreferrer'>
        <IconButton look='light'>
          <Icon />
        </IconButton>
        <span className='ml-2 inline-block'>
          View this code and more on GitHub
        </span>
      </a>
    </article>
  </main>
)

export default Home
