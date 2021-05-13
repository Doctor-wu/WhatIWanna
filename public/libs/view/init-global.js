let View;
export function initGlobal(_View) {
  View = _View;

  View.extend = extend;
  View.usePlugin = usePlugin;
}

function extend(config) {
  function ViewComponent() {
    View.call(this, config);
  }
  ViewComponent.prototype = Object.create(View.prototype);
  ViewComponent.prototype.constructor = ViewComponent;

  return ViewComponent;
}

function usePlugin(Plugin) {
  Plugin.install(View);
};
