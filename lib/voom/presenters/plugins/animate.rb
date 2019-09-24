require_relative 'animate/action'
module Voom
  module Presenters
    module Plugins
      module Animate
        module DSLEventActions
          def animate(element_id, *animations, **attributes, &block)
            self << Animate::Action.new(element_id, *animations, parent: self, **attributes, &block)
          end
        end

        module WebClientComponents
          def render_header_animate(_pom, render:)
            view_dir = File.join(__dir__, 'animate')
            render.call :erb, :header, views: view_dir
          end
        end
        module WebClientActions
          def action_data_animate(action, _parent_id, *)
            # Type, URL, Options, Params (passed into javascript event/action classes)
            [action.type,
             action.url,
             {element_id: action.element_id, animations: action.animations, wait: action.wait},
             action.attributes.to_h]
          end
        end
      end
    end
  end
end
