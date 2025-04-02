import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
const add = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(0 0 0)"
  >
    <path
      d="M11.2502 6C11.2502 5.58579 11.586 5.25 12.0002 5.25C12.4145 5.25 12.7502 5.58579 12.7502 6V11.2502H18.0007C18.4149 11.2502 18.7507 11.586 18.7507 12.0002C18.7507 12.4145 18.4149 12.7502 18.0007 12.7502H12.7502V18.0007C12.7502 18.4149 12.4145 18.7507 12.0002 18.7507C11.586 18.7507 11.2502 18.4149 11.2502 18.0007V12.7502H6C5.58579 12.7502 5.25 12.4145 5.25 12.0002C5.25 11.586 5.58579 11.2502 6 11.2502H11.2502V6Z"
      fill="#FF954E"
    />
  </svg>
);

const trash = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(0 0 0)"
  >
    <path
      d="M14.7223 12.7585C14.7426 12.3448 14.4237 11.9929 14.01 11.9726C13.5963 11.9522 13.2444 12.2711 13.2241 12.6848L12.9999 17.2415C12.9796 17.6552 13.2985 18.0071 13.7122 18.0274C14.1259 18.0478 14.4778 17.7289 14.4981 17.3152L14.7223 12.7585Z"
      fill="#FF6060"
    />
    <path
      d="M9.98802 11.9726C9.5743 11.9929 9.25542 12.3448 9.27577 12.7585L9.49993 17.3152C9.52028 17.7289 9.87216 18.0478 10.2859 18.0274C10.6996 18.0071 11.0185 17.6552 10.9981 17.2415L10.774 12.6848C10.7536 12.2711 10.4017 11.9522 9.98802 11.9726Z"
      fill="#FF6060"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.249 2C9.00638 2 7.99902 3.00736 7.99902 4.25V5H5.5C4.25736 5 3.25 6.00736 3.25 7.25C3.25 8.28958 3.95503 9.16449 4.91303 9.42267L5.54076 19.8848C5.61205 21.0729 6.59642 22 7.78672 22H16.2113C17.4016 22 18.386 21.0729 18.4573 19.8848L19.085 9.42267C20.043 9.16449 20.748 8.28958 20.748 7.25C20.748 6.00736 19.7407 5 18.498 5H15.999V4.25C15.999 3.00736 14.9917 2 13.749 2H10.249ZM14.499 5V4.25C14.499 3.83579 14.1632 3.5 13.749 3.5H10.249C9.83481 3.5 9.49902 3.83579 9.49902 4.25V5H14.499ZM5.5 6.5C5.08579 6.5 4.75 6.83579 4.75 7.25C4.75 7.66421 5.08579 8 5.5 8H18.498C18.9123 8 19.248 7.66421 19.248 7.25C19.248 6.83579 18.9123 6.5 18.498 6.5H5.5ZM6.42037 9.5H17.5777L16.96 19.7949C16.9362 20.191 16.6081 20.5 16.2113 20.5H7.78672C7.38995 20.5 7.06183 20.191 7.03807 19.7949L6.42037 9.5Z"
      fill="#FF6060"
    />
  </svg>
);

function App() {
  const [todo, setTodo] = useState([]);
  const [showTodoContainer, setShowTodoContainer] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;

    if (!inputValue) return;
    setTodo((prev) => [...prev, inputValue]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setShowTodoContainer(true);
  };

  const clearTodo = () => {
    if (todo) {
      setShowTodoContainer(false);
      setTodo([]);
    }
  };

  const todoContainerRef = useRef(null);

  useEffect(() => {
    if (todoContainerRef) {
      gsap.to(todoContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "expo.out,",
      });
    }
  }, [showTodoContainer]);

  const checkboxRef = useRef(null);
  const todoRef = useRef(null);

  const handleCheckbox = (e: Event) => {
    const isChecked = e.target?.checked;

    gsap.to(checkboxRef.current, {
      scale: isChecked ? 1.2 : 1,
      rotate: isChecked ? 360 : 0,
      backgroundColor: isChecked ? "#ffffff" : "", // Tailwind Blue-500
      duration: 0.3,
      ease: "expo.out",
    });

    gsap.to(todoRef.current, {
      opacity: isChecked ? 100 : 25,
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#202020]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center px-10 w-[25em] h-[6em] rounded-3xl bg-todoBG">
          <form onSubmit={handleTodo} className="flex-auto ">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type To-do here"
              className="w-[15em] text-white focus:outline-none"
            />
          </form>
          <div className="flex gap-4">
            <button className=" w-[40px] h-[40px] bg-[#FF954E]/25 rounded-xl flex items-center justify-center hover:-translate-y-0.5 transition ease-linear cursor-pointer">
              {add}
            </button>
            <button
              onClick={clearTodo}
              className=" w-[40px] h-[40px] bg-[#FF6060]/25 rounded-xl flex items-center justify-center hover:-translate-y-0.5 transition ease-linear cursor-pointer"
            >
              {trash}
            </button>
          </div>
        </div>
        {showTodoContainer && (
          <div
            ref={todoContainerRef}
            className="flex flex-col gap-10 p-8 h-[20em] bg-todoBG rounded-3xl text-sm text-white opacity-0 scale-0 overflow-y-auto"
          >
            {todo.map((todo, index) => (
              <div key={index} className="flex items-center gap-3">
                <label
                  onChange={handleCheckbox}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input type="checkbox" className="peer hidden" />
                  <div
                    ref={checkboxRef}
                    className="w-5 h-5 rounded-full border-[1.5px] border-white peer-checked:border-white flex items-center justify-center transition"
                  ></div>
                </label>
                <div ref={todoRef}>{todo}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
