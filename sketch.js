const modelJson = 'https://storage.googleapis.com/tm-speech-commands/DanFColorTest/model.json';
const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/DanFColorTest/metadata.json';

const recognizer = speechCommands.create(
  'BROWSER_FFT',
  undefined,
  modelJson,
  metadataJson
);

const canvas = document.getElementById('canvas'); // to display spectrogram of results
const prob0 = document.getElementById('prob0'); // select <span id="prob0">
const prob1 = document.getElementById('prob1'); // select <span id="prob1">
const prob2 = document.getElementById('prob2'); // select <span id="prob2">
const prob3 = document.getElementById('prob3'); // select <span id="prob3">
const prob4 = document.getElementById('prob4'); // select <span id="prob4">
const prob5 = document.getElementById('prob5'); // select <span id="prob5">

loadMyModel();

async function loadMyModel() {
  // Make sure that the underlying model and metadata are loaded via HTTPS
  // requests.
  await recognizer.ensureModelLoaded();

  // See the array of words that the recognizer is trained to recognize.
  console.log(recognizer.wordLabels());

  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields such a
  //    - includeSpectrogram
  //    - probabilityThreshold
  //    - includeEmbedding
  recognizer.listen(async (result) => {
    showResult(result);
    // - result.scores contains the probability scores that correspond to
    //   recognizer.wordLabels().
    // - result.spectrogram contains the spectrogram of the recognized word.

    // optionally display spectrogram of result
    var spectrogram = result.spectrogram;
    await plotSpectrogram(canvas, spectrogram, recognizer);
  }, {
    includeSpectrogram: true,
    probabilityThreshold: 0.25,
    overlapFactor: 0.75 // probably want between 0.5 and 0.75. More info in README
  });

  // Stop the recognition in 10 seconds.
  // setTimeout(() => recognizer.stopListening(), 10e3);
}

function showResult(result) {
  console.log('result: ', result);
  // Show the probability for class 0
  prob0.innerHTML = result.scores[0];

  // Show the probability for class 1
  prob1.innerHTML = result.scores[1];

    // Show the probability for class 1
  prob2.innerHTML = result.scores[2];

    // Show the probability for class 1
  prob3.innerHTML = result.scores[3];

    // Show the probability for class 1
  prob4.innerHTML = result.scores[4];

    // Show the probability for class 1
  prob5.innerHTML = result.scores[5];
}