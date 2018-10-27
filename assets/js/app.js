$(document).ready(function () {
    
    var themes = [];
    
    function renderBtns() {
        // prevents rendering of previous theme button
        $("#gif-btns").empty();
        // Loop through array of themes
        for (var i = 0; i < themes.length; i++) {
            // Then dynamicaly generate buttons for each theme in arr.
            // $("<button>") will create the start and end tag. (<button></button>)
            var b = $("<button>");
            // Adding a class
            b.addClass("theme");
            // Adding b data-attribute with b value of the theme at index i
            b.attr("theme-name", themes[i]);
            // Providing the button's text with b value of the theme at index i
            b.text(themes[i]);
            // Add to HTML
            $("#gif-btns").prepend(b);
        }
    }
    $("#add-theme").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // This line will grab the text from the input box - parses any whitespace entered by user
        var themeInput = $("#theme-input").val().trim();

        // Prevent user from entering blank entry into "add a theme" field
        if (themeInput.length < 1 || themes.includes(themeInput)) {
            return
        }

        // Clear theme input after user clicks enter or "create gif button"
        $("#theme-input").val("");

        // The theme from the textbox is then added to our array
        themes.push(themeInput);
        console.log("theme", themeInput);
        // call the render buttons function - 
        renderBtns();
    });
    
    $(document).on("click", "button", function () {
        var themeChoice = $(this).attr("theme-name");
        console.log(themeChoice);
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
                // Render elements
                // Div to hold img tag below
                var gifDiv = $("<div>");
                // img tag for gifs
                var themeImg = $("<img>");
                // p tag to hold rating of gifs
                var p = $("<p>").text("Rating: " + results[i].rating);
                // create attribute - class = "gif"
                themeImg.attr("class", "gif");
                // create attribute - src = "index of result fixed height"
                themeImg.attr("src", results[i].images.fixed_width.url);
                
                themeImg.attr("data-still", results[i].images.fixed_width_still.url);

                themeImg.attr("data-animate", results[i].images.fixed_width.url);

                themeImg.attr("data-state", "still");
                // append the img and the p tag onto the div
                gifDiv.append(themeImg);

                gifDiv.append(p);
                // prepend the gifDiv contents to gifs-here div
                $("#gifs-here").prepend(gifDiv);

            }
            // data-state for gifs is still by default
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                // since gif still by default, make gif animate
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        }); // "then" AJAX function CLOSING
        
    }); // document.on("click") for AJAX CLOSING
    
}); // Document.ready(function) CLOSING