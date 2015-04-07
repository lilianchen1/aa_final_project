# No Phenotype

[Heroku link][heroku]

[heroku]: https://no-phenotype.herokuapp.com/


## Minimum Viable Product
NoPhenotype is a clone of StackOverflow built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create questions
- [ ] View list of questions (sorted by time of creation)
- [ ] Answer questions
- [ ] View their own profile page
- [ ] View other users' profile page
- [ ] Tag questions
- [ ] View questions by tags
- [ ] Search for tags
- [ ] Search for other users
- [ ] Comment on answers


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User, Question (1.5 days)
Implement questions in both the back-end and front-end. With
Backbone front end, have questions index view, questions index item view
(used for subviews), show view for individual questions, and form for creating
new questions.
In the back-end, add API routes to post data as JSON, then user jBuilder
as a means for the Backbone models to fetch data from those routes.

Implement user authentication. Users can sign up/sign in
(username, password) and sign out. Users are redirected to root (questions index
page) upon logging in. Non-logged in users can still view questions index and
show pages, but they can't post/answer questions (or comment on questions).

Build associations between the User model and Question model.

Build an index page of all the users (with links to their profile page, which is
very minimalistic right now).


### Phase 2: Answering questions (1.5 days)
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

Implement search by tag name.


### Phase 4: Comments (2 days)
Build Comment(s) MVC in both the front-end and back-end.
(C = controller in the back-end and collection in the front-end). Build
associations between Comment and Answer. By the end of this phase, users
will be able to comment on answers. The idea is for comments to be
displayed on answer show view (which is itself a subview of question show page).


### Phase 5: Upvote/downvote (2 days)
Users can upvote and downvote both questions and answers. Questions and Answer
show view display NET number of upvotes and downvotes. (Upvote - downvote).


### Phase 6: User profile (1 day)
Basic profile page (picture, username, short bio)


### Bonus Features
- [ ] User Profile Page - Display list of questions with link to question by title
- [ ] Users' index page and search for users by username
