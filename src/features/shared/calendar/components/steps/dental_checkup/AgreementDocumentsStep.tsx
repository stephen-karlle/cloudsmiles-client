import FolderIcon from "@icons/linear/FolderIcon";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import FileCard from '../../cards/FileCard';

const AgreementDocumentsStep = () => {

  const { control, watch, formState: {errors} } = useFormContext();
  const agreementDocuments = watch('agreementDocuments');

  console.log(errors)

  const { append: appendAgreementDocuments } = useFieldArray({
    control: control,
    name: 'agreementDocuments',
  });

  const onDrop = (acceptedFiles: File[]) => {
    const currentFileCount = agreementDocuments.length;
    const remainingSlots = 5 - currentFileCount;

    if (remainingSlots <= 0) {
      return; // No more files can be added
    }

    const filesToAdd = acceptedFiles.slice(0, remainingSlots);

    filesToAdd.forEach((file: File) => {
      appendAgreementDocuments({ file });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5485760, 
  });

  const isFull = agreementDocuments?.length >= 5;

  return (
    <article className="flex items-center justify-start gap-6 flex-col px-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-medium text-gray-700">Add Agreement Documents</h1>
        {/* <p className="text-gray-500 text-sm">If required, you can upload the agreement documents here.</p> */}
      </div>

      <section className="w-full flex flex-col justify-start">
        <label className="text-sm text-gray-700">Attached Files
          <span className="ml-1 text-gray-500">(Optional)</span>
        </label>
        <div 
          {...getRootProps()} 
          className={`rounded-md h-20 outline-dotted outline-2 mt-2 flex items-center justify-center text-sm gap-2 ${
            isDragActive ? 'outline-green-500 bg-green-50 ' : 'bg-gray-50 outline-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <FolderIcon className="w-5 h-5 stroke-2 stroke-gray-500" />
          <label className="text-gray-700">Drag & drop files here</label>
          <hr className="h-6 w-[1px] bg-gray-200" />
          <button type="button" className="text-green-500">Browse Files</button>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm w-full">
          <label className="text-gray-500 ">Maximum file sizes 5MB</label>
          <label className={` ${isFull ? " text-rose-500 " : " text-gray-500 "}  `}>
            {isFull ? "Full": agreementDocuments?.length + " of 5"} 
          </label>
        </div>
      </section>
      <section className="w-full flex flex-col justify-start mt-4 gap-4">
        {/* Display selected files */}
        {agreementDocuments?.map((fileWrapper: { file: File }, index: number) => {
          const isNew = fileWrapper.file instanceof File;
          const file = fileWrapper.file;
          return (
            <FileCard 
              key={index} 
              file={ isNew ? file : fileWrapper as any } 
              index={index} 
            />
          )
        })}
      </section>
    </article>
  );
};

export default AgreementDocumentsStep;