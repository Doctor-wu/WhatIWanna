function showNotice(msg) {
    //发送通知

    if (Notification.permission == "default") {
        Notification.requestPermission();
    } else {
        newNotify = function() {
                var notification = new Notification("系统通知:", {
                    dir: "auto",
                    lang: "hi",
                    requireInteraction: true,
                    //tag: "testTag",
                    icon: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png",
                    body: msg
                });
                notification.onclick = function(event) {
                    //回到发送此通知的页面
                    window.focus();
                    //回来后要做什么
                    console.log("I'm back");
                }
            }
            //权限判断
        if (Notification.permission == "granted") {
            newNotify();
        } else {
            //请求权限
            Notification.requestPermission(function(perm) {
                if (perm == "granted") {
                    newNotify();
                }
            })
        }
    }
}