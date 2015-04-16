NoPhenotype.Collections.Comments = Backbone.Collection.extend({
  url: "/api/comments",
  model: NoPhenotype.Models.Comment,
  comparator: function(comment) {
    return Date.parse(comment.get('created_at'));
  }
});
