import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizePerFile = 10,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx'],
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    } else if (type === 'application/pdf') {
      return <FileText className="w-5 h-5 text-red-500" />;
    } else {
      return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `File size must be less than ${maxSizePerFile}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    setError('');
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    let errorMessage = '';

    // Check total file count
    if (files.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate each file
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        break;
      }

      // Check for duplicates
      const isDuplicate = files.some(existingFile => 
        existingFile.name === file.name && existingFile.size === file.size
      );
      
      if (isDuplicate) {
        errorMessage = `File "${file.name}" is already added`;
        break;
      }

      validFiles.push(file);
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    onFilesChange([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    setError('');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input value to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
          dragActive
            ? 'border-blue-400 bg-blue-50/50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />
        
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 mb-2">
          <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-500">
          {acceptedTypes.join(', ')} up to {maxSizePerFile}MB each
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Maximum {maxFiles} files
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Attached Files ({files.length})</h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;