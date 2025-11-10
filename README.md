---

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

---

## ✨ Features

- 🛡️ **Three Steganography Methods** – Basic LSB, Enhanced LSB, File Append  
- 🎨 **Professional Dark UI** – Elegant, modern, and responsive  
- 📊 **Real-Time Capacity Calculator** – Know your image’s data limits  
- 🖱️ **Drag & Drop Interface** – Smooth, intuitive experience  
- 🔐 **Optional Password Field** – For extra protection before encoding  
- 🌐 **Client-Side Only** – 100% local, no server upload  

---

## 🚀 Quick Start

### 🧩 Online Demo
👉 [GitHub Pages Live Demo](https://your-bit.github.io/steganography-tool)

### ⚙️ Local Setup
```bash
git clone https://github.com/your-bit/steganography-tool.git
cd steganography-tool
python -m http.server 8000
# Then open http://localhost:8000


---

⚡ Methods

Method	Stealth	Capacity	Speed	Best For

Basic LSB	⭐⭐⭐⭐⭐	~12.5%	Fast	Maximum secrecy, small files
Enhanced LSB	⭐⭐⭐⭐	~25%	Medium	Balanced performance
File Append	⭐⭐	Unlimited	Instant	Educational use, large files


🧩 Basic LSB (Least Significant Bit)

pixel = (pixel & 0xFE) | dataBit

Maximum stealth, visually undetectable

Lower capacity, ideal for small hidden files


⚙️ Enhanced LSB (2-bit Encoding)

pixel = (pixel & 0xFC) | dataBits

2× the capacity of Basic LSB

Slight image quality tradeoff


💾 File Append Method

[IMAGE_DATA] + [HEADER] + [SECRET_DATA]

Up to 100MB capacity

Easily detectable (for study/testing use)

Best for large file demonstrations



---

🔍 How It Works

1. Basic LSB – Hides 1 bit per RGB channel


2. Enhanced LSB – Hides 2 bits per RGB channel


3. File Append – Attaches data at the end of the image file with a header



🧠 All encoding and decoding are handled locally using browser APIs (Canvas + FileReader).
No server communication, no uploads.


---

📖 Usage Guide

Encoding

1. Select a method (Basic / Enhanced / Append)


2. Upload your cover image


3. Upload your secret file


4. (Optional) Enter a password


5. Click Hide File in Image and download the stego image



Decoding

1. Upload the stego image


2. (Optional) Enter the password


3. Click Extract Hidden File and download your extracted data



💡 Pro Tips

Always use PNG format for lossless images

Use Basic LSB for secret text/documents

Use File Append for large or demo files

Test decoding before sharing images



---

🧱 Tech Stack

Layer	Technology	Purpose

Frontend	HTML5, CSS3, JavaScript	Core web application
Styling	CSS Grid & Flexbox	Responsive layout
Logic	Canvas API	Image manipulation
UI/UX	Vanilla JS	Smooth animations
Fonts	Inter (Google Fonts)	Clean typography
Deployment	GitHub Pages	Free static hosting



---

🧠 Architecture

steganography-tool/
├── css/
│   └── style.css
├── js/
│   ├── steganography.js
│   ├── ui.js
│   └── theme.js
├── assets/
│   └── main-theme.jpg
├── index.html
└── README.md


---

🌐 Browser Support

Browser	Version	Support

Chrome	60+	✅
Firefox	55+	✅
Safari	11+	✅
Edge	 79+	✅


> Works on all modern browsers supporting Canvas & File APIs.




---

🧰 Troubleshooting

Issue	Cause	Solution

File too large	Exceeds method capacity	Use File Append
Extraction fails	Wrong password or method	Verify correct settings
Image quality drops	Using Enhanced LSB	Use higher-res PNG
Browser crashes	Processing very large images	Reduce image size



---

⚠️ Disclaimer

This tool is built for educational and research purposes only.
Do NOT use it for illegal or unethical activities.

✅ Acceptable Use

Academic and research projects

Cybersecurity education

Digital forensics learning

Personal experimentation


❌ Prohibited Use

Illegal or malicious actions

Copyright or data theft

Malware embedding

Espionage or covert data hiding


> Use this tool responsibly and ethically.




---

📜 License

This project is licensed under the MIT License.


---

👨‍💻 Author

D.Chyper — Cybersecurity Enthusiast 🇮🇩

🧭 Indonesian User Explorer

💻 Open Source Contributor

🎓 Computer Engineering Student

🧠 Passionate about cybersecurity research


GitHub: @your-bit
Project: Steganography Tool


---

<div align="center">⭐ If this project helped you, give it a star!
“Knowledge is power, but responsibility is key.” — D.Chyper

</div>
```
