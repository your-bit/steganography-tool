<p align="center">
  <img src="assets/main-theme.jpg" alt="Steganography Pro Screenshot" width="800">
</p>

<h1 align="center">🔒 Steganography Pro</h1>

<p align="center"><strong>Advanced Web-Based Steganography Toolkit with Three Hiding Methods</strong></p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#methods">Methods</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License"/></a>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version"/>
  <img src="https://img.shields.io/badge/javascript-ES6+-yellow.svg" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/security-steganography-orange.svg" alt="Security"/>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/your-bit/steganography-tool?style=social" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/forks/your-bit/steganography-tool?style=social" alt="GitHub forks"/>
  <img src="https://img.shields.io/github/issues/your-bit/steganography-tool" alt="GitHub issues"/>
</p>

---

## 🧠 Overview

**Steganography Pro** is a browser-based steganography toolkit that allows you to hide any file within an image using three distinct methods — **Basic LSB**, **Enhanced LSB**, and **File Append**.  
Everything runs locally on your browser using the **Canvas API**, ensuring no data leaves your device.

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

## ✨ Features

- 🛡️ **Three Steganography Methods** – Basic LSB, Enhanced LSB, File Append  
- 🎨 **Professional Dark UI** – Elegant, modern, and responsive  
- 📊 **Real-Time Capacity Calculator** – Know your image’s data limits  
- 🖱️ **Drag & Drop Interface** – Smooth, intuitive experience  
- 🔐 **Optional Password Field** – For extra protection before encoding  
- 🌐 **Client-Side Only** – 100% local, no server upload  

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

## 🚀 Quick Start

### 🧩 Online Demo
👉 [GitHub Pages Live Demo](https://your-bit.github.io/steganography-tool)

### ⚙️ Local Setup
```bash
git clone https://github.com/your-bit/steganography-tool.git
cd steganography-tool
python -m http.server 8000
# Then open http://localhost:8000
```

⚡ Methods

_________________________________________________________________________________
Method	       Stealth	    Capacity	Speed	     Best For
—————————————————————————————————————————————————————————————————————————————————
Basic LSB	    ⭐⭐⭐⭐⭐  ~12.5%	     Fast	    Maximum secrecy, small files
—————————————————————————————————————————————————————————————————————————————————
Enhanced LSB	⭐⭐⭐⭐	  ~25%	      Medium	  Balanced use, medium files
—————————————————————————————————————————————————————————————————————————————————
File Append	  ⭐⭐	      Unlimited	  Instant	  Large or educational file hiding
—————————————————————————————————————————————————————————————————————————————————

🔍 Basic LSB (Least Significant Bit)

pixel = (pixel & 0xFE) | dataBit

Maximum stealth, visually undetectable

Lower capacity (best for small files)

Ideal for sensitive messages or documents


⚡ Enhanced LSB (2-bit Encoding)

pixel = (pixel & 0xFC) | dataBits

Twice the capacity of Basic LSB

Slightly reduces image quality

Ideal for medium files


💾 File Append Method

[IMAGE_DATA] + [HEADER] + [SECRET_DATA]

Maximum capacity (supports up to 100MB)

Easily detectable (for educational purposes)

Great for quick tests and demonstrations



—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

🧩 How It Works

1. Basic LSB – Embeds 1 bit of data in each RGB channel.


2. Enhanced LSB – Uses 2 bits per RGB channel for double capacity.


3. File Append – Appends data at the end of the image file with a custom STEGAPPN header.



🧠 All processing is done locally in your browser using the Canvas API, so no data is ever uploaded or stored externally.


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

📖 Usage Guide

Encoding Files

1. Choose your method (Basic, Enhanced, or Append)


2. Upload your cover image


3. Select the file to hide


4. (Optional) Add a password


5. Click Hide File in Image and download your stego image



Decoding Files

1. Upload the stego image


2. (Optional) Enter password


3. Click Extract Hidden File and download the recovered file



💡 Pro Tips

Always use PNG format for cover images (lossless compression)

Use Basic LSB for small confidential files

Use File Append for large or test files

Test extraction before sharing images



—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

🧱 Tech Stack

Layer	Technology	Purpose

Frontend	HTML5, CSS3, JavaScript	Core web application
Styling	CSS Grid & Flexbox	Responsive layout
Processing	Canvas API	Image manipulation
UI	Vanilla JS + Emojis	Lightweight design
Fonts	Inter (Google Fonts)	Clean typography
Deployment	GitHub Pages	Free static hosting



—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


🧠 Architecture

steganography-tool/
├── 📁 css/
│   └── style.css           # Dark theme styling
├── 📁 js/
│   ├── steganography.js    # Core algorithms (3 methods)
│   ├── ui.js               # UI logic and event handlers
│   └── theme.js            # Animations and effects
├── 📁 assets/
│   └── main-theme.jpg      # Main background image
├── index.html              # Main web app
└── README.md               # Documentation


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


🌐 Browser Support

Browser	Version	Support

Chrome	60+	✅ Full
Firefox	55+	✅ Full
Safari	11+	✅ Full
Edge	  79+	✅ Full


🧩 Requires a modern browser with Canvas and File API support.


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


🧪 Troubleshooting

Issue	Cause	Solution

File too large	Exceeds method capacity	Use File Append
Extraction fails	Wrong password or method	Verify original settings
Image quality drops	Enhanced LSB on low-res image	Use higher-quality PNG
Browser crash	Processing too large image	Try smaller cover images



—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


⚠️ Disclaimer

This tool is built for educational and research purposes only in cybersecurity and digital forensics.

✅ Acceptable Use

Academic & research projects

Cybersecurity education

Digital forensics study

Personal learning


❌ Prohibited Use

Illegal or malicious activities

Copyright/data theft

Malware embedding

Espionage or unauthorized hiding


Use this tool responsibly and ethically.


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


📜 License

This project is licensed under the MIT License — see the LICENSE file for details.


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


👨‍💻 Author

D.Chyper — Cybersecurity Enthusiast 🇮🇩

🏠 Indonesian User Explorer

💻 Open Source Contributor

🎓 Computer Engineering Student

🔭 Passionate about digital security research


GitHub: @your-bit
Project Link: https://github.com/your-bit/steganography-tool


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


<div align="center">⭐ If this project helped you, give it a star!
“Knowledge is power, but responsibility is key.” — D.Chyper
<div>
