NoPhenotype.Views.UsersIndex = Backbone.View.extend({
  template: JST["users_index"],

  events: {
    "click button.delete-u": "deleteUser"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync remove", this.render);
  },

  render: function() {
    var content = this.template({users: this.collection});
    this.$el.html(content);
    return this;
  },

  deleteUser: function(event) {
    event.preventDefault();
    var userId = $(event.target).data("id");
    var user = this.collection.get(userId);
    user.destroy();
  }
});
