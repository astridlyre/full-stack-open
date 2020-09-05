## Blog List Exercises Front End

#### 5.1 - 5.4

I decided to write the front end myself without cloning the application, for more challenge. I used my backend from Part 4. If user is not logged in, only login form is visible. If logged in, the blogs are shown, along with UI. Login is 'permanent' with local storage. Logged in user can add new blogs. Implemented notifications to inform user of status of operations.

#### 5.5 - 5.10

Form for creating blog entries is only displayed when appropriate. It closes when a new blog entry is created. Form for creating a new entry is its own component. Instead of implementing a toggle for the blog information, I made a toggle for the delete button - I like the look of this more. Function is similar though! It is possible to like posts and delete posts. You can also sort posts by likes or most recently added.

#### 5.11 - 5.12

Defined PropTypes for NotificationModal component. Added ESlint to project. Defined the config according to suggestions.

#### 5.13 - 5.16

Because I made the toggle for the delete button instead of blog information, I tested that instead. Implemented a test to check that the delete button is not rendered by default. Checked that the actions button is shown only when the blog entry was posted by the current user, and that the delete button shows only once you press the actions button. Checked that if you press the like button twice, it registers two like actions.

Also made a test for the create modal form, to check that the event handler is called when the title input changes, and it sends the correct value.

Live version: [https://linkr-list.herokuapp.com/](https://linkr-list.herokuapp.com/)
