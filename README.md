# streeting 1.2
SVG Templates Renderer: Easy Elements Transition In Natural Grommet 

## What?
Streeting is a simple framework for rendering SVG templates online. Rendering here means filling text (and more) in some graphics. Like creating a poster in uniform design again and again.

So, the main idea of streeting is following:
<big>SVG template + data => image</big>

Create SVG template, write HTML form to get data from user and let streeting to generate resulting image.

## Sample usage
Let's have SVG template with one "text field". It is just an ordinar SVG file, but with one text element. This element must have an ID (obviously). Initially, the text in the the text field could be whatever. Name this file `template.svg`:

     <svg ...>
       ...
       <text ... id="panel-text">
         Lorem Ipsum.
       </text>
       ...
     </svg>

Nextly, create HTML file `index.html`. This will contain the form and also the resulting image preview. Begin with linking the streeting script file (no jQuery required):

    <html>
      <head>
        ...
        <script type="text/javascript" src="js/lib/streeting/streeting.js"></script>
        ...
      </head>
      <body>

Then create form with inputs of text fields for the template:

        <form id="the-form">
          <label>Text on panel:</label>
          <input type="text" data-streeting-id="panel-text">

          <input type="submit" value="Submit!">
        </form>

Append the SVG element to be template rendered in and image download link:

        <svg id="the-svg">
          <text>Template beeing loaded...</text>
        </svg>
        
        <a href="" id="the-link">Download image</a>

Finally add javascript performing the process:

    function prepare() {
      var form = document.getElementById("the-form");
          
      form.onsubmit = function(e) {
        processIt();
        return false;
      }
          
      streeting.initialize('the-svg', 'template.svg');
    }

    function processIt() {
      streeting.process('the-svg', 'the-form',
        function(link) {
            var theLink = document.getElementById("the-link");
            theLink.href = link;
		},
        function(err, ex) {
            alert(err);
		});
    }

The final step is to make `prepare()` beeing invoked when page loads, i.e.:

     <body onload="prepare()">

And that's it. When you fill the text in to the page's input field (and submit the form), given text displays in the template. And also can be shown as a separate image and saved as another SVG file.

## Future tasks

It is nescessary to add idea of adding more than just texts. For example, ~~dates~~, ~~times~~, images.

 - [x] added some date and time processors
 - [x] optimized: added support for update of only one field (instead of whole template) (when occured edit of only one field)
 - [x] added (optional) linkage to [online-image-cropper](https://github.com/martlin2cz/online-image-cropper) (allows output to bitmap)

# Changelog
- v1.1: added custom `errorHandler` instead of `alert` (breaks API)
- v1.2: (Issue #1) if the target element does not exist, warns and ingores it (backwards compatible)
- v1.3: Added `streeting.sizeProcessor` and `streeting.roundCornersProcessor` processors
