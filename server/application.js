Meteor.publish('answers', function () {
	return Answers.find({});
});

Answers.allow({
	update: function(userId, doc, fieldNames, modifier) {
		return fieldNames.size === 1 && _.contains(fieldNames, 'votes');
	},

	insert: function(userId, doc) {
		return false;
	},

	remove: function(userId, doc) {
		return false;
	}

});

Meteor.methods({
	vote: function(id) {
		check(id, String);
		Answers.update({_id: id}, {$inc: {votes: 1}});
		return '200';
	}
});

Meteor.startup(function () {
	if (Answers.find().count() === 0) {
		Answers.insert({
			name: 'JavaScript Ninja',
			label: 'JS Ninja',
			votes: 0
		});

		Answers.insert({
			name: 'Backend Engineer',
			label: 'B.E.',
			votes: 0
		});

		Answers.insert({
			name: 'Sys Admin',
			label: 'S.A.',
			votes: 0
		});

		Answers.insert({
			name: 'Student',
			label: 'Student',
			votes: 0
		});

		Answers.insert({
			name: 'Manager',
			label: 'Mgr',
			votes: 0
		});

		Answers.insert({
			name: 'Am I in the right place?',
			label: 'Lost',
			votes: 0
		});

  }
});
