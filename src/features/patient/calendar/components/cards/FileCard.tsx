import { AgreementResponseType } from '../../types/patient.types';
import Document1Icon from '@icons/linear/Document1Icon';
import Document2Icon from '@icons/linear/Document2Icon';
import ImageIcon from '@icons/linear/ImageIcon';

type FileCardType = {
  file: AgreementResponseType
}

const FileCard = ({ file }: FileCardType ) => {

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

  const fileName = file.documentName
  const fileType = file.documentName.split('.').pop() || '';

  const handleDownloadFromServer = async (documentUrl: string, fileName: string) => {
    try {
      // Fetch the file from the URL
      const response = await fetch(documentUrl);
  
      if (!response.ok) {
        throw new Error('File could not be fetched');
      }
  
      const blob = await response.blob();
      if (fileType === 'docx') {
        fileName += '.docx';
      }
      // Create an Object URL for the Blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary anchor tag to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the provided document name
      a.click(); // Trigger the download
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
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
             Saved to cloud
          </label>
        </div>
        <div className="flex items-center justify-center w-fit flex-shrink-0">
          <button 
            className=" underline underline-offset-2 w-fit px-4 flex place-items-center text-sm text-gray-500" 
            type="button"
            onClick={() => handleDownloadFromServer(file.documentUrl, fileName)}
          >
            Download
          </button>
        </div>
      </div>
    </section>
  )
}

export default FileCard;