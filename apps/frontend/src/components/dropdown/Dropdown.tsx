import type { ReactNode } from 'react';

interface DropdownProps<T> {
  isOpen: boolean;
  dropdownItems: {
    element: ReactNode;
    value: T;
    isSelected: boolean;
  }[];
  selectActionFn: (value: T) => void;
  closeFn: () => void;
}

const Dropdown = <T,>({ isOpen, dropdownItems, selectActionFn, closeFn }: DropdownProps<T>) => {
  const visibilityClass = isOpen ? 'visible opacity-100' : 'invisible';

  return (
    <>
      <div className={`fixed top-0 left-0 z-10 h-screen w-screen ${visibilityClass}`} onClick={closeFn}></div>
      <div
        className={`relative z-20 grid w-max rounded-lg border border-gray-200 bg-gray-200 opacity-0 shadow-lg shadow-gray-300 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-700 ${visibilityClass}`}
      >
        {dropdownItems.map((item, index) => (
          <button
            className="cursor-pointer px-6 py-3 transition-[background-color] duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            key={index}
            onClick={() => {
              selectActionFn(item.value);
            }}
          >
            {item.element}
          </button>
        ))}
      </div>
    </>
  );
};

export default Dropdown;
