// ai-yaml.js
(function() {
    // Styles for the popup
    const styles = `
        .ai-yaml-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .ai-yaml-popup {
            background: #1e1e1e;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            position: relative;
        }

        .ai-yaml-close {
            position: absolute;
            right: 15px;
            top: 15px;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 20px;
            cursor: pointer;
        }

        .ai-yaml-textarea {
            width: 100%;
            height: 150px;
            margin: 10px 0;
            padding: 10px;
            background: #2d2d2d;
            border: 1px solid #3d3d3d;
            color: #ffffff;
            border-radius: 4px;
            font-family: monospace;
        }

        .ai-yaml-button {
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .ai-yaml-button:hover {
            background: #45a049;
        }

        .ai-yaml-error {
            color: #ff5555;
            margin-top: 10px;
            display: none;
        }
    `;

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create popup HTML
    const popupHTML = `
        <div class="ai-yaml-overlay" id="aiYamlOverlay">
            <div class="ai-yaml-popup">
                <button class="ai-yaml-close" onclick="closeAiYamlPopup()">×</button>
                <h2>Generate YAML Configuration</h2>
                <textarea 
                    class="ai-yaml-textarea" 
                    id="aiYamlPrompt" 
                    placeholder="Describe your configuration requirements..."
                ></textarea>
                <button class="ai-yaml-button" onclick="generateYamlConfig()">
                    Generate
                </button>
                <div class="ai-yaml-error" id="aiYamlError"></div>
            </div>
        </div>
    `;

    // Inject popup HTML
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Global functions
    window.openAiYamlPopup = function() {
        document.getElementById('aiYamlOverlay').style.display = 'flex';
    };

    window.closeAiYamlPopup = function() {
        document.getElementById('aiYamlOverlay').style.display = 'none';
        document.getElementById('aiYamlError').style.display = 'none';
        document.getElementById('aiYamlPrompt').value = '';
    };

    window.generateYamlConfig = async function() {
        const prompt = document.getElementById('aiYamlPrompt').value;
        const errorElement = document.getElementById('aiYamlError');

        if (!prompt) {
            errorElement.textContent = 'Prompt are required';
            errorElement.style.display = 'block';
            return;
        }

        try {
            // Make API call to your backend
            const response = await fetch('https://yaml-generator-backend.onrender.com/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                throw new Error('Failed to generate YAML');
            }

            const data = await response.text();
            
            // Find the YAML editor in Spheron Console
            // This selector needs to be adjusted based on Spheron's actual DOM structure
            const yamlEditor = document.querySelector('.yaml-editor'); // SPHERON DIV ID/CLASS NEEDED
            if (yamlEditor) {
                // If Spheron uses Monaco Editor
                if (window.monaco && yamlEditor.__monaco) {
                    const model = yamlEditor.__monaco.getModel();
                    model.setValue(data);
                } 
                // If Spheron uses Ace Editor
                else if (yamlEditor.env && yamlEditor.env.editor) {
                    yamlEditor.env.editor.setValue(data);
                }
                // Fallback to textarea
                else {
                    yamlEditor.value = data;
                }
            }

            closeAiYamlPopup();
        } catch (error) {
            errorElement.textContent = 'Error generating YAML configuration';
            errorElement.style.display = 'block';
        }
    };
})();