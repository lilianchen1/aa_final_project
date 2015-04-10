NoPhenotype.Views.QuestionIndexItem = Backbone.View.extend({
  template: JST["question_index_item"],
  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "change:vote_count", this.render);
  },

  attributes: function() {
    return {
      class : "question-index-item",
      id : this.model.id
    };
  },

  events: {
    "click button.delete-q": "deleteQuestion"
  },

  deleteQuestion: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.model.tags().each(function(tag) {
      var tagLink = "<a href='#/tags/" + tag.id + "' class='tags'>" + tag.get('name') + "</a>  ";
      this.$("div.tags").append(tagLink);
    }.bind(this));
    // var voteForm = new NoPhenotype.Views.VoteForm({
    //   model: new NoPhenotype.Models.Vote({
    //     question_id: this.model.id,
    //   }),
    //   collection: this.model.votes(),
    //   votableModel: this.model
    // });
    // this.$("div.voting").append(voteForm.render().$el);
    return this;
  }
});
