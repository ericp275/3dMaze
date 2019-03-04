class GeometryRendererComponent extends RendererComponent {
  constructor(color, geometry) {
    super()
    this.color;
    this.geometry;

    // Check the arguments. We expect exactly two. 
    // The first is a color
    // The second is a geometry

    this.color = color;
    this.geometry = geometry;
  }

  render(ctx, gameObject) {

    ctx.fillStyle = this.color;

    if (this.geometry instanceof AxisAlignedRectangle) {
      let width = this.geometry.widthHeight.x;
      let height = this.geometry.widthHeight.y;

      let x = -width / 2;
      let y = -height / 2;

      ctx.fillRect(x, y, width, height);

    }
    else if (this.geometry instanceof Circle) {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.ellipse(0, 0, this.geometry.radius, this.geometry.radius, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    else if (this.geometry instanceof Vector2) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = .05;

      ctx.beginPath();
      ctx.moveTo(this.geometry.x - .25, 0);
      ctx.lineTo(this.geometry.y + .25, 0);
      ctx.moveTo(0, this.geometry.y + .25);
      ctx.lineTo(0, this.geometry.y - .25);
      ctx.stroke();

     
    }

    else if (this.geometry instanceof Vector3) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = .1;

      ctx.beginPath();
      for(i = 0; i < 10; i+=2){
        j = i + 1;
        ctx.moveTo((this.geometry.ball.x * i + this.geometry.force.x * (10 - i)) / 10, (this.geometry.ball.x * i + this.geometry.force.x * (10 - i)) / 10);
        ctx.moveTo((this.geometry.ball.x * j + this.geometry.force.x * (10 - j)) / 10, (this.geometry.ball.x * j + this.geometry.force.x * (10 - j)) / 10);
      }
      ctx.stroke();

     
    }


  }
}