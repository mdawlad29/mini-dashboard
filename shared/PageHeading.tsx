import { motion } from "framer-motion";

export const PageHeading = ({
  onClick,
  title,
  btnText,
}: {
  title: string;
  btnText: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-gray-900"
      >
        {title}
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
      >
        {btnText}
      </motion.button>
    </div>
  );
};
