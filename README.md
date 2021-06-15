# Animate Presenter Plugin

A [COPRL](http://github.com/coprl/coprl) presenter plugin that makes CSS animations easy

It is based on [animate.css](https://github.com/daneden/animate.css).


## Installation

Add this line to your application's Gemfile:

```ruby
gem 'animate_presenter_plugin', git: 'https://github.com/coprl/animate_presenter_plugin', require: false
```

And then execute:

    $ bundle


## Usage in POMs

Declare the plugin in your pom, `plugin :animate`.

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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/coprl/animate_presenter_plugin.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the COPRL project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/coprl/coprl/blob/master/CODE-OF-CONDUCT.md).
