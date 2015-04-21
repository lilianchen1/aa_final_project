NoPhenotype.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: NoPhenotype.Models.User,
  comparator: function(user) {
    return user.get("username").toLowerCase();
  },

  getOrFetch: function(id) {
    if (this.get(id)) {
      this.get(id).fetch();
      return this.get(id);
    }

    var user = new NoPhenotype.Models.User({id: id});
    user.fetch({
      success: function() {
        this.add(user);
      }.bind(this)
    });

    return user;
  },

  parse: function(response) {
    this.page = response.page ? parseInt(response.page) : 1;
    this.total_pages = parseInt(response.total_pages);
    return response.models || response;
  }
});
