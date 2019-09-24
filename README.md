# Animate Presenter Plugin

This [Voom Presenter](https://github.com/rx/presenters) plugins allows CSS animations.
It is based on [animage.css](https://github.com/daneden/animate.css).

## Usage

In you presenter POM:

    event :click do
      animate component_id, %i(fade_out slow), wait: true
    end              
       
All classes defined in animate.css work. You can use snake case and it will be converted.
    
    
You can start and stop infinite animations

    event :click do
      animate component_id, %i(jello slow infinite)
      # Do something that takes a while here
      animate component_id, :stop
    end              

Now you can animate your way to awesomeness.
