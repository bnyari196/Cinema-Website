/**
 * Validates the registration form using jQuery Validation plugin.
 * @global
 */
$(function() {
    $("form[name='registration']").validate({
        rules: {
            TOS: "required",
            name: {
                required: true,
                minlength: 2,
                maxlength: 25,
                regex: /^[a-zA-Z\s]+$/
            },
            phonenum: {
                required: true,
                minlength: 8,
                maxlength: 15,
                // Add regex for phone number validation
                regex: /^\d{8,15}$/
            },
            email: {
                required: true,
                email: true,
                maxlength: 50
            },
            message: {
                required: true,
                minlength: 10,
                maxlength: 100,
            }
        },
        messages: {
            name: {
                required: "Enter your First Name",
                regex: "Enter a valid First Name"
            },
            phonenum: {
                required: "Enter a valid Phone Number",
                regex: "Enter a valid Phone Number"
            },
            email: {
                required: "Please enter a valid email address",
                email: "Please enter a valid email address",
                maxlength: "Your email must be below 50 characters"
            },
            message: {
                required: "Please enter a message",
                minlength: "Message should be at least 10 characters long",
                maxlength: "Length must not exceed 100 characters"
            },
            TOS: {
                required: "This is a required field"
            }
        },
        errorPlacement: function(error, element) {
            // Display error message below the checkbox for TOS field
            if (element.attr("name") === "TOS") {
                error.insertAfter(element.parent());
            } else {
                error.insertBefore(element);
            }
            error.css("color", "red");
            element.addClass("error-field");
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    // Add custom method for regex validation
    $.validator.addMethod("regex", function(value, element, regexp) {
        return regexp.test(value);
    }, "Please enter a valid format.");

    $('#newsletter').change(function() {
        if ($(this).is(':checked')) {
            $('#topicSection').show();
        } else {
            $('#topicSection').hide();
        }
    });
});

/**
 * Adjusts the font size of headers, paragraphs, and intro elements based on the provided new font size.
 * Updates local storage with the new font size.
 * @param {number} newFontSize - The new font size value in pixels.
 * @global
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust font size for headers, paragraphs, and intro
    function adjust_font_size(newFontSize) {
        // Update body font size
        document.body.style.fontSize = newFontSize + 'px';
        
        // Update font size for .intro elements
        var intros = document.querySelectorAll('.intro');
        intros.forEach(function(intro) {
            intro.style.fontSize = newFontSize + 'px';
        });
        
        // Update font size for headers
        var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach(function(header) {
            header.style.fontSize = newFontSize + 'px';
        });
        
        // Update font size for paragraphs
        var paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(function(paragraph) {
            paragraph.style.fontSize = newFontSize + 'px';
        });

        // Update local storage
        localStorage.setItem('fontSize', newFontSize);
    }

    // Function to increase font size
    function increase_font_size() {
        var currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16; // Get current font size from local storage or default to 16px
        var newFontSize = currentFontSize + 10; // Increase font size by 10 pixels
        adjust_font_size(newFontSize);
    }

    // Function to decrease font size
    function decrease_font_size() {
        var currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16; // Get current font size from local storage or default to 16px
        var newFontSize = currentFontSize - 10; // Decrease font size by 10 pixels
        adjust_font_size(newFontSize);
    }

    // Event listener for magnifying glass icon to increase font size
    document.querySelector('.fa-magnifying-glass-plus').addEventListener('click', function() {
        increase_font_size();
    });

    // Event listener for magnifying glass icon to decrease font size
    document.querySelector('.fa-magnifying-glass-minus').addEventListener('click', function() {
        decrease_font_size();
    });

    // Apply font size from local storage on page load
    var storedFontSize = parseInt(localStorage.getItem('fontSize'));
    if (storedFontSize) {
        adjust_font_size(storedFontSize);
    }
});

/**
 * Resets font sizes to their original values by removing font-size styles and 'larger-text' class from all elements.
 * Removes the 'fontSize' item from local storage.
 * @global
 */
function resetFontSize() {
    // Reset font sizes to their original values
    document.querySelectorAll('*').forEach(element => {
        // Check if the element has font-size style defined
        if (element.style.fontSize) {
            element.style.removeProperty('font-size');
        }
        // Check if the element has font-size class defined
        if (element.classList.contains('larger-text')) {
            element.classList.remove('larger-text');
        }
    });

    // Update local storage to remove fontSize item
    localStorage.removeItem('fontSize');
}

/**
 * Applies the stored page style (light/dark) on page load.
 */
function applyStylesOnLoad() {
    var body = document.body;
    var storedStyle = localStorage.getItem('pageStyle'); // Use the same storage key

    if (storedStyle === 'dark') {
        applyDarkMode(body);
    } else {
        applyLightMode(body);
    }
}

/**
 * Applies dark mode styles to the specified element.
 * @param {HTMLElement} element - The element to which dark mode styles will be applied.
 */
function applyDarkMode(element) {
    element.style.backgroundColor = "#333";
    element.style.color = "rgb(245, 245, 245)";
    element.style.transition = "background-color 0.5s ease, color 0.5s ease"; // Add transition

     var footer = document.querySelector('footer');
    if (footer) {
        footer.style.backgroundColor = "#333";
        footer.style.color = "white";
    }

    var intro = document.querySelector('.intro');
    if (intro) {
        intro.style.backgroundColor = "#333";
        intro.style.color = "rgb(245, 245, 245)";
    }

    // Store the current page style
    localStorage.setItem('pageStyle', 'dark'); // Use the same storage key
}

/**
 * Applies light mode styles to the specified element.
 * @param {HTMLElement} element - The element to which light mode styles will be applied.
 */
function applyLightMode(element) {
    element.style.backgroundColor = "#fff";
    element.style.color = "#333";
    element.style.transition = "background-color 0.5s ease, color 0.5s ease"; // Add transition

    var footer = document.querySelector('footer');
    if (footer) {
        footer.style.backgroundColor = ""; // Reset to default
        footer.style.color = "#333";
    }


    var intro = document.querySelector('.intro');
    if (intro) {
        intro.style.backgroundColor = "#fff";
        intro.style.color = "#333";
    }

    // Store the current page style
    localStorage.setItem('pageStyle', 'light'); // Use the same storage key
}

/**
 * Toggles between light and dark theme modes and updates the theme icon accordingly when called.
 * @callback ThemeToggleCallback
 * @global
 */
function toggleTheme() {
    var body = document.body;
    var currentTheme = localStorage.getItem('pageStyle');

    if (currentTheme === 'dark') {
        applyLightMode(body);
        localStorage.setItem('pageStyle', 'light');
    } else {
        applyDarkMode(body);
        localStorage.setItem('pageStyle', 'dark');
    }

    updateIcon();
}

/**
 * Updates the theme icon based on the current theme mode stored in localStorage.
 * @callback UpdateIconCallback
 * @global
 */
function updateIcon() {
    var currentTheme = localStorage.getItem('pageStyle');
    var themeIcon = document.querySelector('.theme-icon-active use');

    if (currentTheme === 'dark') {
        themeIcon.setAttribute('href', '#moon-stars-fill');
    } else {
        themeIcon.setAttribute('href', '#sun-fill');
    }
}

// Apply styles on page load
applyStylesOnLoad();

// Add event listener for storage change
window.addEventListener('storage', applyStylesOnLoad);

/*  END OF DARK MODE                              */



/**
 * Initializes the autocomplete feature for a search input field with a predefined list of movie titles when the DOM content is fully loaded and parsed.
 * @callback AutocompleteInitializationCallback
 * @global
 */
$(document).ready(function() {
    var availableTags = [
        "Dune",
        "No Time to Die",
        "Spider-Man: No Way Home",
        "Black Widow",
        "Shang-Chi and the Legend of the Ten Rings",
        "The Matrix Resurrections",
        "Eternals",
        "Venom: Let There Be Carnage",
        "The Batman",
        "The Suicide Squad",
        "Free Guy",
        "Jungle Cruise",
        "Cruella",
        "A Quiet Place Part II",
        "F9: The Fast Saga",
        "Luca",
        "Godzilla vs. Kong",
        "Space Jam: A New Legacy",
        "The Green Knight",
        "Old"
    ];

    $("#tags").autocomplete({
        source: availableTags,
        open: function(event, ui) {
            $('.ui-autocomplete').css({
                'color': 'red', // Change 'red' to the color you want
                'z-index': '9999' // Set z-index to a high value
            });
        }
    });
});

/**
 * Initializes a slideshow that cycles through slides automatically when the DOM content is fully loaded and parsed.
 * @callback SlideshowInitializationCallback
 * @global
 */
$(document).ready(function() {
    let slideIndex = 1;
    showSlides();

    function showSlides() {
        let slides = $(".slideshow-slide");
        slides.css("right"); // Start all slides off screen to the right

        // Slide in the current slide from the right
        slides.eq(slideIndex).css("left", "100%").show().animate({ left: 0 }, 1000);

        // Slide out the previous slide to the left
        let prevSlideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
        slides.eq(prevSlideIndex).animate({ left: "-100%"}, 1000);

        // Move to the next slide
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }

        // Repeat the process after 4 seconds
        setTimeout(showSlides, 5000);
    }
});

/**
 * Displays the slideshow slide specified by the slide index when called.
 * @callback ShowSlidesCallback
 * @param {number} n - The index of the slide to be displayed.
 * @global
 */
var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slideshow-slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }


/**
 * Updates the displayed time every second with a greeting based on the time of the day when the DOM content is fully loaded and parsed.
 * @callback TimeDisplayUpdateCallback
 * @global
 */
$(document).ready(function(){

    var timeDisplay = document.getElementById("time");

    function refreshTime() {
        var now = new Date();
        var hour = now.getHours();
        var greeting;
        
        if (hour >= 12 && hour < 18) {
            greeting = "Good afternoon";
        } else if (hour >= 18 || hour < 6) {
            greeting = "Good evening";
        } else {
            greeting = "Good morning";
        }
        
        var dateString = now.toLocaleString("en-US");
        var formattedString = dateString.replace(", ", " - ");
        timeDisplay.innerHTML = `${greeting}, ${formattedString}`;
    }
    
    setInterval(refreshTime, 1000);
    
    // Initial call to display time immediately
    refreshTime();
});

/**
 * Initializes tooltips for elements with the 'tooltip' behavior when the DOM content is fully loaded and parsed.
 * @callback TooltipInitializationCallback
 * @global
 */
$( function() {
    $( document ).tooltip();
  } );

/**
 * Initializes dropdown functionality for elements with the 'dropdown-toggle' class when the DOM content is fully loaded and parsed.
 * @callback DropdownInitializationCallback
 * @global
 */
$(document).ready(function(){
    // Dropdown toggle event binding
    $('.dropdown-toggle').dropdown();
});

/**
 * Initializes hover effects for footer links, increasing font size on hover and reverting back when not hovered, when the DOM content is fully loaded and parsed.
 * @callback FooterLinkHoverEffectInitializationCallback
 * @global
 */
$(document).ready(function(){
const footerLinks = document.querySelectorAll('.footer-link');

$(document).ready(function(){
    $('.footer-link').hover(function(){
        $(this).animate({ fontSize: '1.1em' }, 'fast');
    }, function(){
        $(this).animate({ fontSize: '1em' }, 'fast');
    });
});
});

/**
 * Plays a YouTube video corresponding to the given video ID and updates the HTML with the embedded video player when called.
 * @param {string} videoId - The ID of the YouTube video to be played.
 * @global
 */
function playVideo(videoId) {
    const videoPlayers = {
         'Yw04cw-KWGA':'videoPlayer_1',
         'bD7bpG-zDJQ':'videoPlayer_2',
         'gizIbhk5Eu4':'videoPlayer_3',
         '4IO8DEhlRe0':'videoPlayer_4',
         'l3Zbh_GPNCM':'videoPlayer_5',

        // Update the player ID to match the HTML
        // Add more video IDs and corresponding player IDs as needed
    };
    

    console.log('Playing video with ID:', videoId);
    console.log('Available video IDs:', Object.keys(videoPlayers));

    // Get the video player container by ID
    const playerContainerId = videoPlayers[videoId];
    console.log('Player container ID for video ID:', playerContainerId);
    const playerContainer = $('#' + playerContainerId);

    // Check if the player container exists
    if (playerContainer.length) {
        // Replace the placeholder with the YouTube iframe player
        playerContainer.html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
        // Show the close button
        playerContainer.siblings('.close-button').show();
    } else {
        console.error(`Player container with ID '${playerContainerId}' not found.`);
    }
}

/**
 * Closes the YouTube video player associated with the given player container ID.
 * @param {string} playerContainerId - The ID of the container holding the video player.
 * @global
 */
function closeVideo(playerContainerId) {
    const playerContainer = $('#' + playerContainerId);
    if (playerContainer.length) {
        playerContainer.html(''); // Clear the content to close the video player
        // Hide the close button
        playerContainer.siblings('.close-button').hide();
    } else {
        console.error(`Player container with ID '${playerContainerId}' not found.`);
    }
}

/**
 * Initializes event listeners for video play, close, and show/hide functionality when the DOM content is fully loaded and parsed.
 * @callback VideoFunctionalityInitializationCallback
 * @global
 */
$(document).ready(function() {
    // Hide the close button initially when the page loads
    $('.close-button').addClass('d-none');

    // Add click event listener to the circle-play button
    $('.fa-circle-play').click(function() {
        // Hide the circle-play button when clicked
        $(this).addClass('d-none');
        // Show the close button when the circle-play button is clicked
        $(this).siblings('.close-button').removeClass('d-none');
    });

    // Add click event listener to the close button
    $('.close-button').click(function() {
        // Show the circle-play button when the close button is clicked
        $(this).siblings('.fa-circle-play').removeClass('d-none');
        // Hide the close button when clicked
        $(this).addClass('d-none');
    });
});

/**
 * Initializes the accordion functionality for the element with the id 'accordion' when the DOM content is fully loaded and parsed.
 * @callback AccordionInitializationCallback
 * @global
 */
$( function() {
    $( "#accordion" ).accordion();
  } );

/**
 * Initializes the show/hide functionality for the element with the id 'show-more1' and the corresponding toggle button when the DOM content is fully loaded and parsed.
 * @callback ShowHideInitializationCallback1
 * @global
 */ 
$(document).ready(function(){
    $("#show-more1").hide();
    $("#toggle-button1").click(function(){
        $("#show-more1").slideToggle();
    });
});

/**
 * Initializes the show/hide functionality for the element with the id 'show-more2' and the corresponding toggle button when the DOM content is fully loaded and parsed.
 * @callback ShowHideInitializationCallback2
 * @global
 */
$(document).ready(function(){
    $("#show-more2").hide();
    $("#toggle-button2").click(function(){
        $("#show-more2").slideToggle();
    });
});

/**
 * Applies a fade-in effect to elements with the 'fade-in' class as they become visible in the viewport while scrolling.
 * @callback FadeInScrollCallback
 * @global
 */
$(window).scroll(function() {
    $('#fade-in').each(function() {
        var elemTop = $(this).offset().top;
        var elemBottom = elemTop + $(this).height();
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (elemBottom < scrollTop + windowHeight) {
            $(this).addClass('fade-in');
        }
    });
});

/**
 * Handles the incrementation of quantity input value when the plus button is clicked in a shopping cart.
 * @callback CartQtyPlusClickCallback
 * @global
 */
$(document).ready(function() {
    $(".cart-qty-plus").click(function() {
        var $input = $(this).closest(".container").find(".qty");
        $input.val(parseInt($input.val()) + 1);
    });

    $(".cart-qty-minus").click(function() {
        var $input = $(this).closest(".container").find(".qty");
        var amount = parseInt($input.val());
        if (amount > 0) {
            $input.val(amount - 1);
        }
    });
});

/**
 * Loads content from 'test.html' into a modal popup when the element with the id 'loadPage' is clicked.
 * @callback LoadPageClickCallback
 * @global
 */
$(document).ready(function() {
    $("#loadPage").click(function() {
        // AJAX request to load test.html content
        $.ajax({
            url: "test.html",
            type: "GET",
            success: function(response) {
                // On success, load the content into the popup
                $("#pageContent").html(response);
                $("#popupContent").modal(); // Open the popup
            },
            error: function(xhr, status, error) {
                console.error("Error loading page:", error);
            }
        });
    });
});


/**
 * Resets font sizes to their original values by removing any custom font size styles or classes.
 * @callback ResetFontSizeCallback
 * @global
 */
function resetFontSize() {
    // Reset font sizes to their original values
    document.querySelectorAll('*').forEach(element => {
        // Check if the element has font-size style defined
        if (element.style.fontSize) {
            element.style.removeProperty('font-size');
        }
        // Check if the element has font-size class defined
        if (element.classList.contains('larger-text')) {
            element.classList.remove('larger-text');
        }
    });
}

/**
 * Handles the search functionality by checking if the search input is empty or not. If it's empty, it adds an error class and displays an error message. If not, it redirects to the 'booking.html' page.
 * @callback SearchRedirectCallback
 * @global
 */
function searchRedirect() {
    // Check if the search input has a value
    if ($('#tags').val().trim() === '') {
        // If the search input is empty, add CSS class to turn the field red
        $('#tags').addClass('error');
        // Insert text indicating that a movie must be selected
        $('#searchError').text('A movie must be selected.');
    } else {
        // If there is a value, remove any existing error styling and text
        $('#tags').removeClass('error');
        $('#searchError').text('');
        // Redirect to the booking.html page
        window.location.href = 'booking.html';
    }
}

/**
 * Initializes the slide-in effect for elements with the class 'js-slidein' when the DOM content is fully loaded and parsed.
 * @callback SlideInInitializationCallback
 * @global
 */
$(document).ready(function () {
    var breakpoint = 840;
  
    // If the screen is smaller then 840px wide remove all classes.
    if ($(window).width() < breakpoint) {
      $('.js-slidein').removeClass('js-slidein');
    }
  
    // Check which of the elements with this class is visible on the page
    $('.js-slidein').each(function (i) {
      var bottomObject = $(this).offset().top;
      var bottomWindow = $(window).scrollTop() + $(window).height();
  
      if (bottomWindow > bottomObject) {
        $(this).removeClass('js-slidein');
      }
    });
  
    // Trigger the slide-in effect on scroll
    $(window).scroll(function () {
      $('.js-slidein').each(function (i) {
        var bottomObject = $(this).offset().top + $(this).outerHeight() / 3;
        var bottomWindow = $(window).scrollTop() + $(window).height();
  
        if (bottomWindow > bottomObject) {
          $(this).addClass('js-slidein-visible');
        }
      });
    });
  });
  
  