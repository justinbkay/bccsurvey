// Count the number of votes accross all categories
Template.piechart.respondents = function() {
	return Answers.find({})
					.map(function (r) {
						return r.votes;
					})
					.reduce(function (memo, num){
						return memo + num;
					}, 0);
};

// Draw our pie chart, code lifted from https://gist.github.com/enjalot/1203641
Template.piechart.rendered = function() {

  Deps.autorun(function () {
    // Grab the ansers
    var data = Answers.find().fetch();

    // Filter out any categories with zero votes
    data = _.filter(data, function(ans){ return ans.votes > 0; });

    // Clear the chart container div
    $('#piechart').empty();

    var w = 400,                        //width
    h = 400,                            //height
    r = 200,                            //radius
    color = d3.scale.category20c();     //builtin range of colors

    var vis = d3.select("#piechart")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([data])                   //associate our data with the document
      .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
      .attr("transform", "translate(" + r + "," + r + ")");

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .value(function(d) { return d.votes; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
      .attr("transform", function(d) {                    //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.innerRadius = 0;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
      })
      .attr("text-anchor", "middle")                          //center the text on it's origin
      .text(function(d, i) { return data[i].label; });

  });

};

