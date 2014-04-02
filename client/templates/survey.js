Template.survey.answers = function() {
	return Answers.find({}, {sort: {votes: -1, label: 1}});
};

Template.survey.events = {
	'click li': function(e) {
		if (Session.equals('voted', undefined)) {
			// set the session voted var with the id
			Session.set('voted', this._id);
			// increment the vote count
			Meteor.call('vote', this._id);
		} else {
			alert("Sorry only one vote please;")
		}
	}
};

Template.survey.helpers({
	votedClass: function() {
		if (Session.get('voted') === this._id) {
			return 'bg-success';
		};
	}
});