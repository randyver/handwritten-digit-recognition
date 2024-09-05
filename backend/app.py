from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

model = tf.keras.models.load_model('model/model.keras')

def predict_digit(image):
    img = Image.open(image).convert('L') 
    
    img_resized = img.resize((28, 28))
    
    img_inverted = np.invert(np.array(img_resized))
    
    img_array = img_inverted / 255.0
    img_array = img_array.reshape(1, 28, 28, 1)
    
    prediction = model.predict(img_array)
    
    predicted_digit = np.argmax(prediction)
    
    return predicted_digit

# Route for the prediction API
@app.route('/predict', methods=['POST'])
def predict_digit_api():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    try:
        predicted_digit = predict_digit(file)
        print("predicted digit:", predicted_digit)
        return jsonify({"predicted_digit": int(predicted_digit)})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000)
