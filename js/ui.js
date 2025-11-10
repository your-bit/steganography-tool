// Initialize steganography engine
const stego = new Steganography();
let currentResult = null;

// Method Selection dengan 3 metode
const methodCards = document.querySelectorAll('.method-card');
methodCards.forEach(card => {
    card.addEventListener('click', () => {
        methodCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const method = card.dataset.method;
        stego.setMethod(method);
        
        updateCapacityDisplay();
        updateMethodWarning(method);
    });
});

// Tambahkan warning untuk metode File Append
function updateMethodWarning(method) {
    const warningElement = document.getElementById('capacityWarning');
    
    if (method === 'fileAppend') {
        warningElement.innerHTML = `
            ⚠️ <strong>File Append Warning:</strong> 
            This method is easily detectable and not suitable for secure hiding. 
            File size will be significantly larger.
        `;
        warningElement.style.display = 'block';
    } else if (method === 'enhancedLSB') {
        warningElement.innerHTML = `
            ⚠️ <strong>Enhanced LSB Warning:</strong> 
            Image quality may be slightly reduced. Not recommended for high-precision images.
        `;
        warningElement.style.display = 'block';
    } else {
        warningElement.style.display = 'none';
    }
}

// Enhanced capacity calculator untuk 3 metode
function updateCapacityDisplay(width, height) {
    if (!width || !height) {
        const dimensionsElem = document.getElementById('imageDimensions');
        if (dimensionsElem.textContent === '-') return;
        const [w, h] = dimensionsElem.textContent.split(' x ').map(Number);
        width = w;
        height = h;
    }
    
    document.getElementById('imageDimensions').textContent = `${width} x ${height}`;
    
    const activeMethod = document.querySelector('.method-card.active').dataset.method;
    
    if (activeMethod === 'fileAppend') {
        document.getElementById('basicCapacity').textContent = 'Not applicable';
        document.getElementById('enhancedCapacity').textContent = 'Not applicable';
    } else {
        const basicCapacity = stego.calculateCapacity(width, height, 'basicLSB');
        const enhancedCapacity = stego.calculateCapacity(width, height, 'enhancedLSB');
        
        document.getElementById('basicCapacity').textContent = basicCapacity.readable;
        document.getElementById('enhancedCapacity').textContent = enhancedCapacity.readable;
    }
    
    // Update file size warning
    const secretFile = document.getElementById('secretFile').files[0];
    if (secretFile) {
        checkFileSizeCompatibility(secretFile, activeMethod);
    }
}

// Enhanced file size checking untuk 3 metode
function checkFileSizeCompatibility(file, method) {
    const warningElement = document.getElementById('capacityWarning');
    
    if (method === 'fileAppend') {
        if (file.size > stego.MAX_APPEND_SIZE) {
            warningElement.innerHTML = `
                ❌ <strong>File too large:</strong> 
                Maximum size for Append method is ${stego.MAX_APPEND_SIZE / 1024 / 1024}MB. 
                Your file: ${stego.formatBytes(file.size)}
            `;
        }
    } else {
        // Existing LSB size checking
        const coverFile = document.getElementById('coverImage').files[0];
        if (coverFile) {
            const img = new Image();
            img.onload = () => {
                const capacity = stego.calculateCapacity(img.width, img.height, method);
                if (file.size > capacity.bytes) {
                    warningElement.innerHTML = `
                        ❌ <strong>File too large:</strong> 
                        Maximum capacity for ${method === 'basicLSB' ? 'Basic LSB' : 'Enhanced LSB'} is ${capacity.readable}. 
                        Your file: ${stego.formatBytes(file.size)}
                    `;
                }
            };
            img.src = URL.createObjectURL(coverFile);
        }
    }
}

// Enhanced encode function handle 3 metode
async function encodeFile() {
    const coverFile = document.getElementById('coverImage').files[0];
    const secretFile = document.getElementById('secretFile').files[0];
    const password = document.getElementById('encodePassword').value;
    
    if (!coverFile || !secretFile) {
        alert('Please select both a cover image and a file to hide.');
        return;
    }
    
    const encodeBtn = document.getElementById('encodeBtn');
    
    try {
        encodeBtn.disabled = true;
        encodeBtn.innerHTML = '<span class="btn-icon">⏳</span> Processing...';
        
        const coverImageURL = URL.createObjectURL(coverFile);
        const result = await stego.encode(coverImageURL, secretFile, password);
        
        // Update result display berdasarkan metode
        document.getElementById('encodedImage').src = result.dataURL;
        
        let methodName = 'Basic LSB';
        if (result.method === 'enhancedLSB') methodName = 'Enhanced LSB';
        if (result.method === 'fileAppend') methodName = 'File Append';
        
        document.getElementById('usedMethod').textContent = methodName;
        document.getElementById('encodeResult').classList.remove('hidden');
        
        currentResult = {
            type: 'encoded',
            dataURL: result.dataURL,
            filename: `secure_image_${Date.now()}.png`,
            method: result.method
        };
        
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Encode error:', error);
    } finally {
        encodeBtn.disabled = false;
        encodeBtn.innerHTML = '<span class="btn-icon">🛡️</span> Hide File in Image';
    }
}

// Enhanced decode function handle 3 metode
async function decodeFile() {
    const stegoFile = document.getElementById('stegoImage').files[0];
    const password = document.getElementById('decodePassword').value;
    
    if (!stegoFile) {
        alert('Please select an image with hidden data.');
        return;
    }
    
    const decodeBtn = document.getElementById('decodeBtn');
    
    try {
        decodeBtn.disabled = true;
        decodeBtn.innerHTML = '<span class="btn-icon">⏳</span> Extracting...';
        
        const stegoImageURL = URL.createObjectURL(stegoFile);
        const result = await stego.decode(stegoImageURL, password);
        
        // Display result berdasarkan metode
        let methodInfo = '';
        if (result.method === 'append') {
            methodInfo = 'File Append Method';
        } else {
            methodInfo = `${result.method === 'basic' ? 'Basic' : 'Enhanced'} LSB Method`;
        }
        
        document.getElementById('fileInfo').innerHTML = `
            <div class="file-info-item">
                <strong>File Size:</strong> ${stego.formatBytes(result.size)}
            </div>
            <div class="file-info-item">
                <strong>Method Used:</strong> ${methodInfo}
            </div>
            <div class="file-info-item">
                <strong>File Type:</strong> ${result.type || 'Unknown'}
            </div>
            <div class="file-info-item">
                <strong>Status:</strong> Successfully extracted
            </div>
        `;
        
        document.getElementById('decodeResult').classList.remove('hidden');
        
        currentResult = {
            type: 'decoded',
            data: result.data,
            size: result.size,
            filename: result.filename || `extracted_file_${Date.now()}.bin`,
            mimeType: result.type
        };
        
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Decode error:', error);
    } finally {
        decodeBtn.disabled = false;
        decodeBtn.innerHTML = '<span class="btn-icon">🔓</span> Extract Hidden File';
    }
}

// Enhanced download function untuk handle file append
function downloadResult() {
    if (!currentResult) return;
    
    if (currentResult.type === 'encoded') {
        const link = document.createElement('a');
        link.download = currentResult.filename;
        link.href = currentResult.dataURL;
        link.click();
    } else {
        const blob = new Blob([currentResult.data], { type: currentResult.mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Gunakan filename dari decoded data jika ada
        link.download = currentResult.filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }
}

function downloadExtractedFile() {
    downloadResult();
}

// File upload handlers
function setupFileUpload(uploadBoxId, inputId) {
    const uploadBox = document.getElementById(uploadBoxId);
    const fileInput = document.getElementById(inputId);
    
    uploadBox.addEventListener('click', (e) => {
        if (e.target !== fileInput) fileInput.click();
    });
    
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect(inputId, e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFileSelect(inputId, e.target.files[0]);
        }
    });
}

function handleFileSelect(inputId, file) {
    const uploadBox = document.querySelector(`#${inputId}`).closest('.file-upload-box');
    const placeholder = uploadBox.querySelector('.upload-placeholder');
    
    placeholder.innerHTML = `
        <span class="upload-icon">✅</span>
        <p><strong>${file.name}</strong></p>
        <span class="upload-hint">${stego.formatBytes(file.size)} • Ready</span>
    `;
    
    if (inputId === 'coverImage') {
        const img = new Image();
        img.onload = () => updateCapacityDisplay(img.width, img.height);
        img.src = URL.createObjectURL(file);
    }
    
    // Check file size compatibility
    const activeMethod = document.querySelector('.method-card.active').dataset.method;
    if (inputId === 'secretFile') {
        checkFileSizeCompatibility(file, activeMethod);
    }
}

// Tab switching
function switchAppTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));
    
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
    
    clearResults();
}

function clearResults() {
    document.getElementById('encodeResult').classList.add('hidden');
    document.getElementById('decodeResult').classList.add('hidden');
    currentResult = null;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupFileUpload('coverUpload', 'coverImage');
    setupFileUpload('secretUpload', 'secretFile');
    setupFileUpload('stegoUpload', 'stegoImage');
    
    stego.setMethod('basicLSB');
});
