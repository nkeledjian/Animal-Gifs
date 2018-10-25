$(document).ready(function () {
    var themes = [];
    function renderBtns() {

        $("#gif-btns").empty();

        // Loop through array of themes
        for (var i = 0; i < themes.length; i++) {
            // Then dynamicaly generate buttons for each theme in arr.
            // $("<button>") will create the start and end tag. (<button></button>)
            var b = $("<button>");
            // Adding a class
            b.addClass("theme");
            console.log("b tag", b);
            // Adding b data-attribute with b value of the theme at index i
            b.attr("theme-name", themes[i]);
            // Providing the button's text with b value of the theme at index i
            b.text(themes[i]);
            // Adding the button to the HTML
            $("#gif-btns").append(b);
        }
    }
    $("#add-theme").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        //form used so user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var theme = $("#theme-input").val().trim();
        // The theme from the textbox is then added to our array
        themes.push(theme);
        console.log("theme", theme);
        // call the render buttons function - 
        renderBtns();
    });
    // $(document).on(function () { // needed for following .on functions?
        $(document).on("click", "#gif-btns", function () {
            console.log('i am clicking....')
            console.log('this thing', this)
            var themeChoice = $(this).attr("theme-name");
            
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + themeChoice + "&api_key=iPmT5nea5OlsvqUmyx7SyJfzmxb6FHGy&limit=10";
            // Call AJAX HTTP get request with above URL convention
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                // store response.data to var results for convenience
                var results = response.data;

                console.log("Results", response.data);
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    var themeImg = $("<img>");

                    themeImg.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(themeImg);

                    $("#gifs-here").prepend(gifDiv);
                }
            });
        });
    // }); // Document.on(function) CLOSING  
}); // Document.ready(function) CLOSING