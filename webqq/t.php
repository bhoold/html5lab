


<article>

<style scoped>

video { -webkit-transform: scaleX(1); }

p { text-align: center; }

</style>

<h1>Webkit WebRTC Video Element Demo</h1>

<section id="splash">

<p id="errorMessage">Loading...</p>

</section>

<section id="app" hidden>
<p><video id="monitor" autoplay></video> <canvas id="photo"></canvas></p>
<p><input value="say cheese!" type=button value="&#x1F4F7;" onclick="snapshot()">
</section>
<script>


if (navigator.webkitGetUserMedia) {

	var video = document.getElementById('monitor');
	var canvas = document.getElementById('photo');
	navigator.webkitGetUserMedia({audio:true,video:true},gotStream,noStream);

	function gotStream(stream) {
		video.src = webkitURL.createObjectURL(stream);
		video.onerror = function () {
			stream.stop();
			streamError();
		};
		document.getElementById('splash').hidden = true;
		document.getElementById('app').hidden = false;
	}
	function noStream() {
		document.getElementById('errorMessage').innerHTML = 'No camera available.';
	}
	function streamError() {
		document.getElementById('errorMessage').innerHTML = 'Camera error.';
	}
	function snapshot() {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext('2d').drawImage(video, 0, 0);
	}
} else {
	document.getElementById('errorMessage').innerHTML = 'No native camera support available.';
}

</script>




<br><br>

<p>

<i>Note: Requires dev channel or canary channel Google Chrome at the moment.<br>You must also launch said Chromes with the <b>--enable-media-stream</b> flag.<br>On a mac, open a terminal and do this to launch Chrome Canary:</i><br>

<br>

<b>open -a Google\ Chrome\ Canary --args --enable-media-stream</b>




</article>



