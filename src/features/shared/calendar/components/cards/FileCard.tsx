import DeleteIcon from '@icons/linear/DeleteIcon';
import Document1Icon from '@icons/linear/Document1Icon';
import Document2Icon from '@icons/linear/Document2Icon';
import ImageIcon from '@icons/linear/ImageIcon';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AgreementDocumentType } from '../../types/appointment.types';

type FileCardType = {
  file: File | AgreementDocumentType ;
  index: number;
}

const FileCard = ({ file, index }: FileCardType ) => {


  let fileType 
  let fileName
  let fileSize 

  const isNew = file instanceof File;

  if (isNew) {
    fileType = file.type.split('/')[1];
    fileName = file.name;
    fileSize = file.size;
  } else{
    fileType = file.documentName.split('.')[1]
    fileName = file.documentName;
    fileSize = 0;
  }

  const { control } = useFormContext();

  const { remove: removeAgrementDocuments} = useFieldArray({
    control: control,
    name: 'agreementDocuments',
  });

  const handleRemoveDocument = (index: number) => {
    removeAgrementDocuments(index);
  }

  const handleDownloadNewDocument = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleDownloadFromServer = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  const convertBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
  }

  const getStyleAndIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return {
          background: 'bg-red-50',
          icon: <Document2Icon className="w-5 h-5 stroke-2 stroke-red-500" />
        };
      case 'msword':
      case 'docx':
      case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
        return {
          background: 'bg-sky-50',
          icon: <Document1Icon className="w-5 h-5 stroke-2 stroke-sky-500" />
        };
      case 'jpeg':
      case 'jpg':
        return {
          background: 'bg-teal-50',
          icon: <ImageIcon className="w-5 h-5 stroke-2 stroke-teal-500" />
        };
      case 'png':
        return {
          background: 'bg-green-50',
          icon: <ImageIcon className="w-5 h-5 stroke-2 stroke-green-500" />
        };
      default:
        return {
          background: 'bg-gray-50',
          icon: <Document1Icon className="w-5 h-5 stroke-2 stroke-gray-500" />
        };
    }
  }

  const { background, icon } = getStyleAndIcon(fileType);

  return (
    <section className="w-full py-1 flex items-center justify-center gap-4">
      <figure 
        className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${background}`}
      >
        {icon}
      </figure>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col h-full items-start max-w-[20rem]">
          <label className="truncate max-w-80">
            <span className="text-md text-gray-700 truncate min-w-0">{fileName}</span>
          </label>
          <label className="text-sm text-gray-500">
            { isNew ? convertBytes(fileSize) : "Saved to cloud " }
          </label>
        </div>
        <div className="flex items-center justify-center w-fit flex-shrink-0">
          <button 
            className=" underline underline-offset-2 w-fit px-4 flex place-items-center text-sm text-gray-500" 
            type="button"
            onClick={
              isNew ? 
              () => handleDownloadNewDocument(file) : 
              () => handleDownloadFromServer(file.documentUrl)
            }
          >
            Download
          </button>
          <button 
            className="w-6 h-6 flex place-items-center" 
            type="button"
            onClick={() => handleRemoveDocument(index)}
          >
            <DeleteIcon className="w-5 h-5 stroke-2 stroke-rose-500" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FileCard;