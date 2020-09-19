## notepal app

#### Preamble

This is inspired by the notes app lessons, in addition to the anecdotes app exercises. I decided to build a new backend and frontend for extra practice, so I decided to use this Notes app for the exercises instead of using the anecdotes app I had already built.

### Exercises 7.1 - 7.3

I added React Router to the application, so that by clicking links, the views can be changed. The footer component is always visible at the bottom. Instead of a create path, I made a modal which shows up, and with useRef I put focus on the right places for a11y funcionalitiy. This way the creation of a new note is more intuitive.

### Exercises 7.4 - 7.5

Added a useField custom hook to the NoteCreateModal and to the Login form. The cancel button clears the fields and closes the modal. Instead of naming it reset, I chose to name it "clear" instead. I did not get an error.
