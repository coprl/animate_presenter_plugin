require_relative 'animate/action'

module Coprl
  module Presenters
    module Plugins
      module Animate
        module DSLEventActions
          def animate(element_id, *animations, **attributes, &block)
            self << Animate::Action.new(element_id, *animations, parent: self, **attributes, &block)
          end
        end

        module WebClientComponents
          def view_dir_animate(pom)
            File.join(__dir__, '../../../..', 'views', 'components')
          end

          def render_header_animate(pom, render:)
            render.call :erb, :animate_header, views: view_dir_animate(pom)
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
