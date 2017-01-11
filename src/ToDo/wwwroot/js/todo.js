$(document).ready(function () {
    // Source: https://jsfiddle.net/briguy37/2MVFd/
    function generateUuid() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    function getItemByItemId(id) {
        var item = $(".todo-item[item-id='" + id + "']");
        return item;
    }

    var source = $("#todo-item-template").html();
    var template = Handlebars.compile(source);

    var items = $("#todo-items");

    for (var i = 0; i < 4; i++) {
        var context = {
            "description": "Lorem ipsum " + i,
            "item-id": generateUuid()
        }

        var html = template(context);
        items.append(html);
    }

    // Click event listener for all item done buttons
    $(document).on("click", ".todo-item-done", function () {
        // Get item to strike through by it's item-id
        var id = $(this).attr("item-id");
        var item = getItemByItemId(id);

        // Get the description from within the found item
        var description = item.find(".todo-item-description");

        // Toggle strike-through
        description.toggleClass("strikeout");
    });

    // Click event listener for all item delete buttons
    $(document).on("click", ".todo-item-delete", function () {
        // Get item to remove by it's item-id
        var id = $(this).attr("item-id");
        var item = getItemByItemId(id);

        // Fade out
        item.fadeOut("fast", function () {
            // Remove once fade out is complete
            item.remove();
        });
    });
});