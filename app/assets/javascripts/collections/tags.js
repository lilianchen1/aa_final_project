NoPhenotype.Collections.Tags = Backbone.Collection.extend({
  url: "/api/tags",
  model: NoPhenotype.Models.Tag,
  comparator: "name",

  getOrFetch: function(id) {
    if (this.get(id)) {
      this.get(id).fetch();
      return this.get(id);
    }

    var tag = new NoPhenotype.Models.Tag({id: id});
    tag.fetch({
      success: function() {
        this.add(tag);
      }.bind(this)
    });

    return tag;
  },

  parse: function(response) {
    this.page = response.page ? parseInt(response.page) : 1;
    this.total_pages = parseInt(response.total_pages);
    return response.models || response;
  }
});
