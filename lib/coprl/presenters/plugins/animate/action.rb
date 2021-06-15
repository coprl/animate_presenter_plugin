require 'coprl/presenters/dsl/components/actions/base'


module Coprl
  module Presenters
    module Plugins
      module Animate
          class Action < DSL::Components::Actions::Base
            INFINITE = 'infinite'
            attr_reader :element_id, :animations, :wait
            def initialize(element_id, *animations, wait: false, **attribs_, &block)
              super(type: :animate, **attribs_, &block)
              @element_id = element_id
              inflector = Dry::Inflector.new
              @animations = animations.flatten.map do |a|
                a = inflector.camelize(a.to_s)
                # Cleanup Delay2s -> Delay-2s and Repeat2 -> Repeat-2
                if /(Delay|Repeat)(([2345]s?))/ =~ a
                  a = "#{$1}-#{$2}"
                end
                puts "animation: #{a}"
                a[0] = a[0].downcase # replace with camelize_lower when available in dry-inflector 1.3
                a
              end
              # obviosulay you can't wait for infinity
              @wait = @animations.include?(INFINITE) ? false : wait
            end
        end
      end
    end
  end
end
