Simple Text Limiting
--------------------

I recently had to write a little widget for the front-end wherein the user has to be able to type, copy &amp; paste, etc etc some text
into a text area, but he/she need to be limited on the amount of characters that they can use. Yes, there are plenty of pre-existing
plugins etc that I could use, but I like demonstrating how one would go about doing something similar using just a bit of logic and jQuery :)

A test index.html is included that demonstrates how the plugin is used, but the gist of it is:

	<textarea id="test" class="limitBoxes" cols="55" rows="5"></textarea>
	<script src='http://code.jquery.com/jquery-latest.min.js'></script>
	<script src='./js/jquery.limitbox.js'></script>
	<script>
	$("#test").limitBox({
	  limit: 200,
	  limitCounter: "counter",
	  container: "container"
	});
	</script>
