class ViewPort {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.zoom = 1;

    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };
    this.metaKeyActive = false;

    this.#addEventListeners();
  }

  getMouse(event, subtractDragOffset = false) {
    const p = new Point(
      (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      (event.offsetY - this.center.y) * this.zoom - this.offset.y
    );

    return subtractDragOffset ? subtract(p, this.drag.offset) : p;
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  reset() {
    this.context.restore();

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();

    this.context.translate(this.center.x, this.center.y);
    this.context.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    this.context.translate(offset.x, offset.y);
  }

  #addEventListeners() {
    this.canvas.addEventListener("wheel", this.#handleWheel);
    this.canvas.addEventListener("mousedown", this.#handleMouseDown);
    this.canvas.addEventListener("mousemove", this.#handleMouseMove);
    this.canvas.addEventListener("mouseup", this.#handleMouseUp);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Meta") {
        this.metaKeyActive = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Meta") {
        this.metaKeyActive = false;
      }
    });
  }

  #handleWheel = (event) => {
    const dir = Math.sign(event.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
    console.log(this.zoom);
  };

  #handleMouseDown = (event) => {
    if (event.button == 1 || (event.button == 0 && this.metaKeyActive)) {
      this.drag.start = this.getMouse(event);
      this.drag.active = true;
      event.preventDefault();
    }
  };

  #handleMouseMove = (event) => {
    if (this.drag.active) {
      this.drag.end = this.getMouse(event);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  };

  #handleMouseUp = (event) => {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  };
}
