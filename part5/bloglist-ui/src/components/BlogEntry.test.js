import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogEntry from './BlogEntry'

test('renders content', () => {
  const entry = {
    title: 'Component testing is done with react-testing-library',
    author: 'Astrid',
    createdOn: '2020-20-20T0909',
    url: 'httpdwalkdwlakl',
    user: {
      name: 'test user',
      id: 'test id',
      username: 'testperson',
    },
    id: '2198198109821098',
  }

  const currentUser = {
    name: 'harold',
    id: '1980918091',
    username: 'harolduser',
  }

  const sendDeleteEntry = () => {}
  const sendNewLike = () => {}

  const component = render(
    <BlogEntry
      key={entry.id}
      title={entry.title}
      author={entry.author}
      user={entry.user}
      likes={entry.likes}
      createdOn={entry.createdOn}
      url={entry.url}
      currentUser={currentUser}
      sendDeleteEntry={() => sendDeleteEntry(entry.id)}
      sendNewLike={() => sendNewLike(entry)}
    />
  )
  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )

  expect(element).toBeDefined()

  const div = component.container.querySelector('.blogentry')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the like button twice calls the like event handler twice', () => {
  const entry = {
    title: 'Component testing is done with react-testing-library',
    author: 'Astrid',
    createdOn: '2020-20-20T0909',
    url: 'httpdwalkdwlakl',
    user: {
      name: 'test user',
      id: 'test id',
      username: 'testperson',
    },
    id: '2198198109821098',
  }

  const currentUser = {
    name: 'harold',
    id: '1980918091',
    username: 'harolduser',
  }

  const sendDeleteEntry = () => {}

  const mockHandler = jest.fn()

  const component = render(
    <BlogEntry
      key={entry.id}
      title={entry.title}
      author={entry.author}
      user={entry.user}
      likes={entry.likes}
      createdOn={entry.createdOn}
      url={entry.url}
      currentUser={currentUser}
      sendDeleteEntry={() => sendDeleteEntry(entry.id)}
      sendNewLike={mockHandler}
    />
  )
  const button = component.getByText('like.svg')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('the delete button is not visible by default', () => {
  const entry = {
    title: 'Component testing is done with react-testing-library',
    author: 'Astrid',
    createdOn: '2020-20-20T0909',
    url: 'httpdwalkdwlakl',
    user: {
      name: 'test user',
      id: 'test id',
      username: 'testperson',
    },
    id: '2198198109821098',
  }

  const currentUser = {
    name: 'harold',
    id: '1980918091',
    username: 'harolduser',
  }

  const sendDeleteEntry = () => {}

  const mockHandler = jest.fn()

  const component = render(
    <BlogEntry
      key={entry.id}
      title={entry.title}
      author={entry.author}
      user={entry.user}
      likes={entry.likes}
      createdOn={entry.createdOn}
      url={entry.url}
      currentUser={currentUser}
      sendDeleteEntry={() => sendDeleteEntry(entry.id)}
      sendNewLike={mockHandler}
    />
  )

  const deleteBtn = component.container.querySelector('.delete-btn')

  expect(deleteBtn).toBe(null)
})

test('renders delete button when it is entry belongs to user', () => {
  const entry = {
    title: 'Component testing is done with react-testing-library',
    author: 'Astrid',
    createdOn: '2020-20-20T0909',
    url: 'httpdwalkdwlakl',
    user: {
      name: 'test user',
      id: 'testuserid',
      username: 'testperson',
    },
    id: '2198198109821098',
  }

  const currentUser = {
    name: 'harold',
    id: 'testuserid',
    username: 'harolduser',
  }

  const sendDeleteEntry = jest.fn()
  const sendNewLike = () => {}

  const component = render(
    <BlogEntry
      key={entry.id}
      title={entry.title}
      author={entry.author}
      user={entry.user}
      likes={entry.likes}
      createdOn={entry.createdOn}
      url={entry.url}
      currentUser={currentUser}
      sendDeleteEntry={() => sendDeleteEntry(entry.id)}
      sendNewLike={() => sendNewLike(entry)}
    />
  )
  const showDeleteBtn = component.container.querySelector('.showdelete-btn')
  fireEvent.click(showDeleteBtn)

  const deleteBtn = component.container.querySelector('.delete-btn')
  expect(deleteBtn).toBeDefined()

  fireEvent.click(deleteBtn)
  expect(sendDeleteEntry.mock.calls).toHaveLength(1)
  expect(sendDeleteEntry.mock.calls[0][0]).toBe('2198198109821098')
})
