import { Fragment } from 'react/jsx-runtime';
import CheckBox from './CheckBox';

type CheckListProps = {
  title: string;
  itemLists: string[];
  checkedItems: string[];
  setCheckedItems: (checkedItems: string[]) => void;
  didError?: boolean;
}

const CheckList = ({ title, itemLists, checkedItems, setCheckedItems, didError }: CheckListProps) => {

  const handleToggle = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter(checkedItem => checkedItem !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  return (
    <article className={`rounded-md ring-1 w-full ${didError ? " ring-rose-500  " : " ring-gray-200 "}`}>
      <section className="px-2 h-12 flex items-center justify-start border-b border-gray-200">
        <label className={`text-base font-medium ${didError ? " text-rose-500 ": " text-gray-700 "}  px-2`}>{title}</label>
        <span className={`px-2 py-1 rounded-md ${didError ? " bg-rose-50 text-rose-500 ": " bg-gray-100 text-gray-500 " } text-xs uppercase`}>{checkedItems.length + " "}Selected</span>
      </section>
      {itemLists.map((item, index) => {
        const isChecked = checkedItems.includes(item);
        return (
          <section className="flex flex-col h-12" key={index}>
            <Fragment key={index}>
              <CheckBox
                className="h-12"
                item={item}
                isChecked={isChecked}
                handleToggle={handleToggle}
                didError={didError}
              />
            </Fragment>
            {index + 1 !== itemLists.length && <div className="h-[1px] border-b border-dotted border-gray-200" />}
          </section>
        );
      })}
    </article>
  );
};

export default CheckList
