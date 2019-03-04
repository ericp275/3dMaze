class RendererComponent extends Component{
  constructor(){
    super();
  }
  render(ctx, gameObject){
    throw "All implementations of RenderComponent must override render."
  }

}