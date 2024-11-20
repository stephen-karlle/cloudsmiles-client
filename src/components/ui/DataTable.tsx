import ChevronIcon from "@icons/linear/ChevronIcon";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface IHeader {
  title: string;
  sortable: boolean;
}

interface IDataTable {
  header: IHeader[];
  className?: string;
  gridTemplateColumns?: string;
  children: ReactNode;
  paginator?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

interface ITableData {
  children: ReactNode;
  className?: string;
}

interface ITableRow {
  children: ReactNode;
  className?: string;
  gridTemplateColumns?: string;
  index: number;
  onRowClick?: () => void;
}


const DataTable = ({
  header,
  className,
  gridTemplateColumns,
  children,
  paginator = false,
  currentPage,
  onPageChange,
  totalPages,
}: IDataTable) => {


  const handlePrevPage = () => {

    if (currentPage && onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage && totalPages && onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <motion.table 
      className={ className + `  h-full bg-white flex flex-col`}
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      exit={{ x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <thead className="w-full px-4">
        <tr
          className="grid grid-flow-col px-2 h-fit w-full bg-gray-50 rounded-md"
          style={{gridTemplateColumns: gridTemplateColumns}}
        >
          {header.map((item, index) => (
            <td
              key={index}
              className=" w-full flex items-center justify-start gap-2 p-2 rounded-md px-4 uppercase text-left text-gray-500 text-sm font-normal"
            >
              {item.title}
              {/* {item.sortable && <DoubleChevronIcon className="w-4 h-4 stroke-2 stroke-gray-500" />} */}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white h-full flex-grow-0 overflow-y-scroll w-full">
        <tr className="flex flex-col w-full px-6">
          {children}
        </tr>
      </tbody>
      {paginator && (
        <tfoot className="w-full">
          <tr className="w-full flex gap-4 h-12 border-t justify-center items-center ">
            <td className="flex items-center">
              <button
                className="w-8 h-8 rounded-md ring-1 ring-gray-200 flex items-center justify-center"
                onClick={handlePrevPage}
              >
                <ChevronIcon className="rotate-90 stroke-2 stroke-gray-500" />
              </button>
            </td>
            <td>
              <p className="text-base text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            </td>
            <td className="flex items-center">
              <button
                className="w-8 h-8 rounded-md ring-1 ring-gray-200 flex items-center justify-center"
                onClick={handleNextPage}
              >
                <ChevronIcon className="-rotate-90 stroke-2 stroke-gray-500" />
              </button>
            </td>
          </tr>
        </tfoot>
      )}
    </motion.table>
  )
}

const TableData = ({ 
  children,
  className
}: ITableData ) => {
  return (
    <div 
      className={className + " p-2 px-4 text-sm text-gray-700 font-normal flex items-center "}
    >
      {children}
    </div>
  )
}

const TableRow = ({ 
  children,
  className,
  gridTemplateColumns,
  index,
  onRowClick  
}: ITableRow ) => {
  const variants = {
    hidden: { opacity: 0,},
    visible: { opacity: 1,},
    exit: { opacity: 0,},
  };

  return (
    <motion.td
      className={className + ` grid grid-flow-col py-2 w-full border-b border-gray-200 ${onRowClick && "cursor-pointer"} `}
      style={{ gridTemplateColumns: gridTemplateColumns }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, delay: index * 0.05 }} 
      onClick={onRowClick}
    >
      {children}
    </motion.td>
  )
}

export { DataTable, TableData, TableRow };