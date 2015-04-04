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

### Phase 1: User, Question (1 day)
I will first implement questions in both the back-end and front-end. With
Backbone front end, I will have questions index view, questions index item view
(used for subviews), show view for individual questions, and form for creating
new questions.
In the back-end, I will add API routes to post data as JSON, then user jBuilder
as a means for the Backbone models to fetch data from those routes.
I will next implement user authentication. Users can sign up/sign in
(username, password) and sign out. Users are redirected to root (questions index
page) upon logging in. Non-logged in users can still view questions index and
show pages, but they can't post/answer questions (or comment on questions).

I will build associations between the User model and Question model.

I will build an index page of all the users (with links to their profile page
by username).


[Details][phase-one]

### Phase 2: Answering questions (1 days)
I will add more API routes (for answers). I will build associations
between my Question/Answer/User models (in both the front-end and back-end).
The ultimate goal will be to display answers on question's show page with
user's username.

[Details][phase-two]

### Phase 3: Profile Page (1 days)
User's profile page will display questions and answers they have created, with
links to the questions' show pages.

[Details][phase-three]


### Phase 4: Tags (2 day)
Users can create tags for questions.
I will build association between Tag and Question models.
I will make a tags index page with links (by the tag name) to the tag show page.
Show page will have questions tagged with that particular tag. Clicking on question
(title) will bring to the question show page.

[Details][phase-four]

### Phase 5: Searches (1 day)
Implement both search by tag name and search by user's username.
Search box should be on the index page (of tags or users).

[Details][phase-five]

### Phase 6: Comments (2 days)
I will build my Comment(s) MVC in both the front-end and back-end.
(C = controller in the back-end and collection in the front-end). I will build
associations between Comment and Answer. By the end of this phase, users
will be able to comment on answers. The idea is for comments to be
displayed on answer show page (which is itself a subview of question show page).

[Details][phase-six]

### Phase 7: User Profile Page con't (1 days)
I will display comments created my user on profile page. By the end of this phase,
users will be able to click on anything they've created (question, answer, or comment),
and be shown the question show page associated with the question, answer, or comment.

[Details][phase-seven]

### Bonus Features
- [ ] Up-vote and down-vote on questions and answers (polymorphic association)
- [ ] Another question's index page sorted by popularity

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
