## Part 6

#### 6.3 - 6.8

Implemented functionality for voting and adding anecdotes. Sorted anecdotes by highest votes. Separated creation of action objects into reducers file. Anecdotes, AnecdoteList and AnecdoteForm are now separate components. All logic has been contained and kept simple and clear within individual components.

#### 6.9 - 6.12

Moved the store into it's own file. Extended application so that it renders the message stored in the redux store. Notification component displays a message for 5 seconds when the user votes for an anecdote or creates a new anecdote. Added filter by text, and made Filter a new component.

#### 6.13 - 6.14

Fetch backend data from json-server. Creation of new anecdotes saves on the backend.

#### 6.15 - 6.18

Modified initialization of store to happen with asynchronous action creators, using redux-thunk. Creation of new anecdote also happens with async action creator. Voting saves to backend. Making notifications now uses asynchronous action creator.
