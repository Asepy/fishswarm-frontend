(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[235],{4288:function(t,e,n){"use strict";n.d(e,{L:function(){return s},h:function(){return c}});var r=n(3808),i=n(8500),u=n(7294),[o,s]=(0,i.k)({strict:!1,name:"PortalManagerContext"});function c(t){var{children:e,zIndex:n}=t;return u.createElement(o,{value:{zIndex:n}},e)}r.Ts&&(c.displayName="PortalManager")},9852:function(t,e,n){"use strict";n.d(e,{j:function(){return o}});var r=n(3275),i=n(2943),u=n(2288),o=new(function(t){function e(){return t.apply(this,arguments)||this}(0,r.Z)(e,t);var n=e.prototype;return n.onSubscribe=function(){this.removeEventListener||this.setDefaultEventListener()},n.setEventListener=function(t){var e=this;this.removeEventListener&&this.removeEventListener(),this.removeEventListener=t((function(t){"boolean"===typeof t?e.setFocused(t):e.onFocus()}))},n.setFocused=function(t){this.focused=t,t&&this.onFocus()},n.onFocus=function(){this.listeners.forEach((function(t){t()}))},n.isFocused=function(){return"boolean"===typeof this.focused?this.focused:"undefined"===typeof document||[void 0,"visible","prerender"].includes(document.visibilityState)},n.setDefaultEventListener=function(){var t;!u.sk&&(null==(t=window)?void 0:t.addEventListener)&&this.setEventListener((function(t){var e=function(){return t()};return window.addEventListener("visibilitychange",e,!1),window.addEventListener("focus",e,!1),function(){window.removeEventListener("visibilitychange",e),window.removeEventListener("focus",e)}}))},e}(i.l))},6747:function(t,e,n){"use strict";var r=n(6755);n.o(r,"QueryClientProvider")&&n.d(e,{QueryClientProvider:function(){return r.QueryClientProvider}}),n.o(r,"useQuery")&&n.d(e,{useQuery:function(){return r.useQuery}})},1909:function(t,e,n){"use strict";n.d(e,{j:function(){return u},E:function(){return o}});var r=n(2288),i=console||{error:r.ZT,warn:r.ZT,log:r.ZT};function u(){return i}function o(t){i=t}},101:function(t,e,n){"use strict";n.d(e,{V:function(){return i}});var r=n(2288),i=new(function(){function t(){this.queue=[],this.transactions=0,this.notifyFn=function(t){t()},this.batchNotifyFn=function(t){t()}}var e=t.prototype;return e.batch=function(t){this.transactions++;var e=t();return this.transactions--,this.transactions||this.flush(),e},e.schedule=function(t){var e=this;this.transactions?this.queue.push(t):(0,r.A4)((function(){e.notifyFn(t)}))},e.batchCalls=function(t){var e=this;return function(){for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];e.schedule((function(){t.apply(void 0,r)}))}},e.flush=function(){var t=this,e=this.queue;this.queue=[],e.length&&(0,r.A4)((function(){t.batchNotifyFn((function(){e.forEach((function(e){t.notifyFn(e)}))}))}))},e.setNotifyFunction=function(t){this.notifyFn=t},e.setBatchNotifyFunction=function(t){this.batchNotifyFn=t},t}())},2943:function(t,e,n){"use strict";n.d(e,{l:function(){return r}});var r=function(){function t(){this.listeners=[]}var e=t.prototype;return e.subscribe=function(t){var e=this,n=t||function(){};return this.listeners.push(n),this.onSubscribe(),function(){e.listeners=e.listeners.filter((function(t){return t!==n})),e.onUnsubscribe()}},e.hasListeners=function(){return this.listeners.length>0},e.onSubscribe=function(){},e.onUnsubscribe=function(){},t}()},6755:function(){},2288:function(t,e,n){"use strict";n.d(e,{sk:function(){return i},ZT:function(){return u},SE:function(){return o},PN:function(){return s},Kp:function(){return a},_v:function(){return f},I6:function(){return l},_x:function(){return h},X7:function(){return d},Rm:function(){return p},yF:function(){return v},to:function(){return y},Q$:function(){return m},VS:function(){return R},Gh:function(){return g},A4:function(){return C}});var r=n(4786),i="undefined"===typeof window;function u(){}function o(t,e){return"function"===typeof t?t(e):t}function s(t){return"number"===typeof t&&t>=0&&t!==1/0}function c(t){return Array.isArray(t)?t:[t]}function a(t,e){return Math.max(t+(e||0)-Date.now(),0)}function f(t,e,n){return S(t)?"function"===typeof e?(0,r.Z)({},n,{queryKey:t,queryFn:e}):(0,r.Z)({},e,{queryKey:t}):t}function l(t,e,n){return S(t)?[(0,r.Z)({},e,{queryKey:t}),n]:[t||{},e]}function h(t,e){var n,r=t.active,i=t.exact,u=t.fetching,o=t.inactive,s=t.predicate,c=t.queryKey,a=t.stale;if(S(c))if(i){if(e.queryHash!==p(c,e.options))return!1}else if(!y(e.queryKey,c))return!1;return!1===o||r&&!o?n=!0:(!1===r||o&&!r)&&(n=!1),("boolean"!==typeof n||e.isActive()===n)&&(("boolean"!==typeof a||e.isStale()===a)&&(("boolean"!==typeof u||e.isFetching()===u)&&!(s&&!s(e))))}function d(t,e){var n=t.exact,r=t.fetching,i=t.predicate,u=t.mutationKey;if(S(u)){if(!e.options.mutationKey)return!1;if(n){if(v(e.options.mutationKey)!==v(u))return!1}else if(!y(e.options.mutationKey,u))return!1}return("boolean"!==typeof r||"loading"===e.state.status===r)&&!(i&&!i(e))}function p(t,e){return((null==e?void 0:e.queryKeyHashFn)||v)(t)}function v(t){var e,n=Array.isArray(t)?t:[t];return e=n,JSON.stringify(e,(function(t,e){return Q(e)?Object.keys(e).sort().reduce((function(t,n){return t[n]=e[n],t}),{}):e}))}function y(t,e){return b(c(t),c(e))}function b(t,e){return t===e||typeof t===typeof e&&(!(!t||!e||"object"!==typeof t||"object"!==typeof e)&&!Object.keys(e).some((function(n){return!b(t[n],e[n])})))}function m(t,e){if(t===e)return t;var n=Array.isArray(t)&&Array.isArray(e);if(n||Q(t)&&Q(e)){for(var r=n?t.length:Object.keys(t).length,i=n?e:Object.keys(e),u=i.length,o=n?[]:{},s=0,c=0;c<u;c++){var a=n?c:i[c];o[a]=m(t[a],e[a]),o[a]===t[a]&&s++}return r===u&&s===r?t:o}return e}function R(t,e){if(t&&!e||e&&!t)return!1;for(var n in t)if(t[n]!==e[n])return!1;return!0}function Q(t){if(!E(t))return!1;var e=t.constructor;if("undefined"===typeof e)return!0;var n=e.prototype;return!!E(n)&&!!n.hasOwnProperty("isPrototypeOf")}function E(t){return"[object Object]"===Object.prototype.toString.call(t)}function S(t){return"string"===typeof t||Array.isArray(t)}function g(t){return new Promise((function(e){setTimeout(e,t)}))}function C(t){Promise.resolve().then(t).catch((function(t){return setTimeout((function(){throw t}))}))}},8767:function(t,e,n){"use strict";n.d(e,{QueryClientProvider:function(){return i.aH},useQuery:function(){return i.aM}});var r=n(6747);n.o(r,"QueryClientProvider")&&n.d(e,{QueryClientProvider:function(){return r.QueryClientProvider}}),n.o(r,"useQuery")&&n.d(e,{useQuery:function(){return r.useQuery}});var i=n(3122)},3122:function(t,e,n){"use strict";n.d(e,{aH:function(){return l},aM:function(){return g}});var r=n(101),i=n(3935).unstable_batchedUpdates;r.V.setBatchNotifyFunction(i);var u=n(1909),o=console;o&&(0,u.E)(o);var s=n(7294),c=s.createContext(void 0),a=s.createContext(!1);function f(t){return t&&"undefined"!==typeof window?(window.ReactQueryClientContext||(window.ReactQueryClientContext=c),window.ReactQueryClientContext):c}var l=function(t){var e=t.client,n=t.contextSharing,r=void 0!==n&&n,i=t.children;s.useEffect((function(){return e.mount(),function(){e.unmount()}}),[e]);var u=f(r);return s.createElement(a.Provider,{value:r},s.createElement(u.Provider,{value:e},i))},h=n(4786),d=n(3275),p=n(2288),v=n(9852),y=function(t){function e(e,n){var r;return(r=t.call(this)||this).client=e,r.options=n,r.trackedProps=[],r.previousSelectError=null,r.bindMethods(),r.setOptions(n),r}(0,d.Z)(e,t);var n=e.prototype;return n.bindMethods=function(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)},n.onSubscribe=function(){1===this.listeners.length&&(this.currentQuery.addObserver(this),b(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())},n.onUnsubscribe=function(){this.listeners.length||this.destroy()},n.shouldFetchOnReconnect=function(){return t=this.currentQuery,!1!==(e=this.options).enabled&&("always"===e.refetchOnReconnect||!1!==e.refetchOnReconnect&&R(t,e));var t,e},n.shouldFetchOnWindowFocus=function(){return t=this.currentQuery,!1!==(e=this.options).enabled&&("always"===e.refetchOnWindowFocus||!1!==e.refetchOnWindowFocus&&R(t,e));var t,e},n.destroy=function(){this.listeners=[],this.clearTimers(),this.currentQuery.removeObserver(this)},n.setOptions=function(t,e){var n=this.options,r=this.currentQuery;if(this.options=this.client.defaultQueryObserverOptions(t),"undefined"!==typeof this.options.enabled&&"boolean"!==typeof this.options.enabled)throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=n.queryKey),this.updateQuery();var i=this.hasListeners();i&&m(this.currentQuery,r,this.options,n)&&this.executeFetch(),this.updateResult(e),!i||this.currentQuery===r&&this.options.enabled===n.enabled&&this.options.staleTime===n.staleTime||this.updateStaleTimeout(),!i||this.currentQuery===r&&this.options.enabled===n.enabled&&this.options.refetchInterval===n.refetchInterval||this.updateRefetchInterval()},n.getOptimisticResult=function(t){var e=this.client.defaultQueryObserverOptions(t),n=this.client.getQueryCache().build(this.client,e);return this.createResult(n,e)},n.getCurrentResult=function(){return this.currentResult},n.trackResult=function(t){var e=this,n={};return Object.keys(t).forEach((function(r){Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:function(){var n=r;return e.trackedProps.includes(n)||e.trackedProps.push(n),t[n]}})})),n},n.getNextResult=function(t){var e=this;return new Promise((function(n,r){var i=e.subscribe((function(e){e.isFetching||(i(),e.isError&&(null==t?void 0:t.throwOnError)?r(e.error):n(e))}))}))},n.getCurrentQuery=function(){return this.currentQuery},n.remove=function(){this.client.getQueryCache().remove(this.currentQuery)},n.refetch=function(t){return this.fetch(t)},n.fetchOptimistic=function(t){var e=this,n=this.client.defaultQueryObserverOptions(t),r=this.client.getQueryCache().build(this.client,n);return r.fetch().then((function(){return e.createResult(r,n)}))},n.fetch=function(t){var e=this;return this.executeFetch(t).then((function(){return e.updateResult(),e.currentResult}))},n.executeFetch=function(t){this.updateQuery();var e=this.currentQuery.fetch(this.options,t);return(null==t?void 0:t.throwOnError)||(e=e.catch(p.ZT)),e},n.updateStaleTimeout=function(){var t=this;if(this.clearStaleTimeout(),!p.sk&&!this.currentResult.isStale&&(0,p.PN)(this.options.staleTime)){var e=(0,p.Kp)(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout((function(){t.currentResult.isStale||t.updateResult()}),e)}},n.updateRefetchInterval=function(){var t=this;this.clearRefetchInterval(),!p.sk&&!1!==this.options.enabled&&(0,p.PN)(this.options.refetchInterval)&&(this.refetchIntervalId=setInterval((function(){(t.options.refetchIntervalInBackground||v.j.isFocused())&&t.executeFetch()}),this.options.refetchInterval))},n.updateTimers=function(){this.updateStaleTimeout(),this.updateRefetchInterval()},n.clearTimers=function(){this.clearStaleTimeout(),this.clearRefetchInterval()},n.clearStaleTimeout=function(){clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0},n.clearRefetchInterval=function(){clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0},n.createResult=function(t,e){var n,r,i=this.currentQuery,o=this.options,s=this.currentResult,c=this.currentResultState,a=this.currentResultOptions,f=t!==i,l=f?t.state:this.currentQueryInitialState,h=f?this.currentResult:this.previousQueryResult,d=t.state,v=d.dataUpdatedAt,y=d.error,Q=d.errorUpdatedAt,E=d.isFetching,S=d.status,g=!1,C=!1;if(e.optimisticResults){var O=this.hasListeners(),w=!O&&b(t,e),F=O&&m(t,i,e,o);(w||F)&&(E=!0,v||(S="loading"))}if(e.keepPreviousData&&!d.dataUpdateCount&&(null==h?void 0:h.isSuccess)&&"error"!==S)n=h.data,v=h.dataUpdatedAt,S=h.status,g=!0;else if(e.select&&"undefined"!==typeof d.data)if(s&&d.data===(null==c?void 0:c.data)&&e.select===(null==a?void 0:a.select)&&!this.previousSelectError)n=s.data;else try{n=e.select(d.data),!1!==e.structuralSharing&&(n=(0,p.Q$)(null==s?void 0:s.data,n)),this.previousSelectError=null}catch(P){(0,u.j)().error(P),y=P,this.previousSelectError=P,Q=Date.now(),S="error"}else n=d.data;"undefined"!==typeof e.placeholderData&&"undefined"===typeof n&&"loading"===S&&("undefined"!==typeof(r=(null==s?void 0:s.isPlaceholderData)&&e.placeholderData===(null==a?void 0:a.placeholderData)?s.data:"function"===typeof e.placeholderData?e.placeholderData():e.placeholderData)&&(S="success",n=r,C=!0));return{status:S,isLoading:"loading"===S,isSuccess:"success"===S,isError:"error"===S,isIdle:"idle"===S,data:n,dataUpdatedAt:v,error:y,errorUpdatedAt:Q,failureCount:d.fetchFailureCount,isFetched:d.dataUpdateCount>0||d.errorUpdateCount>0,isFetchedAfterMount:d.dataUpdateCount>l.dataUpdateCount||d.errorUpdateCount>l.errorUpdateCount,isFetching:E,isLoadingError:"error"===S&&0===d.dataUpdatedAt,isPlaceholderData:C,isPreviousData:g,isRefetchError:"error"===S&&0!==d.dataUpdatedAt,isStale:R(t,e),refetch:this.refetch,remove:this.remove}},n.shouldNotifyListeners=function(t,e){if(!e)return!0;if(t===e)return!1;var n=this.options,r=n.notifyOnChangeProps,i=n.notifyOnChangePropsExclusions;if(!r&&!i)return!0;if("tracked"===r&&!this.trackedProps.length)return!0;var u="tracked"===r?this.trackedProps:r;return Object.keys(t).some((function(n){var r=n,o=t[r]!==e[r],s=null==u?void 0:u.some((function(t){return t===n})),c=null==i?void 0:i.some((function(t){return t===n}));return o&&!c&&(!u||s)}))},n.updateResult=function(t){var e=this.currentResult;if(this.currentResult=this.createResult(this.currentQuery,this.options),this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,!(0,p.VS)(this.currentResult,e)){var n={cache:!0};!1!==(null==t?void 0:t.listeners)&&this.shouldNotifyListeners(this.currentResult,e)&&(n.listeners=!0),this.notify((0,h.Z)({},n,t))}},n.updateQuery=function(){var t=this.client.getQueryCache().build(this.client,this.options);if(t!==this.currentQuery){var e=this.currentQuery;this.currentQuery=t,this.currentQueryInitialState=t.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(null==e||e.removeObserver(this),t.addObserver(this))}},n.onQueryUpdate=function(t){var e={};"success"===t.type?e.onSuccess=!0:"error"===t.type&&(e.onError=!0),this.updateResult(e),this.hasListeners()&&this.updateTimers()},n.notify=function(t){var e=this;r.V.batch((function(){t.onSuccess?(null==e.options.onSuccess||e.options.onSuccess(e.currentResult.data),null==e.options.onSettled||e.options.onSettled(e.currentResult.data,null)):t.onError&&(null==e.options.onError||e.options.onError(e.currentResult.error),null==e.options.onSettled||e.options.onSettled(void 0,e.currentResult.error)),t.listeners&&e.listeners.forEach((function(t){t(e.currentResult)})),t.cache&&e.client.getQueryCache().notify({query:e.currentQuery,type:"observerResultsUpdated"})}))},e}(n(2943).l);function b(t,e){return function(t,e){return!1!==e.enabled&&!t.state.dataUpdatedAt&&!("error"===t.state.status&&!1===e.retryOnMount)}(t,e)||function(t,e){return!1!==e.enabled&&t.state.dataUpdatedAt>0&&("always"===e.refetchOnMount||!1!==e.refetchOnMount&&R(t,e))}(t,e)}function m(t,e,n,r){return!1!==n.enabled&&(t!==e||!1===r.enabled)&&R(t,n)}function R(t,e){return t.isStaleByTime(e.staleTime)}function Q(){var t=!1;return{clearReset:function(){t=!1},reset:function(){t=!0},isReset:function(){return t}}}var E=s.createContext(Q());function S(t,e){var n=s.useRef(!1),i=s.useState(0)[1],u=function(){var t=s.useContext(f(s.useContext(a)));if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t}(),o=s.useContext(E),c=u.defaultQueryObserverOptions(t);c.optimisticResults=!0,c.onError&&(c.onError=r.V.batchCalls(c.onError)),c.onSuccess&&(c.onSuccess=r.V.batchCalls(c.onSuccess)),c.onSettled&&(c.onSettled=r.V.batchCalls(c.onSettled)),c.suspense&&"number"!==typeof c.staleTime&&(c.staleTime=1e3),(c.suspense||c.useErrorBoundary)&&(o.isReset()||(c.retryOnMount=!1));var l=s.useRef();l.current||(l.current=new e(u,c));var h=l.current.getOptimisticResult(c);if(s.useEffect((function(){n.current=!0,o.clearReset();var t=l.current.subscribe(r.V.batchCalls((function(){n.current&&i((function(t){return t+1}))})));return l.current.updateResult(),function(){n.current=!1,t()}}),[o]),s.useEffect((function(){l.current.setOptions(c,{listeners:!1})}),[c]),c.suspense&&h.isLoading)throw l.current.fetchOptimistic(c).then((function(t){var e=t.data;null==c.onSuccess||c.onSuccess(e),null==c.onSettled||c.onSettled(e,null)})).catch((function(t){o.clearReset(),null==c.onError||c.onError(t),null==c.onSettled||c.onSettled(void 0,t)}));if((c.suspense||c.useErrorBoundary)&&h.isError)throw h.error;return"tracked"===c.notifyOnChangeProps&&(h=l.current.trackResult(h)),h}function g(t,e,n){return S((0,p._v)(t,e,n),y)}}}]);