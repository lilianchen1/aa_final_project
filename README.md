# Flux-capacitr

[Heroku link][heroku]

[heroku]: #

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


[Details][phase-one]

### Phase 2: Answering questions (1.5 days)
Add more API routes (for answers). Build associations between Question/Answer/User
models (in both the front-end and back-end).
The ultimate goal will be to display answers on question's show page with
user's username.

Continue to work on questions index page to display number of answers the question
has.

[Details][phase-two]

### Phase 3: Profile Page (1 days)
User's profile page will have questions and answers sections with links
to the questions' show pages via question title.

[Details][phase-three]


### Phase 4: Tags (2 day)
Users can create tags for questions.
Build association between Tag and Question models (through Taggings).
Make a tags index page with links (by the tag name) to the tag show page.
Show page will have questions tagged with that particular tag. Clicking on question
(title) will bring to the question show page.

Continue working on question index and show pages so that tags for that question
are displayed.

[Details][phase-four]

### Phase 5: Searches (1 day)
Implement both search by tag name and search by user's username.
Search box should be on the index page (of tags or users).

[Details][phase-five]

### Phase 6: Comments (2 days)
Build Comment(s) MVC in both the front-end and back-end.
(C = controller in the back-end and collection in the front-end). Build
associations between Comment and Answer. By the end of this phase, users
will be able to comment on answers. The idea is for comments to be
displayed on answer show page (which is itself a subview of question show page).

[Details][phase-six]

### Phase 7: User Profile Page con't (1 days)
Have a comment section that display the question title for the answer that the
comment belongs to. Display a picture next to username (via Gravatar).

[Details][phase-seven]

### Bonus Features
- [ ] Paginate questions index page and other pages
- [ ] Up-vote and down-vote on questions and answers (polymorphic association)
- [ ] Make another question's index page sorted by popularity

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
