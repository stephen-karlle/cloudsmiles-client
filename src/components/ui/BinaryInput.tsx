import CheckBox from './CheckBox';
import Input from './Input';

export interface IChecked {
  id: string;
  choice: string;
  details?: string;
}

interface IBinaryInput {
  questionId: string;
  checked: IChecked[];
  setChecked: (checked: IChecked[] | ((prev: IChecked[]) => IChecked[])) => void;
}

const BinaryInput = ({ questionId, checked, setChecked }: IBinaryInput) => {

  const handleCheck = (choice: string) => {
    setChecked((prev: IChecked[]) => {
      const updatedChecked = prev.filter(item => item.id !== questionId);
      return [...updatedChecked, { id: questionId, choice }];
    });
  };

  const isChecked = (choice: string) => {
    return checked.some(item => item.id === questionId && item.choice === choice);
  };


  return (
    <section 
      className="flex flex-col rounded-md ring-1 ring-gray-200 px-2 py-2"
    >
      {["No", "Yes"].map((item, index) => (
        <div
          className={`duration-500 transition-[max-height] ease-in-out overflow-hidden ${item === "Yes" ? "max-h-40" : "max-h-20"}`}
          key={index}
        >
          <CheckBox
            className="h-10"
            item={item}
            isChecked={isChecked(item)}
            handleToggle={() => handleCheck(item)}
          />
          {item === "Yes" && isChecked("Yes") &&
            <Input 
              className="mt-2 mx-2 mb-3"
              placeholder="Explain where and how wide."
            />
          }
        </div>
      ))}
    </section>
  );
};

export default BinaryInput;
