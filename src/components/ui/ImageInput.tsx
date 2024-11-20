import ImageIcon from '@icons/linear/ImageIcon';
import React, { useState, useCallback, useRef } from 'react';

interface IImageInput {
  onChange: (file: File | null) => void;
  value: File | null | string;
}

const ImageInput = (({ onChange, value }: IImageInput) => {

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onChange(droppedFile);
    }
  }, [onChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
      e.target.value = ''; // Reset the input value
    }
  }, [onChange]);

  const handleDelete = useCallback(() => {
    onChange(null);
  }, [onChange]);


  return (
    <article className="flex items-center justify-start gap-6">
      <section
        className={`rounded-full ring-1 ${isDragging ? 'ring-lime-500' : 'ring-gray-200'} w-24 h-24 flex items-center justify-center overflow-clip flex-shrink-0`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center object-cover w-full h-full">
          {value ? (
            value instanceof File ? (
              <img
                src={URL.createObjectURL(value)}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-md overflow-clip"
              />
            ) : (
              <img
                src={value}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-md overflow-clip"
              />
            )
          ) : (
            <div className="flex items-center justify-center">
              <ImageIcon className="w-8 h-8 stroke-1  fill-gray-300" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
            ref={inputRef} 
          />
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-start gap-3">
          <label 
            className="text-sm text-gray-700 cursor-pointer"
            htmlFor="image-upload" 
          >
            Upload Photo
          </label>
          {value && (
            <>
              <div className="h-5 bg-gray-200 w-[1px]" />
              <button 
                className="text-sm text-rose-500" 
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 w-[60%]">An actual image. It's best if it has the same height and width.</p>
      </section>
    </article>
  );
});

export default ImageInput;