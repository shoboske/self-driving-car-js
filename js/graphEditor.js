class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.context = canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 2) {
        // right click
        if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }

      if (event.button == 0) {
        // left click
        const mouse = new Point(event.offsetX, event.offsetY);

        if (this.hovered) {
          this.selected = this.hovered;
          this.hovered = null;
          return;
        }
        this.graph.tryAddPoint(mouse);
        this.selected = mouse;
        this.hovered = mouse;
      }
    });

    this.canvas.addEventListener("mousemove", (event) => {
      const mouse = new Point(event.offsetX, event.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 15);
    });

    this.canvas.addEventListener("contextmenu", (event) =>
      event.preventDefault()
    );
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    this.selected = null;
  }
  display() {
    this.graph.draw(this.context);

    if (this.selected) {
      this.selected.draw(this.context, { outline: true });
    }

    if (this.hovered && this.selected && !this.hovered.equals(this.selected)) {
      this.hovered.draw(this.context, { fill: true });
    }
  }
}
