$(document).ready(function () {
    // "Dogs", "Cats", "Birds", "Bears", "Llama"
    var themes = ["Dogs", "Cats", "Birds", "Bears", "Llama"];

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
            $("#gif-btns").append(b);
        }
    }
    $("#add-theme").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        //form used so user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var themeInput = $("#theme-input").val().trim();
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

                var gifDiv = $("<div>");
        
                var themeImg = $("<img>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                themeImg.attr("class", "gif");

                themeImg.attr("src", results[i].images.fixed_height.url);
                
                themeImg.attr("data-still", results[i].images.fixed_height_still.url);

                themeImg.attr("data-animate", results[i].images.fixed_height.url);

                themeImg.attr("data-state", "still");

                gifDiv.append(themeImg);

                gifDiv.append(p);

                $("#gifs-here").prepend(gifDiv);

                $(".gif").on("click", function() {
                console.log("this",this);
                var state = $(this).attr("data-state");
                if (state === "still") {
                    console.log("state === still")
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
                });


            }
        
        }); // "then" AJAX function CLOSING
        
    }); // document.on("click") for AJAX CLOSING
    
}); // Document.ready(function) CLOSING