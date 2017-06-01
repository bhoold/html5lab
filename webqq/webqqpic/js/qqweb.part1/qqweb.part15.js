Jx().$package("alloy.windowManager", function (b) {
    var d = b.event,
        c, e, g, j, l = {
            onWidnowCreated: function (b) {
                c.push(b);
                e[b.getId()] = b;
                b.windowType == "widget" ? j.push(b) : g.push(b);
                d.addObserver(b, "destroy", l.onWindowDestroy)
            },
            onWindowDestroy: function (d) {
                e[d.getId()] = null;
                d.windowType == "widget" ? b.array.remove(j, d) : b.array.remove(g, d);
                b.array.remove(c, d)
            }
        };
    this.init = function () {
        c = [];
        e = {};
        g = [];
        j = [];
        d.addObserver(alloy.windowFactory, "WindowCreated", l.onWidnowCreated)
    };
    this.getWindow = function (b) {
        return e[b]
    };
    this.getWindowList = function () {
        return c
    };
    this.getOnlyWindowList = function () {
        return g
    };
    this.getOnlyWidgetList = function () {
        return j
    };
    this.setCurrentWindow = function (b) {
        var c = alloy.desktopManager.getCurrentDesktop();
        b.desktopIndex !== c.getIndex() && alloy.desktopManager.setCurrentDesktop(b.desktopIndex);
        c = alloy.desktopManager.getCurrentDesktop();
        c.getWindowManager().setCurrentWindow(b)
    };
    this.getCurrentWindow = function () {
        return alloy.desktopManager.getCurrentDesktop().getWindowManager().getCurrentWindow()
    }
});