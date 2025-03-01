# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

def init_gemini(api_key):
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-pro')

def prompt_to_yaml(model, prompt):
    system_prompt = """
    Convert the following requirements into a valid YAML configuration file.
    Follow these rules:
    1. Use proper YAML syntax and indentation
    2. Group related configurations
    3. Use appropriate data types (strings, numbers, boolean, lists)
    4. Add comments for clarity
    Return only the YAML content without any additional text.
    """
    
    response = model.generate_content(f"{system_prompt}\n\nRequirements:\n{prompt}")
    return response.text


def clean_yaml_block(yaml_text):
    lines = yaml_text.strip().split("\n")
    
    if lines[0].strip().startswith("```yaml"):
        lines.pop(0)  # Remove the first line
    
    if lines[-1].strip() == "```":
        lines.pop()  # Remove the last line
    
    return "\n".join(lines)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    api_key = 'AIzaSyAH7k2CnME9Lxb-qQbfbdAeTY9NNp6J4a8'
    prompt = data.get('prompt')
    
    if not api_key or not prompt:
        return "API Key and prompt are required", 400
    
    try:
        model = init_gemini(api_key)
        yaml_config = prompt_to_yaml(model, prompt)
        yaml_config = clean_yaml_block(yaml_config)
        return jsonify({"yaml_config": yaml_config, "prompt": prompt})
    except Exception as e:
        return str(e), 500
    
@app.route('/api', methods=['POST'])
def process():
    data = request.json
    return jsonify({"message": "Success", "data": data})

if __name__ == '__main__':
    app.run(debug=True)
