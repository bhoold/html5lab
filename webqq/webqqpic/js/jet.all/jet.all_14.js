Jx().$package(function (d) {
    d.localStorage = {
        setItem: function (b, d) {
            this.isSupports() && window.localStorage.setItem(b, d)
        },
        getItem: function (b) {
            return this.isSupports() ? window.localStorage.getItem(b) : null
        },
        removeItem: function (b) {
            this.isSupports() && window.localStorage.removeItem(b)
        },
        clear: function () {
            this.isSupports() && window.localStorage.clear()
        },
        isSupports: function () {
            return "localStorage" in window && window.localStorage !== null
        }
    }
});