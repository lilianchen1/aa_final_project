NoPhenotype.Views.QuestionShow = Backbone.View.extend({
  template: JST["question_show"],

  initialize: function() {
    this.listenTo(this.model, "sync change:vote_count", this.render);
    this.listenTo(this.model.answers(), "sync add remove", this.render);
    this.listenTo(this.model.votes(), "remove", this.render);
    this.listenTo(this.model.comments(), "sync add remove", this.render);
  },

  events: {
    "click button.new-comment": "renderCommentForm"
  },

  renderCommentForm: function(event) {
    event.preventDefault();
    var commentForm = new NoPhenotype.Views.CommentForm({
      model: new NoPhenotype.Models.Comment({
        user_id: parseInt(window.currentUser.current_user_id),
        question_id: this.model.id,
        commentable_id: this.model.id,
        commentable_type: "Question",
      }),
      collection: this.model.comments(),
      commentableModel: this.model,
    });
    (commentForm.render().$el).insertBefore("ul.answers");
  },

  render: function() {
    var content = this.template({question: this.model});
    this.$el.html(content);

    var voteModel;
    var userVoteArr = this.model.votes().where({user_id: parseInt(window.currentUser.current_user_id)});
    if (userVoteArr.length !== 0) {
      voteModel = userVoteArr.shift();
    } else {
      voteModel = new NoPhenotype.Models.Vote({
                    question_id: this.model.id,
                    user_id: parseInt(window.currentUser.current_user_id)
            });
    }
    var voteForm = new NoPhenotype.Views.VoteForm({
      model: voteModel,
      collection: this.model.votes(),
      votableModel: this.model
    });
    this.$("div.voting").append(voteForm.render().$el);

    this.model.tags().each(function(tag) {
      var tagLink = "<a href='#/tags/" + tag.id + "' class='tags'>" + tag.get('name') + "</a>  ";
      this.$("div.tags").append(tagLink);
    }.bind(this));

    this.model.answers().each(function(answer) {
      var answerShow = new NoPhenotype.Views.AnswerShow({model: answer});
      this.$("ul.answers").append(answerShow.render().$el);
    }.bind(this));


    this.model.comments().each(function(comment) {
      var commentShow = new NoPhenotype.Views.CommentShow({
        model: comment
      });
      this.$("ul.q-comments").append(commentShow.render().$el);
    }.bind(this));

    var answerForm = new NoPhenotype.Views.AnswerForm({
      model: new NoPhenotype.Models.Answer({
        question_id: this.model.id,
      }),
      collection: this.model.answers()
    });

    this.$("div.new-answer").append(answerForm.render().$el);
    return this;
  }
});
