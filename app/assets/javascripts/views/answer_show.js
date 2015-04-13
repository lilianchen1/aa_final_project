NoPhenotype.Views.AnswerShow = Backbone.View.extend({
  template: JST["answer_show"],
  tagName: "li",
  className: "answer",

  initialize: function() {
    this.listenTo(this.model, "sync add change:vote_count", this.render);
    this.listenTo(this.model.votes(), "remove", this.render);
    this.listenTo(this.model.comments(), "sync add remove", this.render);
  },

  events: {
    "click button.delete-q": "deleteAnswer",
    "click button.new-answer-comment": "renderCommentForm"
  },

  renderCommentForm: function(event) {
    event.preventDefault();
    var commentForm = new NoPhenotype.Views.CommentForm({
      model: new NoPhenotype.Models.Comment({
        user_id: parseInt(window.currentUser.current_user_id),
        answer_id: this.model.id,
        commentable_id: this.model.id,
        commentable_type: "Answer"
      }),
      collection: this.model.comments(),
      commentableModel: this.model,
    });
    this.$("div#"+ this.model.id).append(commentForm.render().$el);
  },

  deleteAnswer: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var content = this.template({answer: this.model});
    this.$el.html(content);
    var voteModel;
    var userVoteArr = this.model.votes().where({user_id: parseInt(window.currentUser.current_user_id)});
    if (userVoteArr.length !== 0) {
      voteModel = userVoteArr.shift();
    } else {
      voteModel = new NoPhenotype.Models.Vote({
                    answer_id: this.model.id,
                    user_id: parseInt(window.currentUser.current_user_id)
            });
    }

    var voteForm = new NoPhenotype.Views.VoteForm({
      model: voteModel,
      collection: this.model.votes(),
      votableModel: this.model
    });
    this.$("div.voting").append(voteForm.render().$el);

    this.model.comments().each(function(comment) {
      var commentShow = new NoPhenotype.Views.CommentShow({
        model: comment
      });
      this.$("ul.a-comments").append(commentShow.render().$el);
    }.bind(this));

    return this;
  }
});
