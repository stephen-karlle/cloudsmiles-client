import { ReactNode, Children, ReactElement } from "react";

interface IAccordion {
  className: string;
  collapse: boolean;
  setCollapse?: (open: boolean) => void;
  isDisabled?: boolean;
  children: ReactNode;
}

const Accordion = ({ className, collapse, setCollapse,isDisabled,  children }: IAccordion ) => {
  const handleToggle = () => {
    if (setCollapse) {
      setCollapse(!collapse);
    }
  };

  const header = Children.toArray(children).find(
    (child) => (child as ReactElement).type === AccordionHeader
  );
  const content = Children.toArray(children).find(
    (child) => (child as ReactElement).type === AccordionContent
  );

  return (
    <div className="w-full">
      <button
        disabled={isDisabled}
        onClick={handleToggle}
        className={`${className} w-full`}
        type="button"
      >
        {header}
      </button>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${collapse ? 'max-h-96' : 'max-h-0'}`}
      >
        {content}
      </div>
    </div>
  );
};

const AccordionHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

const AccordionContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export { AccordionHeader, AccordionContent, Accordion };