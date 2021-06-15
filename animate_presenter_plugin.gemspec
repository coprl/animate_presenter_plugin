lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'animate_presenter_plugin/version'

Gem::Specification.new do |spec|
  spec.name          = 'animate_presenter_plugin'
  spec.version       = AnimatePresenterPlugin::VERSION
  spec.authors       = ["Russell Edens"]
  spec.email         = ["russell@voomify.com"]

  spec.summary       = %q{A COPRL presenter plugin for animate}
  spec.homepage      = 'http://github.com/coprl/animate_presenters_plugin'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', "~> 2.0"
  spec.add_development_dependency "rake", ">= 12.3.3"
end
