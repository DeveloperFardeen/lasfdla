# YAML Generator AI Agent

## Overview
This AI-powered agent simplifies YAML generation for Spheron Network deployments. Judges can test it using either of the following options:

### 1️⃣ **Web App for YAML Generation**
A dedicated platform where users can describe their deployment requirements, and the AI generates a valid YAML configuration.

🔗 **Try it here:** [https://ai-yaml-generating-agent.onrender.com/]

### 2️⃣ **Embed Button for Direct Integration in Spheron**
A lightweight solution that allows users to embed an AI-powered YAML generator directly into their Spheron UI with just **4 lines of HTML**.

🔗 **Demo & Clone of Spheron UI:** [https://bhadanialbums.in/expo/something/spheron-console.html]

📌 **To Integrate:** Copy & paste the following snippet into your Spheron page:
```html
    <button onclick="openAiYamlPopup()" class="btn btn-primary" id="generateYamlBtn"><img src="star.webp" width="30">Generate with AI</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-yaml.min.js"></script>
    <script src="https://bhadanialbums.in/yaml-gen-cdn.js?v=1.0.6"></script>
    <script>
        // Apply syntax highlighting to YAML content
        document.addEventListener('DOMContentLoaded', (event) => {
        Prism.highlightAll();
    });
    </script>
```

## How It Works
- **Web App:** Enter deployment details → Get YAML instantly.
- **Embed Button:** Click the button → AI suggests YAML directly in Spheron.

This ensures **easy adoption** for both new and existing Spheron users. 🚀

