# No Phenotype

[Heroku link][heroku]

[heroku]: https://no-phenotype.herokuapp.com/


## Minimum Viable Product
NoPhenotype is a clone of StackOverflow built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Create questions
- [X] View list of questions (sorted by time of creation)
- [X] Answer questions
- [X] Tag questions
- [X] View questions by tags
- [X] Comment on answers and questions (polymorphic association)
- [X] Upvote and downvote questions and answers
- [X] View their own profile page
- [X] View other users' profile page
- [X] Infinite Scroll
- [X] Accepting Answers (green checkmark)
- [ ] Multiple sessions (useful for guest account login)
- [ ] Set up gravatar for users' picture


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User, Question (1 days)
Implement questions in both the back-end and front-end. With
Backbone front end, have questions index view, questions index item view
(used for subviews), show view for individual questions, and form for creating
new questions.
In the back-end, add API routes to post data as JSON, then user jBuilder
as a means for the Backbone models to fetch data from those routes.

Implement user authentication. Users can sign up/sign in
(username, email, password) and sign out. Users are redirected to root (questions index
page) upon logging in.

Build associations between the User model and Question model.


### Phase 2: Answering questions (1 days)
Add more API routes (for answers). Build associations between Question/Answer/User
models (in both the front-end and back-end).
The ultimate goal will be to display answers on question's show page with
user's username.

Continue to work on questions index page to display number of answers the question
has.


### Phase 3: Tags (2 day)
Users can create tags for questions.
Build association between Tag and Question models (through Taggings).
Make a tags index page with links (by the tag name) to the tag show page.
Show page will have questions tagged with that particular tag. Clicking on question
(title) will bring to the question show page.

Continue working on question index and show pages so that tags for that question
are displayed.


### Phase 4: Comments (1 days)
Build Comment(s) MVC in both the front-end and back-end.
(C = controller in the back-end and collection in the front-end). Use polymorphic
association.
By the end of this phase, users will be able to comment on answers and questions.
The idea is for comments to be displayed on answer show view (which is itself a subview of question show page) and question show view.


### Phase 5: Upvote/downvote (2 days)
Users can upvote and downvote both questions and answers. Questions and Answer
show view display NET number of upvotes and downvotes. (Upvote - downvote).

### Phase 6: Accept Answers (0.5 day)
User who asked a question can accept an answer for the question. Accepting
an answer makes a green checkmark visible on the answer show view.

### Phase 7: User profile (1 day)
Basic profile page (picture, username, short bio)


### Bonus Features
- [ ] User Profile Page - Display list of questions with link to question by title
- [ ] Users' index page and search for users by username
- [ ] Search for tags
- [X] Search for questions
