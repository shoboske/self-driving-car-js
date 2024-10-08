class World {
  constructor(
    graph,
    roadWidth = 80,
    roadRoundness = 10,
    buildingWidth = 150,
    buildingMinLength = 150,
    spacing = 50
  ) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.buildingWidth = buildingWidth;
    this.buildingMinLength = buildingMinLength;
    this.spacing = spacing;

    this.envelopes = [];
    this.roadBorders = [];
    this.buildings = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      );
    }

    this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
    this.buildings = this.#generateBuildings();
  }

  #generateBuildings() {
    const tmpEnvelopes = [];
    for (const seg of this.graph.segments) {
      tmpEnvelopes.push(
        new Envelope(
          seg,
          this.roadWidth + this.buildingWidth + this.spacing * 2,
          this.roadRoundness
        )
      );
    }

    const guides = Polygon.union(tmpEnvelopes.map((e) => e.poly));

    for (let i = 0; i < guides.length; i++) {
      const segment = guides[i];

      if (segment.length() < this.buildingMinLength) {
        guides.splice(i, 1);
        i--;
      }
    }

    const supports = [];

    for (const seg of guides) {
      const len = seg.length() + this.spacing;
      const buildingCount = Math.floor(
        len / (this.buildingMinLength + this.spacing)
      );
      const buildingLength = len / buildingCount - this.spacing;
      const dir = seg.directionVector();
      
      let q1 = seg.p2;
      let q2 = add(q1, scale(dir, buildingLength));

      supports.push(new Segment(q1, q2));

      for (let i = 2; i < buildingCount; i++) {
        q1 = add(q2, scale(dir, this.spacing));
        q2 = add(q1, scale(dir, buildingLength));

        supports.push(new Segment(q1, q2));
      }
    }

    const bases = [];

    for (const seg of supports) {
      bases.push(new Envelope(seg, this.buildingWidth).poly);
    }

    return bases;
  }

  draw(ctx) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 15 });
    }

    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: "white", width: 4, dash: [10, 10] });
    }

    for (const seg of this.roadBorders) {
      seg.draw(ctx, { color: "white", width: 4 });
    }

    for (const building of this.buildings) {
      building.draw(ctx);
    }
  }
}
