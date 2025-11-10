class Steganography {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentMethod = 'basicLSB';
        this.MAX_APPEND_SIZE = 100 * 1024 * 1024; // 100MB
    }

    setMethod(method) {
        this.currentMethod = method;
    }

    // Main encode function - SUPPORT 3 METHODS NOW
    async encode(coverImage, secretFile, password = '') {
        // Validasi file size berdasarkan metode
        if (this.currentMethod === 'fileAppend' && secretFile.size > this.MAX_APPEND_SIZE) {
            throw new Error(`File too large for Append method. Maximum: ${this.MAX_APPEND_SIZE / 1024 / 1024}MB`);
        }

        if (this.currentMethod === 'fileAppend') {
            return await this.encodeAppend(coverImage, secretFile);
        } else {
            // LSB methods (basic & enhanced)
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    this.ctx.drawImage(img, 0, 0);

                    const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                    const pixels = imageData.data;

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const fileData = new Uint8Array(e.target.result);
                            
                            let encodedPixels;
                            if (this.currentMethod === 'basicLSB') {
                                encodedPixels = this.hideDataBasic(pixels, fileData);
                            } else {
                                encodedPixels = this.hideDataEnhanced(pixels, fileData);
                            }
                            
                            imageData.data.set(encodedPixels);
                            this.ctx.putImageData(imageData, 0, 0);
                            
                            resolve({
                                dataURL: this.canvas.toDataURL('image/png'),
                                method: this.currentMethod,
                                originalSize: fileData.byteLength
                            });
                        } catch (error) {
                            reject(error);
                        }
                    };
                    reader.readAsArrayBuffer(secretFile);
                };
                img.onerror = () => reject(new Error('Failed to load cover image'));
                img.src = coverImage;
            });
        }
    }

    // FILE APPEND METHOD - NEW!
    async encodeAppend(coverImage, secretFile) {
        return new Promise((resolve, reject) => {
            // Baca file cover sebagai ArrayBuffer
            const coverReader = new FileReader();
            coverReader.onload = (coverEvent) => {
                // Baca file secret sebagai ArrayBuffer  
                const secretReader = new FileReader();
                secretReader.onload = (secretEvent) => {
                    try {
                        const coverArrayBuffer = coverEvent.target.result;
                        const secretArrayBuffer = secretEvent.target.result;
                        
                        // Buat container dengan header khusus
                        const container = this.createAppendContainer(
                            coverArrayBuffer, 
                            secretArrayBuffer, 
                            secretFile.type,
                            secretFile.name
                        );
                        
                        // Convert ke Data URL
                        const blob = new Blob([container], { type: 'image/png' });
                        const dataURL = URL.createObjectURL(blob);
                        
                        resolve({
                            dataURL: dataURL,
                            method: 'fileAppend',
                            originalSize: secretArrayBuffer.byteLength
                        });
                    } catch (error) {
                        reject(error);
                    }
                };
                secretReader.onerror = () => reject(new Error('Failed to read secret file'));
                secretReader.readAsArrayBuffer(secretFile);
            };
            coverReader.onerror = () => reject(new Error('Failed to read cover image'));
            coverReader.readAsArrayBuffer(coverImage);
        });
    }

    // Create container untuk file append method
    createAppendContainer(coverImage, secretData, fileType, fileName) {
        const header = this.createAppendHeader(secretData.byteLength, fileType, fileName);
        const combined = new Uint8Array(coverImage.byteLength + header.byteLength + secretData.byteLength);
        
        // Gabungkan: cover image + header + secret data
        combined.set(new Uint8Array(coverImage), 0);
        combined.set(new Uint8Array(header), coverImage.byteLength);
        combined.set(new Uint8Array(secretData), coverImage.byteLength + header.byteLength);
        
        return combined;
    }

    // Create header untuk file append
    createAppendHeader(dataSize, fileType, fileName) {
        const headerSize = 512; // 512 byte untuk header
        const header = new ArrayBuffer(headerSize);
        const headerView = new DataView(header);
        const encoder = new TextEncoder();
        
        // Magic signature untuk identifikasi
        headerView.setUint32(0, 0x53544547, true);  // 'STEG'
        headerView.setUint32(4, 0x4150504E, true);  // 'APPN' - Append method
        
        // Data size (64-bit)
        headerView.setBigUint64(8, BigInt(dataSize), true);
        
        // Timestamp
        headerView.setBigUint64(16, BigInt(Date.now()), true);
        
        // File type (128 bytes)
        const fileTypeBytes = encoder.encode(fileType || 'application/octet-stream');
        for (let i = 0; i < Math.min(fileTypeBytes.length, 128); i++) {
            headerView.setUint8(24 + i, fileTypeBytes[i]);
        }
        
        // File name (256 bytes)
        const fileNameBytes = encoder.encode(fileName || 'hidden_file');
        for (let i = 0; i < Math.min(fileNameBytes.length, 256); i++) {
            headerView.setUint8(152 + i, fileNameBytes[i]);
        }
        
        return header;
    }

    // Main decode function - SUPPORT 3 METHODS NOW
    async decode(stegoImage, password = '') {
        // Coba decode sebagai file append dulu
        try {
            const appendResult = await this.decodeAppend(stegoImage);
            return appendResult;
        } catch (appendError) {
            // Jika bukan append, coba LSB methods
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    this.ctx.drawImage(img, 0, 0);

                    const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                    const pixels = imageData.data;

                    try {
                        // Coba kedua metode LSB
                        let extractedData;
                        try {
                            extractedData = this.extractDataEnhanced(pixels);
                        } catch (e) {
                            extractedData = this.extractDataBasic(pixels);
                        }
                        
                        resolve(extractedData);
                    } catch (error) {
                        reject(new Error('No hidden data found using any method'));
                    }
                };
                img.onerror = () => reject(new Error('Failed to load stego image'));
                img.src = stegoImage;
            });
        }
    }

    // Decode untuk file append method - NEW!
    async decodeAppend(stegoImage) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const stegoArrayBuffer = e.target.result;
                    const container = this.parseAppendContainer(stegoArrayBuffer);
                    
                    resolve({
                        data: container.secretData,
                        type: container.fileType,
                        filename: container.fileName,
                        size: container.fileSize,
                        method: 'append'
                    });
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read stego image'));
            reader.readAsArrayBuffer(stegoImage);
        });
    }

    // Parse container untuk file append
    parseAppendContainer(stegoArrayBuffer) {
        const headerView = new DataView(stegoArrayBuffer);
        
        // Check magic signature
        const magic1 = headerView.getUint32(0, true);
        const magic2 = headerView.getUint32(4, true);
        
        if (magic1 !== 0x53544547 || magic2 !== 0x4150504E) {
            throw new Error('Not a valid append container');
        }
        
        // Extract file size
        const fileSize = Number(headerView.getBigUint64(8, true));
        
        // Extract file type
        let fileType = '';
        for (let i = 0; i < 128; i++) {
            const byte = headerView.getUint8(24 + i);
            if (byte === 0) break;
            fileType += String.fromCharCode(byte);
        }
        
        // Extract file name
        let fileName = '';
        for (let i = 0; i < 256; i++) {
            const byte = headerView.getUint8(152 + i);
            if (byte === 0) break;
            fileName += String.fromCharCode(byte);
        }
        
        // Calculate data positions
        const headerSize = 512;
        const dataStart = headerSize;
        const dataEnd = dataStart + fileSize;
        
        if (dataEnd > stegoArrayBuffer.byteLength) {
            throw new Error('Corrupted container: data size mismatch');
        }
        
        // Extract secret data
        const secretData = stegoArrayBuffer.slice(dataStart, dataEnd);
        
        return {
            secretData: secretData,
            fileType: fileType,
            fileName: fileName,
            fileSize: fileSize
        };
    }

    // Basic LSB method
    hideDataBasic(pixels, fileData) {
        const data = this.addHeader(fileData, 'basic');
        const binaryData = this.dataToBinary(data);
        
        const maxCapacity = (pixels.length / 4) * 3;
        if (binaryData.length > maxCapacity) {
            throw new Error(`File too large for Basic LSB. Maximum: ${Math.floor(maxCapacity / 8000)}KB`);
        }

        let dataIndex = 0;
        const newPixels = new Uint8ClampedArray(pixels);

        for (let i = 0; i < newPixels.length && dataIndex < binaryData.length; i += 4) {
            for (let j = 0; j < 3 && dataIndex < binaryData.length; j++) {
                newPixels[i + j] = (newPixels[i + j] & 0xFE) | parseInt(binaryData[dataIndex]);
                dataIndex++;
            }
        }

        return newPixels;
    }

    // Enhanced LSB method
    hideDataEnhanced(pixels, fileData) {
        const data = this.addHeader(fileData, 'enhanced');
        const binaryData = this.dataToBinary(data);
        
        const maxCapacity = (pixels.length / 4) * 6;
        if (binaryData.length > maxCapacity) {
            throw new Error(`File too large for Enhanced LSB. Maximum: ${Math.floor(maxCapacity / 8000)}KB`);
        }

        let dataIndex = 0;
        const newPixels = new Uint8ClampedArray(pixels);

        for (let i = 0; i < newPixels.length && dataIndex < binaryData.length; i += 4) {
            for (let j = 0; j < 3 && dataIndex < binaryData.length; j++) {
                const bits = binaryData.substr(dataIndex, 2);
                if (bits.length === 2) {
                    newPixels[i + j] = (newPixels[i + j] & 0xFC) | parseInt(bits, 2);
                    dataIndex += 2;
                }
            }
        }

        return newPixels;
    }

    // Extract methods
    extractDataBasic(pixels) {
        let binaryData = '';
        for (let i = 0; i < pixels.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                binaryData += (pixels[i + j] & 1).toString();
            }
        }
        const data = this.binaryToData(binaryData);
        return this.parseHeader(data);
    }

    extractDataEnhanced(pixels) {
        let binaryData = '';
        for (let i = 0; i < pixels.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                const bits = (pixels[i + j] & 3).toString(2).padStart(2, '0');
                binaryData += bits;
            }
        }
        const data = this.binaryToData(binaryData);
        return this.parseHeader(data);
    }

    // Helper methods
    addHeader(fileData, method) {
        const header = new ArrayBuffer(16);
        const headerView = new DataView(header);
        headerView.setUint32(0, 0x53544547, true);
        headerView.setUint32(4, fileData.byteLength, true);
        headerView.setUint32(8, method === 'basic' ? 0x42415349 : 0x454E4841, true);
        headerView.setUint32(12, Math.floor(Date.now() / 1000), true);
        
        const combined = new Uint8Array(header.byteLength + fileData.byteLength);
        combined.set(new Uint8Array(header), 0);
        combined.set(fileData, header.byteLength);
        return combined;
    }

    parseHeader(data) {
        const headerView = new DataView(data.buffer);
        const magic = headerView.getUint32(0, true);
        if (magic !== 0x53544547) throw new Error('Invalid steganography data');
        
        const fileSize = headerView.getUint32(4, true);
        const methodCode = headerView.getUint32(8, true);
        
        if (fileSize > data.byteLength - 16) {
            throw new Error('Corrupted steganography data');
        }
        
        const method = methodCode === 0x42415349 ? 'basic' : 'enhanced';
        
        return {
            data: data.slice(16, 16 + fileSize),
            method: method,
            size: fileSize
        };
    }

    dataToBinary(data) {
        let binary = '';
        const bytes = new Uint8Array(data);
        for (let byte of bytes) {
            binary += byte.toString(2).padStart(8, '0');
        }
        return binary;
    }

    binaryToData(binary) {
        const bytes = [];
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substr(i, 8);
            if (byte.length === 8) {
                bytes.push(parseInt(byte, 2));
            }
        }
        return new Uint8Array(bytes);
    }

    calculateCapacity(width, height, method) {
        const totalPixels = width * height;
        
        if (method === 'basicLSB') {
            const bits = totalPixels * 3;
            const bytes = bits / 8;
            return {
                bytes: Math.floor(bytes),
                readable: this.formatBytes(bytes)
            };
        } else if (method === 'enhancedLSB') {
            const bits = totalPixels * 6;
            const bytes = bits / 8;
            return {
                bytes: Math.floor(bytes),
                readable: this.formatBytes(bytes)
            };
        } else {
            return {
                bytes: this.MAX_APPEND_SIZE,
                readable: 'Unlimited (max 100MB)'
            };
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  }
