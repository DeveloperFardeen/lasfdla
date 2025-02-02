## Easy Integration

- **paste the following code in spheron console page**

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
