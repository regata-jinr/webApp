function addAxes(svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
  svg.append('clipPath')
    .attr('id', 'axes-clip')
    .append('polygon')
    .attr('points', (-margin.left) + ',' + (-margin.top) + ' ' +
      (chartWidth - 1) + ',' + (-margin.top) + ' ' +
      (chartWidth - 1) + ', ' +
      (chartWidth + margin.right) + ', ' +
      (chartWidth + margin.right) + ',' + (chartHeight + margin.bottom) + ' ' +
      (-margin.left) + ',' + (chartHeight + margin.bottom));

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis)
    .append('text')
    .attr("text-anchor", "end")
    .attr("x", chartWidth)
    .attr("y", -5)
    .text('Energy (kEv)');
  axes.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
}

function drawPaths(svg, data, x, y) {

  var medianLine = d3.svg.line()
    .interpolate('basis')
    .x(function(d) {
      return x(d.energy);
    })
    .y(function(d) {
      return y(d.counts);
    });

  svg.datum(data);

  svg.append('path')
    .attr('class', 'median-line')
    .attr('d', medianLine)
    .attr('clip-path', 'url(#rect-clip)');
}

function addMarker(marker, svg, chartHeight, x) {
  var xPos = x(marker.energy),
    yPosStart = 0,
    yPosEnd = chartHeight;
  var markerG = svg.append('g')
    .attr('class', 'marker ' + marker.type.toLowerCase())
    .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
    .attr('opacity', 0);

  markerG.transition()
    .duration(1000)
    .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
    .attr('opacity', 1);
  markerG.append('path')
    .attr('d', 'M' + xPos + ',' + (yPosEnd))
    .attr('stroke', 'red')
    .transition()
    .duration(1000)
    .attr('d', 'M' + xPos + ',' + (yPosStart + 60) + 'l' + 0 + ',' + (yPosEnd - 60))
    .attr('stroke', 'red');

  markerG.append('text')
    .attr('x', xPos)
    .attr('y', xPos * 0.9)
    .style('fill', 'red')
    .style("font-size", "20px")
    .text(marker.type);

}

function startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x) {
  rectClip.transition()
    .duration(1000 * markers.length)
    .attr('width', chartWidth);

  markers.forEach(function(marker, i) {
    setTimeout(function() {
      addMarker(marker, svg, chartHeight, x);
    }, 1000 + 500 * i);
  });
}

function makeChart(data, markers) {
  var svgWidth = document.getElementsByClassName("demoWindow")[0].offsetWidth,
    svgHeight = document.getElementsByClassName("demoWindow")[0].offsetHeight - document.getElementById('graphLegend').offsetHeight,
    margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 40
    },
    chartWidth = svgWidth - margin.left - margin.right,
    chartHeight = svgHeight - margin.top - margin.bottom;

  var x = d3.scale.linear().range([0, chartWidth])
    .domain(d3.extent(data, function(d) {
      return d.energy;
    })),
    y = d3.scale.linear().range([chartHeight, 0])
    .domain([0, d3.max(data, function(d) {
      return d.bckgrCountsUp;
    })]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom')
    .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
    yAxis = d3.svg.axis().scale(y).orient('left')
    .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

  var svg = d3.select('.demoWindow').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var rectClip = svg.append('clipPath')
    .attr('id', 'rect-clip')
    .append('rect')
    .attr('width', 0)
    .attr('height', chartHeight);

  addAxes(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
  drawPaths(svg, data, x, y);
  startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
}

d3.json('data/specUniq.json', function(error, rawData) {
  if (error) {
    console.error(error);
    return;
  }

  var data = rawData.map(function(d) {
    return {
      energy: d.energy,
      bckgrCountsLow: d.bckgrCountsLow / 1000,
      counts: d.counts / 1000,
      bckgrCountsUp: d.bckgrCountsUp / 1000,
    };
  });

  d3.json('data/markers.json', function(error, markerData) {
    if (error) {
      console.error(error);
      return;
    }

    var markers = markerData.map(function(marker) {
      return {
        energy: marker.energy,
        type: marker.type,
        version: marker.version
      };
    });
    makeChart(data, markers);
  });
});
