import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Pagination = ({ next, prev }) => { 
    return (
      <div className="flex justify-center items-center gap-4 flex-wrap mb-5">
          <button className="inline-flex items-center bg-transparent hover:bg-green-700 text-green-500 font-light py-2 px-6 transition duration-300 ease-in-out border-none hover:text-white rounded start" onClick={prev}>
              <FaArrowLeft/> <span className="mx-2">Anterior</span>
          </button>
          <button className="inline-flex items-center bg-transparent hover:bg-green-700 text-green-500 font-light py-2 px-6 transition duration-300 ease-in-out border-none hover:text-white rounded start" onClick={next}>
              <span className="mx-2">Siguiente</span> <FaArrowRight />
          </button>
      </div>  
    );
  }
  
  export default Pagination;