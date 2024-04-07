const URL = "./modelo/";

let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async function() {
      const image = new Image();
      image.onload = async function() {
          document.getElementById('uploadedImage').src = reader.result;
          document.getElementById('uploadedImage').style.display = 'block';
          await predict(image);
      };
      image.src = reader.result;
  };

  reader.readAsDataURL(file);
}

async function predict(input) {
    const prediction = await model.predict(input);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(2) + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
window.onload = init;