# No Phenotype

[Heroku link][heroku]

[heroku]: https://no-phenotype.herokuapp.com/

[custom domain link][custom]

[custom]: http://www.no-phenotype.com/


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
- [X] Infinite Scroll (questions index, tags index, users index)
- [X] Accepting Answers (green checkmark)
- [X] Multiple sessions (useful for guest account login)
- [X] User picture


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Feature Code

#### Infinite Scroll Implementation with Sorting by popularity

To implement infinite scroll combined with sorting questions by
popularity (first by number of votes, then by number of answers), all questions
must be first sorted in the backend. This is accomplished with ActiveRecord queries by joining and ordering questions, votes, and answers tables.

* Question Model's sort_by_popularity class method:

```ruby
def self.sort_by_popularity
    subquery = Question.select("questions.*, SUM(COALESCE(votes.value, 0)) AS  votes_count")
                        .joins("LEFT OUTER JOIN votes ON questions.id = votes.votable_id")
                        .where("votes.votable_type IS NULL OR votes.votable_type = 'Question'")
                        .group("questions.id")

    res = Question.select("a.*, COUNT(answers.id) AS answer_count")
                  .from(subquery, :a)
                  .joins("LEFT OUTER JOIN answers ON a.id = answers.question_id")
                  .group("a.id, a.title, a.content, a.created_at, a.updated_at, a.user_id, a.votes_count")
                  .order("a.votes_count DESC, COUNT(answers.id) DESC, a.created_at DESC")
    res
  end

```

* QuestionsController index method calls sort_by_popularity to sort the questions

```ruby

  def index
    ...

    elsif params[:sort].present?
      @questions = Kaminari::paginate_array(
        Question.sort_by_popularity.to_a
      ).page(params[:page]).per(7)
      render :index

    ...

  end

```

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
Users can only vote on a specific question and answer once. Restriction is implemented such that
a second vote on the model deletes the previous one from the database.

### Phase 6: Accept Answers (0.5 day)
User who asked a question can accept an answer for the question. Accepting
an answer makes a green checkmark visible on the answer show view.

### Phase 7: User profile (1 day)
Basic profile page (picture, username, short bio)


### Bonus Features
- [X] User Profile Page - Display list of questions with link to question by title
- [X] Users' index page and search for users
- [X] Search for tags
- [X] Search for questions
- [X] Link to Sort questions by popularity
- [X] About blurb for website
- [X] Unanswered questions
