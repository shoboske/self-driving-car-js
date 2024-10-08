class GraphEditor {
  constructor(viewPort, graph) {
    this.viewPort = viewPort;
    this.canvas = viewPort.canvas;
    this.graph = graph;
    this.context = viewPort.context;
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown);

    this.canvas.addEventListener("mouseup", (event) => {
      if (event.button == 1 || event.button == 0) {
        this.dragging = false;
      }
    });

    this.canvas.addEventListener("mousemove", this.#handleMouseMove);

    this.canvas.addEventListener("contextmenu", (event) =>
      event.preventDefault()
    );

    document.addEventListener("keydown", (event) => {
      if (event.key == "Escape") {
        this.selected = null;
      }
    });
  }

  #handleMouseDown = (event) => {
    if (event.button == 2) {
      // right click
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }

    if (event.button == 0 && !this.viewPort.metaKeyActive) {
      // left click
      const mouse = this.viewPort.getMouse(event);

      if (this.hovered) {
        this.#selectPoint(this.hovered);
        this.hovered = null;
        this.dragging = true;
        return;
      }

      this.graph.tryAddPoint(mouse);

      this.#selectPoint(mouse);
      this.hovered = mouse;
    }
  };

  #handleMouseMove = (event) => {
    this.mouse = this.viewPort.getMouse(event, true);
    this.hovered = getNearestPoint(
      this.mouse,
      this.graph.points,
      15 * this.viewPort.zoom
    );
    if (this.dragging && this.selected) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  };

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    this.selected = null;
  }

  #selectPoint(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  display() {
    this.graph.draw(this.context);

    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.context, { dash: [3, 3] });
      this.selected.draw(this.context, { outline: true });
    }

    if (this.hovered) {
      this.hovered.draw(this.context, { fill: true });
    }
  }

  reset() {
    this.graph.reset();
    this.selected = null;
    this.hovered = null;
  }

  save() {
    localStorage.setItem("graph", JSON.stringify(this.graph));
  }
}
