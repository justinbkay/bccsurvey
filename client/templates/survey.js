// Get the data for our template
Template.survey.answers = function() {
	return Answers.find({}, {sort: {votes: -1, label: 1}});
};

// Template events
Template.survey.events = {
	'click li': function() {
		if (Session.equals('voted', undefined)) {
			// set the session voted var with the id
			Session.set('voted', this._id);
			// increment the vote count
			Meteor.call('vote', this._id);
		} else {
			alert("Sorry only one vote please;");
		}
	}
};

// Helper functions
Template.survey.helpers({
	// Set the checkmark for voted
	votedClass: function() {
		if (Session.get('voted') === this._id) {
			return '&nbsp;<span class="glyphicon glyphicon-ok"></span>';
		}
	},

	// Set the button class for voted/not voted
	buttonClass: function() {
		if (Session.get('voted') === this._id) {
			return 'btn-danger';
		} else {
			return 'btn-primary';
		}
	}
});
