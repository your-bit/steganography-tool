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

🔬 Methods Comparison

 —————————————————————————————————————————————————————————————————————————————————————
|    Method      |   Stealth  |   Capacity  |  Speed  |           Best For            |
|—————————————————————————————————————————————————————————————————————————————————————|
| Basic LSB      | ⭐⭐⭐⭐⭐ |~12.5%       | Fast    | High secrecy, small files     |
| Enhanced LSB   | ⭐⭐⭐⭐   | 25%         | Medium  | Balance of stealth & capacity |
| File Append    | ⭐⭐       | Unlimited   | Instant | Large files, educational use  |

Method Details

🔍 Basic LSB (Least Significant Bit)

```javascript
// Hides data in the least significant bits
pixel = (pixel & 0xFE) | dataBit
```

· Maximum stealth - virtually undetectable visually
· Lower capacity - ideal for text files and small documents
· Best for - confidential messages, sensitive data

⚡ Enhanced LSB (2-bit Encoding)

```javascript
// Uses 2 bits per channel for double capacity
pixel = (pixel & 0xFC) | dataBits
```

· Balanced approach - good stealth with improved capacity
· 2x capacity of Basic LSB
· Best for - medium-sized files, documents

💾 File Append Method

```javascript
// Appends data after image with custom header
[IMAGE_DATA] + [HEADER] + [SECRET_DATA]
```

· Maximum capacity - support for files up to 100MB
· Fast processing - instant encoding/decoding
· Best for - educational purposes, large files

🛠️ Tech Stack

<div align="center">

Layer Technology Purpose
Frontend HTML5, CSS3, JavaScript Core application
Styling CSS Grid & Flexbox Responsive layout
Processing Canvas API Image manipulation
Icons Unicode Emojis Modern iconography
Font Inter (Google Fonts) Typography
Deployment GitHub Pages Hosting

</div>

Architecture

```
steganography-tool/
├── 📁 css/
│   └── style.css            # Professional dark theme
├── 📁 js/
│   ├── steganography.js     # Core algorithms (3 methods)
│   ├── ui.js                # User interface logic
│   └── theme.js             # Visual effects & animations
├── 📁 assets/
│   └── main-theme.jpg       # Background theme
├── index.html            # Single-page application
└── README.md             # Documentation
```

📖 Usage Guide

Encoding Files

1. Select Method - Choose based on your security and capacity needs
2. Upload Cover Image - Select a high-quality PNG image
3. Choose File to Hide - Any file type supported
4. Set Password (Optional) - For additional security
5. Process & Download - Get your secure stego image

Decoding Files

1. Upload Stego Image - Image with hidden data
2. Enter Password - If encrypted during encoding
3. Extract & Download - Retrieve your original file

Pro Tips 💡

· Use PNG format for cover images (lossless compression)
· Basic LSB for maximum stealth with small files
· File Append for quick sharing of large educational files
· Always test extraction before sharing stego images

🌐 Browser Support

Browser Version Support
Chrome  60+  ✅ Full Support
Firefox 55+  ✅ Full Support
Safari  11+  ✅ Full Support
Edge    79+  ✅ Full Support

Requirements: Modern browser with Canvas and File API support.

🐛 Troubleshooting

Common Issues & Solutions

Issue Cause Solution
File too large Exceeds method capacity Use File Append method
Browser crashes Large image processing Use smaller images or Basic LSB
Extraction fails Wrong password/method Verify password and original method
Quality loss Enhanced LSB on low-quality images Use high-quality PNG images

Performance Notes

· Basic LSB: Optimal for images under 5MP
· Enhanced LSB: Best for images 5-10MP
· File Append: No practical size limits (browser-dependent)

🤝 Contributing

We love contributions! Here's how you can help:

Development Setup

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/your-username/steganography-tool.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and test
# 5. Commit your changes
git commit -m "Add amazing feature"

# 6. Push to your fork
git push origin feature/amazing-feature

# 7. Create a Pull Request
```

Areas for Contribution

· 🔧 New steganography algorithms
· 🎨 UI/UX improvements
· 📱 Mobile responsiveness
· 🧪 Testing and bug fixes
· 📚 Documentation improvements

⚠️ Disclaimer

Educational Purpose Only

This tool is developed exclusively for educational and research purposes in the field of cybersecurity and digital forensics.

Acceptable Use

· ✅ Academic research and teaching
· ✅ Cybersecurity education
· ✅ Digital forensics training
· ✅ Personal learning and experimentation

Prohibited Use

· ❌ Illegal or malicious activities
· ❌ Copyright infringement
· ❌ Data theft or espionage
· ❌ Malware distribution

Users are solely responsible for complying with local laws and regulations.

📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author

D.Chyper - Cybersecurity Enthusiast & Full-Stack Developer

· 🏠 Indonesian Developer
· 🔭 Passionate about security research
· 💻 Open source contributor
· 🎓 Computer Science Student

Connect with Me

· GitHub: @your-bit
· Project Link: https://github.com/your-bit/steganography-tool

🙏 Acknowledgments

· Inspired by digital forensics and cybersecurity research
· Built for the global security community
· Special thanks to open source contributors
· Shoutout to the Inter font family for beautiful typography

---

<div align="center">

⭐ If this project helped you, give it a star!

"Knowledge is power, but responsibility is key" - D.Chyper

</div>
```
