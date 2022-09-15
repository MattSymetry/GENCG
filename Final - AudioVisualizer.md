# Final - Audio Visualizer

For my final project, I wanted to try making an audio visualizer. Making one in 3D would be cool, but not really optimal in terms of performance. If I were to use Three.js, performance would not be an issue, but since P5.js provides a great and easy way to analyze audio, so I will use P5.js.

Using the FFT analyzer of P5.js I can get the volume/enegry at different frequencies. I decided to use the default EQ frequencies to visualize the lows, mids and highs of the audio.

First, I created 3 circles, each representing one of the frequencies mentioned before. Depending on the energy of each circle, the size is adjusted.
These 3 circles rotate around a larger circle. The size of this circle is determined by the volume of the overall audio. This also determines the speed at which the circle spins and moves along.

Then I added the feature that the direction of rotation can change randomly, and that the circles can become squares and vice versa.

## AudioVisualizer

{% raw %}
<iframe src="content/audioVisualizer/index.html" width="100%" height="450" frameborder="no"></iframe> {% endraw %}

[FullScreen](https://mattsymetry.github.io/GENCG/content/audioVisualizer/index.html)