
export function JSToNativeAPP(params) {
    let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        window.android.JSToNative(JSON.stringify(params))
    } else {
        // window.webkit.messageHandlers.JSToNative.postMessage(params)
        JSToNative(JSON.stringify(params))
    }
}
