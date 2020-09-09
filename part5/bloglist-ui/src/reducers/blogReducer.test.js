import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blog reducer', () => {
  test('returns new state with action NEW_ENTRY', () => {
    const state = { currentUser: 'John', entries: [] }
    const action = {
      type: 'NEW_ENTRY',
      data: {
        title: 'My blog entry',
        author: 'Not me',
        url: 'My url',
        user: {},
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState.entries).toHaveLength(1)
    expect(newState.entries).toContainEqual(action.data)
    expect(newState.currentUser).toBe('John')
  })

  test('returns new state with action NEW_LIKE', () => {
    const state = {
      currentUser: 'John',
      entries: [
        {
          title: 'My blog entry',
          author: 'Not me',
          url: 'My url',
          user: {},
          id: 1,
          likes: [913902312],
        },
        {
          title: 'Cool beans',
          author: 'Davide',
          url: 'catcatcat',
          user: {},
          id: 98,
          likes: [12332121],
        },
      ],
    }
    const action = {
      type: 'NEW_LIKE',
      data: {
        title: 'My blog entry',
        author: 'Not me',
        url: 'My url',
        user: {},
        id: 1,
        likes: [21932190, 913902312],
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState.entries).toHaveLength(2)
    expect(newState.entries.find(entry => entry.id === 1)).toEqual(action.data)
    expect(newState.currentUser).toBe('John')
  })
})
