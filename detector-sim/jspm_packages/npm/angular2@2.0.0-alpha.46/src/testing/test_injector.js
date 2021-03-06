/* */ 
'use strict';
var di_1 = require('../core/di');
var animation_builder_1 = require('../animate/animation_builder');
var animation_builder_mock_1 = require('../mock/animation_builder_mock');
var proto_view_factory_1 = require('../core/linker/proto_view_factory');
var reflection_1 = require('../core/reflection/reflection');
var change_detection_1 = require('../core/change_detection/change_detection');
var exceptions_1 = require('../facade/exceptions');
var view_resolver_1 = require('../core/linker/view_resolver');
var directive_resolver_1 = require('../core/linker/directive_resolver');
var pipe_resolver_1 = require('../core/linker/pipe_resolver');
var dynamic_component_loader_1 = require('../core/linker/dynamic_component_loader');
var xhr_1 = require('../compiler/xhr');
var ng_zone_1 = require('../core/zone/ng_zone');
var dom_adapter_1 = require('../core/dom/dom_adapter');
var event_manager_1 = require('../core/render/dom/events/event_manager');
var directive_resolver_mock_1 = require('../mock/directive_resolver_mock');
var view_resolver_mock_1 = require('../mock/view_resolver_mock');
var mock_location_strategy_1 = require('../mock/mock_location_strategy');
var location_strategy_1 = require('../router/location_strategy');
var ng_zone_mock_1 = require('../mock/ng_zone_mock');
var test_component_builder_1 = require('./test_component_builder');
var di_2 = require('../core/di');
var debug_1 = require('../core/debug');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var view_pool_1 = require('../core/linker/view_pool');
var view_manager_1 = require('../core/linker/view_manager');
var view_manager_utils_1 = require('../core/linker/view_manager_utils');
var api_1 = require('../core/render/api');
var render_1 = require('../core/render/render');
var application_tokens_1 = require('../core/application_tokens');
var serializer_1 = require('../web_workers/shared/serializer');
var utils_1 = require('./utils');
var compiler_1 = require('../compiler/compiler');
var dom_renderer_1 = require('../core/render/dom/dom_renderer');
var dynamic_component_loader_2 = require('../core/linker/dynamic_component_loader');
var view_manager_2 = require('../core/linker/view_manager');
function _getRootProviders() {
  return [di_1.provide(reflection_1.Reflector, {useValue: reflection_1.reflector})];
}
function _getAppBindings() {
  var appDoc;
  try {
    appDoc = dom_adapter_1.DOM.defaultDoc();
  } catch (e) {
    appDoc = null;
  }
  return [compiler_1.compilerProviders(), di_1.provide(change_detection_1.ChangeDetectorGenConfig, {useValue: new change_detection_1.ChangeDetectorGenConfig(true, false, true)}), di_1.provide(render_1.DOCUMENT, {useValue: appDoc}), di_1.provide(render_1.DomRenderer, {useClass: dom_renderer_1.DomRenderer_}), di_1.provide(api_1.Renderer, {useExisting: render_1.DomRenderer}), di_1.provide(application_tokens_1.APP_ID, {useValue: 'a'}), render_1.DomSharedStylesHost, di_1.provide(render_1.SharedStylesHost, {useExisting: render_1.DomSharedStylesHost}), view_pool_1.AppViewPool, di_1.provide(view_manager_1.AppViewManager, {useClass: view_manager_2.AppViewManager_}), view_manager_utils_1.AppViewManagerUtils, serializer_1.Serializer, debug_1.ELEMENT_PROBE_PROVIDERS, di_1.provide(view_pool_1.APP_VIEW_POOL_CAPACITY, {useValue: 500}), proto_view_factory_1.ProtoViewFactory, di_1.provide(directive_resolver_1.DirectiveResolver, {useClass: directive_resolver_mock_1.MockDirectiveResolver}), di_1.provide(view_resolver_1.ViewResolver, {useClass: view_resolver_mock_1.MockViewResolver}), di_1.provide(change_detection_1.IterableDiffers, {useValue: change_detection_1.defaultIterableDiffers}), di_1.provide(change_detection_1.KeyValueDiffers, {useValue: change_detection_1.defaultKeyValueDiffers}), utils_1.Log, di_1.provide(dynamic_component_loader_1.DynamicComponentLoader, {useClass: dynamic_component_loader_2.DynamicComponentLoader_}), pipe_resolver_1.PipeResolver, di_1.provide(exceptions_1.ExceptionHandler, {useValue: new exceptions_1.ExceptionHandler(dom_adapter_1.DOM)}), di_1.provide(location_strategy_1.LocationStrategy, {useClass: mock_location_strategy_1.MockLocationStrategy}), di_1.provide(xhr_1.XHR, {useClass: dom_adapter_1.DOM.getXHR()}), test_component_builder_1.TestComponentBuilder, di_1.provide(ng_zone_1.NgZone, {useClass: ng_zone_mock_1.MockNgZone}), di_1.provide(animation_builder_1.AnimationBuilder, {useClass: animation_builder_mock_1.MockAnimationBuilder}), event_manager_1.EventManager, new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, {
    useClass: event_manager_1.DomEventsPlugin,
    multi: true
  })];
}
function createTestInjector(providers) {
  var rootInjector = di_2.Injector.resolveAndCreate(_getRootProviders());
  return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), providers));
}
exports.createTestInjector = createTestInjector;
function inject(tokens, fn) {
  return new FunctionWithParamTokens(tokens, fn, false);
}
exports.inject = inject;
function injectAsync(tokens, fn) {
  return new FunctionWithParamTokens(tokens, fn, true);
}
exports.injectAsync = injectAsync;
var FunctionWithParamTokens = (function() {
  function FunctionWithParamTokens(_tokens, _fn, isAsync) {
    this._tokens = _tokens;
    this._fn = _fn;
    this.isAsync = isAsync;
  }
  FunctionWithParamTokens.prototype.execute = function(injector) {
    var params = this._tokens.map(function(t) {
      return injector.get(t);
    });
    return lang_1.FunctionWrapper.apply(this._fn, params);
  };
  FunctionWithParamTokens.prototype.hasToken = function(token) {
    return this._tokens.indexOf(token) > -1;
  };
  return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
