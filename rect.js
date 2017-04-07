var svg = d3.select('body').append('div').append('svg')
    .attr('width', 400)
    .attr('height', 30);

svg.selectAll('rect')
    .data([10,10,20,20])
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return i*25+1;
    })
    .attr('y', 5)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', function (d, i) {
        return (i>1) ? 'lightblue':'lightgreen';
    })
    .attr('stroke', 'black')
    .attr('stroke-width', '1px');

/**
 * Created by wild on 2017/4/7.
 */
