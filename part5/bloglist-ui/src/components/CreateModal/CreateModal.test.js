import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateModal from './CreateModal'

test('<CreateModal /> updates state and calls onSubmit', () => {
  const createBlogEntry = jest.fn(),
    setShowCreateModal = () => {},
    titleInput = '',
    authorInput = '',
    urlInput = ''

  const mockHandler = jest.fn()

  const component = render(
    <CreateModal
      createBlogEntry={createBlogEntry}
      titleInput={titleInput}
      authorInput={authorInput}
      urlInput={urlInput}
      cancelCreateEntry={() => setShowCreateModal(false)}
      setTitleInput={mockHandler}
      setAuthorInput={null}
      setUrlInput={null}
    />
  )

  const input = component.container.querySelector('.titleinput')
  const form = component.container.querySelector('.createmodal')

  fireEvent.change(input, {
    target: { value: 'testing the forms could be easier' },
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('testing the forms could be easier')
  expect(createBlogEntry.mock.calls).toHaveLength(1)
})
