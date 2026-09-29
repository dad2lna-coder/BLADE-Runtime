/**
 * BLADE Runtime Shell
 * Generic application shell for module discovery, loading, and lifecycle management.
 */
(function () {
  "use strict";

  // Ensure Scheduler exists as global singleton
  window.Scheduler = window.Scheduler || {};
  var S = window.Scheduler;

  // Runtime state
  var runtime = {
    modules: {},
    contracts: {},
    eventBus: null,
    manifest: null,
    initialized: false
  };

  // Simple event bus implementation
  function createEventBus() {
    var listeners = {};
    return {
      subscribe: function (event, callback) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
        return function () {
          var index = listeners[event].indexOf(callback);
          if (index > -1) listeners[event].splice(index, 1);
        };
      },
      publish: function (event, data) {
        if (listeners[event]) {
          listeners[event].forEach(function (callback) {
            try {
              callback(data);
            } catch (e) {
              console.error("Event handler error for " + event + ":", e);
            }
          });
        }
      }
    };
  }

  // Shared contracts
  function createContracts() {
    return {
      ScheduleState: {
        lines: [],
        shifts: [],
        schedule: {},
        startDate: null,
        getLine: function (id) {
          return this.lines.find(function (l) { return l.id === id; });
        },
        setLines: function (lines) {
          this.lines = lines;
          runtime.eventBus.publish("schedule:lines:updated", lines);
        }
      },
      CoverageState: {
        slots: [],
        hourlyByDow: [],
        setSlots: function (slots) {
          this.slots = slots;
          runtime.eventBus.publish("coverage:slots:updated", slots);
        }
      },
      ThemeState: {
        current: "dark",
        available: ["dark", "presentation"],
        set: function (theme) {
          this.current = theme;
          runtime.eventBus.publish("theme:changed", theme);
        },
        get: function () {
          return this.current;
        }
      }
    };
  }

  // Module lifecycle
  function loadModule(name, descriptor) {
    return new Promise(function (resolve, reject) {
      if (runtime.modules[name]) {
        resolve(runtime.modules[name]);
        return;
      }

      var entry = descriptor.entry;
      if (!entry) {
        reject(new Error("Module " + name + " has no entry point"));
        return;
      }

      import(new URL(entry, window.location.href).href)
        .then(function (mod) {
          var moduleInstance = {
            name: name,
            descriptor: descriptor,
            exports: mod,
            initialized: false
          };
          runtime.modules[name] = moduleInstance;
          resolve(moduleInstance);
        })
        .catch(function (err) {
          if (descriptor.optional) {
            console.warn("Optional module " + name + " failed to load:", err);
            resolve(null);
          } else {
            reject(err);
          }
        });
    });
  }

  function initializeModule(moduleInstance) {
    if (!moduleInstance || moduleInstance.initialized) return;

    var descriptor = moduleInstance.descriptor;
    var mod = moduleInstance.exports;
    var initFn = mod[descriptor.init] || mod.init || mod.default;

    if (typeof initFn === "function") {
      var context = {
        contracts: runtime.contracts,
        eventBus: runtime.eventBus,
        state: runtime.contracts,
        registerTab: function (tab) {
          if (!S.tabs) S.tabs = [];
          S.tabs.push(tab);
        },
        registerFKey: function (fkey) {
          if (!S.fkeys) S.fkeys = [];
          S.fkeys.push(fkey);
        }
      };

      try {
        initFn.call(mod, context);
        moduleInstance.initialized = true;
      } catch (e) {
        console.error("Failed to initialize module " + moduleInstance.name + ":", e);
      }
    }
  }

  function resolveDependencies(manifest) {
    var modules = Object.keys(manifest);
    var sorted = [];
    var visited = {};
    var visiting = {};

    function visit(name) {
      if (visited[name]) return;
      if (visiting[name]) {
        throw new Error("Circular dependency detected involving " + name);
      }

      visiting[name] = true;
      var deps = manifest[name].dependencies || [];
      deps.forEach(visit);
      visiting[name] = false;
      visited[name] = true;
      sorted.push(name);
    }

    modules.forEach(visit);
    return sorted;
  }

  function loadAndInitializeModules(manifest) {
    var order = resolveDependencies(manifest);
    var promises = [];

    order.forEach(function (name) {
      var descriptor = manifest[name];
      var promise = loadModule(name, descriptor)
        .then(function (moduleInstance) {
          if (moduleInstance) {
            initializeModule(moduleInstance);
          }
        })
        .catch(function (err) {
          if (!descriptor.optional) {
            console.error("Failed to load required module " + name + ":", err);
          }
        });
      promises.push(promise);
    });

    return Promise.all(promises);
  }

  // Public runtime API
  S.runtime = {
    getContracts: function () {
      return runtime.contracts;
    },
    getEventBus: function () {
      return runtime.eventBus;
    },
    getModule: function (name) {
      return runtime.modules[name];
    },
    isInitialized: function () {
      return runtime.initialized;
    }
  };

  // Initialize runtime
  function init() {
    runtime.eventBus = createEventBus();
    runtime.contracts = createContracts();

    // Load manifest
    fetch("modules/manifest.json")
      .then(function (resp) {
        if (!resp.ok) throw new Error("Manifest fetch failed: " + resp.status);
        return resp.json();
      })
      .then(function (manifest) {
        runtime.manifest = manifest;
        return loadAndInitializeModules(manifest);
      })
      .then(function () {
        runtime.initialized = true;
        runtime.eventBus.publish("runtime:ready");
      })
      .catch(function (err) {
        console.error("Runtime initialization failed:", err);
      });
  }

  // Start runtime when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
