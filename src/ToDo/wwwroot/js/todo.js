// Source: https://jsfiddle.net/briguy37/2MVFd/
function generateUuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

$(document).ready(function () {
    // Precompile the to do item template
    var source = $("#todo-item-template").html();
    var template = Handlebars.compile(source);

    var items = $("#todo-items");

    // Get to do item from the ID assigned when created
    function getItemByItemId(id) {
        var item = $(".todo-item[item-id='" + id + "']");
        return item;
    }

    function addItem(description) {
        var context = {
            "description": description,
            "item-id": generateUuid()
        }

        var html = template(context);
        items.append(html);
    }

    function addNewTask() {
        // Get description textarea
        var descBox = $("#new-task-description");

        // If the description is only whitespace, then ignore it
        if ($.trim(descBox.val()) === "") {
            return;
        }

        // Get description from textarea and add item 
        addItem(descBox.val());

        // Clear the text area
        descBox.val("");
    }

    // If ctrl + enter is hit then add the task
    $("#new-task-description").keydown(function(key) {
        if (key.ctrlKey && key.keyCode === 13) {
            addNewTask();
        }
    });

    // New task button click handler
    $(document).on("click", ".new-task-add", function () {
        addNewTask();
    });

    // Click event listener for all item done buttons
    $(document).on("click", ".todo-item-done", function() {
        // Get item to strike through by it's item-id
        var id = $(this).attr("item-id");
        var item = getItemByItemId(id);

        // Get the description from within the found item
        var description = item.find(".todo-item-description");

        // Toggle strike-through
        description.toggleClass("strikeout");
        item.toggleClass("item-done");
    });

    // Click event listener for all item delete buttons
    $(document).on("click", ".todo-item-delete", function() {
        // Get item to remove by it's item-id
        var id = $(this).attr("item-id");
        var item = getItemByItemId(id);

        // Fade out
        item.fadeOut("fast", function () {
            // Remove once fade out is complete
            item.remove();
        });
    });

    $("body").on({
        mouseenter: function () {
            $(this).find(".todo-item-done").fadeIn("fast");
            $(this).find(".todo-item-delete").fadeIn("fast");

        },
        mouseleave: function () {
            $(this).find(".todo-item-done").fadeOut("fast");
            $(this).find(".todo-item-delete").fadeOut("fast");
        }
    }, ".todo-item");
});