//A generic GameObject class
class GameObject{
  constructor(){
    this.transform = new Transform();
    this.components = [];
    this.renderer = undefined;
  }
  render(ctx) {
    if(this.renderer){
      this.renderer.render(ctx, this);
    }
  }
}