function loadConfig() {
    var url = "";
    $.ajax({
        type: "GET",
        url: "config.json",
        dataType: "text",
        async: false,
        success: function (rs) {
            url = JSON.parse(rs).url
        },
        error: function (e) {
            //console.log(e)
        }
    });
    return url;
}