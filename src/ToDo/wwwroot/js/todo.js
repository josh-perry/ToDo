$(document).ready(function () {
    console.log("Ready");

    var source = $("#todo-item-template").html();
    var template = Handlebars.compile(source);

    var items = $("#todo-items");

    for (var i = 0; i < 4; i++) {
        var context = {
            description: "Lorem ipsum " + i
        }

        var html = template(context);
        items.append(html);
    }
});