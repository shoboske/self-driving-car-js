class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.context = canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.metaKeyActive = false;
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
      if (event.key === "Meta") {
        this.metaKeyActive = true;
      }

      if (event.key == "Escape") {
        this.selected = null;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Meta") {
        this.metaKeyActive = false;
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

    if (event.button == 1 || (event.button == 0 && this.metaKeyActive)) {
      this.dragging = true;
    }

    if (event.button == 0) {
      // left click
      const mouse = new Point(event.offsetX, event.offsetY);

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
    this.mouse = new Point(event.offsetX, event.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 15);
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

    if (this.hovered && this.selected && !this.hovered.equals(this.selected)) {
      this.hovered.draw(this.context, { fill: true });
    }
  }
}
