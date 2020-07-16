
var svgWidth = 1000;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
 

d3.csv("assets/data/data.csv").then(function(data) {
 
    data.forEach(function(anything) {
      data.income = +data.income;
      data.obesity = +data.obesity;
    });

    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, function (d) {
          return d.income * .9;
      }), d3.max(data, function (d) {
          return d.income;
      })])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.max(data, function (d) {
        return d.obesity ;
    }), d3.min(data, function (d) {
        return d.obesity - 3;
    })]) 
      .range([0,height]) ;

     


   var x_axis = d3.axisBottom()
      .scale(xLinearScale)


   var y_axis = d3.axisLeft()
      .scale(yLinearScale);


   chartGroup.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(x_axis);

    chartGroup.append("g")
     .call(y_axis);

// Create Circles
  
   var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    // .attr("cx", d => xLinearScale(d.income))
    .attr("cx",function (d) { return xLinearScale(d.income); } )
    .attr("cy",function (d) { return yLinearScale(d.obesity); } )
    // .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "13")
    .attr("fill", "pink")
    .attr("opacity", ".5")
    // .append("text")
    // .text( function (d)    { return  d.abbr; })
    // .attr("font-size", "20px");


    var CirclesText = chartGroup.selectAll("text.t")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "t")
      .text( function (d)    { return  d.abbr; })
      .attr("dx",function (d) { return xLinearScale(d.income) - 10; } )
      .attr("dy",function (d) { return yLinearScale(d.obesity) + 3; } )
      // .attr("x", function(d) { return d.cx; })
      // .attr("y", function(d) { return d.cy; })
      .attr("font-size", "12px")
      .attr("color", "black");
               






                                               // AXIS LABELS

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesity (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Income");

  

});


// add axis labels
// change index html text