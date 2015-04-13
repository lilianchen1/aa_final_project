NoPhenotype.Collections.Comments = Backbone.Collection.extend({
  url: "/api/comments",
  model: NoPhenotype.Models.Comment,
  comparator: function(firstComment, secondComment) {
    if (firstComment.get("created_at") < secondComment.get("created_at")) {
      return -1;
    } else {
      return 1;
    }
  }
});
