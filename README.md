# 3D-Web Translator
This independent study project in Computer Science at the Courant Institute of Mathematical Sciences, New York University, led by June Bee under the supervision of Craig Kapp, focuses on converting traditional websites into 3D user interfaces. </br>
</br>
<img src="https://github.com/junebee66/3D-Web/blob/main/demo/web-translator.gif" width="100%">

⭐️ The objective of this independent study is to adapt the AVR filter's existing algorithm to suit the web environment and to develop algorithms for segmenting distinct visual elements found on websites and translate into 3D orientation for anaglyph glasses. 

🔵 AVR filter is an algorithm written by June Bee is an algorithm designed to transform visual elements within web environments into 3D orientations compatible with anaglyph glasses. The technology seeks to enhance the accessibility of XR resources to the public and establish a novel form of human-computer interaction in the digital era. By having digital content present in physical space, users gain the capability to execute more sophisticated interactions and commands with the internet world.

# ☄️ Goals
📍 The goals of this project include:

## DOM Rendering
Researching and developing an effective way to traverse an arbitrary HTML document and associate a "height" value to elements.
Using these height values to create a 3D representation of the page using A-Frame / AVR.

## Image Rendering
Explore algorithms and/or machine learning techniques to infer height from arbitrary images / video.
Explore rendering options for representing 2D image-based data in 3D using A-Frame / AVR.

The most likely goal of the project is to implement item #1, but significant work can be done on researching possible options for implementing item #2.

# 🛠️ How to Use?
<img src="https://github.com/junebee66/3D-Web/blob/main/demo/blue-convert.gif" width="100%">
</br>
### 1️⃣ Start Website
In folder terminal run "node index.js" again, then reload the http://localhost:12345/ page to see changes

### 2️⃣ Update Code
When updating information in this code, stop the localhost:12345 in the terminal with ctrl + c 
and then run "node index.js" again, then reload the http://localhost:12345/ page to see changes

### 3️⃣ Console Broswer
Copy and paste the following code into your broswer
<script src="https://gist.github.com/junebee66/c1b40c5d8cf0de125dd9f2a4ebcd747c.js"></script>
</br>
</br>
<img src="https://github.com/junebee66/3D-Web/blob/main/demo/color-convert.gif" width="100%">
</br>


# Resources:
Monocular depth estimation: https://keras.io/examples/vision/depth_estimation/
</br>
Depth estimation (Hugging Face): https://huggingface.co/docs/datasets/main/en/depth_estimation
</br>
In Broswer Code (OrionReed/dom3d.js): https://gist.github.com/OrionReed/4c3778ebc2b5026d2354359ca49077ca


