class World {
    constructor(graph, roadwidth = 100, roadRoundness = 3){
        this.graph = graph;
        this.roadwidth = roadwidth;
        this.roadRoundness = roadRoundness;

        this.envelopes = [];
        this.intersections = [];

        this.generate();
    }

    generate(){
        this.envelopes.length = 0;

        for (const segment of this.graph.segments) {
            this.envelopes.push(
                new Envelope(segment, this.roadwidth, this.roadRoundness)
            )
        }

        this.intersections = Polygon.break(
            this.envelopes[0].polygon,
            this.envelopes[1].polygon,
        )
    }

    draw(context){
        for (const envelope of this.envelopes) {
            envelope.draw(context);
        }
        for (const intersection of this.intersections) {
            intersection.draw(context, {size: 6, color: "red"});
        }
    }
}