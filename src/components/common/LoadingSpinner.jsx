import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 border-2 border-[var(--color-sand)] border-t-[var(--color-gold)] rounded-full animate-spin" />
        <p className="text-sm text-[var(--color-stone)] tracking-wider uppercase">
          Loading
        </p>
      </motion.div>
    </div>
  );
}
